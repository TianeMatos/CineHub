const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/original';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';
const PROFILE_BASE_URL = "https://image.tmdb.org/t/p/w300";
const STILL_BASE_URL = "https://image.tmdb.org/t/p/w780";

const toMinSummary = (media, mediaType) => {
  return {
    id: media.id,
    title: media.title || media.name,
    posterUrl: media.poster_path ? `${POSTER_BASE_URL}${media.poster_path}` : null,
    backdropUrl: media.backdrop_path ? `${BACKDROP_BASE_URL}${media.backdrop_path}` : null,
    releaseDate: (media.release_date || media.first_air_date || ""),
    rating: media.vote_average ? Number(media.vote_average.toFixed(1)) : 0,
    voteCount: media.vote_count || 0,
    popularity: media.popularity,
    genreIds: media.genre_ids || [],
    mediaType: media.media_type || mediaType
  };
};

const toFullDetailsMovie = (media) => {
  return {
    // Informações básicas
    id: media.id,
    title: media.title,
    overview: media.overview,
    tagline: media.tagline,
    contentRating: media.release_dates.results.find((r) => r.iso_3166_1 === "BR"),
    releaseDate: media.release_date,
    runtime: media.runtime,
    genres: media.genres,
    collection: media.belongs_to_collection,
    language: media.original_language.toString().toUpperCase(),
    country: media.origin_country.join(", "),
    homepage: media.homepage,
    // Imagens
    posterUrl: media.poster_path ? `${POSTER_BASE_URL}${media.poster_path}` : null,
    backdropUrl: media.backdrop_path ? `${BACKDROP_BASE_URL}${media.backdrop_path}` : null,
    // Avaliações
    rating: Number(media.vote_average.toFixed(1)),
    votes: media.vote_count,
    // Dinheiro
    budget: new Intl.NumberFormat('pt-BR', { style: "currency", currency: "BRL" }).format(media.budget),
    boxOffice: new Intl.NumberFormat('pt-BR', { style: "currency", currency: "BRL" }).format(media.revenue),
    // Produção
    productionCompanies: media.production_companies.map((pc) => pc.name).join(", "),
    // Dirretor e Escritor
    director: media.credits.crew.find((c) => c.job === "Director"),
    screenplay: media.credits.crew.find((c) => c.job === "Screenplay" || c.job === "Original Story" || c.job === "Writer"),
    // Elenco
    cast: media.credits.cast.slice(0, 10).map((actor) => ({
      id: actor.id,
      name: actor.name,
      role: actor.character,
      photo: actor.profile_path
        ? `${PROFILE_BASE_URL}${actor.profile_path}`
        : null,
    })),
    // Trailer
    video:
      media.videos.results.find(
        (v) =>
          v.site === "YouTube" &&
          v.type === "Trailer" ||
          v.type === "Teaser"
      ) || null,

    // Recomendações
    recommendations: media.recommendations.results.map((item) =>
      toMinSummary(item, "tv")
    ),
  };
};

const toFullDetailsSeries = (media) => ({
  id: media.id,

  // Informações básicas
  title: media.name,
  overview: media.overview,
  tagline: media.tagline,
  contentRating: media.content_ratings.results.find((r) => r.iso_3166_1 === "BR") || media.content_ratings.results[0],

  // Imagens
  posterUrl: media.poster_path
    ? `${POSTER_BASE_URL}${media.poster_path}`
    : null,
  backdropUrl: media.backdrop_path
    ? `${BACKDROP_BASE_URL}${media.backdrop_path}`
    : null,

  // Avaliações
  rating: Number(media.vote_average.toFixed(1)),
  votes: media.vote_count,
  popularity: media.popularity,

  // Datas
  releaseDate: media.first_air_date,
  lastAirDate: media.last_air_date,

  // Status
  status: media.status,
  inProduction: media.in_production,
  type: media.type,

  // Episódios
  numberEpisodes: media.number_of_episodes,
  numberSeasons: media.number_of_seasons,
  episodeRunTime: media.episode_run_time,

  // Temporadas
  seasons: media.seasons.map((season) => ({
    id: season.id,
    seasonNumber: season.season_number,
    name: season.name,
    overview: season.overview,
    airDate: season.air_date,
    episodeCount: season.episode_count,
    rating: season.vote_average,
  })),

  // Idiomas
  language: media.original_language,
  languages: media.languages,
  spokenLanguages: media.spoken_languages,

  // Gêneros
  genres: media.genres,

  // Produção
  network: media.networks?.map((n) => n.name).join(", "),
  productionCompanies: media.production_companies,

  // Provedor
  providers: media.providers,

  // País
  country: media.origin_country.join(", "),

  // Homepage
  homepage: media.homepage,

  // Criadores
  crew: media.created_by,

  // Elenco
  cast: media.credits.cast.slice(0, 10).map((actor) => ({
    id: actor.id,
    name: actor.name,
    role: actor.character,
    photo: actor.profile_path
      ? `${PROFILE_BASE_URL}${actor.profile_path}`
      : null,
  })),

  // Trailer
  video:
    media.videos.results.find(
      (v) =>
        v.site === "YouTube" &&
        v.type === "Trailer" ||
        v.type === "Teaser"
    ) || null,

  // Recomendações
  recommendations: media.recommendations.results.map((item) =>
    toMinSummary(item, "tv")
  ),
});

const toSeasonDetails = (season) => {
  return {
    id: season.id,
    name: season.name,
    overview: season.overview,
    seasonNumber: season.season_number,
    airDate: season.air_date,
    posterUrl: season.poster_path
      ? `${POSTER_BASE_URL}${season.poster_path}`
      : null,
    voteAverage: season.vote_average
      ? Number(season.vote_average.toFixed(1))
      : 0,
    episodesCount: season.episodes.length,

    episodes: season.episodes.map((episode) => ({
      id: episode.id,
      number: episode.episode_number,
      seasonNumber: episode.season_number,
      title: episode.name,
      synopsis: episode.overview,
      airDate: episode.air_date,
      duration: episode.runtime ? `${episode.runtime} min` : "—",

      rating: episode.vote_average
        ? Number(episode.vote_average.toFixed(1))
        : 0,

      votes: episode.vote_count,

      stillUrl: episode.still_path
        ? `${STILL_BASE_URL}${episode.still_path}`
        : null,
    })),
  };
};

module.exports = {
  toMinSummary,
  toFullDetailsMovie,
  toFullDetailsSeries,
  toSeasonDetails
};