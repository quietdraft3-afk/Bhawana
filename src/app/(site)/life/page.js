import Reveal from "@/components/Reveal";
import LifeGallery from "@/components/LifeGallery";
import { getLife } from "@/lib/content";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Life",
  description: "Travel, hobbies, events and behind-the-scenes moments from Bhawana Aryal's life.",
};

export default async function LifePage() {
  const items = await getLife();

  return (
    <>
      <section className="detail-hero">
        <div className="container">
          <Reveal>
            <p className="kicker">A Visual Diary</p>
            <h1>Life</h1>
            <p className="section-sub">
              Travel, fieldwork, events, hobbies and the behind-the-scenes
              moments that don't fit on a drawing board.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <LifeGallery items={items} />
        </div>
      </section>
    </>
  );
}
