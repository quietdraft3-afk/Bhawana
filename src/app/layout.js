import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: {
    default: "Bhawana Aryal — Architect & Urban Designer",
    template: "%s — Bhawana Aryal",
  },
  description:
    "Personal world of Bhawana Aryal — architect, urban design researcher and traveller from Kathmandu, Nepal. Architecture projects, research, journal and life.",
  openGraph: {
    title: "Bhawana Aryal — Architect & Urban Designer",
    description:
      "Architecture, urban design, research and stories from Kathmandu, Nepal.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
