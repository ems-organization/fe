"use client";

import maplibregl, { Map } from "maplibre-gl";
import { useEffect, useRef } from "react";

async function reverseGeocode(
  lat: number,
  lng: number
): Promise<string | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await res.json();
    return data.display_name || null;
  } catch (err) {
    console.error("Reverse geocoding failed", err);
    return null;
  }
}

export default function MapLocationPicker({
  value,
  onChange,
}: {
  value?: { lat: number; lng: number } | null;
  onChange: (coords: {
    lat: number;
    lng: number;
    address?: string | null;
  }) => void;
}) {
  const mapRef = useRef<Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);

  const updateLocation = async (lat: number, lng: number) => {
    const address = await reverseGeocode(lat, lng);
    onChange({ lat, lng, address });
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [24.03, 49.84],
      zoom: 6,
    });

    mapRef.current = map;

    map.on("click", async (e) => {
      const { lat, lng } = e.lngLat;

      await updateLocation(lat, lng);

      if (!markerRef.current) {
        markerRef.current = new maplibregl.Marker({ draggable: true })
          .setLngLat([lng, lat])
          .addTo(map);

        markerRef.current.on("dragend", async () => {
          const p = markerRef.current!.getLngLat();
          await updateLocation(p.lat, p.lng);
        });
      } else {
        markerRef.current.setLngLat([lng, lat]);
      }
    });

    return () => map.remove();
  }, []);

  useEffect(() => {
    if (value && mapRef.current) {
      if (!markerRef.current) {
        markerRef.current = new maplibregl.Marker({ draggable: true })
          .setLngLat([value.lng, value.lat])
          .addTo(mapRef.current);

        markerRef.current.on("dragend", async () => {
          const p = markerRef.current!.getLngLat();
          await updateLocation(p.lat, p.lng);
        });
      } else {
        markerRef.current.setLngLat([value.lng, value.lat]);
      }

      mapRef.current.setCenter([value.lng, value.lat]);
      mapRef.current.setZoom(13);
    }
  }, [value]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: 350,
        borderRadius: 12,
        marginTop: 8,
        overflow: "hidden",
      }}
    />
  );
}
