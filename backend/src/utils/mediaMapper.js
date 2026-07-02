const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/original';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';

const toMinSummary = (media, mediaType) => {
  return {
    id: media.id,
    title: media.title || media.name,
    posterUrl: media.poster_path ? `${POSTER_BASE_URL}${media.poster_path}` : null,
    backdropUrl: media.backdrop_path ? `${BACKDROP_BASE_URL}${media.backdrop_path}` : null,
    releaseDate: (media.release_date || media.first_air_date || ""),
    rating: media.vote_average ? Number(media.vote_average.toFixed(1)) : 0,
    voteCount: media.vote_count || 0,
    genreIds: media.genre_ids || [],
    mediaType: mediaType || media.media_type
  };
};


const toFullDetails = (media, mediaType = "") => {
  return {
    id: media.id,
    title: media.title || media.name,
    overview: media.overview,
    posterUrl: media.poster_path ? `${POSTER_BASE_URL}${media.poster_path}` : null,
    backdropUrl: media.backdrop_path ? `${BACKDROP_BASE_URL}${media.backdrop_path}` : null,
    releaseDate: media.release_date || media.first_air_date,
    rating: media.vote_average ? Number(media.vote_average.toFixed(1)) : 0,
    tagline: media.tagline,
    genres: media.genres || [],
    runtime: media.runtime || media.episode_run_time?.[0] || media.last_episode_to_air?.runtime || 0,
    status: media.status,
    videos: media.videos.results.find((v) => v.type === "Trailer" || v.type === "Teaser" || v.name === "Trailer Oficial") || [],
    cast: media.credits.cast.slice(0, 3),
    crew: media.credits.crew.find((c) => c.job === "Director") || media.created_by,
    similar: media.recommendations.results.slice(0, 10).map((item) => toMinSummary(item, mediaType)),
    tagline: media.tagline || ""
  };
};

// TODO => refazer esse mapper para series e formatar o primeiro para filmes
const toFullDetailsSeries = (media, mediaType = "tv") => {
  return {
    id: media.id,
    title: media.title || media.name,
    overview: media.overview,
    posterUrl: media.poster_path ? `${POSTER_BASE_URL}${media.poster_path}` : null,
    backdropUrl: media.backdrop_path ? `${BACKDROP_BASE_URL}${media.backdrop_path}` : null,
    releaseDate: media.release_date || media.first_air_date,
    rating: media.vote_average ? Number(media.vote_average.toFixed(1)) : 0,
    tagline: media.tagline,
    genres: media.genres || [],
    runtime: media.runtime || media.episode_run_time?.[0] || media.last_episode_to_air?.runtime || 0,
    status: media.status,
    videos: media.videos.results.find((v) => v.type === "Trailer" || v.type === "Teaser" || v.name === "Trailer Oficial") || [],
    cast: media.credits.cast.slice(0, 3),
    crew: media.credits.crew.find((c) => c.job === "Director") || media.created_by,
    similar: media.recommendations.results.slice(0, 10).map((item) => toMinSummary(item, mediaType)),
    tagline: media.tagline || ""
  };
};

module.exports = {
  toMinSummary,
  toFullDetails
};