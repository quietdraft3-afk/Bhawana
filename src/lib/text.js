// Tiny text renderer: blank lines split paragraphs, "## " starts a heading,
// "- " starts a list item. Enough structure for journal posts and project
// descriptions without asking a beginner to learn Markdown.
export function renderBlocks(text) {
  if (!text) return [];
  const blocks = [];
  const chunks = text.replace(/\r\n/g, "\n").split(/\n\s*\n/);
  for (const chunk of chunks) {
    const lines = chunk.split("\n").filter((l) => l.trim() !== "");
    if (lines.length === 0) continue;
    if (lines.every((l) => l.trim().startsWith("- "))) {
      blocks.push({ type: "list", items: lines.map((l) => l.trim().slice(2)) });
    } else if (lines[0].startsWith("## ")) {
      blocks.push({ type: "heading", text: lines[0].slice(3) });
      const rest = lines.slice(1).join(" ");
      if (rest.trim()) blocks.push({ type: "p", text: rest });
    } else {
      blocks.push({ type: "p", text: lines.join(" ") });
    }
  }
  return blocks;
}

export function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d)) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export function slugify(text) {
  return (text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
