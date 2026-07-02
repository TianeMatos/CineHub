const popularFilter = (mediaList) => {
  if (!Array.isArray(mediaList)) return [];

  return mediaList.filter(media => {
    const isGoodRating = media.vote_average >= 6;
    const haveGoodCountVote = media.vote_count >= 100
    return isGoodRating && haveGoodCountVote;
  });
};

module.exports = popularFilter;