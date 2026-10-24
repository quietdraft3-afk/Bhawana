import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";

const CARDS = [
  { href: "/admin/projects", emoji: "🏛", title: "Projects", text: "Add or edit portfolio projects, pictures and descriptions." },
  { href: "/admin/journal", emoji: "✍️", title: "Journal / Blog", text: "Write new posts, add photos, travel stories and updates." },
  { href: "/admin/research", emoji: "🔬", title: "Research", text: "Add research studies, update their status and abstracts." },
  { href: "/admin/life", emoji: "📸", title: "Life Photos", text: "Upload photos of travel, events and everyday moments." },
  { href: "/admin/map", emoji: "🗺", title: "Map Locations", text: "Add pins to the interactive map." },
  { href: "/admin/about", emoji: "👤", title: "About & Profile", text: "Update your intro, bio, contact links and CV." },
  { href: "/admin/achievements", emoji: "🏆", title: "Achievements", text: "Add awards, milestones and timeline entries." },
  { href: "/admin/messages", emoji: "📥", title: "Messages", text: "Read messages sent through the contact form." },
];

export default function AdminDashboard() {
  return (
    <>
      <AdminHeader title="Website Dashboard" sub="Choose what you want to update. Changes go live as soon as you press Save." />
      <div className="admin-help">
        💡 <strong>How it works:</strong> pick a section below, then use <em>Add new</em> or <em>Edit</em>.
        Every form has a Save button — nothing changes on the website until you press it.
        Pictures can be uploaded straight from your phone or computer.
      </div>
      <div className="admin-cards">
        {CARDS.map((c) => (
          <Link key={c.href} href={c.href} className="admin-card">
            <span className="emoji">{c.emoji}</span>
            <h2>{c.title}</h2>
            <p>{c.text}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
