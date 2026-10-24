"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { loadCollection, saveCollection } from "@/components/admin/api";

// Edits two lists that live inside the profile: achievements and the
// journey timeline shown on the About page.
function ListSection({ title, intro, items, setItems, fields, labelOf }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  function startNew() { setForm({}); setEditing("new"); }
  function startEdit(i) { setForm({ ...items[i] }); setEditing(i); }
  function apply() {
    const next = editing === "new" ? [form, ...items] : items.map((it, i) => (i === editing ? form : it));
    setItems(next);
    setEditing(null);
  }
  function move(i, dir) {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    setItems(next);
  }

  return (
    <div className="admin-panel">
      <h2>{title}</h2>
      <div className="admin-help">{intro}</div>
      {editing !== null ? (
        <div className="admin-form">
          {fields.map((f) => (
            <div className="afield" key={f.name}>
              <label>{f.label}{f.hint && <span className="hint">{f.hint}</span>}</label>
              {f.type === "textarea" ? (
                <textarea value={form[f.name] || ""} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} />
              ) : (
                <input value={form[f.name] || ""} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} />
              )}
            </div>
          ))}
          <div style={{ display: "flex", gap: 10 }}>
            <button className="abtn primary" onClick={apply}>Done</button>
            <button className="abtn" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <button className="abtn primary" style={{ marginBottom: 14 }} onClick={startNew}>＋ Add new</button>
          {items.map((item, i) => (
            <div className="admin-list-item" key={i}>
              <div className="info">
                <div>
                  <div className="t">{labelOf(item)}</div>
                  <div className="s">{item.date || item.year || ""}</div>
                </div>
              </div>
              <div className="actions">
                <button className="abtn" onClick={() => move(i, -1)}>↑</button>
                <button className="abtn" onClick={() => move(i, 1)}>↓</button>
                <button className="abtn" onClick={() => startEdit(i)}>✏️ Edit</button>
                <button className="abtn danger" onClick={() => setItems(items.filter((_, j) => j !== i))}>Delete</button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default function AchievementsAdmin() {
  const [site, setSite] = useState(null);
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    loadCollection("site").then(setSite).catch((e) => setMsg({ kind: "err", text: e.message }));
  }, []);

  async function onSave() {
    setBusy(true);
    setMsg(null);
    try {
      await saveCollection("site", site);
      setMsg({ kind: "ok", text: "Saved! Changes are live." });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setMsg({ kind: "err", text: e.message });
    } finally {
      setBusy(false);
    }
  }

  if (!site) return (
    <>
      <AdminHeader title="Achievements & Timeline" sub="" />
      <p style={{ color: "#777" }}>{msg?.kind === "err" ? msg.text : "Loading…"}</p>
    </>
  );

  return (
    <>
      <AdminHeader title="Achievements & Timeline" sub="Awards, milestones and the journey timeline on the About page." />
      {msg && <div className={`msgbar ${msg.kind}`}>{msg.text}</div>}
      <ListSection
        title="Achievements & awards"
        intro="Awards, scholarships, competitions and recognitions."
        items={site.achievements || []}
        setItems={(items) => setSite({ ...site, achievements: items })}
        labelOf={(a) => a.title || "(untitled)"}
        fields={[
          { name: "title", label: "Title" },
          { name: "date", label: "Date", hint: "e.g. September 2025" },
          { name: "organization", label: "Organization" },
          { name: "text", label: "Description", type: "textarea" },
        ]}
      />
      <ListSection
        title="Journey timeline"
        intro="The step-by-step story on your About page, from first to latest."
        items={site.timeline || []}
        setItems={(items) => setSite({ ...site, timeline: items })}
        labelOf={(t) => t.title || "(untitled)"}
        fields={[
          { name: "year", label: "Year", hint: "e.g. 2023 or June 2025" },
          { name: "title", label: "Title" },
          { name: "text", label: "Description", type: "textarea" },
        ]}
      />
      <button className="abtn primary big" onClick={onSave} disabled={busy}>
        {busy ? "Saving…" : "💾 Save everything"}
      </button>
    </>
  );
}
