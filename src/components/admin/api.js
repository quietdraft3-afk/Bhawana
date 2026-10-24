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

const MAX_UPLOAD = 4 * 1024 * 1024;

// Phone photos are often 5–10 MB. Shrink them before uploading so they load
// fast on the website and stay under the server's 4 MB upload limit.
async function shrinkImage(file) {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size < 1.5 * 1024 * 1024) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 2400 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff"; // JPEG has no transparency
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.85));
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" });
  } catch {
    return file;
  }
}

export async function uploadFile(original) {
  const file = await shrinkImage(original);
  if (file.size > MAX_UPLOAD) {
    throw new Error("File is too large (max 4 MB). Please use a smaller file and try again.");
  }
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || "Upload failed");
  return body.path;
}
