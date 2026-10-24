import Link from "next/link";
import { formatDate } from "@/lib/text";

export default function JournalCard({ post }) {
  return (
    <Link href={`/journal/${post.slug}`} className="journal-card">
      <div className="frame">
        <img src={post.cover} alt={post.title} loading="lazy" />
      </div>
      <div className="pad">
        <p className="date">
          <span className="cat">{post.category}</span>
          <span>{formatDate(post.date)}</span>
        </p>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
      </div>
    </Link>
  );
}
