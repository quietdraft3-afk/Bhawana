"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/about", label: "My Journey" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/journal", label: "Journal" },
  { href: "/life", label: "Life" },
  { href: "/map", label: "Map" },
  { href: "/connect", label: "Connect" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <Link href="/" className="nav-logo" aria-label="Bhawana Aryal — home">
          Bhawana <em>Aryal</em>
        </Link>
        <nav>
          <ul className={`nav-links ${open ? "open" : ""}`}>
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={pathname?.startsWith(l.href) ? "active" : ""}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className={`nav-burger ${open ? "open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
