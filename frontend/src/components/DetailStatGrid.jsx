import { Calendar, Flame, Scale, Siren, Sparkles, Timer, TrendingUp } from "lucide-react";
import { runtimeFormat, yearFormat } from "../utils/dateTimeFormat";
import { calculateStatusMarket } from "../utils/CalculateStatusMarket";

export const DetailStatGrid = ({ stats }) => {
  
    const { status, statusClassName } = calculateStatusMarket(
      stats.budget,
      stats.boxOffice,
    );
    const iconesStatus = {
      Fenômeno: Flame,
      Lucrativo: Sparkles,
      "Quase Pago": Scale,
      Prejuízo: Siren,
    };
    const StatusIcon = iconesStatus[status] || Siren;
  return (
    <section className="flex flex-wrap justify-evenly items-center gap-4 px-4 md:px-6">
      {[
        {
          icon: Calendar,
          label: "Ano De Lançamento",
          value: yearFormat(stats.releaseYear),
        },
        {
          icon: Timer,
          label: "Duração",
          value: runtimeFormat(stats.runtime),
        },
        {
          icon: TrendingUp,
          label: "Popularidade",
          value: Math.round(stats.popularity),
          sub: "Índice do TMDB",
        },
        {
          icon: StatusIcon,
          label: "Status do Mercado",
          value: status,
          type: "special",
        },
      ].map(({ icon: Icon, label, value, sub, type }) => (
        <div
          key={label}
          className="bg-[#141414] border border-white/6 rounded-2xl px-5 py-4 flex items-center gap-6 w-full sm:w-60 max-h-20"
        >
          <div className="bg-[#fbbf24]/10 rounded-xl p-2.5 shrink-0">
            <Icon className="w-5 h-5 text-[#fbbf24]" />
          </div>
          <div>
            <p className="text-xs uppercase text-gray-400">{label}</p>
            <p
              className={`text-sm font-semibold ${type === "special" ? statusClassName : "text-white"}`}
            >
              {value}
            </p>
            <p className="text-xs text-gray-400">{sub}</p>
          </div>
        </div>
      ))}
    </section>
  );
};
