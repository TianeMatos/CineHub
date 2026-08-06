import { MonitorPlay } from "lucide-react";
const TMDB_LOGO_URL = "https://image.tmdb.org/t/p/w92";

export function ProviderBadges({ providers }) {
  if (!providers) return null;

  const sections = [
    { title: "Assinatura", items: providers.flatrate },
    { title: "Grátis", items: providers.free },
  ].filter((section) => section.items?.length);

  if (sections.length === 0) return null;
  return (
    <div className="flex flex-col flex-wrap items-start gap-2 pt-3 border-t border-white/40">
      <div className="flex items-center gap-2 text-2xl text-white font-bold">
        <MonitorPlay className="w-6 h-6 text-[#fbbf24]" />
        <h2>Onde Assistir</h2>
      </div>
      <span className="text-xs text-white/50">
        Dados fornecidos por JustWatch      
      </span>
      {sections.map((section) => (
        <div
          key={section.title}
          className="flex flex-wrap items-center gap-2 pt-3"
        >
          <span className="text-base font-normal text-white/75 w-fit pr-2 line">
            {section.title}
          </span>

          <div className="flex flex-wrap items-center gap-2 pt-1.5">
            {section.items.map((provider) => (
              <div key={provider.provider_id} className="relative group">
                <img
                  src={`${TMDB_LOGO_URL}${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="w-11 h-11 rounded-2xl border border-[#555] cursor-pointer transition-transform duration-200 group-hover:scale-110"
                />

                <div
                  className="
                    absolute left-1/2 top-full mt-2
                    -translate-x-1/2
                    whitespace-nowrap
                    rounded-md
                    bg-zinc-900
                    px-2 py-1
                    text-xs text-white
                    opacity-0
                    pointer-events-none
                    transition-all duration-200
                    group-hover:opacity-100
                    group-hover:translate-y-1
                    z-50
                  "
                >
                  {provider.provider_name}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
