import Reveal from "./Reveal";

export default function SectionHeading({ index, kicker, title, sub }) {
  return (
    <Reveal>
      <p className="kicker">
        {index && <span>{index}</span>} {kicker}
      </p>
      <h2 className="section-title">{title}</h2>
      {sub && <p className="section-sub">{sub}</p>}
    </Reveal>
  );
}
