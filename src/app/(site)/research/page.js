import Reveal from "@/components/Reveal";
import { getResearch } from "@/lib/content";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Research",
  description: "Urban research by Bhawana Aryal — 15-minute cities, settlement patterns, accessibility and public space.",
};

export default async function ResearchPage() {
  const research = await getResearch();

  return (
    <>
      <section className="detail-hero">
        <div className="container">
          <Reveal>
            <p className="kicker">Asking Better Questions</p>
            <h1>Research</h1>
            <p className="section-sub">
              Urban planning and design research — settlement patterns,
              accessibility, mobility, land use and the 15-minute city. Fieldwork
              first; maps, diagrams and patient observation.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container">
          {research.map((r, i) => (
            <Reveal key={r.slug} delay={i * 60} className="research-item">
              <div className="frame">
                <img src={r.image} alt={r.title} loading="lazy" />
              </div>
              <div>
                <span className="status-pill">{r.status}</span>
                <h3>{r.title}</h3>
                <p className="muted">{r.abstract}</p>
                <p className="methods">Methods — {r.methods}</p>
                {r.collaborators && <p className="methods">With — {r.collaborators}</p>}
                {r.paper && (
                  <p style={{ marginTop: 14 }}>
                    <a className="text-link" href={r.paper} target="_blank" rel="noreferrer">
                      Read the paper →
                    </a>
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
