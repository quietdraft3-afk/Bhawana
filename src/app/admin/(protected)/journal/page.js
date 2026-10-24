"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import CollectionEditor from "@/components/admin/CollectionEditor";

const SCHEMA = [
  { name: "title", label: "Post title", type: "text" },
  { name: "date", label: "Date", type: "date", half: true },
  { name: "category", label: "Category", type: "select", half: true,
    options: ["Personal", "Travel", "Architecture", "Research", "Events", "USYC", "Photo Story"] },
  { name: "cover", label: "Cover picture", type: "image" },
  { name: "excerpt", label: "Short teaser", type: "textarea", hint: "1–2 sentences shown on the journal page" },
  { name: "body", label: "Your story", type: "tall", hint: "Leave an empty line between paragraphs. Start a line with '## ' for a heading, or '- ' for a bullet point." },
  { name: "gallery", label: "Photos for this post", type: "gallery" },
  { name: "video", label: "Video link", type: "text", hint: "optional — paste a YouTube embed link like https://www.youtube.com/embed/XXXX" },
  { name: "tags", label: "Tags", type: "tags", hint: "separated by commas" },
];

export default function JournalAdmin() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <>
      <AdminHeader title="Journal / Blog" sub="Write and publish posts — travel notes, reflections, photo stories." />
      <CollectionEditor
        file="journal"
        title="Posts"
        intro="Write like you're telling a friend about it. Add a nice cover picture, write your story, add photos below it — then press Save and it'll be live in about a minute."
        schema={SCHEMA}
        hasSlug
        listTitle={(p) => p.title || "(untitled)"}
        listSubtitle={(p) => `${p.category || ""} · ${p.date || ""}`}
        listImage={(p) => p.cover}
        makeNew={() => ({ date: today, category: "Personal", gallery: [], tags: [] })}
      />
    </>
  );
}
