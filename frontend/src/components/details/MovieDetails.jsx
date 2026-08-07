import {
  Flame,
  Sparkles,
  Scale,
  Siren,
  Calendar,
  Timer,
  TrendingUp,
  Star,
} from "lucide-react";
import {
  currencyFormat,
  dateFormat,
  runtimeFormat,
  yearFormat,
} from "../../utils/dateTimeFormat";
import { ScrollToTop } from "../ui/ScrollToTop";
import { DetailStatGrid } from "../DetailStatGrid";
import { calculateStatusMarket } from "../../utils/CalculateStatusMarket";
import { TechnicalSheetSection } from "../TechnicalSheetSection";
import { CastSection } from "../CastSection";
import { RecommendationsSection } from "../RecommendationsSection";
import { MediaDetailsHero } from "./MediaDetailsHero";

export const MovieDetails = ({ details }) => {

  const { status, statusClassName } = calculateStatusMarket(
    details.budget,
    details.boxOffice,
  );
  const iconesStatus = {
    Fenômeno: Flame,
    Lucrativo: Sparkles,
    "Quase Pago": Scale,
    Prejuízo: Siren,
  };
  const StatusIcon = iconesStatus[status] || Siren;

  const movieStats = [
    {
      icon: Calendar,
      label: "Ano De Lançamento",
      value: yearFormat(details.releaseDate),
    },
    {
      icon: Timer,
      label: "Duração",
      value: runtimeFormat(details.runtime),
    },
    {
      icon: TrendingUp,
      label: "Popularidade",
      value: Math.round(details.popularity),
      sub: "Índice do TMDB",
    },
    {
      icon: StatusIcon,
      label: "Status do Mercado",
      value: status,
      className: statusClassName,
    },
  ];

  const movieTechItems = [
    { label: "Diretor", value: details.director?.name },
    {
      label: "Roteiro",
      value: details.screenplay?.name || "Não Informado",
    },
    { label: "País de origem", value: details.country },
    { label: "Idioma original", value: details.language },
    { label: "Orçamento", value: currencyFormat(details.budget) },
    {
      label: "Bilheteria",
      value: currencyFormat(details.boxOffice),
    },
    {
      label: "Data de lançamento",
      value: dateFormat(details.releaseDate),
    },
    {
      label: "Classificação indicativa",
      value: details.contentRating.rating
        ? details.contentRating.rating
        : "Não Informado",
    },
    { label: "Estúdio", value: details.productionCompanies },
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
            </>
          )
        }}
      </MediaDetailsHero>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        <DetailStatGrid stats={movieStats} />

        <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        <TechnicalSheetSection
          rating={details.rating}
          votes={details.votes}
          items={movieTechItems}
        />

        <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        {details.cast && details.cast.length > 0 && (
          <CastSection cast={details.cast} />
        )}

        <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        {details.recommendations && details.recommendations.length > 0 && (
          <RecommendationsSection
            recommendations={details.recommendations}
          />

        )}
      </main>
    </div>
  );
};
