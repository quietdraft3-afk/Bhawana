"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("idle");

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="cf-name">Your name</label>
        <input id="cf-name" name="name" required maxLength={120} />
      </div>
      <div className="field">
        <label htmlFor="cf-email">Your email</label>
        <input id="cf-email" name="email" type="email" required maxLength={200} />
      </div>
      <div className="field">
        <label htmlFor="cf-message">Message</label>
        <textarea id="cf-message" name="message" rows={6} required maxLength={4000} />
      </div>
      <div>
        <button className="btn solid" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"} <span className="arrow">→</span>
        </button>
      </div>
      {status === "sent" && (
        <p className="form-note">Thank you! Your message has been received — I'll reply soon.</p>
      )}
      {status === "error" && (
        <p className="form-note" style={{ color: "#a03123" }}>
          Something went wrong — please try again, or email me directly.
        </p>
      )}
    </form>
  );
}
