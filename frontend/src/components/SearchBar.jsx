import { Search, X, Loader2 } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSearch } from "../hooks/useSearch";
import { SearchDropdown } from "./SearchDropdown";

export function SearchBar() {
  const navigate = useNavigate();
  const { query, setQuery, results, loading, clear } = useSearch();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // Fecha ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fecha com Esc
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    
   
    if (val.trim().length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleInputFocus = () => {
    if (query.trim().length > 0) {
      setOpen(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setOpen(false);
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);

    if (e.target.elements[0]) {
      e.target.elements[0].blur();
    }
    clear();
  };

  const handleClear = () => {
    clear();
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-sm">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 focus-within:border-[#fbbf24]/50 transition-colors">
          {loading
            ? <Loader2 size={14} className="text-gray-500 animate-spin shrink-0" />
            : <Search size={14} className="text-gray-500 shrink-0" />
          }
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder="Buscar filmes, séries..."
            className="bg-transparent text-sm text-white placeholder-gray-500 outline-none w-full sm:w-70 md:w-57 lg:w-80"
          />
          {query && (
            <button type="button" onClick={handleClear} className="text-gray-500 hover:text-white transition-colors">
              <X size={14} />
            </button>
          )}
        </div>
      </form>

      {open && results.length > 0 && (
        <SearchDropdown
          results={results}
          query={query}
          onClose={() => setOpen(false)}
          onViewAll={() => {
            setOpen(false);
            navigate(`/search?q=${encodeURIComponent(query.trim())}`);
          }}
        />
      )}
    </div>
  );
}