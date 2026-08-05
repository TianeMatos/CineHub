import { Film, Tv, Star } from "lucide-react";
import { Link, useLocation } from "react-router";
import { SearchBar } from "../SearchBar";

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8">
        <div className="flex flex-wrap gap-2 sm:gap-3 items-center justify-center sm:justify-between min-h-16 h-25 w-full py-3 ">
          <div className="flex items-center md:gap-6 lg:gap-8 px-2">
            <Link to="/" className="flex items-center gap-2">
              <Film className="w-6 w-sm-8 h-6 h-sm-8 text-[#fbbf24]" />
              <span className="text-xl sm:text-2xl font-bold text-[#fbbf24]">CineDB</span>
            </Link>

            <div className="hidden md:flex items-center md:gap-4 lg:gap-6">
              <Link
                to="/movies"
                className={`transition-colors flex items-center gap-2 ${
                  isActive('/movies') ? 'text-[#fbbf24]' : 'text-gray-900 dark:text-white hover:text-[#fbbf24]'
                }`}
              >
                <Film className="w-4 h-4" />
                Filmes
              </Link>
              <Link
                to="/series"
                className={`transition-colors flex items-center gap-2 ${
                  isActive('/series') ? 'text-[#fbbf24]' : 'text-gray-900 dark:text-white hover:text-[#fbbf24]'
                }`}
              >
                <Tv className="w-4 h-4" />
                Séries
              </Link>
              <Link
                to="/topRated"
                className={`transition-colors flex items-center gap-2 ${
                  isActive('/topRated') ? 'text-[#fbbf24]' : 'text-gray-900 dark:text-white hover:text-[#fbbf24]'
                }`}
              >
                <Star className="w-4 h-4" />
                Top Rated
              </Link>
            </div>
          </div>

          <div className="flex grow items-center justify-end gap-4 px-2">
            <SearchBar key={"searchBar"} />
          </div>
        </div>
      </div>
    </nav>
  );
}
