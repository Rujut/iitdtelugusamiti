import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isTelugu, setIsTelugu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    
    const interval = setInterval(() => {
      setIsTelugu(prev => !prev);
    }, 4000);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled || isOpen ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white/80 backdrop-blur-sm"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        {/* Animated Header Section with sliding text */}
        <div className="flex items-center w-full max-w-2xl">
          <img 
            src="/src/assets/deity_logo.png" 
            alt="Cultural Logo" 
            className="h-16 w-16 object-contain"
          />
          
          <div className="flex-1 flex flex-col items-center justify-center overflow-hidden h-16 mx-4 relative">
            <AnimatePresence mode="wait">
              {isTelugu ? (
                <motion.h1
                  key="telugu"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="text-2xl md:text-3xl font-serif font-bold text-[#333] drop-shadow-sm text-center whitespace-nowrap"
                >
                  తెలుగు సమితి, ఐఐటీ ఢిల్లీ
                </motion.h1>
              ) : (
                <motion.h1
                  key="english"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="text-2xl md:text-3xl font-serif font-bold text-[#333] drop-shadow-sm text-center whitespace-nowrap"
                >
                  Telugu Samiti, IIT Delhi
                </motion.h1>
              )}
            </AnimatePresence>
          </div>

          <img 
            src="/src/assets/iitd_emblem.png" 
            alt="IIT Delhi Emblem" 
            className="h-16 w-16 object-contain"
          />
        </div>

        {/* Hamburger Menu Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="ml-4 p-2 rounded-full text-primary hover:bg-muted transition-colors"
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
                <span className="w-8 h-1 bg-primary rounded-full"></span>
                <span className="w-8 h-1 bg-primary rounded-full"></span>
                <span className="w-8 h-1 bg-primary rounded-full"></span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col space-y-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-serif font-bold text-foreground hover:text-primary pl-4 border-l-4 border-transparent hover:border-secondary transition-all"
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
