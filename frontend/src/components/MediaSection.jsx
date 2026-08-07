import { ChevronRight } from "lucide-react";
import { MediaCarousel } from "./MediaCarousel";
import { Link } from "react-router";

export function MediaSection({ title, href, items }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">{title}</h2>
        <Link to={href} className="flex items-center gap-2 text-[#fbbf24] hover:text-[#f59e0b] transition-colors">
          Ver Todos
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
      <MediaCarousel items={items} />
    </section>
  );
}