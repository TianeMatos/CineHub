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

module.exports = shuffleMedia;