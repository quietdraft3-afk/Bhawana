import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { getSite } from "@/lib/content";
import { renderBlocks } from "@/lib/text";

export const dynamic = "force-dynamic";
export const metadata = { title: "My Journey" };

export default async function AboutPage() {
  const site = await getSite();

  return (
    <>
      <section className="detail-hero">
        <div className="container">
          <Reveal>
            <p className="kicker">About / My Journey</p>
            <h1>
              Architecture found me in the <em className="accent italic">small spaces</em>{" "}
              that bring people together.
            </h1>
            <p className="section-sub" style={{ maxWidth: 720 }}>{site.aboutIntro}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 64, alignItems: "start" }}>
          <Reveal>
            <figure className="hero-figure" style={{ maxWidth: 420 }}>
              <img src={site.heroImage} alt={`Portrait of ${site.name}`} />
              <figcaption>{site.location}</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={120}>
            <div className="prose">
              <div className="concept-block">“{site.philosophy}”</div>
              {renderBlocks(site.aboutBody).map((b, i) =>
                b.type === "heading" ? <h2 key={i}>{b.text}</h2>
                : b.type === "list" ? <ul key={i}>{b.items.map((li, j) => <li key={j}>{li}</li>)}</ul>
                : <p key={i}>{b.text}</p>
              )}
              <a href={site.cvFile} className="btn" download style={{ marginTop: 10 }}>
                Download CV <span className="arrow">↓</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading index="01" kicker="The Path So Far" title="An animated timeline of the journey" />
          <div className="timeline">
            {site.timeline.map((t, i) => (
              <Reveal key={i} delay={i * 60} className="timeline-item">
                <span className="year">{t.year}</span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading index="02" kicker="Recognition" title="Achievements & milestones" />
          <div className="ach-list">
            {site.achievements.map((a, i) => (
              <Reveal key={i} delay={i * 50} className="ach-item">
                <span className="when">{a.date}</span>
                <div>
                  <h3>{a.title}</h3>
                  <p className="org">{a.organization}</p>
                  <p>{a.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading index="03" kicker="Toolbox" title="Skills & tools" />
          <Reveal className="skill-tags">
            {site.skills.map((s) => <span key={s}>{s}</span>)}
          </Reveal>
          <Reveal delay={100}>
            <p className="muted" style={{ marginTop: 26, fontFamily: "var(--serif)", fontStyle: "italic" }}>
              Languages — {site.languages.join(" · ")}
            </p>
          </Reveal>
        </div>
      </section>

      <style>{`@media (max-width: 900px){ .section .container[style*="grid-template-columns"]{ display:block !important; } .section .container[style*="grid-template-columns"] > :first-child{ margin-bottom:40px; } }`}</style>
    </>
  );
}
