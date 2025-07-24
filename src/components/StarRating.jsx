import { useState } from "react";
import { Star } from "lucide-react";

export default function StarRating({ rating, onChange }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="flex gap-1 text-yellow-400">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={28}
          fill={star <= (hovered ?? rating) ? "#facc15" : "none"}
          stroke="#facc15"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onChange(star)}
          className="cursor-pointer"
        />
      ))}
    </div>
  );
}
