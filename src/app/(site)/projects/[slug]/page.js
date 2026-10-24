import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { getProjects, getProject } from "@/lib/content";
import { renderBlocks } from "@/lib/text";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary, images: [project.cover] },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const [project, all] = await Promise.all([getProject(slug), getProjects()]);
  if (!project) notFound();

  const idx = all.findIndex((p) => p.slug === slug);
  const prev = all[(idx - 1 + all.length) % all.length];
  const next = all[(idx + 1) % all.length];

  return (
    <>
      <section className="detail-hero">
        <div className="container">
          <Reveal>
            <p className="kicker">
              {String(idx + 1).padStart(2, "0")} / {project.type}
            </p>
            <h1>{project.title}</h1>
            <p className="section-sub" style={{ maxWidth: 760 }}>{project.summary}</p>
            {project.award && <div className="award-banner">🏆 {project.award}</div>}
            <div className="detail-facts">
              <div className="fact"><div className="label">Year</div><div className="value">{project.year}</div></div>
              <div className="fact"><div className="label">Location</div><div className="value">{project.location}</div></div>
              <div className="fact"><div className="label">Category</div><div className="value">{project.category}</div></div>
              <div className="fact"><div className="label">Type</div><div className="value">{project.type}</div></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div style={{ border: "1px solid var(--line-dark)" }}>
              <img src={project.cover} alt={project.title} style={{ width: "100%" }} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <p className="kicker">Concept</p>
            <div className="concept-block">{project.concept}</div>
          </Reveal>
          <Reveal delay={80}>
            <div className="prose">
              {renderBlocks(project.body).map((b, i) =>
                b.type === "heading" ? <h2 key={i}>{b.text}</h2>
                : b.type === "list" ? <ul key={i}>{b.items.map((li, j) => <li key={j}>{li}</li>)}</ul>
                : <p key={i}>{b.text}</p>
              )}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="detail-facts" style={{ maxWidth: 860 }}>
              <div className="fact" style={{ flex: "1 1 300px" }}>
                <div className="label">My role</div>
                <div className="value">{project.role}</div>
              </div>
              <div className="fact" style={{ flex: "1 1 300px" }}>
                <div className="label">Collaborators</div>
                <div className="value">{project.collaborators}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {project.gallery?.length > 0 && (
        <section className="section">
          <div className="container">
            <Reveal>
              <p className="kicker">Drawings & Visualisations</p>
            </Reveal>
            <div className="gallery-stack">
              {project.gallery.map((g, i) => (
                <Reveal key={i} as="figure" delay={40}>
                  <img src={g.src} alt={g.caption || project.title} loading="lazy" />
                  {g.caption && <figcaption>{g.caption}</figcaption>}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ paddingBottom: 90 }}>
        <div className="container">
          <div className="prev-next">
            <Link href={`/projects/${prev.slug}`}>
              <div className="dir">← Previous</div>
              <div className="name">{prev.title}</div>
            </Link>
            <Link href={`/projects/${next.slug}`} style={{ textAlign: "right" }}>
              <div className="dir">Next →</div>
              <div className="name">{next.title}</div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
