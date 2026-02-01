import { Navbar } from "@/components/Navbar";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { NoticeBoard } from "@/components/NoticeBoard";
import { FeedbackSection } from "@/components/FeedbackSection";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Github, Linkedin, Twitter, Instagram, ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const aboutContent = {
  english: {
    title: "About Telugu Samiti",
    text: "The Telugu Samiti at IIT Delhi is a vibrant community dedicated to preserving and promoting the rich cultural heritage of the Telugu-speaking people. We organize various events, festivals, and gatherings that bring students, faculty, and alumni together, fostering a sense of home away from home.",
    button: "Know More"
  },
  telugu: {
    title: "తెలుగు సమితి గురించి",
    text: "ఐఐటీ ఢిల్లీలోని తెలుగు సమితి, తెలుగు మాట్లాడే ప్రజల గొప్ప సాంస్కృతిక వారసత్వాన్ని పరిరక్షించడానికి మరియు ప్రోత్సహించడానికి అంకితమైన ఒక శక్తివంతమైన సంఘం. మేము విద్యార్థులు, అధ్యాపకులు మరియు పూర్వ విద్యార్థులను ఏకతాటిపైకి తెచ్చే వివిధ కార్యక్రమాలు, పండుగలు మరియు సమావేశాలను నిర్వహిస్తాము.",
    button: "మరింత తెలుసుకోండి"
  }
};

const EVENTS = [
  { id: 1, title: "Ugadi", image: "/src/assets/ugadi.png" },
  { id: 2, title: "Freshers", image: "/src/assets/freshers.png" },
  { id: 3, title: "Farewell", image: "/src/assets/farewell.png" },
];

// Custom paths for member links
const MEMBER_LINKS = {
  faculty1: "#faculty-1-profile",
  faculty2: "#faculty-2-profile",
  designer1: "#designer-1-profile",
  designer2: "#designer-2-profile",
};

export default function Home() {
  const [lang, setLang] = useState<"english" | "telugu">("english");

  const toggleLang = () => {
    setLang(l => l === "english" ? "telugu" : "english");
  };

  return (
    <div className="w-full bg-background font-sans selection:bg-primary/20 flex flex-col min-h-screen">
      <Navbar />
      
      <main className="w-full flex-grow">
        <HeroSlideshow />

        {/* Subtle Modern Line Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent my-12" />

        {/* About Section with Toggle Switch */}
        <section id="about" className="w-full py-16 px-4 md:px-0 bg-background relative z-30">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full max-w-4xl"
            >
              <div className="section-box bg-white p-8 md:p-16 flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-secondary/10 transition-all duration-700"></div>
                
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-4xl md:text-5xl font-serif font-bold text-primary">
                    {aboutContent[lang].title}
                  </h3>
                  
                  {/* Language Toggle Switch */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-primary font-mono">{lang === 'english' ? 'Telugu అ' : 'English A'}</span>
                    <button 
                      onClick={toggleLang}
                      className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${lang === 'telugu' ? 'bg-primary' : 'bg-muted'}`}
                    >
                      <motion.div 
                        animate={{ x: lang === 'telugu' ? 28 : 2 }}
                        className="absolute top-1 left-0 w-5 h-5 bg-white rounded-full shadow-sm"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={lang}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10">
                      {aboutContent[lang].text}
                    </p>
                    
                    <Button className="bg-primary hover:bg-primary/90 text-white text-base px-5 py-3 rounded-full shadow-md hover:shadow-lg transition-all">
                      {aboutContent[lang].button}
                    </Button>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </section>

        <NoticeBoard />

        {/* Events Section - Matching Slideshow Subtitle Size */}
        <section id="events" className="w-full py-20 bg-slate-50/50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-col items-center mb-16">
              <div className="w-20 h-1 bg-secondary rounded-full mb-4"></div>
              <h2 className="text-[clamp(0.875rem,2vw,2.25rem)] font-sans font-bold text-foreground uppercase tracking-[0.2em] sm:tracking-[0.3em]">Events</h2>
              <div className="w-20 h-1 bg-secondary rounded-full mt-4"></div>
            </div>

            <div className="flex flex-col space-y-12">
              {EVENTS.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.9, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
                  className="relative group cursor-pointer overflow-hidden rounded-[2.5rem] shadow-2xl aspect-[16/10] md:aspect-[21/9]"
                >
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent"></div>
                  
                  <div className="absolute bottom-6 right-6 left-6 md:bottom-10 md:left-10 md:right-10 flex items-end justify-between">
                    <div>
                      <div className="w-12 h-1 bg-secondary rounded-full mb-3"></div>
                      <h3 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">{event.title}</h3>
                    </div>
                    
                    <button className="bg-white/10 hover:bg-secondary text-white p-2.5 md:p-3.5 rounded-xl backdrop-blur-md transition-all duration-300 group/btn shadow-2xl border border-white/20">
                      <span className="flex items-center gap-2 font-black uppercase tracking-[0.1em] text-[10px] md:text-xs px-2 md:px-4">
                        View
                        <ArrowUpRight className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform w-3.5 h-3.5 md:w-4 md:h-4" />
                      </span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Grouped Contributor Sections with Functional Inline Links */}
        <section className="bg-muted/10 py-24 border-y border-border/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-24">
              <h2 className="text-5xl font-serif font-bold mb-16 text-center text-primary">Meet our Faculty</h2>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-8 md:gap-16 max-w-4xl mx-auto">
                {[1, 2].map((i) => (
                  <div key={i} className="group text-center">
                    <div className="aspect-square bg-white rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl mb-4 md:mb-8 relative border-2 md:border-4 border-white">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=faculty${i}`} alt="Faculty" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center space-x-4 md:space-x-8">
                         <Linkedin className="text-white w-6 h-6 md:w-10 md:h-10 hover:scale-125 cursor-pointer transition-transform" />
                         <Mail className="text-white w-6 h-6 md:w-10 md:h-10 hover:scale-125 cursor-pointer transition-transform" />
                      </div>
                    </div>
                    <a 
                      href={MEMBER_LINKS[`faculty${i}` as keyof typeof MEMBER_LINKS]} 
                      className="flex items-center justify-center gap-2 group/link"
                    >
                      <h4 className="font-serif font-bold text-xl md:text-3xl mb-1 md:mb-2 group-hover/link:text-primary transition-colors">Faculty Name</h4>
                      <ArrowUpRight className="w-5 h-5 text-primary group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                    </a>
                    <p className="text-muted-foreground text-sm md:text-xl">Advisor</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-5xl font-serif font-bold mb-16 text-center text-secondary-foreground">Designers</h2>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-8 md:gap-16 max-w-4xl mx-auto">
                {[3, 4].map((i) => (
                  <div key={i} className="group text-center">
                    <div className="aspect-square bg-white rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl mb-4 md:mb-8 relative border-2 md:border-4 border-white">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=designer${i}`} alt="Designer" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-secondary/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center space-x-4 md:space-x-8">
                         <Linkedin className="text-white w-6 h-6 md:w-10 md:h-10 hover:scale-125 cursor-pointer transition-transform" />
                         <Github className="text-white w-6 h-6 md:w-10 md:h-10 hover:scale-125 cursor-pointer transition-transform" />
                      </div>
                    </div>
                    <a 
                      href={MEMBER_LINKS[`designer${i-2}` as keyof typeof MEMBER_LINKS]} 
                      className="flex items-center justify-center gap-2 group/link"
                    >
                      <h4 className="font-serif font-bold text-xl md:text-3xl mb-1 md:mb-2 group-hover/link:text-secondary-foreground transition-colors">Designer Name</h4>
                      <ArrowUpRight className="w-5 h-5 text-secondary-foreground group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                    </a>
                    <p className="text-muted-foreground text-sm md:text-xl">Tech Lead</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FeedbackSection />

      </main>

      <footer className="bg-[#111] text-white py-12 border-t border-white/5 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
          <div className="flex items-center gap-6 mb-10">
             <div className="w-16 h-16 rounded-full bg-white p-1 shadow-2xl">
                <img src="/src/assets/logo.png" alt="Logo" className="w-full h-full object-contain rounded-full" />
             </div>
             <div className="text-left">
               <h4 className="font-serif font-bold text-2xl">Telugu Samiti</h4>
               <p className="text-white/40 text-base">IIT Delhi</p>
             </div>
          </div>
          
          <div className="mb-10">
            <h5 className="text-sm font-bold uppercase tracking-[0.3em] text-white/60 mb-6">Follow us on</h5>
            <div className="flex space-x-10">
              <a href="#" className="text-[#E4405F] hover:scale-125 transition-all drop-shadow-lg"><Instagram size={32} /></a>
              <a href="#" className="text-[#0A66C2] hover:scale-125 transition-all drop-shadow-lg"><Linkedin size={32} /></a>
              <a href="#" className="text-[#EA4335] hover:scale-125 transition-all drop-shadow-lg"><Mail size={32} /></a>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 w-full flex flex-col items-center space-y-3">
            <p className="text-[clamp(0.5rem,3.5vw,1.1rem)] text-white/60 font-medium flex items-center justify-center gap-3 w-full whitespace-nowrap overflow-hidden">
              Made with <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>❤️</motion.span> by Telugu Samiti Tech Team
            </p>
            <p className="text-[clamp(0.4rem,3vw,1rem)] text-white/30 whitespace-nowrap overflow-hidden w-full text-center">
              © 2026 Telugu Samiti IIT Delhi. Telugu Samiti Tech Team.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
