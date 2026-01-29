import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";

const SLIDES = [
  {
    id: 1,
    image: "/src/assets/hero1.png",
    title: "Celebrating Culture",
    subtitle: "Embracing Traditions at IIT Delhi"
  },
  {
    id: 2,
    image: "/src/assets/hero2.png",
    title: "Vibrant Community",
    subtitle: "Connecting Telugu Students Together"
  },
  {
    id: 3,
    image: "/src/assets/hero3.png",
    title: "Academic Excellence",
    subtitle: "Fostering Growth and Innovation"
  }
];

export function HeroSlideshow() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    duration: 30,
    skipSnaps: false,
    align: "start",
    containScroll: "trimSnaps"
  }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div className="embla w-full h-full overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex w-full h-full">
          {SLIDES.map((slide) => (
            <div key={slide.id} className="embla__slide relative w-full h-full flex-[0_0_100%] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 z-10" />
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover animate-pan"
              />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                <motion.h1 
                  key={slide.title}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]"
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  key={slide.subtitle}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="font-sans text-sm sm:text-lg md:text-2xl lg:text-3xl text-white/90 font-light tracking-[0.2em] sm:tracking-[0.3em] uppercase drop-shadow-md"
                >
                  {slide.subtitle}
                </motion.p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={scrollPrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-white/5 text-white hover:bg-primary transition-all duration-500 backdrop-blur-sm border border-white/10 group shadow-lg"
      >
        <ChevronLeft size={24} className="sm:w-8 sm:h-8 group-hover:-translate-x-1 transition-transform" />
      </button>
      <button 
        onClick={scrollNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-white/5 text-white hover:bg-primary transition-all duration-500 backdrop-blur-sm border border-white/10 group shadow-lg"
      >
        <ChevronRight size={24} className="sm:w-8 sm:h-8 group-hover:translate-x-1 transition-transform" />
      </button>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
    </div>
  );
}
