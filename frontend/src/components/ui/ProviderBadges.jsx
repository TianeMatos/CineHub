import { MonitorPlay } from "lucide-react";

export function ProviderBadges({ providers }) {
  if (!providers) return null;

  const sections = [
    { title: "Assinatura", items: providers.flatrate },
    { title: "Grátis", items: providers.free },
  ].filter((section) => section.items?.length);

  if (sections.length === 0) return null;
  return (
    <div className="flex flex-col flex-wrap items-start gap-2 pt-3 border-t border-white/40">
      <div className="flex items-center gap-2 text-2xl text-white">
        <MonitorPlay className="w-5 h-5 text-[#fbbf24]" />
        <h2>Onde Assistir</h2>
      </div>
      {sections.map((section) => (
        <div key={section.title} className="flex flex-wrap items-center gap-2 pt-3">
          <span className="text-xs sm:text-base font-normal text-white/75 w-fit pr-2 line">
            {section.title}
          </span>

          <div className="flex flex-wrap items-center gap-2 pt-1.5">
            {section.items.map(provider => (
              <div key={provider.provider_name} className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 px-3 py-2 backdrop-blur-sm">
                <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full overflow-hidden">
                  <img src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} className="w-full h-full object-cover object-center" />
                </div>
                <span className="text-sm font-medium">{provider.provider_name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}