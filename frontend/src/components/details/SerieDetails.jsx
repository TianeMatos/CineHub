import {
  Calendar,
  PenLine,
  Star,
  TrendingUp,
  Tv,
} from "lucide-react";
import { dateFormat, yearFormat } from "../../utils/dateTimeFormat";
import { ScrollToTop } from "../ui/ScrollToTop";
import { TechnicalSheetSection } from "../TechnicalSheetSection";
import { DetailStatGrid } from "../DetailStatGrid";
import { CastSection } from "../CastSection";
import { RecommendationsSection } from "../RecommendationsSection";
import { EpisodesSection } from "../EpisodesSection";
import { MediaDetailsHero } from "./MediaDetailsHero";

export function SeriesDetails({ details }) {
  const serieStats = [
    {
      icon: Calendar,
      label: "Ano De Lançamento",
      value: yearFormat(details.releaseDate),
    },
    {
      icon: Tv,
      label: "Episódios",
      value: `${details.numberEpisodes} ep.`,
      sub: `em ${details.numberSeasons} temporadas`,
    },
    {
      icon: TrendingUp,
      label: "Popularidade",
      value: Math.round(details.popularity),
      sub: "Índice do TMDB",
    },
    {
      icon: PenLine,
      label: "Criador(es)",
      value: details?.createdBy ?? "Não Informado",
    },
  ];
  const seriesTechItems = [
    {
      label: "Duração",
      value: `${Math.round(details.episodeRunTime) + "min por episódio"}`,
    },
    {
      label: "Status",
      value: details.inProduction === true ? "Em Exibição" : "Terminada",
    },
    {
      label: "Estreia",
      value: dateFormat(details.releaseDate),
    },
    {
      label: "Último episódio",
      value: dateFormat(details.lastAirDate),
    },
    { label: "País de origem", value: details.country },
    { label: "Idioma original", value: details.language.toUpperCase() },
    {
      label: "Classificação indicativa",
      value: details.contentRating.rating
        ? details.contentRating.rating
        : "Não Informado",
    },
    { label: "Emissora", value: details.network },
  ];

  return (
    <div className="min-h-screen">
      <ScrollToTop />
      
      <MediaDetailsHero details={details}> 
        {{
          badges: (
            <>
              <span className="flex items-center gap-1 bg-[#fbbf24]/10 text-[#fbbf24] border border-[#fbbf24]/30 px-2.5 py-1 rounded-md font-bold">
                <Star className="w-3.5 h-3.5 fill-[#fbbf24]" />
                {details.rating}
              </span>
              <span className="text-[#fbbf24]">
                {yearFormat(details.releaseDate)}
              </span>
              <span className="text-[#7c662f]">•</span> 
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border ${
                  details.status === "Returning Series"
                    ? "bg-green-800/75 border-green-300/65 text-green-300"
                    : "bg-red-500/50 border-red-800 text-white/80"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${details.status === "Em exibição" ? "bg-green-300" : "bg-red-600"}`}
                />
                {details.status === "Returning Series"
                  ? "Em Exibição"
                  : "Finalizada"}
              </span>
                         
            </>
          )
        }}
      </MediaDetailsHero>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        <DetailStatGrid stats={serieStats} />
        <TechnicalSheetSection
          rating={details.rating}
          votes={details.votes}
          items={seriesTechItems}
        />
        <CastSection cast={details.cast} />
        <EpisodesSection seriesId={details.id} seasons={details.seasons} numberSeasons={details.numberSeasons} numberEpisodes={details.numberEpisodes} />
        <RecommendationsSection recommendations={details.recommendations} />
      </main>
    </div>
  );
}
