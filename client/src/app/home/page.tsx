"use client";

import Navbar from "../components/Navbar";
import Button from "@mui/material/Button";
import { Box, Typography, Container } from "@mui/material";
import { useState } from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(to right, #3B82F6, #8B5CF6)",
          color: "white",
          py: 10,
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: "bold",
              mb: 3,
              fontSize: { xs: "2.5rem", md: "3rem" },
            }}
          >
            Welcome to Our Store
          </Typography>

          <Typography variant="h5" component="p" sx={{ mb: 4 }}>
            Discover amazing products for your lifestyle
          </Typography>

          <Button
            href="/products"
            variant="contained"
            sx={{
              bgcolor: "white",
              color: "primary.main",
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "grey.100",
              },
            }}
            size="large"
          >
            Browse All Products
          </Button>
        </Container>
      </Box>

      <Box
        component="footer"
        sx={{
          bgcolor: "grey.800",
          color: "white",
          py: 3,
          mt: "auto",
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="body1">
            © 2025 demo. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </div>
  );
}
