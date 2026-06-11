import { Star } from "lucide-react";

export default function Stars({ rating, reviews }: { rating: number; reviews?: number }) {
  return (
    <span className="flex items-center gap-1" aria-label={`Rated ${rating} out of 5${reviews ? `, ${reviews} reviews` : ""}`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={`size-3.5 ${n <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-silver text-silver"}`} />
      ))}
      {reviews !== undefined && <span className="ml-1 text-xs text-navy/55">({reviews})</span>}
    </span>
  );
}
