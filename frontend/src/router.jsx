import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { TopRated } from "./pages/TopRated";
import { MediaPageDetails } from "./pages/MediaPageDetails";
import { SearchPage } from "./pages/Search";
import { ExploreMedia } from "./pages/ExploreMedia";
// import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },                     
      { path: "movies", element: <ExploreMedia key={"MoviesPage"} mediaType={`movie`} title={`Filmes`} description={`Explore nossa coleção completa de filmes`} /> },                 
      { path: "series", element: <ExploreMedia key={"SeriesPage"} mediaType={`tv`} title={`Séries`} description={`Descubra as melhores séries de todos os tempos`} /> },                 
      { path: "topRated", element: <TopRated /> },           
      { path: "/:mediaType/:id", element: <MediaPageDetails /> },     
      { path: "/search", element: <SearchPage /> },  
      // { path: "*", element: <NotFound /> },
    ],
  },
]);
