import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const usePrevNextButtons = (emblaApi) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, []);

  useEffect(() => {
    if (!emblaApi) return

    emblaApi.on('init', onSelect).on('reInit', onSelect).on('select', onSelect)

    return () => {
      emblaApi
        .off('init', onSelect)
        .off('reInit', onSelect)
        .off('select', onSelect)
    }
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  }
}

export const PrevButton = (props) => {
  const { disabled, ...restProps } = props

  return (
    <button
      type='button' 
      {...restProps}
      disabled={disabled} 
      className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 hidden group-hover/carousel:disabled:hidden group-hover/carousel:flex items-center justify-center bg-black/90 hover:bg-[#fbbf24] text-white hover:text-black p-3 rounded-full transition-all duration-300 shadow-xl hover:scale-110 cursor-pointer`}
      aria-label="Voltar slides"
    >
      <ChevronLeft className="w-6 h-6" /> 
    </button>
  )
}

export const NextButton = (props) => {
  const { disabled, ...restProps } = props

  return (
    <button
      type='button' 
      {...restProps}
      disabled={disabled}
      className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 hidden group-hover/carousel:disabled:hidden group-hover/carousel:flex items-center justify-center bg-black/90 hover:bg-[#fbbf24] text-white hover:text-black p-3 rounded-full transition-all duration-300 shadow-xl hover:scale-110 cursor-pointer`}
      aria-label="Avançar slides"
    >
      <ChevronRight className="w-6 h-6" />
    </button>
  )
}