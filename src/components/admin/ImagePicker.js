"use client";

import { useRef, useState } from "react";
import { uploadFile } from "./api";

// A picture field: shows the current picture and a "Choose picture" button.
export default function ImagePicker({ value, onChange, label = "Choose picture" }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const path = await uploadFile(file);
      onChange(path);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  return (
    <div className="img-picker">
      {value ? (
        <img src={value} alt="Current" />
      ) : (
        <div className="none">no picture yet</div>
      )}
      <div>
        <button type="button" className="abtn" onClick={() => inputRef.current?.click()} disabled={busy}>
          {busy ? "Uploading…" : `📷 ${label}`}
        </button>
        {value && (
          <button type="button" className="abtn danger" style={{ marginLeft: 8 }} onClick={() => onChange("")}>
            Remove
          </button>
        )}
        {error && <p style={{ color: "#a03123", fontSize: 13, marginTop: 6 }}>{error}</p>}
      </div>
      <input ref={inputRef} type="file" accept="image/*,.pdf" hidden onChange={onFile} />
    </div>
  );
}
