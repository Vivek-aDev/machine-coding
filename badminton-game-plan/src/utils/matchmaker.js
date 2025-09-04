// ---------------- Singles ----------------
export function generateAllSinglesMatches(players) {
  const matches = [];
  const n = players.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      matches.push([players[i], players[j]]);
    }
  }
  return matches;
}

// ---------------- Doubles ----------------
// Generate all distinct team-vs-team matches from every 4-player set
export function generateAllDoublesMatches(players) {
  const n = players.length;
  const set = new Set();
  const output = [];

  for (let a = 0; a < n; a++) {
    for (let b = a + 1; b < n; b++) {
      for (let c = b + 1; c < n; c++) {
        for (let d = c + 1; d < n; d++) {
          const group = [players[a], players[b], players[c], players[d]];

          const pairings = [
            [
              [group[0], group[1]],
              [group[2], group[3]],
            ],
            [
              [group[0], group[2]],
              [group[1], group[3]],
            ],
            [
              [group[0], group[3]],
              [group[1], group[2]],
            ],
          ];

          for (const pairing of pairings) {
            const teamA = pairing[0].slice().sort();
            const teamB = pairing[1].slice().sort();
            const teams = [teamA, teamB].sort((x, y) =>
              x.join("|").localeCompare(y.join("|"))
            );
            const key = `${teams[0].join("&")}|${teams[1].join("&")}`;
            if (!set.has(key)) {
              set.add(key);
              output.push([teams[0], teams[1]]);
            }
          }
        }
      }
    }
  }

  return output;
}

// ---------------- Scheduling ----------------
export function scheduleMatches(
  allMatches,
  players,
  totalCourts,
  playersPerMatch,
  roundsLimit = null,
  roundOption = "max"
) {
  const matchPlayers = (m) =>
    Array.isArray(m[0]) ? [...m[0], ...m[1]] : [...m];

  const available = [...allMatches];
  const playCounts = Object.fromEntries(players.map((p) => [p, 0]));
  const rounds = [];

  // 🔹 Calculate max possible rounds
  const maxRounds = Math.ceil(available.length / totalCourts);

  // 🔹 Reinforce roundsLimit for custom
  if (roundOption === "custom" && roundsLimit > maxRounds) {
    roundsLimit = maxRounds;
  }

  // 🔹 Special handling for MIN mode
  if (roundOption === "min") {
    const seen = new Set();
    while (seen.size < players.length && available.length > 0) {
      const roundMatches = [];
      const usedThisRound = new Set();

      for (let slot = 0; slot < totalCourts && available.length > 0; slot++) {
        const idx = available.findIndex((m) =>
          matchPlayers(m).some((p) => !seen.has(p))
        );
        if (idx === -1) break;

        const match = available[idx];
        matchPlayers(match).forEach((p) => {
          seen.add(p);
          playCounts[p]++;
        });

        roundMatches.push(match);
        available.splice(idx, 1);
      }

      if (roundMatches.length === 0) break;
      rounds.push({ round: rounds.length + 1, roundMatches });
    }

    return { rounds, playCounts, remainingMatches: available };
  }

  // 🔹 Default (MAX or CUSTOM) - greedy balanced scheduling
  const SAFETY_MAX_ROUNDS = 500;
  while (
    available.length > 0 &&
    (roundsLimit == null || rounds.length < roundsLimit) &&
    rounds.length < SAFETY_MAX_ROUNDS
  ) {
    const usedThisRound = new Set();
    const roundMatches = [];

    for (let slot = 0; slot < totalCourts; slot++) {
      const candidates = available
        .map((match, i) => ({ i, match, players: matchPlayers(match) }))
        .filter(({ players }) => players.every((p) => !usedThisRound.has(p)));

      if (candidates.length === 0) break;

      const best = candidates.reduce((a, b) => {
        const scoreA = a.players.reduce((s, p) => s + playCounts[p], 0);
        const scoreB = b.players.reduce((s, p) => s + playCounts[p], 0);
        return scoreA <= scoreB ? a : b;
      });

      roundMatches.push(best.match);
      best.players.forEach((p) => {
        usedThisRound.add(p);
        playCounts[p]++;
      });

      available.splice(best.i, 1);
    }

    if (roundMatches.length === 0) break;
    rounds.push({ round: rounds.length + 1, roundMatches });
  }

  return { rounds, playCounts, remainingMatches: available };
}
