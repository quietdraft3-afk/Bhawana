import Link from "next/link";

export default function ProjectCard({ project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="project-card">
      <div className="frame">
        {project.award && <span className="award-tag">Award Winner</span>}
        <img src={project.cover} alt={project.title} loading="lazy" />
      </div>
      <div className="meta">
        <h3>{project.title}</h3>
        <span className="year">{project.year}</span>
      </div>
      <p className="sub">
        {project.type} · {project.location}
      </p>
    </Link>
  );
}
