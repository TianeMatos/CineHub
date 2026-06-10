const tmdbClient = require("../config/tmdb");
const mediaMapper = require("../utils/mediaMapper");
const popularFilter = require("../utils/popularFilter");
const shuffleMedia = require("../utils/shuffleMedia");

//* OK not using
const getTop = async (mediaType) => {
  const { data } = await tmdbClient.get(`/${mediaType}/popular`, { params: { language: 'pt-BR', region: 'BR' } });

  return data.results.slice(0, 10).map((media) => mediaMapper.toMinSummary(media, mediaType));
}

//* OK
const getTrendings = async (mediaType) => {
  const { data } = await tmdbClient.get(`/trending/${mediaType}/week`, { params: { language: 'pt-BR' } });
  const rawResults = data?.results ?? [];

  const filtered = popularFilter(rawResults); 
  // const shuffled = shuffleMedia(filtered);    
  const mapped = filtered.slice(0, 10).map((media) => mediaMapper.toMinSummary(media, mediaType)); 

  return mapped;
}

//* OK
const getTopRated = async (mediaType, voteAverage, page) => {
  const { data } = await tmdbClient.get(`/${mediaType}/top_rated`, { 
    params: { 
      language: 'pt-BR', 
      region: 'BR',
      ...(voteAverage  && { page: page, 'vote_count.gte': 1000, 'vote_average.gte': voteAverage })
    } 
  });

  return data.results.map((media) => mediaMapper.toMinSummary(media, mediaType));
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
  const { data } = await tmdbClient.get(`/discover/${mediaType}`, { 
    params: { 
      language: 'pt-BR', 
      region: 'BR',
      page,
      sort_by: sortBy,
      ...(genre !== 0 && { with_genres: genre }),
      ...(sortBy === "vote_average.desc" && { 'vote_count.gte': 700 }),
      ...(sortBy === "primary_release_date.desc" && { 'vote_count.gte': 100, 'vote_average.gte': 1.0 })
    } 
  });
  const dataInfo = {page: data.page, totalPages: data.total_pages, totalResults: data.total_results} 

  return { results: data.results.map((media) => mediaMapper.toMinSummary(media, mediaType)), dataInfo };
}

const getSearch = async (page, query) => {
  const { data } = await tmdbClient.get(`/search/multi`, { 
    params: { 
      language: 'pt-BR', 
      page,
      query
    } 
  });
  const dataInfo = {page: data.page, totalPages: data.total_pages, totalResults: data.total_results} 

  return { results: data.results.map((media) => mediaMapper.toMinSummary(media)), dataInfo };
}

//* OK
const getMediaDetails = async (mediaType, id) => {
  const { data } = await tmdbClient.get(`/${mediaType}/${id}`, { 
    params: { 
      language: 'pt-BR'
    } 
  });
  const mediaDetails = mediaMapper.toFullDetails(data)

  return mediaDetails;
}

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

const getMediaVideos = async (mediaType, id) => {
  const { data } = await tmdbClient.get(`/${mediaType}/${id}/videos`, { 
    params: { 
      language: 'pt-BR'
    } 
  });

  const trailer = data?.results.length !== 0 ? data.results.sort((a, b) => b.published_at - a.published_at).slice(0, 10).find((video) => video.type === "Trailer" || video.type === "Teaser") : null;

  return trailer;
}

module.exports = { getTop, getTrendings, getTopRated, getDiscover, getSearch, getGenreList, getMediaDetails, getMediaCredits, getMediaSimilar, getMediaVideos }