import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  IconButton,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Collapse,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  generateAllSinglesMatches,
  generateAllDoublesMatches,
  scheduleMatches,
} from "../utils/matchmaker";

// simple color palette for players
const COLORS = [
  "#e57373",
  "#64b5f6",
  "#81c784",
  "#ffb74d",
  "#ba68c8",
  "#4db6ac",
  "#f06292",
  "#9575cd",
  "#7986cb",
  "#aed581",
  "#ff8a65",
  "#dce775",
];

export default function Plan() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showSummary, setShowSummary] = useState(false);

  if (!state) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography variant="h6" gutterBottom>
          No data found. Go back to setup.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Home
        </Button>
      </Container>
    );
  }

  const {
    mode,
    totalPlayers: totalPlayersRaw,
    totalCourts: totalCourtsRaw,
    roundOption,
    customRounds,
    players: playersRaw,
  } = state;

  const totalPlayers = Number(totalPlayersRaw);
  const totalCourts = Number(totalCourtsRaw);
  const players = (playersRaw || []).filter(Boolean);

  // map each player to a color
  const playerColors = useMemo(() => {
    const map = {};
    players.forEach((p, idx) => {
      map[p] = COLORS[idx % COLORS.length];
    });
    return map;
  }, [players]);

  const playersPerMatch = mode === "singles" ? 2 : 4;
  if (players.length < playersPerMatch) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography>
          Not enough players for {mode}. Need at least {playersPerMatch}{" "}
          players.
        </Typography>
        <Button sx={{ mt: 2 }} variant="outlined" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  // generate matches
  const allMatches = useMemo(() => {
    return mode === "singles"
      ? generateAllSinglesMatches(players)
      : generateAllDoublesMatches(players);
  }, [mode, players.join("|")]);

  let roundsLimit = null;
  if (roundOption === "min") {
    const minRoundsNeeded = Math.ceil(
      players.length / (playersPerMatch * Math.max(1, totalCourts))
    );
    roundsLimit = minRoundsNeeded;
  } else if (roundOption === "custom") {
    roundsLimit = Number(customRounds) || 0;
  }

  const schedulingResult = scheduleMatches(
    allMatches,
    players,
    totalCourts,
    playersPerMatch,
    roundsLimit,
    roundOption
  );

  const { rounds, playCounts } = schedulingResult;

  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      {/* Back button */}
      <IconButton onClick={() => navigate(-1)} color="primary" sx={{ mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>

      <Typography variant="h4" gutterBottom>
        Match Plan ({mode})
      </Typography>

      {/* Player Legend */}
      <Box
        display="flex"
        flexWrap="wrap"
        gap={1.5}
        mb={3}
        justifyContent="center"
      >
        {players.map((p) => (
          <Chip
            key={p}
            label={p}
            sx={{
              backgroundColor: playerColors[p],
              color: "#fff",
              fontWeight: "bold",
            }}
          />
        ))}
      </Box>

      {/* Table of Matches */}
      {rounds.length === 0 ? (
        <Typography color="error">No matches could be scheduled.</Typography>
      ) : (
        <Table size="small" sx={{ border: "1px solid #ddd", mb: 4 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f9f9f9" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Round</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Court</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Match</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rounds.map((r) =>
              r.roundMatches.map((m, idx) => (
                <TableRow key={`${r.round}-${idx}`}>
                  <TableCell>{r.round}</TableCell>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
                    {/* Singles */}
                    {!Array.isArray(m[0]) ? (
                      <Box display="flex" alignItems="center" gap={1}>
                        <Chip
                          label={m[0]}
                          sx={{
                            backgroundColor: playerColors[m[0]],
                            color: "#fff",
                          }}
                        />
                        <Typography variant="body2" color="textSecondary">
                          vs
                        </Typography>
                        <Chip
                          label={m[1]}
                          sx={{
                            backgroundColor: playerColors[m[1]],
                            color: "#fff",
                          }}
                        />
                      </Box>
                    ) : (
                      // Doubles
                      <Box display="flex" alignItems="center" gap={1}>
                        <Box display="flex" gap={1}>
                          {m[0].map((p) => (
                            <Chip
                              key={p}
                              label={p}
                              sx={{
                                backgroundColor: playerColors[p],
                                color: "#fff",
                              }}
                            />
                          ))}
                        </Box>
                        <Typography variant="body2" color="textSecondary">
                          vs
                        </Typography>
                        <Box display="flex" gap={1}>
                          {m[1].map((p) => (
                            <Chip
                              key={p}
                              label={p}
                              sx={{
                                backgroundColor: playerColors[p],
                                color: "#fff",
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      {/* Show Participation Summary (unchanged) */}
      <Box textAlign="center" mb={2}>
        <Button
          variant="outlined"
          onClick={() => setShowSummary((prev) => !prev)}
        >
          {showSummary
            ? "Hide Player Participation Summary"
            : "Show Player Participation Summary"}
        </Button>
      </Box>

      <Collapse in={showSummary}>
        <Typography variant="h5" gutterBottom>
          Player Participation Summary
        </Typography>
        <Table size="small" sx={{ border: "1px solid #ddd" }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f9f9f9" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Player</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Matches Played</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((p) => (
              <TableRow key={p}>
                <TableCell>
                  <Chip
                    label={p}
                    sx={{ backgroundColor: playerColors[p], color: "#fff" }}
                  />
                </TableCell>
                <TableCell>{playCounts[p] || 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Collapse>

      <Box textAlign="center" mt={4}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/")}
        >
          Start Over
        </Button>
      </Box>
    </Container>
  );
}
