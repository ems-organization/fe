import { EventCategory } from "@/enums/category.enum";

export interface CreateEventPayload {
  title: string;
  date: string;
  location: string;
  category: EventCategory;
  description: string;
  latitude?: number | null;
  longitude?: number | null;
}

export type UpdateEventPayload = Partial<CreateEventPayload>;
