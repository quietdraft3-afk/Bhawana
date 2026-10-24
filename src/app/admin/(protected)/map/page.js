"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import CollectionEditor from "@/components/admin/CollectionEditor";

const SCHEMA = [
  { name: "title", label: "Place name", type: "text" },
  { name: "category", label: "Type of pin", type: "select", half: true,
    options: ["Project", "Travel", "Event", "Journey"] },
  { name: "link", label: "Link", type: "text", half: true, hint: "optional — e.g. /projects/my-project" },
  { name: "lat", label: "Latitude", type: "number", half: true, hint: "from Google Maps: right-click a spot → the first number" },
  { name: "lng", label: "Longitude", type: "number", half: true, hint: "the second number" },
  { name: "text", label: "Short description", type: "textarea" },
  { name: "image", label: "Small picture for the popup", type: "image" },
];

export default function MapAdmin() {
  return (
    <>
      <AdminHeader title="Map Locations" sub="Pins on the interactive map." />
      <CollectionEditor
        file="locations"
        title="Locations"
        intro={<>To find coordinates: open Google Maps, right-click the exact spot, and click the numbers that appear (e.g. 27.7047, 85.3086). The first number is Latitude, the second is Longitude.</>}
        schema={SCHEMA}
        listTitle={(l) => l.title || "(untitled)"}
        listSubtitle={(l) => `${l.category || ""} · ${l.lat ?? "?"}, ${l.lng ?? "?"}`}
        listImage={(l) => l.image}
        makeNew={() => ({ category: "Travel" })}
      />
    </>
  );
}
