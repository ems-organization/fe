"use client";

import EventCard from "@/components/event-card";
import EventFilters from "@/components/event-filters";
import EventsMap from "@/components/events-map";
import { getEvents } from "@/lib/queries";
import { Event } from "@/types/event";
import { parseEventFilters } from "@/utils/parse-event-filters";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function EventsPage() {
  const searchParams = useSearchParams();
  const { sort, order, category } = parseEventFilters(searchParams);

  const params = {
    ...(sort && { sort }),
    ...(order && { order }),
    ...(category && { category }),
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [view, setView] = useState<"list" | "map">("list");
  const isMapView = view === "map";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["events", sort, order, category],
    queryFn: () => getEvents(params),
  });

  if (isError) {
    return (
      <Box p={4}>
        <Alert severity="error">Failed to load events</Alert>
      </Box>
    );
  }

  return (
    <Box
      p={isMobile ? 2 : 3}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: isMapView ? "calc(100vh - 64px)" : "auto",
      }}
    >
      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        justifyContent="space-between"
        alignItems={isMobile ? "flex-start" : "center"}
        gap={isMobile ? 2 : 0}
        mb={3}
      >
        <Typography variant={isMobile ? "h5" : "h4"}>Events</Typography>

        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          alignItems={isMobile ? "stretch" : "center"}
          gap={2}
          width={isMobile ? "100%" : "auto"}
        >
          <EventFilters fullWidth={isMobile} />

          <Button
            variant="contained"
            component={Link}
            href="/events/new"
            fullWidth={isMobile}
          >
            Create Event
          </Button>
        </Box>
      </Box>

      <Box display="flex" gap={2} mb={3}>
        <Button
          variant={view === "list" ? "contained" : "outlined"}
          onClick={() => setView("list")}
        >
          List
        </Button>
        <Button
          variant={view === "map" ? "contained" : "outlined"}
          onClick={() => setView("map")}
        >
          Map
        </Button>
      </Box>

      {isLoading && (
        <Box textAlign="center" my={4}>
          <CircularProgress />
          <Typography mt={2}>Loading events...</Typography>
        </Box>
      )}

      {!isLoading && (!data || data.length === 0) && (
        <Box textAlign="center" my={4}>
          <Typography variant="h6" color="text.secondary">
            No events found.
          </Typography>
        </Box>
      )}

      {isMapView ? (
        <Box sx={{ flex: 1, minHeight: 0, mt: 2 }}>
          <EventsMap events={data || []} />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {data?.map((event: Event) => (
            <Grid
              key={event.id}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              sx={{ display: "flex" }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <EventCard event={event} />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
