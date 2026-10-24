import Link from "next/link";

export default function Footer({ site }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="sig">
              Bhawana <em>Aryal</em>
            </div>
            <p className="muted" style={{ maxWidth: 340, fontSize: 14, marginTop: 10 }}>
              Architect &amp; urban design researcher — designing spaces where
              people live and connect.
            </p>
          </div>
          <div className="footer-links">
            <Link href="/about">My Journey</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/research">Research</Link>
            <Link href="/journal">Journal</Link>
            <Link href="/life">Life</Link>
            <Link href="/map">Map</Link>
            <Link href="/connect">Connect</Link>
          </div>
        </div>
        <div className="fine">
          <span>© {new Date().getFullYear()} Bhawana Aryal · Kathmandu, Nepal</span>
          <span>
            <a className="text-link" href={site?.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            {" · "}
            <a className="text-link" href={site?.instagram} target="_blank" rel="noreferrer">Instagram</a>
            {" · "}
            <a className="text-link" href={`mailto:${site?.email}`}>Email</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
