import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { getSite } from "@/lib/content";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Connect",
  description: "Get in touch with Bhawana Aryal — collaborations, research, competitions or a good conversation about cities.",
};

export default async function ConnectPage() {
  const site = await getSite();

  return (
    <>
      <section className="detail-hero">
        <div className="container">
          <Reveal>
            <p className="kicker">Say Namaste</p>
            <h1>Connect</h1>
            <p className="section-sub">
              For collaborations, research, competitions, speaking, or just a
              good conversation about streets and spaces — I'd love to hear from you.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container connect-grid">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={120}>
            <div className="social-rows">
              <a href={`mailto:${site.email}`}>
                <span>Email</span><span className="arrow">→</span>
              </a>
              <a href={site.linkedin} target="_blank" rel="noreferrer">
                <span>LinkedIn</span><span className="arrow">↗</span>
              </a>
              <a href={site.instagram} target="_blank" rel="noreferrer">
                <span>Instagram</span><span className="arrow">↗</span>
              </a>
              <a href={site.cvFile} download>
                <span>Download CV</span><span className="arrow">↓</span>
              </a>
            </div>
            <p className="muted" style={{ marginTop: 26, fontSize: 14 }}>
              Based in {site.location} · {site.phone}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
