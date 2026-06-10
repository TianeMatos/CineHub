import { Star, Calendar } from "lucide-react";
import { Link } from "react-router";
import { ImageCard } from "./ui/ImageCard";

export const MediaCard = ({ id, title, releaseDate, rating, posterUrl, mediaType, genre }) => {
  return (
    <Link to={`/${mediaType}/${id}`} className="group/card cursor-pointer block">
      <div className="relative overflow-hidden rounded-lg aspect-2/3 bg-gray-100 dark:bg-white/5">
        <ImageCard
          src={posterUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-2 text-xs text-[#fbbf24] mb-1">
              <Calendar className="w-3 h-3" />
              {new Date(releaseDate).getFullYear()}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{genre || ""}</p>
          </div>
        </div>
        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
          <Star className="w-3 h-3 text-[#fbbf24] fill-[#fbbf24]" />
          <span className="text-xs font-medium text-gray-900 dark:text-white">{rating}</span>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="font-medium text-gray-900 dark:text-white line-clamp-1 group-hover/card:text-[#fbbf24] transition-colors">
          {title}
        </h3>
      </div>
    </Link>
  );
}
