import { LoadingScreen } from "../components/ui/LoadingScreen";
import { ErrorScreen } from "../components/ui/ErrorScreen";
import { useParams } from "react-router";
import { MediaDetails } from "../components/MediaDetails";
import { useMediaDetails } from "../hooks/useMediaDetails";

export function MediaPageDetails() {
  const { mediaType, id } = useParams()

  const { details, similar, trailer, credits, loading, error } = useMediaDetails(mediaType, id);

  if (loading) return <LoadingScreen key={`LoadingScreen`} />
  if (error) return  <ErrorScreen key={`ErrorScreen`} message={error} />

  return (
    <MediaDetails key={`${mediaType}-details-${id}`} mediaData={details} similarMovies={similar} trailer={trailer} credits={credits} />
  );
}
