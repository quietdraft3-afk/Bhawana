"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import ImagePicker from "@/components/admin/ImagePicker";
import { loadCollection, saveCollection } from "@/components/admin/api";

const FIELDS = [
  { name: "name", label: "Your name", type: "text" },
  { name: "tagline", label: "Tagline", type: "text", hint: "the short line under your photo" },
  { name: "heroGreeting", label: "Home page greeting", type: "text" },
  { name: "heroStatement", label: "Home page intro sentence", type: "textarea" },
  { name: "heroImage", label: "Your portrait photo", type: "image" },
  { name: "shortBio", label: "Short bio", type: "textarea" },
  { name: "aboutIntro", label: "About page — opening paragraph", type: "textarea" },
  { name: "aboutBody", label: "About page — your story", type: "tall", hint: "Leave an empty line between paragraphs" },
  { name: "philosophy", label: "Your philosophy quote", type: "textarea" },
  { name: "email", label: "Email", type: "text", half: true },
  { name: "phone", label: "Phone", type: "text", half: true },
  { name: "location", label: "Location", type: "text" },
  { name: "linkedin", label: "LinkedIn link", type: "text", half: true },
  { name: "instagram", label: "Instagram link", type: "text", half: true },
  { name: "cvFile", label: "Your CV (PDF)", type: "image" },
  { name: "skills", label: "Skills & tools", type: "tags", hint: "separated by commas" },
  { name: "languages", label: "Languages", type: "tags", hint: "separated by commas" },
];

const USYC_FIELDS = [
  { name: "title", label: "Current activity title", type: "text" },
  { name: "text", label: "Description", type: "textarea" },
  { name: "image", label: "Picture", type: "image" },
];

export default function AboutAdmin() {
  const [site, setSite] = useState(null);
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    loadCollection("site").then(setSite).catch((e) => setMsg({ kind: "err", text: e.message }));
  }, []);

  function setField(name, value) {
    setSite((s) => ({ ...s, [name]: value }));
  }
  function setUsyc(name, value) {
    setSite((s) => ({ ...s, usyc: { ...s.usyc, [name]: value } }));
  }

  async function onSave() {
    setBusy(true);
    setMsg(null);
    try {
      await saveCollection("site", site);
      setMsg({ kind: "ok", text: "Saved! Your profile is updated on the website." });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setMsg({ kind: "err", text: e.message });
    } finally {
      setBusy(false);
    }
  }

  function render(f, value, setter) {
    switch (f.type) {
      case "textarea":
      case "tall":
        return <textarea className={f.type === "tall" ? "tall" : ""} value={value || ""} onChange={(e) => setter(f.name, e.target.value)} />;
      case "image":
        return <ImagePicker value={value || ""} onChange={(p) => setter(f.name, p)} />;
      case "tags":
        return (
          <input
            value={Array.isArray(value) ? value.join(", ") : value || ""}
            onChange={(e) => setter(f.name, e.target.value.split(",").map((t) => t.trim()).filter(Boolean))}
          />
        );
      default:
        return <input value={value || ""} onChange={(e) => setter(f.name, e.target.value)} />;
    }
  }

  if (!site) return (
    <>
      <AdminHeader title="About & Profile" sub="" />
      <p style={{ color: "#777" }}>{msg?.kind === "err" ? msg.text : "Loading…"}</p>
    </>
  );

  return (
    <>
      <AdminHeader title="About & Profile" sub="Your introduction, bio, photo, contact links and CV." />
      {msg && <div className={`msgbar ${msg.kind}`}>{msg.text}</div>}
      <div className="admin-panel">
        <h2>Profile & about</h2>
        <div className="admin-form">
          {FIELDS.map((f) => (
            <div className="afield" key={f.name}>
              <label>{f.label}{f.hint && <span className="hint">{f.hint}</span>}</label>
              {render(f, site[f.name], setField)}
            </div>
          ))}
        </div>
      </div>
      <div className="admin-panel">
        <h2>Current activity (shown on the home page)</h2>
        <div className="admin-form">
          {USYC_FIELDS.map((f) => (
            <div className="afield" key={f.name}>
              <label>{f.label}</label>
              {render(f, site.usyc?.[f.name], setUsyc)}
            </div>
          ))}
        </div>
      </div>
      <button className="abtn primary big" onClick={onSave} disabled={busy}>
        {busy ? "Saving…" : "💾 Save everything"}
      </button>
    </>
  );
}
