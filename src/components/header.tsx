"use client";

import { useThemeMode } from "@/theme/theme-context";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

export default function Header() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          component={Link}
          href="/"
          variant="h6"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          EMS
        </Typography>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Button color="inherit" component={Link} href="/events">
            Events
          </Button>

          <IconButton color="inherit" onClick={toggleMode}>
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
