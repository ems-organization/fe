"use client";

import { Event } from "@/types/event";
import maplibregl, { Map } from "maplibre-gl";
import { useEffect, useRef } from "react";

export default function EventsMap({ events }: { events: Event[] }) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [24.03, 49.84], // default center (Lviv)
      zoom: 6,
    });

    events.forEach((event) => {
      if (event.longitude && event.latitude) {
        new maplibregl.Marker()
          .setLngLat([event.longitude, event.latitude])
          .setPopup(
            new maplibregl.Popup({
              closeButton: true,
              offset: 20,
            }).setHTML(`
    <div style="
      font-family: Inter, sans-serif;
      padding: 10px 12px;
      border-radius: 8px;
      background: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.15);
      max-width: 220px;
      font-size: 13px;
    ">
      <div style="font-size: 15px; font-weight: 600; margin-bottom: 6px;">
        ${event.title}
      </div>

      <div style="
        display: inline-block;
        background: #1976d2;
        color: white;
        padding: 2px 8px;
        border-radius: 6px;
        font-size: 11px;
        margin-bottom: 8px;
        text-transform: capitalize;
      ">
        ${event.category}
      </div>

      <div style="color:#555; margin-bottom: 4px;">
        <strong>Date:</strong><br/>
        ${new Date(event.date).toLocaleString()}
      </div>

      <div style="color:#555;">
        <strong>Location:</strong><br/>
        ${event.location}
      </div>
    </div>
  `)
          )
          .addTo(mapRef.current!);
      }
    });

    return () => {
      mapRef.current?.remove();
    };
  }, [events]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: "100%",
        height: "calc(100vh - 64px)",
        borderRadius: "12px",
        overflow: "hidden",
        marginTop: "16px",
      }}
    />
  );
}
