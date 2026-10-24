"use client";

import { useMemo, useState } from "react";
import Reveal from "./Reveal";

export default function LifeGallery({ items }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((i) => i.category).filter(Boolean)))],
    [items]
  );
  const [active, setActive] = useState("All");
  const shown = active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <>
      <div className="chips">
        {categories.map((c) => (
          <button
            key={c}
            className={`chip ${active === c ? "active" : ""}`}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="masonry">
        {shown.map((item, i) => (
          <Reveal key={`${active}-${i}`} as="figure" delay={(i % 4) * 60}>
            <img src={item.src} alt={item.caption} loading="lazy" />
            <figcaption>
              <span className="cat">{item.category}</span>
              {item.caption}
            </figcaption>
          </Reveal>
        ))}
      </div>
    </>
  );
}
