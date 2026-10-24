"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadCollection, saveCollection } from "./api";
import ImagePicker from "./ImagePicker";
import GalleryEditor from "./GalleryEditor";

function slugify(text) {
  return (text || "")
    .toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * A reusable "list of things" editor: shows all items, lets you add,
 * edit, reorder and delete them with a simple form.
 *
 * schema: [{ name, label, type, hint, options, half }]
 * types: text | textarea | tall | date | number | image | gallery | tags | select | checkbox
 */
export default function CollectionEditor({
  file,
  title,
  intro,
  schema,
  listTitle = (item) => item.title,
  listSubtitle = () => "",
  listImage = null,
  makeNew = () => ({}),
  hasSlug = false,
}) {
  const [data, setData] = useState(null);
  const [editing, setEditing] = useState(null); // index or "new"
  const [form, setForm] = useState({});
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    loadCollection(file).then(setData).catch((e) => setMsg({ kind: "err", text: e.message }));
  }, [file]);

  const items = data?.items || [];

  function startEdit(i) {
    setForm(JSON.parse(JSON.stringify(items[i])));
    setEditing(i);
    setMsg(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startNew() {
    setForm(makeNew());
    setEditing("new");
    setMsg(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function persist(nextItems, okText) {
    setBusy(true);
    setMsg(null);
    try {
      const nextData = { ...data, items: nextItems };
      await saveCollection(file, nextData);
      setData(nextData);
      setMsg({ kind: "ok", text: okText });
      setEditing(null);
    } catch (e) {
      setMsg({ kind: "err", text: e.message });
    } finally {
      setBusy(false);
    }
  }

  async function onSave() {
    const item = { ...form };
    if (hasSlug) {
      if (!item.slug) item.slug = slugify(item.title);
      if (!item.slug) {
        setMsg({ kind: "err", text: "Please give this item a title first." });
        return;
      }
      const clash = items.some((it, i) => it.slug === item.slug && i !== editing);
      if (clash) item.slug = `${item.slug}-${Date.now() % 1000}`;
    }
    const next = editing === "new"
      ? [item, ...items]
      : items.map((it, i) => (i === editing ? item : it));
    await persist(next, "Saved! Your changes are now live on the website.");
  }

  async function onDelete(i) {
    if (!window.confirm(`Delete "${listTitle(items[i])}"? This cannot be undone.`)) return;
    await persist(items.filter((_, j) => j !== i), "Deleted.");
  }

  async function onMove(i, dir) {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    await persist(next, "Order updated.");
  }

  function setField(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  function renderField(f) {
    const v = form[f.name];
    switch (f.type) {
      case "textarea":
      case "tall":
        return (
          <textarea
            className={f.type === "tall" ? "tall" : ""}
            value={v || ""}
            onChange={(e) => setField(f.name, e.target.value)}
            placeholder={f.placeholder || ""}
          />
        );
      case "image":
        return <ImagePicker value={v || ""} onChange={(p) => setField(f.name, p)} />;
      case "gallery":
        return <GalleryEditor value={v || []} onChange={(g) => setField(f.name, g)} />;
      case "tags":
        return (
          <input
            value={Array.isArray(v) ? v.join(", ") : v || ""}
            onChange={(e) =>
              setField(f.name, e.target.value.split(",").map((t) => t.trim()).filter(Boolean))
            }
            placeholder="word, another word, third word"
          />
        );
      case "select":
        return (
          <select value={v || ""} onChange={(e) => setField(f.name, e.target.value)}>
            {(f.options || []).map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        );
      case "checkbox":
        return (
          <label style={{ display: "flex", gap: 10, alignItems: "center", fontWeight: 400 }}>
            <input
              type="checkbox"
              style={{ width: "auto" }}
              checked={!!v}
              onChange={(e) => setField(f.name, e.target.checked)}
            />
            {f.checkboxLabel || "Yes"}
          </label>
        );
      case "number":
        return (
          <input
            type="number"
            step="any"
            value={v ?? ""}
            onChange={(e) => setField(f.name, e.target.value === "" ? "" : Number(e.target.value))}
          />
        );
      case "date":
        return <input type="date" value={v || ""} onChange={(e) => setField(f.name, e.target.value)} />;
      default:
        return (
          <input value={v || ""} onChange={(e) => setField(f.name, e.target.value)} placeholder={f.placeholder || ""} />
        );
    }
  }

  if (!data) {
    return <p style={{ color: "#777" }}>{msg?.kind === "err" ? msg.text : "Loading…"}</p>;
  }

  return (
    <div>
      {msg && <div className={`msgbar ${msg.kind}`}>{msg.text}</div>}

      {editing !== null ? (
        <div className="admin-panel">
          <h2>{editing === "new" ? `Add a new ${title.slice(0, -1).toLowerCase() || "item"}` : `Edit: ${listTitle(form) || ""}`}</h2>
          <div className="admin-form">
            {schema.reduce((rows, f) => {
              if (f.half && rows.length && rows[rows.length - 1].length === 1 && rows[rows.length - 1][0].half) {
                rows[rows.length - 1].push(f);
              } else {
                rows.push([f]);
              }
              return rows;
            }, []).map((row, ri) =>
              row.length === 2 ? (
                <div className="row2" key={ri}>
                  {row.map((f) => (
                    <div className="afield" key={f.name}>
                      <label>{f.label}{f.hint && <span className="hint">{f.hint}</span>}</label>
                      {renderField(f)}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="afield" key={row[0].name}>
                  <label>{row[0].label}{row[0].hint && <span className="hint">{row[0].hint}</span>}</label>
                  {renderField(row[0])}
                </div>
              )
            )}
            <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
              <button className="abtn primary big" onClick={onSave} disabled={busy}>
                {busy ? "Saving…" : "💾 Save"}
              </button>
              <button className="abtn big" onClick={() => { setEditing(null); setMsg(null); }} disabled={busy}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {intro && <div className="admin-help">{intro}</div>}
          <div style={{ marginBottom: 18 }}>
            <button className="abtn primary big" onClick={startNew}>＋ Add new</button>
          </div>
          {items.length === 0 && <p style={{ color: "#777" }}>Nothing here yet — click "Add new" to create the first one.</p>}
          {items.map((item, i) => (
            <div className="admin-list-item" key={i}>
              <div className="info">
                {listImage && (listImage(item) ? <img src={listImage(item)} alt="" /> : <div style={{ width: 66 }} />)}
                <div style={{ minWidth: 0 }}>
                  <div className="t">{listTitle(item)}</div>
                  <div className="s">{listSubtitle(item)}</div>
                </div>
              </div>
              <div className="actions">
                <button className="abtn" title="Move up" onClick={() => onMove(i, -1)}>↑</button>
                <button className="abtn" title="Move down" onClick={() => onMove(i, 1)}>↓</button>
                <button className="abtn" onClick={() => startEdit(i)}>✏️ Edit</button>
                <button className="abtn danger" onClick={() => onDelete(i)}>Delete</button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
