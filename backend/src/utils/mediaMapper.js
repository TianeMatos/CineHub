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
    mediaType: mediaType
  };
};


const toFullDetails = (media) => {
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
    runtime: media.runtime || media.episode_run_time?.[0] || 0,
    status: media.status
  };
};

module.exports = {
  toMinSummary,
  toFullDetails
};