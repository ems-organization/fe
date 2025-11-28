import { Event, EventQueryParams } from "@/types/event";
import { CreateEventPayload, UpdateEventPayload } from "@/types/event-payload";
import { apiDelete, apiGet, apiPatch, apiPost } from "./api-client";

export const getEvents = (params: EventQueryParams): Promise<Event[]> =>
  apiGet<Event[]>("/events", {
    params,
  });

export const getEvent = (id: string): Promise<Event> =>
  apiGet<Event>(`/events/${id}`);

export const getRecommendations = (id: string): Promise<Event[]> =>
  apiGet<Event[]>(`/events/${id}/recommendations`);

export const createEvent = (data: CreateEventPayload): Promise<Event[]> =>
  apiPost<Event[]>("/events", data);

export const updateEvent = (
  id: string,
  data: UpdateEventPayload
): Promise<Event> => apiPatch<Event>(`/events/${id}`, data);

export const deleteEvent = (id: string): Promise<void> =>
  apiDelete<void>(`/events/${id}`);
