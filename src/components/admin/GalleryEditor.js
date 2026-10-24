"use client";

import { useRef, useState } from "react";
import { uploadFile } from "./api";

// Edits a list of pictures with captions. Add one or many at a time,
// move them up/down, change captions, remove.
export default function GalleryEditor({ value = [], onChange }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onFiles(e) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setBusy(true);
    setError("");
    try {
      const added = [];
      for (const f of files) {
        const path = await uploadFile(f);
        added.push({ src: path, caption: "" });
      }
      onChange([...value, ...added]);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  function update(i, patch) {
    const next = value.map((g, j) => (j === i ? { ...g, ...patch } : g));
    onChange(next);
  }

  function move(i, dir) {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  return (
    <div className="gallery-editor">
      {value.map((g, i) => (
        <div className="gallery-row" key={`${g.src}-${i}`}>
          <img src={g.src} alt="" />
          <input
            placeholder="Write a short caption for this picture (optional)"
            value={g.caption || ""}
            onChange={(e) => update(i, { caption: e.target.value })}
          />
          <button type="button" className="abtn" title="Move up" onClick={() => move(i, -1)}>↑</button>
          <button type="button" className="abtn" title="Move down" onClick={() => move(i, 1)}>↓</button>
          <button type="button" className="abtn danger" onClick={() => onChange(value.filter((_, j) => j !== i))}>
            Remove
          </button>
        </div>
      ))}
      <div>
        <button type="button" className="abtn" onClick={() => inputRef.current?.click()} disabled={busy}>
          {busy ? "Uploading…" : "📷 Add pictures"}
        </button>
        {error && <p style={{ color: "#a03123", fontSize: 13, marginTop: 6 }}>{error}</p>}
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={onFiles} />
    </div>
  );
}
