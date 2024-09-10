import express from "express";
import {
  getMovieDetails,
  getMovieTrailers,
  getTrendingMovie,
  getSimilarMovies,
  getMoviesByCategories
} from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending", getTrendingMovie); //TMDB Trending kısmında moviesdan çektim içerisindeki popular kısmından çektim
router.get("/:id/trailers", getMovieTrailers); //TMDB movies içerisinde moviesdeki videosdan alındı(burada tanımladığın /:x/trailer function kısmında da aynı olmak zorunda)
router.get("/:id/details", getMovieDetails); //TMDB deki movies altındaki details
router.get("/:id/similar",getSimilarMovies);
router.get("/:category",getMoviesByCategories) //TMDB movie list içerisindeki popular kısmından çektim
export default router;
