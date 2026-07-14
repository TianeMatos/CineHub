const { getPopular, getTopSeries, getTrendings, getTopRated, getDiscover, getGenreList, getMediaDetails, getMediaSimilar, getMediaVideos, getMediaCredits, getSearch, getSerieSeasonDetails } = require("../services/mediaService");
const AppError = require("../utils/AppError");
const popularFilter = require("../utils/popularFilter");
const shuffle = require("../utils/shuffleMedia");

const mediaController = {
  //* OK
  popularMedias: async (req, res, next) => {
    const { mediaType } = req.params;

    if (mediaType !== 'movie' && mediaType !== 'tv') {
      return next(new AppError("Tipo de mídia inválido", 400));
    }

    try {
      const media = await getPopular(mediaType);

      const shuffledPopular = shuffle(media);
      res.json(media);
    } catch (error) {
      console.log("Error: ", error);
      next(error);
    }
  },
  
  //* OK
  trendings: async (req, res, next) => {
    const { mediaType } = req.params;

    if (mediaType !== 'movie' && mediaType !== 'tv') {
      return next(new AppError("Tipo de mídia inválido", 400));
    }

    try {
      const trendings = await getTrendings(mediaType);

      res.status(200).json(trendings);
    } catch (error) {
      console.log("Error: ", error);
      next(error);
    }
  },

  //* OK
  topRated: async (req, res, next) => {
    const { mediaType } = req.params;
    const { voteAverage, page } = req.query;

    if (mediaType !== 'movie' && mediaType !== 'tv') {
      return next(new AppError("Tipo de mídia inválido", 400));
    }
    
    try {
      const media = await getTopRated(mediaType, Number(voteAverage), Number(page));

      res.status(200).json(media);
    } catch (error) {
      console.log("Error: ", error);
      next(error);
    }
  },

  //* OK
  discover: async (req, res, next) => {
    const { mediaType } = req.params;
    const { page = 1, genre, sortBy = 'popularity.desc' } = req.query;

    if (mediaType !== 'movie' && mediaType !== 'tv') {
      return next(new AppError("Tipo de mídia inválido", 400));
    }

    const pageNumber = Number(page);
    const genreId = genre ? Number(genre) : 0;
    try {
      const media = await getDiscover(mediaType, pageNumber, genreId, sortBy);

      res.status(200).json(media);
    } catch (error) {
      console.log("Error: ", error);
      next(error);
    }
  },

  //* OK
  search: async (req, res, next) => {
    const { page = 1, q: query } = req.query;

    const pageNumber = Number(page);
    try {
      const media = await getSearch(pageNumber, query);

      res.status(200).json(media);
    } catch (error) {
      console.log("Error: ", error);
      next(error);
    }
  },

  //* OK
  mediaDetails: async (req, res, next) => {
    const { mediaType, id } = req.params;

    if (mediaType !== 'movie' && mediaType !== 'tv') {
      return next(new AppError("Tipo de mídia inválido", 400));
    }

    try {
      const details = await getMediaDetails(mediaType, id);

      res.status(200).json(details);
    } catch (error) {
      console.log("Error: ", error);
      next(error);
    }
  },

  serieSeasonDetails: async (req, res, next) => {
    const { id, seasonNumber } = req.params;

    // if (mediaType !== 'movie' && mediaType !== 'tv') {
    //   return next(new AppError("Número da Temporada inválido!", 400));
    // }

    try {
      const seasonDetails = await getSerieSeasonDetails(id, seasonNumber);

      res.status(200).json(seasonDetails);
    } catch (error) {
      console.log("Error: ", error);
      next(error);
    }
  },

  // mediaCredits: async (req, res, next) => {
  //   const { mediaType, id } = req.params;

  //   if (mediaType !== 'movie' && mediaType !== 'tv') {
  //     return next(new AppError("Tipo de mídia inválido", 400));
  //   }

  //   try {
  //     const credits = await getMediaCredits(mediaType, id);

  //     res.status(200).json(credits);
  //   } catch (error) {
  //     console.log("Error: ", error);
  //     next(error);
  //   }
  // },

  // mediaSimilar: async (req, res, next) => {
  //   const { mediaType, id } = req.params;

  //   if (mediaType !== 'movie' && mediaType !== 'tv') {
  //     return next(new AppError("Tipo de mídia inválido", 400));
  //   }

  //   try {
  //     const silimarList = await getMediaSimilar(mediaType, id);

  //     res.status(200).json(silimarList);
  //   } catch (error) {
  //     console.log("Error: ", error);
  //     next(error);
  //   }
  // },

  genresList: async (req, res, next) => {
    const { mediaType } = req.params;

    if (mediaType !== 'movie' && mediaType !== 'tv') {
      return next(new AppError("Tipo de mídia inválido", 400));
    }

    try {
      const genreList = await getGenreList(mediaType);

      res.status(200).json(genreList);
    } catch (error) {
      console.log("Error: ", error);
      next(error);
    }
  },

  // mediaTrailer: async (req, res, next) => {
  //   const { mediaType, id } = req.params;

  //   if (mediaType !== 'movie' && mediaType !== 'tv') {
  //     return next(new AppError("Tipo de mídia inválido", 400));
  //   }

  //   try {
  //     const trailer = await getMediaVideos(mediaType, id);

  //     res.status(200).json(trailer);
  //   } catch (error) {
  //     console.log("Error: ", error);
  //     next(error);
  //   }
  // },

}

module.exports= mediaController;