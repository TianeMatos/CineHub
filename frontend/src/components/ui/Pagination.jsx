import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({ page, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-400 hover:border-[#fbbf24]/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
            p === page
              ? "bg-[#fbbf24] text-black"
              : "border border-border text-gray-500 dark:text-gray-400 hover:text-gray-400 hover:border-[#fbbf24]/40"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-400 hover:border-[#fbbf24]/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}