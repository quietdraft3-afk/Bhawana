"use client";

export async function loadCollection(file) {
  const res = await fetch(`/api/admin/content?file=${file}`);
  if (res.status === 401) {
    window.location.href = "/admin/login";
    throw new Error("Not logged in");
  }
  if (!res.ok) throw new Error("Could not load content");
  return res.json();
}

export async function saveCollection(file, data) {
  const res = await fetch("/api/admin/content", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ file, data }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Could not save");
  }
  return res.json();
}

export async function uploadFile(file) {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || "Upload failed");
  return body.path;
}
