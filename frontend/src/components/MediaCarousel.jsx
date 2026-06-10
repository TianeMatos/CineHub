// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Slider from "react-slick";
// import "../styles/carousel.css";
// import { MediaCard } from "./MediaCard";

// function NextArrow({ onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/90 hover:bg-[#fbbf24] text-white hover:text-black p-3 rounded-full transition-all duration-300 shadow-xl hover:scale-110"
//       style={{ right: '-20px' }}
//     >
//       <ChevronRight className="w-6 h-6" />
//     </button>
//   );
// }

// function PrevArrow({ onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/90 hover:bg-[#fbbf24] text-white hover:text-black p-3 rounded-full transition-all duration-300 shadow-xl hover:scale-110"
//       style={{ left: '-20px' }}
//     >
//       <ChevronLeft className="w-6 h-6" />
//     </button>
//   );
// }

// export const MediaCarousel = ({ medias }) => {
//   const settings = {
//     dots: false,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 6,
//     slidesToScroll: 3,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     responsive: [
//       {
//         breakpoint: 1280,
//         settings: {
//           slidesToShow: 5,
//           slidesToScroll: 2,
//         }
//       },
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 4,
//           slidesToScroll: 2,
//         }
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 2,
//         }
//       },
//       {
//         breakpoint: 640,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         }
//       }
//     ]
//   };
 
//   return (
//     <div className="relative px-12">
//       <Slider se {...settings}>
//         {medias.map((media) => (
//           <div key={`div-${media.id}`} className="px-2">
//             <MediaCard key={`${media.mediaType}-${media.id}`} {...media} />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// }

import useEmblaCarousel from "embla-carousel-react";

import { MediaCard } from "./MediaCard";
import { usePrevNextButtons, NextButton, PrevButton } from "./ui/CarouselArrows";

export const MediaCarousel = ({ medias }) => {

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
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
      <div className="relative w-full px-8 md:px-12 group/carousel">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {medias.map((media) => (
              <div 
                className="shrink-0 pl-4 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6" 
                key={`slide-${media.id}`}
              >
                <MediaCard {...media} />
              </div>
            ))}
          </div>
        </div>
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>

  );
};