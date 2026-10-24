"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import CollectionEditor from "@/components/admin/CollectionEditor";

const SCHEMA = [
  { name: "title", label: "Research title", type: "text" },
  { name: "status", label: "Status", type: "select", half: true,
    options: ["Currently working", "Ongoing", "In review", "Published", "Completed"] },
  { name: "year", label: "Year", type: "text", half: true },
  { name: "collaborators", label: "Collaborators", type: "text", hint: "optional" },
  { name: "abstract", label: "Short abstract", type: "textarea", hint: "what is this research about, in plain words" },
  { name: "methods", label: "Methods", type: "text", hint: "e.g. Field surveys · GIS mapping · Interviews" },
  { name: "image", label: "Picture (map, diagram or photo)", type: "image" },
  { name: "paper", label: "Link to paper / PDF", type: "text", hint: "optional — paste a link, or upload the PDF in any picture field and paste its address" },
];

export default function ResearchAdmin() {
  return (
    <>
      <AdminHeader title="Research" sub="Your research projects and studies." />
      <CollectionEditor
        file="research"
        title="Research items"
        intro="Each research item shows its status (like 'Ongoing' or 'Published'), a short abstract and a picture — a map or diagram works beautifully here."
        schema={SCHEMA}
        hasSlug
        listTitle={(r) => r.title || "(untitled)"}
        listSubtitle={(r) => `${r.status || ""} · ${r.year || ""}`}
        listImage={(r) => r.image}
        makeNew={() => ({ status: "Ongoing", year: "2026" })}
      />
    </>
  );
}
