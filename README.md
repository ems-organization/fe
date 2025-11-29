# Event Management System — Frontend

Next.js app for browsing and creating events with map-based discovery and location picking.

## Stack

- Next.js (App Router), React 19, TypeScript
- MUI 7 for UI components
- TanStack Query for data fetching/caching
- MapLibre GL for maps (tiles from `https://demotiles.maplibre.org`)

## Setup

1. Install Node 20+ and npm.
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and set values for your backend:
   - `NEXT_PUBLIC_API_URL=http://localhost:3000/api`
4. Run the dev server: `npm run dev` (default at `http://localhost:3000`)

Other scripts:

- `npm run lint` — lint codebase
- `npm run build` — production build
- `npm run start` — start built app

## Project Highlights

- `src/app/events/page.tsx` — events listing with list/map toggle, filtering, and creation link.
- `src/app/events/[id]/page.tsx` — event details page with map showing event location.
- `src/app/events/new/page.tsx` — event creation form with map location picker.

## Map Components

- `src/components/events-map.tsx`
  - Renders MapLibre with markers for events that have `latitude` and `longitude`.
  - Each marker shows a popup with event title, category, date, and location.
  - Used in the Events page “Map” view; container stretches to its parent height.
- `src/components/map-location-picker.tsx`
  - Click to drop a draggable marker and emit `{ lat, lng, address }`.
  - Reverse geocoding uses Nominatim (`https://nominatim.openstreetmap.org/reverse`).
  - If a `value` prop is provided, recenters/zooms to that point and syncs the marker.
- Map CSS is imported once in `src/app/globals.css`: `@import "maplibre-gl/dist/maplibre-gl.css";`
