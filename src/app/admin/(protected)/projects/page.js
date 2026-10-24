"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import CollectionEditor from "@/components/admin/CollectionEditor";

const SCHEMA = [
  { name: "title", label: "Project title", type: "text" },
  { name: "year", label: "Year", type: "text", half: true },
  { name: "location", label: "Location", type: "text", half: true },
  { name: "type", label: "Project type", type: "text", hint: "e.g. Thesis Project, Competition, Design Studio", half: true },
  { name: "category", label: "Category", type: "text", hint: "e.g. Housing, Urban Park", half: true },
  { name: "featured", label: "Show on home page?", type: "checkbox", checkboxLabel: "Yes, feature this project on the home page" },
  { name: "award", label: "Award", type: "text", hint: "leave empty if none" },
  { name: "collaborators", label: "Collaborators", type: "text" },
  { name: "role", label: "Your role", type: "textarea" },
  { name: "summary", label: "Short summary", type: "textarea", hint: "1–2 sentences shown on cards and at the top of the page" },
  { name: "concept", label: "Concept statement", type: "textarea" },
  { name: "body", label: "Full description", type: "tall", hint: "Leave an empty line between paragraphs. Start a line with '## ' for a heading." },
  { name: "cover", label: "Cover picture", type: "image" },
  { name: "gallery", label: "Project gallery (drawings, renders, photos)", type: "gallery" },
  { name: "tags", label: "Tags", type: "tags", hint: "separated by commas" },
];

export default function ProjectsAdmin() {
  return (
    <>
      <AdminHeader title="Projects" sub="Your portfolio projects, in the order they appear on the website." />
      <CollectionEditor
        file="projects"
        title="Projects"
        intro="Each project gets its own page on the website. The cover picture is what people see first — use your best render or photo. Use ↑ and ↓ to change the order."
        schema={SCHEMA}
        hasSlug
        listTitle={(p) => p.title || "(untitled)"}
        listSubtitle={(p) => `${p.type || ""} · ${p.year || ""}${p.featured ? " · ⭐ on home page" : ""}`}
        listImage={(p) => p.cover}
        makeNew={() => ({ featured: false, gallery: [], tags: [], year: "2026" })}
      />
    </>
  );
}
