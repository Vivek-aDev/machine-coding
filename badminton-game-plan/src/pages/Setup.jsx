import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  MenuItem,
  IconButton,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Setup() {
  const { mode } = useParams();
  const navigate = useNavigate();

  const [totalPlayers, setTotalPlayers] = useState(4);
  const [totalCourts, setTotalCourts] = useState(1);
  const [roundOption, setRoundOption] = useState("max");
  const [customRounds, setCustomRounds] = useState(1);
  const [players, setPlayers] = useState([]);

  // sync players with totalPlayers
  useEffect(() => {
    const count = Number(totalPlayers) || 0;
    setPlayers((prev) => {
      const copy = prev.slice(0, count);
      while (copy.length < count) copy.push("");
      return copy;
    });
  }, [totalPlayers]);

  const handleNameChange = (idx, value) =>
    setPlayers((prev) => {
      const copy = [...prev];
      copy[idx] = value;
      return copy;
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredPlayers = players.map((p) => p.trim()).filter(Boolean);

    if (filteredPlayers.length !== Number(totalPlayers)) {
      alert("Please fill all player names.");
      return;
    }
    if (Number(totalCourts) < 1) {
      alert("Provide at least 1 court.");
      return;
    }
    if (
      roundOption === "custom" &&
      (!customRounds || Number(customRounds) < 1)
    ) {
      alert("Provide a valid custom rounds number.");
      return;
    }

    navigate("/plan", {
      state: {
        mode,
        totalPlayers: Number(totalPlayers),
        totalCourts: Number(totalCourts),
        roundOption,
        customRounds: roundOption === "custom" ? Number(customRounds) : null,
        players: filteredPlayers,
      },
    });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <IconButton onClick={() => navigate(-1)} color="primary">
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h5" gutterBottom>
          Setup for {mode === "singles" ? "Singles" : "Doubles"}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Total Players"
            type="number"
            value={totalPlayers}
            onChange={(e) => setTotalPlayers(Number(e.target.value))}
            required
          />

          <TextField
            label="Total Courts"
            type="number"
            value={totalCourts}
            onChange={(e) => setTotalCourts(Number(e.target.value))}
            required
          />

          <TextField
            select
            label="Round Option"
            value={roundOption}
            onChange={(e) => setRoundOption(e.target.value)}
          >
            <MenuItem value="max">Maximum Possible Rounds</MenuItem>
            <MenuItem value="min">Minimum Rounds</MenuItem>
            <MenuItem value="custom">Custom Number of Rounds</MenuItem>
          </TextField>

          {roundOption === "custom" && (
            <TextField
              label="Number of Rounds"
              type="number"
              value={customRounds}
              onChange={(e) => setCustomRounds(Number(e.target.value))}
              required
            />
          )}

          <Typography variant="h6">Players Names</Typography>
          {players.map((name, i) => (
            <TextField
              key={i}
              label={`Player ${i + 1}`}
              value={name}
              onChange={(e) => handleNameChange(i, e.target.value)}
              required
            />
          ))}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Generate Plan
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
