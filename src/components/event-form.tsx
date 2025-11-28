"use client";

import { EventCategory } from "@/enums/category.enum";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

const EventFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
  location: z.string().min(1, "Location is required"),
  category: z.enum(Object.values(EventCategory)),
  description: z.string().min(1, "Description is required"),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
});

export type EventFormValues = z.infer<typeof EventFormSchema>;

export default function EventForm({
  defaultValues,
  submitText = "Submit",
  loading,
  onSubmit,
}: {
  defaultValues?: Partial<EventFormValues>;
  submitText?: string;
  loading?: boolean;
  onSubmit: (values: EventFormValues) => void;
}) {
  const form = useForm({
    defaultValues: {
      title: defaultValues?.title ?? "",
      date: defaultValues?.date ?? "",
      location: defaultValues?.location ?? "",
      category: defaultValues?.category ?? EventCategory.OTHER,
      description: defaultValues?.description ?? "",
      latitude: defaultValues?.latitude ?? null,
      longitude: defaultValues?.longitude ?? null,
    },
    validators: {
      onSubmit: EventFormSchema,
    },
    onSubmit: ({ value }) => onSubmit(value),
  });

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <form.Field name="title">
        {(field) => (
          <TextField
            label="Title"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            error={!!field.state.meta.errors?.length}
            helperText={field.state.meta.errors
              .map((err) => err?.message)
              .join(", ")}
          />
        )}
      </form.Field>

      <form.Field name="date">
        {(field) => (
          <TextField
            type="datetime-local"
            label="Date"
            value={field.state.value ?? ""}
            onChange={(e) => field.handleChange(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!field.state.meta.errors?.length}
            helperText={field.state.meta.errors
              .map((err) => err?.message)
              .join(", ")}
            fullWidth
          />
        )}
      </form.Field>

      <form.Field name="location">
        {(field) => (
          <TextField
            label="Location"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            error={!!field.state.meta.errors?.length}
            helperText={field.state.meta.errors
              .map((err) => err?.message)
              .join(", ")}
          />
        )}
      </form.Field>

      <form.Field name="category">
        {(field) => (
          <TextField
            select
            label="Category"
            onChange={(e) =>
              field.handleChange(e.target.value as EventCategory)
            }
            value={field.state.value as EventCategory}
            error={!!field.state.meta.errors?.length}
            helperText={field.state.meta.errors
              .map((err) => err?.message)
              .join(", ")}
          >
            {Object.values(EventCategory).map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
        )}
      </form.Field>

      <form.Field name="description">
        {(field) => (
          <TextField
            multiline
            rows={4}
            label="Description"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            error={!!field.state.meta.errors?.length}
            helperText={field.state.meta.errors
              .map((err) => err?.message)
              .join(", ")}
          />
        )}
      </form.Field>

      <Button
        type="submit"
        variant="contained"
        disabled={loading || !form.state.canSubmit}
      >
        {loading ? "Saving..." : submitText}
      </Button>
    </Box>
  );
}
