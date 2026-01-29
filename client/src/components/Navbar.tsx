import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isTelugu, setIsTelugu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    
    const interval = setInterval(() => {
      setIsTelugu(prev => !prev);
    }, 5000); // Slower transition for smoothness

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Events", href: "#events" },
    { name: "Alumni", href: "#alumni" },
    { name: "Admin", href: "#admin" },
    { name: "Contact Us", href: "#contact" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled || isOpen ? "bg-primary shadow-lg py-1" : "bg-transparent py-4"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between overflow-hidden">
        {/* Left Logo */}
        <div className="flex-shrink-0 w-12 md:w-16">
          <img 
            src="/src/assets/deity_logo.png" 
            alt="Cultural Logo" 
            className="h-12 w-12 md:h-16 md:w-16 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
          />
        </div>
        
        {/* Centered Symmetrical Title - Responsive Font Size */}
        <div className="flex-grow flex flex-col items-center justify-center overflow-hidden h-16 relative px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={isTelugu ? "telugu" : "english"}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }} // Smoother transition
              className="text-center"
            >
              <h1 className="text-base sm:text-lg md:text-2xl lg:text-3xl font-serif font-bold text-white drop-shadow-[0_0_10px_rgba(255,215,0,0.6)] whitespace-normal line-clamp-2 leading-tight animate-pulse">
                {isTelugu ? "తెలుగు సమితి, ఐఐటీ ఢిల్లీ" : "Telugu Samiti, IIT Delhi"}
              </h1>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right 3-Pin Menu */}
        <div className="flex-shrink-0 w-12 md:w-16 flex justify-end">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded-full text-white hover:bg-white/10 transition-colors"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={28} className="md:w-9 md:h-9" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  className="flex flex-col space-y-1 md:space-y-1.5"
                >
                  <span className="w-6 h-1 md:w-8 md:h-1 bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.5)]"></span>
                  <span className="w-6 h-1 md:w-8 md:h-1 bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.5)]"></span>
                  <span className="w-6 h-1 md:w-8 md:h-1 bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.5)]"></span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-primary border-t border-white/10 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col space-y-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-serif font-bold text-white hover:text-secondary pl-4 border-l-4 border-transparent hover:border-secondary transition-all"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
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
