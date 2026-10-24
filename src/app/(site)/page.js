import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import JournalCard from "@/components/JournalCard";
import { getSite, getProjects, getJournal, getResearch, getLife } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [site, projects, journal, research, life] = await Promise.all([
    getSite(),
    getProjects(),
    getJournal(),
    getResearch(),
    getLife(),
  ]);

  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const latestPosts = journal.slice(0, 3);
  const lifeStrip = life.slice(0, 3);

  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="hero">
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="container hero-inner">
          <div>
            <Reveal>
              <p className="hero-greeting">{site.heroGreeting}</p>
              <h1>
                Designing spaces where <em className="accent italic">people</em>{" "}
                live &amp; connect.
              </h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="hero-statement">{site.heroStatement}</p>
              <div className="hero-ctas">
                <Link href="/projects" className="btn solid">
                  Explore my work <span className="arrow">→</span>
                </Link>
                <Link href="/about" className="btn">
                  My journey
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={250}>
            <figure className="hero-figure">
              <img src={site.heroImage} alt={`Portrait of ${site.name}`} />
              <figcaption>{site.tagline}</figcaption>
            </figure>
          </Reveal>
        </div>
        <span className="hero-scroll">scroll</span>
      </section>

      {/* ---------- quick stats ---------- */}
      <section style={{ padding: "0 0 40px" }}>
        <div className="container">
          <Reveal className="stats">
            <div className="stat">
              <div className="num">1st</div>
              <div className="lbl">Cities for Women Int'l Competition</div>
            </div>
            <div className="stat">
              <div className="num">{projects.length}+</div>
              <div className="lbl">Selected Projects</div>
            </div>
            <div className="stat">
              <div className="num">{research.length}</div>
              <div className="lbl">Research Studies</div>
            </div>
            <div className="stat">
              <div className="num">2026</div>
              <div className="lbl">USYC Cohort Member</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- featured projects ---------- */}
      <section className="section">
        <div className="container">
          <SectionHeading index="01" kicker="Selected Works" title="Featured projects"
            sub="Architecture and urban design work — from an award-winning public park to a thesis retreat in the hills of Kakani." />
          <div className="project-grid">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div style={{ marginTop: 44 }}>
              <Link href="/projects" className="btn">
                All projects <span className="arrow">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- research ---------- */}
      <section className="section">
        <div className="container">
          <SectionHeading index="02" kicker="Current Curiosities" title="Research in motion"
            sub="Cities, settlements and the 15-minute life — questions I am currently exploring in the field." />
          {research.slice(0, 2).map((r, i) => (
            <Reveal key={r.slug} delay={i * 80} className="research-item">
              <div className="frame">
                <img src={r.image} alt={r.title} loading="lazy" />
              </div>
              <div>
                <span className="status-pill">{r.status}</span>
                <h3>{r.title}</h3>
                <p className="muted">{r.abstract}</p>
              </div>
            </Reveal>
          ))}
          <Reveal>
            <div style={{ marginTop: 40 }}>
              <Link href="/research" className="btn">
                All research <span className="arrow">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- USYC band ---------- */}
      <section className="band">
        <div className="container band-inner">
          <Reveal>
            <p className="kicker">Currently</p>
            <h2>{site.usyc.title}</h2>
            <p>{site.usyc.text}</p>
            <div style={{ marginTop: 28 }}>
              <Link href="/journal" className="btn accent">
                Follow the journey <span className="arrow">→</span>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <img src={site.usyc.image} alt={site.usyc.title} loading="lazy" />
          </Reveal>
        </div>
      </section>

      {/* ---------- journal ---------- */}
      <section className="section">
        <div className="container">
          <SectionHeading index="03" kicker="From the Journal" title="Latest writing"
            sub="Reflections, travel notes, photo stories and updates — the in-between things that shape how I see spaces." />
          <div className="journal-list">
            {latestPosts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <JournalCard post={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- life strip ---------- */}
      <section className="section">
        <div className="container">
          <SectionHeading index="04" kicker="Beyond the Drafting Table" title="Life, lately"
            sub="Travel, fieldwork, events and small moments." />
          <div className="masonry">
            {lifeStrip.map((item, i) => (
              <Reveal key={i} delay={i * 80} as="figure">
                <img src={item.src} alt={item.caption} loading="lazy" />
                <figcaption>
                  <span className="cat">{item.category}</span>
                  {item.caption}
                </figcaption>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div style={{ marginTop: 30 }}>
              <Link href="/life" className="btn">
                More of life <span className="arrow">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- connect CTA ---------- */}
      <section className="section" style={{ textAlign: "center" }}>
        <div className="container">
          <Reveal>
            <p className="kicker" style={{ justifyContent: "center" }}>Say Namaste</p>
            <h2 className="section-title">Let's build something together.</h2>
            <p className="section-sub" style={{ margin: "0 auto 36px" }}>
              For collaborations, research, competitions or just a good
              conversation about cities — my inbox is open.
            </p>
            <Link href="/connect" className="btn solid">
              Get in touch <span className="arrow">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
