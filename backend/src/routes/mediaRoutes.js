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

// GET /api/media/:mediaType/topRated 
router.get('/:mediaType/topRated', cacheMiddleware(DAY), mediaController.topRated);

// GET /api/media/:mediaType/discover
router.get('/:mediaType/discover', mediaController.discover);

// GET /api/media/:mediaType/genres 
router.get('/:mediaType/genres', cacheMiddleware(WEEK), mediaController.genresList);

// GET /api/media/:mediaType/:id/details
router.get('/:mediaType/:id/details', cacheMiddleware(DAY), mediaController.mediaDetails);

// GET /api/media/:mediaType/:id/similar 
router.get('/:mediaType/:id/similar', cacheMiddleware(DAY), mediaController.mediaSimilar);

// GET /api/media/:mediaType/:id/trailer
router.get('/:mediaType/:id/trailer', cacheMiddleware(WEEK), mediaController.mediaTrailer);

// GET /api/media/:mediaType/:id/credits
router.get('/:mediaType/:id/credits', cacheMiddleware(WEEK), mediaController.mediaCredits);

module.exports = router;