"use client";

import ConfirmDialog from "@/components/confirm-dialog";
import EventCard from "@/components/event-card";
import { useErrorSnackbar } from "@/hooks/use-error-snackbar";
import { deleteEvent, getEvent, getRecommendations } from "@/lib/queries";
import { Event } from "@/types/event";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useState } from "react";

export default function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const queryClient = useQueryClient();

  const { showError, ErrorSnackbar } = useErrorSnackbar();

  const {
    data: event,
    isLoading,
    isError,
  } = useQuery<Event>({
    queryKey: ["event", id],
    queryFn: () => getEvent(id),
    retry: false,
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      router.push("/events");
    },
    onError: (err: any) => {
      showError(err?.message || "Failed to delete event");
    },
  });

  const {
    data: recommendations,
    isLoading: isLoadingRecs,
    isError: isErrorRecs,
  } = useQuery<Event[]>({
    queryKey: ["event-recommendations", id],
    queryFn: () => getRecommendations(id),
    enabled: !!event,
    retry: false,
  });

  const [openDelete, setOpenDelete] = useState(false);

  if (isLoading) {
    return (
      <Box p={4} textAlign="center">
        <CircularProgress />
        <Typography mt={2}>Loading event...</Typography>
      </Box>
    );
  }

  if (isError || !event) {
    return (
      <Box p={4}>
        <Alert severity="error">Event not found</Alert>
        <Button
          component={Link}
          href="/events"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Back to Events
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Box p={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">{event.title}</Typography>

          <Box display="flex" gap={2}>
            <Button
              variant="outlined"
              component={Link}
              href={`/events/${id}/edit`}
            >
              Edit
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={() => setOpenDelete(true)}
            >
              Delete
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Chip label={event.category} color="primary" sx={{ mb: 2 }} />

        <Typography variant="body1" color="text.secondary" mb={1}>
          <strong>Date:</strong> {new Date(event.date).toLocaleString()}
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={1}>
          <strong>Location:</strong> {event.location}
        </Typography>

        <Typography variant="body1" mt={3}>
          {event.description}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Button variant="text" component={Link} href="/events">
          ← Back to Events
        </Button>

        <Divider sx={{ my: 4 }} />
        <Typography variant="h5" mb={2}>
          Recommended Events
        </Typography>

        {isLoadingRecs && (
          <Box textAlign="center" my={2}>
            <CircularProgress size={20} />
          </Box>
        )}

        {isErrorRecs && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to load recommendations
          </Alert>
        )}
        {!isLoadingRecs && recommendations?.length === 0 && (
          <Typography color="text.secondary">
            No similar events nearby.
          </Typography>
        )}

        {!isLoadingRecs && recommendations && recommendations.length > 0 && (
          <Grid container spacing={2}>
            {recommendations.map((rec: Event) => (
              <Grid
                key={rec.id}
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                sx={{ display: "flex" }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <EventCard event={rec} />
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <ConfirmDialog
        open={openDelete}
        title="Delete Event"
        description={
          <>
            Are you sure you want to delete <strong>{event.title}</strong>? This
            action cannot be undone.
          </>
        }
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleteMutation.isPending}
        onClose={() => !deleteMutation.isPending && setOpenDelete(false)}
        onConfirm={() => deleteMutation.mutate()}
      />

      <ErrorSnackbar />
    </>
  );
}
