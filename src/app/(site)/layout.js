import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getSite } from "@/lib/content";

export default async function SiteLayout({ children }) {
  const site = await getSite();
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer site={site} />
    </>
  );
}
