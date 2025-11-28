import { EventCategory } from "@/enums/category.enum";
import { OrderOptions } from "@/enums/order-options.enum";
import { SortOptions } from "@/enums/sort-options.enum";

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  latitude?: number | null;
  longitude?: number | null;
  category: EventCategory;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventQueryParams {
  sort?: SortOptions;
  order?: OrderOptions;
  category?: EventCategory;
}
