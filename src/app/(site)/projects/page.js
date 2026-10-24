import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/lib/content";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Projects",
  description: "Architecture and urban design projects by Bhawana Aryal — parks, housing, streetscapes and thesis work.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <section className="detail-hero">
        <div className="container">
          <Reveal>
            <p className="kicker">Selected Works</p>
            <h1>Projects</h1>
            <p className="section-sub">
              Architecture, urban design, housing and streetscapes — each
              project begins with the people who will live in it.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="project-grid">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 90}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
