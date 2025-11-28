import { EventCategory } from "@/enums/category.enum";
import { OrderOptions } from "@/enums/order-options.enum";
import { SortOptions } from "@/enums/sort-options.enum";

export function parseEventFilters(searchParams: URLSearchParams) {
  const sortParam = searchParams.get("sort");
  const orderParam = searchParams.get("order");
  const categoryParam = searchParams.get("category");

  const sort = Object.values(SortOptions).includes(sortParam as SortOptions)
    ? (sortParam as SortOptions)
    : SortOptions.date;

  const order = Object.values(OrderOptions).includes(orderParam as OrderOptions)
    ? (orderParam as OrderOptions)
    : OrderOptions.asc;

  const category = Object.values(EventCategory).includes(
    categoryParam as EventCategory
  )
    ? (categoryParam as EventCategory)
    : undefined;

  return {
    sort,
    order,
    category,
  };
}
