import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
        scrolled || isOpen ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center h-full py-2">
          <img 
            src="/src/assets/logo.png" 
            alt="Telugu Samiti Logo" 
            className="h-full object-contain drop-shadow-sm" 
          />
          <div className={`ml-4 font-serif text-2xl font-bold tracking-wide hidden md:block ${
            scrolled || isOpen ? "text-primary" : "text-white"
          }`}>
            Telugu Samiti
          </div>
        </div>

        {/* Desktop Menu - Optional, user asked for hamburger primarily but usually desktop has links */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`font-medium text-lg hover:text-secondary transition-colors ${
                scrolled ? "text-foreground" : "text-white/90"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile/Hamburger Menu Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden p-2 rounded-full transition-colors ${
            scrolled || isOpen ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"
          }`}
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
              >
                <Menu size={32} />
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
