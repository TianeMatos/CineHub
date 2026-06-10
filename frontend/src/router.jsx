import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { MediaPage } from "./pages/MediaPage";
import { TopRated } from "./pages/TopRated";
import { MediaPageDetails } from "./pages/MediaPageDetails";
// import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, // Ajustado para a sintaxe padrão estável (element)
    children: [
      { index: true, element: <Home /> },                     
      { path: "filmes", element: <MediaPage mediaType={`movie`} title={`Filmes`} description={`Explore nossa coleção completa de filmes`} /> },                 
      { path: "series", element: <MediaPage mediaType={`tv`} title={`Séries`} description={`Descubra as melhores séries de todos os tempos`} /> },                 
      { path: "topRated", element: <TopRated /> },           
      { path: "/:mediaType/:id", element: <MediaPageDetails /> },     
      // { path: "*", element: <NotFound /> },
    ],
  },
]);
