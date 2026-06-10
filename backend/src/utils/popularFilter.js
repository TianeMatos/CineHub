const popularFilter = (mediaList) => {
  if (!Array.isArray(mediaList)) return [];

  return mediaList.filter(media => {
    const hasPoster = media.poster_path !== null && media.poster_path !== undefined;
    const isGoodRating = media.vote_average >= 7;
    const hasOverview = media.overview && media.overview.trim() !== "";

    return hasPoster && isGoodRating && hasOverview;
  });
};

module.exports = popularFilter;