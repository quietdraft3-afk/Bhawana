"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import CollectionEditor from "@/components/admin/CollectionEditor";

const SCHEMA = [
  { name: "src", label: "Photo", type: "image" },
  { name: "caption", label: "Caption", type: "text", hint: "a short line about this moment" },
  { name: "category", label: "Category", type: "select",
    options: ["Travel", "Events", "Fieldwork", "Hobbies", "Behind the scenes"] },
];

export default function LifeAdmin() {
  return (
    <>
      <AdminHeader title="Life Photos" sub="The photo diary — travel, events, hobbies and everyday moments." />
      <CollectionEditor
        file="life"
        title="Photos"
        intro="Each entry is one photo with a caption and a category. Visitors can filter by category on the Life page."
        schema={SCHEMA}
        listTitle={(i) => i.caption || "(no caption)"}
        listSubtitle={(i) => i.category || ""}
        listImage={(i) => i.src}
        makeNew={() => ({ category: "Travel" })}
      />
    </>
  );
}
