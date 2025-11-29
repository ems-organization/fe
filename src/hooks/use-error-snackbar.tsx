"use client";

import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

export function useErrorSnackbar() {
  const [message, setMessage] = useState<string | null>(null);

  const showError = (msg: string) => {
    setMessage(msg);
  };

  const ErrorSnackbar = () => (
    <Snackbar
      open={!!message}
      autoHideDuration={4000}
      onClose={() => setMessage(null)}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        severity="error"
        onClose={() => setMessage(null)}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );

  return { showError, ErrorSnackbar };
}
