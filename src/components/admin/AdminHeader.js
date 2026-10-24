"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminHeader({ title, sub }) {
  const pathname = usePathname();
  const onDashboard = pathname === "/admin";

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <div className="admin-top">
      <div>
        <h1>{title}</h1>
        <p className="crumbs">
          {!onDashboard && <><Link href="/admin">← Back to dashboard</Link> · </>}
          {sub}
        </p>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <a className="abtn" href="/" target="_blank">👁 View website</a>
        <button className="abtn" onClick={logout}>Log out</button>
      </div>
    </div>
  );
}
