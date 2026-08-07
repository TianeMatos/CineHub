import { Film } from "lucide-react";
import { BigRatingRing } from "./ui/BigRatingRing";

export const TechnicalSheetSection = ({ rating, votes, items }) => {
  return (
    <section className="flex flex-wrap gap-4 md:gap-6 justify-center mx-2 sm:mx-4 md:mx-6">
      <div className="flex-1 bg-[#141414] border border-white/6 rounded-2xl p-4 sm:p-6 mx-2 flex flex-col items-center justify-center gap-2 min-w-56">
        <BigRatingRing value={rating} />
        <p className="text-sm text-gray-400 text-center">
          Nota média baseada em
          <br />
          {votes} avaliações
        </p>
      </div>

      <div className="flex-2 bg-[#141414] border border-white/6 rounded-2xl py-6 px-4 sm:px-6 mx-2 min-w-fit md:min-w-xl">
        <div className="flex items-center gap-2 mb-6">
          <Film className="w-4 h-4 text-[#fbbf24]" />
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
            Ficha técnica
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 sm:gap-x-7 gap-y-3">
          {items.map(({ label, value }) => (
            <div
              key={label}
              className={`flex items-center justify-between border-b border-white/5 pb-2 text-xs sm:text-sm`}
            >
              <span className="text-gray-400">{label}</span>
              <span className={`px-3 py-1 rounded-full font-semibold`}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
