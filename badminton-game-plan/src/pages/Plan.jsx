import React, { useMemo } from "react";
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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  generateAllSinglesMatches,
  generateAllDoublesMatches,
  scheduleMatches,
} from "../utils/matchmaker";

export default function Plan() {
  const { state } = useLocation();
  const navigate = useNavigate();

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

  const playersPerMatch = mode === "singles" ? 2 : 4;
  if (players.length < playersPerMatch) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography>
          Not enough players for {mode}. Need at least {playersPerMatch} players.
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
  }, [mode, players]);

  // rounds limit logic
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

  const { rounds } = schedulingResult;

  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      {/* Back button */}
      <IconButton onClick={() => navigate(-1)} color="primary" sx={{ mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>

      <Typography variant="h4" gutterBottom>
        Match Plan ({mode})
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        Total Players: <b>{totalPlayers}</b> (entered: {players.length}) |
        Courts: <b>{totalCourts}</b> | Mode:{" "}
        <b>
          {roundOption}
          {roundOption === "custom" ? ` (${customRounds})` : ""}
        </b>
      </Typography>

      {rounds.length === 0 ? (
        <Typography color="error">No matches could be scheduled.</Typography>
      ) : (
        <Table size="small" sx={{ border: "1px solid #ddd" }}>
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
                    {Array.isArray(m[0]) ? (
                      <Typography variant="body2">
                        <b>{m[0].join(" & ")}</b>{" "}
                        <span style={{ color: "#888" }}>vs</span>{" "}
                        <b>{m[1].join(" & ")}</b>
                      </Typography>
                    ) : (
                      <Typography variant="body2">
                        <b>{m[0]}</b> <span style={{ color: "#888" }}>vs</span>{" "}
                        <b>{m[1]}</b>
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

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
