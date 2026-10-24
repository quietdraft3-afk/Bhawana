"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

const COLORS = {
  Project: "project",
  Travel: "travel",
  Event: "event",
  Journey: "journey",
};

export default function MapView({ locations }) {
  const mapEl = useRef(null);
  const mapRef = useRef(null);
  const layerRef = useRef(null);
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(locations.map((l) => l.category)))];

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !mapEl.current || mapRef.current) return;

      const map = L.map(mapEl.current, { scrollWheelZoom: false });
      mapRef.current = { map, L };

      // Light, minimal tiles that match the site's paper aesthetic.
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 19,
      }).addTo(map);

      layerRef.current = L.layerGroup().addTo(map);
      drawMarkers(L, map, "All");
    })();
    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.map.remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function drawMarkers(L, map, cat) {
    const layer = layerRef.current;
    layer.clearLayers();
    const shown = cat === "All" ? locations : locations.filter((l) => l.category === cat);
    const bounds = [];
    shown.forEach((loc) => {
      const cls = COLORS[loc.category] || "journey";
      const icon = L.divIcon({
        className: "",
        html: `<div class="map-marker ${cls}"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });
      const html = `
        <div class="map-popup">
          ${loc.image ? `<img src="${loc.image}" alt="" />` : ""}
          <div class="t">${loc.title}</div>
          <p>${loc.text || ""}</p>
          ${loc.link ? `<a href="${loc.link}">View more →</a>` : ""}
        </div>`;
      L.marker([loc.lat, loc.lng], { icon }).bindPopup(html, { maxWidth: 240 }).addTo(layer);
      bounds.push([loc.lat, loc.lng]);
    });
    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 12 });
    } else {
      map.setView([28.2, 84.0], 7);
    }
  }

  function onFilter(cat) {
    setFilter(cat);
    if (mapRef.current) drawMarkers(mapRef.current.L, mapRef.current.map, cat);
  }

  return (
    <div>
      <div className="chips">
        {categories.map((c) => (
          <button key={c} className={`chip ${filter === c ? "active" : ""}`} onClick={() => onFilter(c)}>
            {c}
          </button>
        ))}
      </div>
      <div ref={mapEl} className="map-wrap" aria-label="Interactive map of projects and places" />
      <div className="map-legend">
        <span><i style={{ background: "#b0512e" }} /> Projects</span>
        <span><i style={{ background: "#6b7150" }} /> Travel</span>
        <span><i style={{ background: "#1f1d1a" }} /> Journey & events</span>
      </div>
    </div>
  );
}
