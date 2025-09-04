import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
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
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Badminton Game Plan Maker
        </Typography>
      </motion.div>

      <Grid
        container
        spacing={8}
        justifyContent="center"
        sx={{ mt: 4 }}
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Singles */}
        <Grid item xs={12} sm={6}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card sx={{ borderRadius: 3, boxShadow: 6 }}>
              <CardActionArea component={Link} to="/setup/singles">
                <CardMedia
                  component="img"
                  height="320"
                  image={singles}
                  alt="Singles Badminton"
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
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card sx={{ borderRadius: 3, boxShadow: 6 }}>
              <CardActionArea component={Link} to="/setup/doubles">
                <CardMedia
                  component="img"
                  height="320"
                  image={doubles}
                  alt="Doubles Badminton"
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
    </Container>
  );
}
