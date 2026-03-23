import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import deityLogo from "@/assets/deity_logo.png";
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isTelugu, setIsTelugu] = useState(false);
  const [isCinematic, setIsCinematic] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleCinematic = (e: any) => {
      setIsCinematic(e.detail);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("cinematic-mode", handleCinematic);
    
    const interval = setInterval(() => {
      setIsTelugu(prev => !prev);
    }, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("cinematic-mode", handleCinematic);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
  { name: "Home", href: "/" },
  { name: "Gallery", href: "/gallery_collection" },
  { name: "Events", href: "#events" },
  { name: "Alumni", href: "/alumini" },
  { name: "Admin", href: "/admin/login" },
  { name: "Contact Us", href: "/contact_us" },
];

  return (
    <motion.nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 max-w-screen overflow-x-hidden z-50 transition-all duration-300 ease-in-out ${
        scrolled || isOpen ? "bg-primary shadow-lg py-1" : "bg-transparent py-2"
      } ${isCinematic ? "opacity-0 -translate-y-full pointer-events-none" : "opacity-100 translate-y-0"}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut",}}
    >
      <div className="w-full pl-2 pr-4 h-14 flex items-center justify-between overflow-hidden">
        {/* Left Logo */}
        <div className="flex-shrink-0 w-14 h-14 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center">
  <img 
    src={deityLogo}
    alt="Telugu Samiti Logo"
    className="h-full w-full object-contain"
  />
</div>


        
        {/* Centered Symmetrical Title - Top-to-Bottom Entrance & Glow */}
        <div className="flex-grow flex items-center justify-center h-full relative overflow-hidden px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={isTelugu ? "telugu" : "english"}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full text-center"
            >
              <h1
		  className="
		    font-serif
		    font-bold
		    text-white
		    whitespace-nowrap
		    leading-none
		    drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]
		    transition-all
		    duration-500
		    max-[399px]:text-[1.65rem]
		    text-[clamp(2.0rem,4.5vw,3.5rem)]">
		  {isTelugu ? "తెలుగు సమితి" : "Telugu Samiti"}
		</h1>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Hamburger Menu */}
        <div className="flex-shrink-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-0.5 py-1.5 rounded-full text-white hover:bg-white/10 transition-colors"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={28} />
                </motion.div>
              ) : (
                <motion.div
  key="menu"
  initial={{ rotate: 90, opacity: 0 }}
  animate={{ rotate: 0, opacity: 1 }}
  exit={{ rotate: -90, opacity: 0 }}
  className="flex flex-col space-y-2 group"
>
  <span className="w-8 h-[2px] bg-white rounded-full drop-shadow-[0_10px_8px_black] transition-all duration-300 group-hover:w-8"></span>
  <span className="w-8 h-[2px] bg-white rounded-full drop-shadow-[0_20px_8px_black] transition-all duration-300 group-hover:w-8"></span>
  <span className="w-8 h-[2px] bg-white rounded-full drop-shadow-[0_20px_8px_black] transition-all duration-300 group-hover:w-8"></span>
</motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gradient-to-b from-primary via-primary/10 to-[#1f6f69] border-t border-white/10 overflow-hidden"
          >
            <div className="w-full px-6 py-10 flex flex-col items-center space-y-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-lg sm:text-xl font-serif font-medium text-white/90 hover:text-white hover:scale-110 transition-all duration-300"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

