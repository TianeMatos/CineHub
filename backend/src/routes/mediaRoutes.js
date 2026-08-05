const { Router } = require("express");
const mediaController = require("../controllers/mediaController");
const cacheMiddleware = require("../middlewares/cacheMiddleware");

const router = Router();

const HOUR  = 60 * 60;
const DAY   = 60 * 60 * 24;
const WEEK  = 60 * 60 * 24 * 7;

// GET /api/media/search
router.get('/search', mediaController.search);

// GET /api/media/:mediaType/trending 
router.get('/:mediaType/trendings', cacheMiddleware(HOUR * 6), mediaController.trendings);

// GET /api/media/:mediaType/trending 
router.get('/:mediaType/popular', cacheMiddleware(HOUR * 6), mediaController.popularMedias);

// GET /api/media/:mediaType/topRated 
router.get('/:mediaType/topRated', cacheMiddleware(DAY), mediaController.topRated);

// GET /api/media/:mediaType/discover
router.get('/:mediaType/discover', mediaController.discover);

// GET /api/media/:mediaType/genres 
router.get('/:mediaType/genres', cacheMiddleware(WEEK), mediaController.genresList);

// GET /api/media/:mediaType/:id/details
router.get('/:mediaType/:id/details', mediaController.mediaDetails);

// GET /api/media/:id/:seasonNumber
router.get('/:id/:seasonNumber', mediaController.serieSeasonDetails);

module.exports = router;