import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";

import singles from "../assets/singles.png";
import doubles from "../assets/doubles.png";

export default function Home() {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "100vh",
        textAlign: "center",
        py: 4,
      }}
    >
      {/* Title with animation */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Badminton Game Plan Maker
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Create fair and balanced match plans for singles & doubles
        </Typography>
      </motion.div>

      {/* Card Grid */}
      <Grid
        container
        spacing={6}
        justifyContent="center"
        sx={{ mt: 6 }}
        component={motion.div}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Singles */}
        <Grid item xs={12} sm={6}>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 250 }}>
            <Card sx={{ borderRadius: 4, boxShadow: 6 }}>
              <CardActionArea component={Link} to="/setup/singles">
                <CardMedia
                  component="img"
                  height="340"
                  image={singles}
                  alt="Singles Match"
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h5" fontWeight="600">
                    Singles
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </motion.div>
        </Grid>

        {/* Doubles */}
        <Grid item xs={12} sm={6}>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 250 }}>
            <Card sx={{ borderRadius: 4, boxShadow: 6 }}>
              <CardActionArea component={Link} to="/setup/doubles">
                <CardMedia
                  component="img"
                  height="340"
                  image={doubles}
                  alt="Doubles Match"
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h5" fontWeight="600">
                    Doubles
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Footer */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="body2" color="text.secondary">
          Made with ❤️ by <strong>Vivekananda Sahu</strong>
        </Typography>
      </Box>
    </Container>
  );
}
