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
    }, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Gallery", href: "#gallery" },
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
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <div className="w-full px-4 h-16 flex items-center justify-between">
        {/* Left Logo - Reduced size and moved to corner */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border-2 border-white/50 shadow-lg bg-white p-1">
          <img 
            src="/src/assets/deity_logo.png" 
            alt="Telugu Samiti Logo" 
            className="h-full w-full object-contain rounded-full"
          />
        </div>
        
        {/* Centered Symmetrical Title - Dynamically scaling and bold */}
        <div className="flex-grow flex items-center justify-center overflow-hidden px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={isTelugu ? "telugu" : "english"}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full text-center"
            >
              <h1 className="text-[clamp(1.2rem,10vw,5rem)] font-serif font-extrabold text-white drop-shadow-[0_0_20px_rgba(255,215,0,0.9)] whitespace-nowrap leading-tight transition-all duration-500 uppercase tracking-tight">
                {isTelugu ? "తెలుగు సమితి" : "Telugu Samiti"}
              </h1>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Hamburger Menu - Reduced size and moved to corner */}
        <div className="flex-shrink-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-full text-white hover:bg-white/10 transition-colors"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={32} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  className="flex flex-col space-y-1.5"
                >
                  <span className="w-8 h-0.5 bg-white rounded-full shadow-md"></span>
                  <span className="w-8 h-0.5 bg-white rounded-full shadow-md"></span>
                  <span className="w-8 h-0.5 bg-white rounded-full shadow-md"></span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Menu List with Gradient Transition */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gradient-to-b from-primary to-[#5a1219] border-t border-white/10 overflow-hidden"
          >
            <div className="w-full px-6 py-10 flex flex-col items-center space-y-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-xl font-serif font-medium text-white/90 hover:text-white hover:scale-110 transition-all duration-300"
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
