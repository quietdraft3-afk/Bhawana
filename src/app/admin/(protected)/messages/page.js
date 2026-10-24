"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { loadCollection, saveCollection } from "@/components/admin/api";

export default function MessagesAdmin() {
  const [data, setData] = useState(null);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    loadCollection("messages").then(setData).catch((e) => setMsg({ kind: "err", text: e.message }));
  }, []);

  async function remove(i) {
    if (!window.confirm("Delete this message?")) return;
    const next = { ...data, items: data.items.filter((_, j) => j !== i) };
    try {
      await saveCollection("messages", next);
      setData(next);
    } catch (e) {
      setMsg({ kind: "err", text: e.message });
    }
  }

  const items = data?.items || [];

  return (
    <>
      <AdminHeader title="Messages" sub="Messages sent through the contact form on your website." />
      {msg && <div className={`msgbar ${msg.kind}`}>{msg.text}</div>}
      {!data ? (
        <p style={{ color: "#777" }}>Loading…</p>
      ) : items.length === 0 ? (
        <p style={{ color: "#777" }}>No messages yet. When someone writes to you through the website, it will appear here.</p>
      ) : (
        items.map((m, i) => (
          <div className="admin-panel" key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <div>
                <strong>{m.name}</strong>{" "}
                <a href={`mailto:${m.email}`} style={{ color: "#b0512e" }}>{m.email}</a>
                <div style={{ fontSize: 12.5, color: "#888", marginTop: 2 }}>
                  {new Date(m.date).toLocaleString()}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <a className="abtn" href={`mailto:${m.email}?subject=Re: your message on bhawana-aryal.com`}>↩ Reply by email</a>
                <button className="abtn danger" onClick={() => remove(i)}>Delete</button>
              </div>
            </div>
            <p style={{ marginTop: 14, whiteSpace: "pre-wrap" }}>{m.message}</p>
          </div>
        ))
      )}
    </>
  );
}
