"use client";

import EventForm, { EventFormValues } from "@/components/event-form";
import { createEvent } from "@/lib/queries";
import { Box, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function NewEventPage() {
  const router = useRouter();
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: EventFormValues) => createEvent(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events"] });

      router.push("/events");
    },
    onError: () => {
      alert("Failed to create event");
    },
  });

  return (
    <Box p={4} maxWidth={600} mx="auto">
      <Typography variant="h4" mb={3}>
        Create Event
      </Typography>

      <EventForm
        submitText="Create Event"
        loading={mutation.isPending}
        onSubmit={(values) => mutation.mutate(values)}
      />
    </Box>
  );
}
