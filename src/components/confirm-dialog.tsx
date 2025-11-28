"use client";

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { ReactNode } from "react";

export interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  onClose,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={loading ? undefined : onClose}>
      {title && <DialogTitle>{title}</DialogTitle>}

      {(description || typeof description === "string") && (
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
      )}

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          {cancelText}
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={18} /> : null}
          autoFocus
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
