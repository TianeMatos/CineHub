import { LoadingScreen } from "../components/ui/LoadingScreen";
import { ErrorScreen } from "../components/ui/ErrorScreen";
import { useParams } from "react-router";
import { MovieDetails } from "../components/details/MovieDetails";
import { useMediaDetails } from "../hooks/useMediaDetails";
import { SeriesDetails } from "../components/details/SerieDetails";

export function MediaDetails() {
  const { mediaType, id } = useParams();

  const { details, loading, error } = useMediaDetails(mediaType, id);

  if (loading) return <LoadingScreen key={`LoadingScreen`} />
  if (error) return  <ErrorScreen key={`ErrorScreen`} message={error} />

  return mediaType === 'movie' ? (
    <MovieDetails
      key={`${mediaType}-details-${id}`}
      details={details}
    />
  ) : (
    <SeriesDetails 
      key={`${mediaType}-details-${id}`} 
      details={details}
    />
  );
}
