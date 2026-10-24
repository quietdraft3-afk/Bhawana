import Reveal from "@/components/Reveal";
import JournalCard from "@/components/JournalCard";
import { getJournal } from "@/lib/content";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Journal",
  description: "Articles, travel notes, photo stories and reflections by Bhawana Aryal.",
};

export default async function JournalPage() {
  const posts = await getJournal();

  return (
    <>
      <section className="detail-hero">
        <div className="container">
          <Reveal>
            <p className="kicker">Journal / Vlogs</p>
            <h1>Stories &amp; reflections</h1>
            <p className="section-sub">
              Travel notes, research reflections, event experiences, USYC
              updates and the occasional unfiltered thought about cities.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container">
          {posts.length === 0 ? (
            <p className="muted">No posts yet — check back soon!</p>
          ) : (
            <div className="journal-list">
              {posts.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 80}>
                  <JournalCard post={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
