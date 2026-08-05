import { Star, Calendar } from "lucide-react";
import { Link } from "react-router";
import { ImageCard } from "./ui/ImageCard";
import { yearFormat } from "../utils/dateTimeFormat";

export const MediaCard = ({ media }) => {
  return (
    <Link to={`/${media.mediaType}/${media.id}`} className="group/card cursor-pointer block">
      <div className="relative overflow-hidden rounded-lg aspect-2/3 bg-gray-100 dark:bg-white/5">
        <ImageCard
          src={media.posterUrl}
          alt={media.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-2 text-xs text-[#fbbf24] mb-1">
              <Calendar className="w-3 h-3" />
              {yearFormat(media.releaseDate)}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{media.genre || ""}</p>
          </div>
        </div>
        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md items-center gap-1 hidden sm:flex">
          <Star className="w-3 h-3 text-[#fbbf24] fill-[#fbbf24]" />
          <span className="text-sm font-medium text-white">{media.rating}</span>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-xs sm:text-base font-medium text-white line-clamp-1 group-hover/card:text-[#fbbf24] transition-colors">
          {media.title}
        </h3>
      </div>
    </Link>
  );
}
