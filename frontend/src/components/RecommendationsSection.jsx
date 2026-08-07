import { MediaCarousel } from "./MediaCarousel";

export const RecommendationsSection = ({ recommendations }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-white my-7 px-4 sm:px-12">
        Veja Também
      </h2>
      <MediaCarousel key={`recommendations`} items={recommendations} />
    </section>
  );
};
