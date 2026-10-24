import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 24 }}>
      <div>
        <p className="kicker" style={{ justifyContent: "center" }}>404</p>
        <h1 style={{ fontSize: 40, marginBottom: 16 }}>This page wandered off the map.</h1>
        <p className="muted" style={{ marginBottom: 28 }}>
          The page you're looking for doesn't exist — but the rest of the site does.
        </p>
        <Link href="/" className="btn solid">Back home</Link>
      </div>
    </div>
  );
}
