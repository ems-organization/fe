"use client";

import { EventCategory } from "@/enums/category.enum";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

export default function EventFilters({ fullWidth }: { fullWidth?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const sort = searchParams.get("sort") || "";
  const order = searchParams.get("order") || "";
  const category = searchParams.get("category") || "";

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set(key, value);
    else params.delete(key);

    params.delete("page");
    router.push(`/events?${params.toString()}`);
  };

  return (
    <Box
      display="flex"
      flexDirection={isMobile && fullWidth ? "column" : "row"}
      gap={2}
      width={fullWidth && isMobile ? "100%" : "auto"}
    >
      <FormControl
        size="small"
        sx={{ minWidth: 140 }}
        fullWidth={isMobile && fullWidth}
      >
        <InputLabel>Sort by</InputLabel>
        <Select
          label="Sort by"
          value={sort}
          onChange={(e) => updateParam("sort", e.target.value)}
        >
          <MenuItem value="date">Date</MenuItem>
          <MenuItem value="title">Title</MenuItem>
        </Select>
      </FormControl>

      <FormControl
        size="small"
        sx={{ minWidth: 120 }}
        fullWidth={isMobile && fullWidth}
      >
        <InputLabel>Order</InputLabel>
        <Select
          label="Order"
          value={order}
          onChange={(e) => updateParam("order", e.target.value)}
        >
          <MenuItem value="asc">Asc</MenuItem>
          <MenuItem value="desc">Desc</MenuItem>
        </Select>
      </FormControl>

      <FormControl
        size="small"
        sx={{ minWidth: 160 }}
        fullWidth={isMobile && fullWidth}
      >
        <InputLabel>Category</InputLabel>
        <Select
          label="Category"
          value={category}
          onChange={(e) => updateParam("category", e.target.value)}
        >
          <MenuItem value="">All</MenuItem>

          {Object.values(EventCategory).map((c) => (
            <MenuItem key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
