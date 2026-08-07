const tmdbClient = require("../config/tmdb");
const mediaMapper = require("../utils/mediaMapper");
const { popularFilter, shuffleMedia } = require("../utils/mediaHelpers");

// TODO -> Refatorar as funções: 1º melhorar os params, 2º verificar a diferença de parametros de 'tv' e 'movie', e mudar nas funções

//* OK not using
const getPopular = async (mediaType) => {

  let params = { language: 'pt-BR' }
  if (mediaType === 'movie') params.region = 'BR';

  const { data } = await tmdbClient.get(`/${mediaType}/popular`, { params });

  const filtered = popularFilter(data.results);
  const shuffled = shuffleMedia(filtered);

  return shuffled?.slice(0, 10).map((media) => mediaMapper.toMinSummary(media, mediaType));
}

//* OK
const getTrendings = async (mediaType) => {
  const { data } = await tmdbClient.get(`/trending/${mediaType}/week`, { params: { language: 'pt-BR' } });
  const rawResults = data?.results ?? [];

  const mapped = rawResults.slice(0, 10).map((media) => mediaMapper.toMinSummary(media, mediaType));

  return mapped;
}

//* OK
const getTopRated = async (mediaType, page) => {

  const params = {
    language: "pt-BR",
    page,
    sort_by: "vote_average.desc",
    "vote_count.gte": 1000,
    "vote_average.gte": 8
  };

  const { data, request } = await tmdbClient.get(`/discover/${mediaType}`, { params });

  return {
    results: data.results.map((media) => mediaMapper.toMinSummary(media, mediaType)),
    dataInfo: {
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results
    }
  };
}

//* OK
const getGenreList = async (mediaType) => {
  const { data } = await tmdbClient.get(`/genre/${mediaType}/list`, {
    params: {
      language: 'pt-BR'
    }
  });

  return data.genres;
}

//* OK
const getDiscover = async (mediaType, page, genre, sortBy) => {

  let sortParam = sortBy || "primary_release_date.desc";
  if (mediaType === 'tv' && sortParam === "primary_release_date.desc") {
    sortParam = "first_air_date.desc";
  }

  let params = {
    language: 'pt-BR',
    page,
    sort_by: sortParam,
  };

  if (mediaType === 'movie') params.region = 'BR';
  if (genre !== 0) params.with_genres = genre;

  if (sortParam === "vote_average.desc") {
    params['vote_count.gte'] = 700;
  } else if (sortParam === "primary_release_date.desc" || sortParam === "first_air_date.desc") {
    params['vote_count.gte'] = 100;
    params['vote_average.gte'] = 1.0;
  }

  const { data } = await tmdbClient.get(`/discover/${mediaType}`, { params });

  return {
    results: data.results.map((media) => mediaMapper.toMinSummary(media, mediaType)),
    dataInfo: {
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results
    }
  };
}

//* OK
const getSearch = async (page, query, type) => {
  const params = { language: "pt-BR", query, page };

  let combinedResults = [];
  let calculatedTotalPages = 1;
  let totalResults = 0;

  if (type === "movie") {
    const { data } = await tmdbClient.get("/search/movie", { params });
    combinedResults = data.results.map(item => ({ ...item, media_type: "movie" }));
    calculatedTotalPages = data.total_pages;
    totalResults = data.total_results;

  } else if (type === "tv") {
    const { data } = await tmdbClient.get("/search/tv", { params });
    combinedResults = data.results.map(item => ({ ...item, media_type: "tv" }));
    calculatedTotalPages = data.total_pages;
    totalResults = data.total_results;

  } else {
    const [moviesRes, tvRes] = await Promise.all([
      tmdbClient.get("/search/movie", { params }),
      tmdbClient.get("/search/tv", { params }),
    ]);
    combinedResults = [
      ...moviesRes.data.results.map(item => ({ ...item, media_type: "movie" })),
      ...tvRes.data.results.map(item => ({ ...item, media_type: "tv" })),
    ];
    calculatedTotalPages = Math.max(moviesRes.data.total_pages, tvRes.data.total_pages)
    totalResults = moviesRes.data.total_results + tvRes.data.total_results;
  }

  return {
    results: combinedResults.map(mediaMapper.toMinSummary),
    dataInfo: {
      page: Number(page),
      totalPages: Math.min(calculatedTotalPages, 500),
      totalResults,
    },
  };
};

const getWatchProvider = async (mediaType, id) => {
  const { data } = await tmdbClient.get(`/${mediaType}/${id}/watch/providers`);

  const providerBr = data.results?.BR;

  if (!providerBr) return { flatrate: [], free: [] };

  const flatrate = providerBr.flatrate
    ?.sort((a, b) => a.display_priority - b.display_priority)
    .slice(0, 2) ?? [];

  const free = providerBr.free ?? [];

  return { flatrate: flatrate, free: free };
};

//* OK
const getMediaDetails = async (mediaType, id) => {

  let params = { language: 'pt-BR' }
  if (mediaType === 'tv') {
    params['append_to_response'] = 'content_ratings,videos,credits,recommendations';
  }
  if (mediaType === 'movie') {
    params['append_to_response'] = 'release_dates,videos,credits,crew,recommendations';
  }

  const { data } = await tmdbClient.get(`/${mediaType}/${id}`, { params });
  const providers = await getWatchProvider(mediaType, id);
  console.log(providers)

  const mediaDetails = (mediaType === 'movie' ? mediaMapper.toFullDetailsMovie({...data, providers}) : mediaMapper.toFullDetailsSeries({...data, providers}));
  
  console.log(mediaDetails.providers)

  return { ...mediaDetails, providers};
}

//* OK
const getSerieSeasonDetails = async (id, seasonNumber) => {
  const { data } = await tmdbClient.get(`tv/${id}/season/${seasonNumber}`, {
    params: {
      language: 'pt-BR',
    },
  });

  const seasonDetails = mediaMapper.toSeasonDetails(data);

  return seasonDetails;
}

//* OK
const getMediaCredits = async (mediaType, id) => {
  const { data } = await tmdbClient.get(`/${mediaType}/${id}/credits`, {
    params: {
      language: 'pt-BR'
    }
  });

  const director = data.crew.find((person) => person.job === 'Director');
  const cast = data.cast.filter((person) => person.known_for_department === 'Acting').slice(0, 3);
  const credits = { crew: director, cast };

  return credits;
}

//* OK
const getMediaSimilar = async (mediaType, id) => {
  const { data } = await tmdbClient.get(`/${mediaType}/${id}/similar`, {
    params: {
      language: 'pt-BR'
    }
  });

  return data.results.sort((a, b) => b.vote_average - a.vote_average).slice(0, 10).map((media) => mediaMapper.toMinSummary(media, mediaType));
}

//* OK
const getMediaVideos = async (mediaType, id) => {
  const { data } = await tmdbClient.get(`/${mediaType}/${id}/videos`, {
    params: {
      language: 'pt-BR'
    }
  });

  const trailer = data?.results.length !== 0 ? data.results.sort((a, b) => new Date(a.published_at) - new Date(b.published_at)).find((video) => video.type === "Trailer" || video.type === "Teaser") : null;

  return trailer;
}


module.exports = { getPopular, getTrendings, getTopRated, getDiscover, getSearch, getGenreList, getMediaDetails, getSerieSeasonDetails, getMediaVideos }