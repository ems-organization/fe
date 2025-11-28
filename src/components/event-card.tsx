"use client";

import { Event } from "@/types/event";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function EventCard({ event }: { event: Event }) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {event.title}
        </Typography>

        <Chip
          label={event.category}
          size="small"
          color="primary"
          sx={{ mb: 1, textTransform: "capitalize" }}
        />

        <Typography variant="body2" color="text.secondary" mt={1}>
          {new Date(event.date).toLocaleString()}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {event.location}
        </Typography>

        <Box mt={2}>
          <Button
            size="small"
            variant="outlined"
            component={Link}
            href={`/events/${event.id}`}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
