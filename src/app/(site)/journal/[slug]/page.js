import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { getPost, getJournal } from "@/lib/content";
import { renderBlocks, formatDate } from "@/lib/text";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [post.cover] },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const others = (await getJournal()).filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <section className="detail-hero">
        <div className="container">
          <Reveal>
            <p className="kicker">
              {post.category} · {formatDate(post.date)}
            </p>
            <h1 style={{ maxWidth: 840 }}>{post.title}</h1>
            {post.tags?.length > 0 && (
              <p className="muted" style={{ fontFamily: "var(--serif)", fontStyle: "italic" }}>
                {post.tags.map((t) => `#${t}`).join("  ")}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div style={{ border: "1px solid var(--line-dark)", marginBottom: 48 }}>
              <img src={post.cover} alt={post.title} style={{ width: "100%" }} />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="prose" style={{ margin: "0 auto", maxWidth: 720 }}>
              {renderBlocks(post.body).map((b, i) =>
                b.type === "heading" ? <h2 key={i}>{b.text}</h2>
                : b.type === "list" ? <ul key={i}>{b.items.map((li, j) => <li key={j}>{li}</li>)}</ul>
                : <p key={i}>{b.text}</p>
              )}
              {post.video && (
                <div style={{ aspectRatio: "16/9", marginTop: 30 }}>
                  <iframe
                    src={post.video}
                    title="Video"
                    style={{ width: "100%", height: "100%", border: "1px solid var(--line-dark)" }}
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </Reveal>

          {post.gallery?.length > 0 && (
            <div className="gallery-stack" style={{ maxWidth: 860, margin: "56px auto 0" }}>
              {post.gallery.map((g, i) => (
                <Reveal key={i} as="figure" delay={40}>
                  <img src={g.src} alt={g.caption || post.title} loading="lazy" />
                  {g.caption && <figcaption>{g.caption}</figcaption>}
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {others.length > 0 && (
        <section className="section">
          <div className="container">
            <Reveal>
              <p className="kicker">Keep Reading</p>
            </Reveal>
            <div className="journal-list">
              {others.map((p, i) => (
                <Reveal key={p.slug} delay={i * 80}>
                  <Link href={`/journal/${p.slug}`} className="journal-card">
                    <div className="frame"><img src={p.cover} alt={p.title} loading="lazy" /></div>
                    <div className="pad">
                      <p className="date"><span className="cat">{p.category}</span><span>{formatDate(p.date)}</span></p>
                      <h3>{p.title}</h3>
                      <p>{p.excerpt}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
