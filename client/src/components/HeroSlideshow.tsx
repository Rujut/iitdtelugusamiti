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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative w-full h-[100vh] overflow-hidden bg-black">
      <div className="embla w-full h-full" ref={emblaRef}>
        <div className="embla__container flex w-full h-full">
          {SLIDES.map((slide) => (
            <div key={slide.id} className="embla__slide relative w-full h-full flex-[0_0_100%]">
              <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay for text readability */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover animate-pan"
              />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                <motion.h1 
                  key={slide.title}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="font-serif text-5xl md:text-7xl lg:text-9xl font-bold text-white mb-4 drop-shadow-lg"
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  key={slide.subtitle}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="font-sans text-xl md:text-2xl text-white/90 font-light tracking-widest uppercase drop-shadow-md"
                >
                  {slide.subtitle}
                </motion.p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-black/20 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm group"
      >
        <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
      </button>
      <button 
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-black/20 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm group"
      >
        <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
      </button>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white rounded-full" />
        </div>
      </div>
    </div>
  );
}
