import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronsDown } from "lucide-react";
import { useCallback, useRef, useState, useEffect } from "react";
import hero1 from "@/assets/hero1.png";
import hero2 from "@/assets/hero2.png";
import hero3 from "@/assets/hero3.png";
import hero4 from "@/assets/hero4.png";
import hero6 from "@/assets/hero6.png";

const SLIDES = [
  { id: 3, image: hero1, title: "Welcome to IITD Telugu Samiti!" },
  { id: 1, image: hero6, title: "Ugadi Celebrations"},
  { id: 2, image: hero3, title: "Freshers - New Beginnings"},
  { id: 4, image: hero4, title: "Farewell - Lasting Memories"}
  
];

export function HeroSlideshow() {
  const [isCinematic, setIsCinematic] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);

  const autoplayPlugin = useRef(
    Autoplay({
      delay: 7000,
      stopOnInteraction: false,
      stopOnMouseEnter: false
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      duration: 60,
      skipSnaps: false,
      align: "start",
      containScroll: "trimSnaps",
      draggable: !isFrozen
    },
    isFrozen ? [] : [autoplayPlugin.current]
  );

  const longPressTimerRef = useRef<number | null>(null);

  const handlePointerDown = () => {
    setIsFrozen(true);          // 🔥 fully detach autoplay
    

    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }

    longPressTimerRef.current = window.setTimeout(() => {
      setIsCinematic(true);
      window.dispatchEvent(
        new CustomEvent("cinematic-mode", { detail: true })
      );
    }, 200);
  };

  const handlePointerUp = () => {
    setIsFrozen(false);         // 🔥 reattach autoplay
    if(longPressTimerRef.current){
    	clearTimeout(longPressTimerRef.current);
	}
	if(isCinematic){
	setIsCinematic(false);
    window.dispatchEvent(
      new CustomEvent("cinematic-mode", { detail: false })
    );
    }
  };

  useEffect(() => {
    return () => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
      }
    };
  }, []);

  const scrollPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollToAbout = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    const aboutSection = document.getElementById("about");
    if (aboutSection) aboutSection.scrollIntoView({ behavior: "smooth" });
  }, []);

  const transitionClass = "transition-all duration-500 ease-in-out";
  const hiddenClass = "opacity-0 pointer-events-none translate-y-[-10px]";
  const visibleClass = "opacity-100 translate-y-0";

  return (
    <div
      className="hero-no-callout relative w-full h-screen overflow-hidden bg-black select-none"
      style={{ touchAction: "pan-y" }}
      onContextMenu={(e) => e.preventDefault()}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
    <style>
        {`
          @keyframes colorShift {
            0% { color: #ffd700; text-shadow: 0 0 15px rgba(255,215,0,0.4); }
            33% { color: #ff8c00; text-shadow: 0 0 15px rgba(255,140,0,0.4); }
            66% { color: #ff6b6b; text-shadow: 0 0 15px rgba(255,107,107,0.4); }
            100% { color: #ffd700; text-shadow: 0 0 15px rgba(255,215,0,0.4); }
          }
          .animate-color-shift {
            animation: colorShift 6s infinite alternate ease-in-out;
          }
        `}
      </style>
      <div className="embla w-full h-full overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex w-full h-full">
          {SLIDES.map((slide) => (
            <div
              key={slide.id}
              className="embla__slide relative w-full h-full flex-[0_0_100%] overflow-hidden"
            >
            <div className="absolute inset-0 bg-black/40 z-10" />
              

              <img
                src={slide.image}
                alt={slide.title}
                draggable={false}
                className="
w-full h-full
object-fill
sm:object-fill
lg:object-fill
object-center
select-none pointer-events-none
"
              />

              
             <div
  className={`absolute inset-x-0 z-20 flex flex-col items-center text-center px-4 hero-title-container ${transitionClass} ${
    isCinematic ? hiddenClass : visibleClass
  }`}
  style={{ top: window.innerWidth < 400 ? "135px" : "160px" }}
>
              
                <motion.h1
                  key={`${slide.id}-title`}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.6, ease: "easeOut" }}
                  className="
hero-title
hero-gradient-title
drop-shadow-[0_4px_12px_black]
text-[clamp(7.2rem,4.5vw,3.4rem)]
"
                >
                  {slide.title}
                </motion.h1>

              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={scrollPrev}
        className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-white/5 text-white hover:bg-primary ${transitionClass} backdrop-blur-sm border border-white/10 group shadow-lg ${
          isCinematic ? hiddenClass : visibleClass
        }`}
      >
        <ChevronLeft size={24} className="sm:w-8 sm:h-8 group-hover:-translate-x-1 transition-transform" />
      </button>

      <button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={scrollNext}
        className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-white/5 text-white hover:bg-primary ${transitionClass} backdrop-blur-sm border border-white/10 group shadow-lg ${
          isCinematic ? hiddenClass : visibleClass
        }`}
      >
        <ChevronRight size={24} className="sm:w-8 sm:h-8 group-hover:translate-x-1 transition-transform" />
      </button>

      <div
        onPointerDown={(e) => e.stopPropagation()}
        onClick={scrollToAbout}
        className={`absolute bottom-12 inset-x-0 z-40 flex justify-center cursor-pointer group ${transitionClass} ${
          isCinematic ? hiddenClass : visibleClass
        }`}
      >
      
        <motion.div
  animate={{ y: [0, 10, 0] }}
  transition={{ repeat: Infinity, duration: 1.5 }}
  className="flex flex-col items-center justify-center text-center"
>
  <ChevronsDown
  size={40}
  className="mx-auto block text-white drop-shadow-lg max-[399px]:scale-75"
/>
  <span className="mt-2 text-sm max-[399px]:text-[0.65rem] tracking-[0.25em] text-white font-bold text-center">
    EXPLORE
  </span>
</motion.div>

      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 z-30 bg-gradient-to-t from-background via-background/30 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-[3px] z-40 bg-gradient-to-r from-transparent via-primary/80 to-transparent" />
    </div>
  );
}

