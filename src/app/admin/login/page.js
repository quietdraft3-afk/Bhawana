"use client";

import { useState } from "react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Login failed");
      }
      window.location.href = "/admin";
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <div className="admin-shell">
      <form className="login-box" onSubmit={onSubmit}>
        <h1>Welcome back 👋</h1>
        <p>Enter your password to update the website.</p>
        <div className="afield">
          <label htmlFor="pw">Password</label>
          <input
            id="pw"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
        </div>
        {error && <p style={{ color: "#a03123", fontSize: 14, marginTop: 10 }}>{error}</p>}
        <button className="abtn primary big" style={{ marginTop: 18, width: "100%" }} disabled={busy}>
          {busy ? "Checking…" : "Log in"}
        </button>
      </form>
    </div>
  );
}
