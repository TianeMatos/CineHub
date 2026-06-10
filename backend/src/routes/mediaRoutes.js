const { Router } = require("express");
const mediaController = require("../controllers/mediaController");
const cacheMiddleware = require("../middlewares/cacheMiddleware");

const router = Router();

//* GET /api/media/:mediaType/trending  -> /trending/all/week
router.get('/:mediaType/trendings', cacheMiddleware(86400), mediaController.trendings);

//* GET /api/media/:mediaType/top-rated -> Busca os dados de /movie/top_rated ou /tv/top_rated no TMDB
router.get('/:mediaType/topRated', cacheMiddleware(86400), mediaController.topRated);

//* GET /api/media/:mediaType/discover
router.get('/:mediaType/discover', mediaController.discover);

//* GET /api/media/:mediaType/genres -> Busca a lista oficial de gêneros e IDs do TMDB 
router.get('/:mediaType/genres', cacheMiddleware(86400), mediaController.genresList);

//* GET /api/media/:mediaType/:id/details -> Busca Detalhes de um filme ou serie.
router.get('/:mediaType/:id/details', mediaController.mediaDetails);

//* GET /api/media/:mediaType/:id/similar -> Busca similares de um filme ou serie.
router.get('/:mediaType/:id/similar', mediaController.mediaSimilar);

//* GET /api/media/:mediaType/:id/trailer
router.get('/:mediaType/:id/trailer', mediaController.mediaTrailer);

//* GET /api/media/:mediaType/:id/credits
router.get('/:mediaType/:id/credits', mediaController.mediaCredits);

module.exports = router;