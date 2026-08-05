import useEmblaCarousel from "embla-carousel-react";

import { MediaCard } from "./MediaCard";
import { usePrevNextButtons, NextButton, PrevButton } from "./ui/CarouselArrows";

export const MediaCarousel = ({ items }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: "auto"
  });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (

    <div className="my-10">
      <div className="relative w-full px-4 sm:px-8 md:px-12 group/carousel">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {items && items.map((item) => (
              <div 
                className="shrink-0 pl-4 w-1/3 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6" 
                key={`slide-${item.id}`}
              >
                <MediaCard key={`${item.mediaType}-${item.id}`} media={item} />
              </div>
            ))}
          </div>
        </div>
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>

  );
};