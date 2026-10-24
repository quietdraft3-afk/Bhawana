import Reveal from "@/components/Reveal";
import MapView from "@/components/MapView";
import { getLocations } from "@/lib/content";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Map",
  description: "An interactive map of Bhawana Aryal's projects, travels and experiences across Nepal and beyond.",
};

export default async function MapPage() {
  const locations = await getLocations();

  return (
    <>
      <section className="detail-hero">
        <div className="container">
          <Reveal>
            <p className="kicker">Places & Projects</p>
            <h1>The map</h1>
            <p className="section-sub">
              Projects, travels and milestones plotted across the landscape —
              click a marker to explore.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <MapView locations={locations} />
        </div>
      </section>
    </>
  );
}
