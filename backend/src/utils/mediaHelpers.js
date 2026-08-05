const popularFilter = (mediaList) => {
  if (!Array.isArray(mediaList)) return [];

  return mediaList.filter(media => {
    const isGoodRating = media.vote_average >= 6;
    const haveGoodCountVote = media.vote_count >= 100
    return isGoodRating && haveGoodCountVote;
  });
};

const shuffleMedia = (mediaList) => {
  if (!Array.isArray(mediaList)) return [];
  
  const listCopy = [...mediaList];
  
  // Algoritmo de embaralhamento (Fisher-Yates)
  for (let i = listCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [listCopy[i], listCopy[j]] = [listCopy[j], listCopy[i]];
  }
  
  return listCopy;
};

module.exports = { popularFilter, shuffleMedia };