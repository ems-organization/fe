"use client";

import EventForm, { EventFormValues } from "@/components/event-form";
import { getEvent, updateEvent } from "@/lib/queries";
import { Event } from "@/types/event";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const qc = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEvent(id),
  });

  const mutation = useMutation<Event, Error, EventFormValues>({
    mutationFn: (payload) => updateEvent(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["event", id] });
      qc.invalidateQueries({ queryKey: ["events"] });
      router.push(`/events/${id}`);
    },
    onError: () => {
      alert("Failed to update event");
    },
  });

  if (isLoading) {
    return (
      <Box p={4} textAlign="center">
        <CircularProgress />
        <Typography mt={2}>Loading event...</Typography>
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Box p={4}>
        <Alert severity="error">Event not found</Alert>
        <Button href="/events" sx={{ mt: 2 }} variant="contained">
          Back
        </Button>
      </Box>
    );
  }

  return (
    <Box p={4} maxWidth={600} mx="auto">
      <Typography variant="h4" mb={3}>
        Edit Event
      </Typography>

      <EventForm
        defaultValues={data}
        submitText="Save Changes"
        loading={mutation.isPending}
        onSubmit={(values) => mutation.mutate(values)}
      />
    </Box>
  );
}
