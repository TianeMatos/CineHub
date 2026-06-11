import { Film, Tv, Star } from "lucide-react";
import { Link, useLocation } from "react-router";
import { SearchBar } from "./SearchBar";

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <Film className="w-8 h-8 text-[#fbbf24]" />
              <span className="text-2xl font-bold text-[#fbbf24]">CineDB</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
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

          <div className="flex items-center gap-4">
            {/* <div className="hidden sm:flex items-center bg-[#1f1f1f] rounded-lg px-4 py-2 w-64">
              <Search className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Buscar filmes, séries..."
                className="bg-transparent border-none outline-none w-full text-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
            </div>
            <button className="md:hidden text-gray-900 dark:text-white">
              <Menu className="w-6 h-6" />
            </button> */}
            <SearchBar key={"search"} />
          </div>
        </div>
      </div>
    </nav>
  );
}
