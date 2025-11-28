"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { createTheme } from "@mui/material/styles";
import { useMemo, useState } from "react";
import { ColorMode, ThemeContext } from "./theme-context";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<ColorMode>("light");

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: {
                  default: "#f5f5f5",
                },
              }
            : {
                background: {
                  default: "#121212",
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    </ThemeContext.Provider>
  );
}
