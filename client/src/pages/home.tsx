import { Navbar } from "@/components/Navbar";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { NoticeBoard } from "@/components/NoticeBoard";
import { FeedbackSection } from "@/components/FeedbackSection";
import { motion } from "framer-motion";
import { useState } from "react";
import { BookOpen, Languages, Calendar, ArrowRight, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

// Bilingual Content
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
  { id: 1, title: "Ugadi Celebration", date: "March 22, 2026", type: "Festival" },
  { id: 2, title: "Freshers Night", date: "August 15, 2026", type: "Cultural" },
  { id: 3, title: "Farewell 2026", date: "April 20, 2026", type: "Gathering" },
  { id: 4, title: "Sankranti Potluck", date: "January 14, 2027", type: "Food" },
  { id: 5, title: "Alumni Meet", date: "December 10, 2026", type: "Networking" },
];

export default function Home() {
  const [lang, setLang] = useState<"english" | "telugu">("english");
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleLang = () => {
    setIsFlipped(!isFlipped);
    setTimeout(() => {
      setLang(l => l === "english" ? "telugu" : "english");
      setIsFlipped(false);
    }, 300); // Wait for half flip
  };

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      <Navbar />
      
      <main>
        <HeroSlideshow />
        <NoticeBoard />

        {/* About Section - Book Flip Style */}
        <section id="about" className="container mx-auto px-4 py-20">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 relative perspective-1000">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative z-10"
              >
                <div className="section-box bg-white p-10 md:p-14 min-h-[400px] flex flex-col justify-center relative overflow-hidden group">
                  {/* Decorative background elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-secondary/20 transition-all duration-700"></div>
                  
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-4xl md:text-5xl font-serif font-bold text-primary">
                      {aboutContent[lang].title}
                    </h3>
                    <button 
                      onClick={toggleLang}
                      className="p-3 rounded-full bg-muted hover:bg-secondary/20 transition-colors text-foreground"
                      title="Switch Language"
                    >
                      <Languages size={24} />
                    </button>
                  </div>

                  <motion.div
                    animate={{ rotateY: isFlipped ? 90 : 0, opacity: isFlipped ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                      {aboutContent[lang].text}
                    </p>
                    
                    <Button className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 rounded-full group-hover:shadow-lg transition-all">
                      {aboutContent[lang].button}
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Box Shadow/Depth effect */}
              <div className="absolute inset-0 bg-black/5 rounded-xl translate-y-4 translate-x-4 -z-10"></div>
            </div>

            {/* Events Section - Auto Scroll */}
            <div id="events" className="lg:w-1/2 w-full">
              <div className="section-box bg-slate-50 p-8 h-[450px] flex flex-col relative">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                  <h3 className="text-3xl font-serif font-bold text-foreground">Upcoming Events</h3>
                  <Calendar className="text-secondary w-8 h-8" />
                </div>

                <div className="overflow-hidden relative flex-1 mask-linear-gradient">
                  <div className="animate-scroll-vertical space-y-4 hover:pause-animation">
                    {[...EVENTS, ...EVENTS].map((event, i) => ( // Duplicated for seamless scroll
                      <div key={`${event.id}-${i}`} className="bg-white p-5 rounded-lg border border-border/50 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group cursor-pointer">
                        <div>
                          <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{event.title}</h4>
                          <span className="text-sm text-muted-foreground font-medium bg-muted px-2 py-1 rounded mt-1 inline-block">{event.type}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-mono text-sm font-bold text-secondary-foreground/80">{event.date}</p>
                          <ArrowRight className="inline-block w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Gradient overlays for smooth scroll fade */}
                  <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-slate-50 to-transparent z-10 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-50 to-transparent z-10 pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section Placeholder */}
        <section className="bg-muted/30 py-20 border-y border-border/50">
          <div className="container mx-auto px-4 text-center">
             <h2 className="text-4xl font-serif font-bold mb-12">Key Contributors</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="group">
                   <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-md mb-4 relative">
                     <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="Team Member" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                     <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                        <Linkedin className="text-white w-6 h-6 hover:scale-110 cursor-pointer transition-transform" />
                        <Twitter className="text-white w-6 h-6 hover:scale-110 cursor-pointer transition-transform" />
                     </div>
                   </div>
                   <h4 className="font-bold text-lg">Member Name</h4>
                   <p className="text-muted-foreground text-sm">Designation</p>
                 </div>
               ))}
             </div>
          </div>
        </section>

        <FeedbackSection />

      </main>

      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
             <img src="/src/assets/logo.png" alt="Logo" className="h-12 w-auto bg-white rounded-full p-1" />
             <div>
               <h4 className="font-serif font-bold text-xl">Telugu Samiti</h4>
               <p className="text-white/60 text-sm">IIT Delhi</p>
             </div>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="hover:text-secondary transition-colors"><Instagram size={24} /></a>
            <a href="#" className="hover:text-secondary transition-colors"><Twitter size={24} /></a>
            <a href="#" className="hover:text-secondary transition-colors"><Linkedin size={24} /></a>
            <a href="#" className="hover:text-secondary transition-colors"><Github size={24} /></a>
          </div>

          <div className="text-center md:text-right text-sm text-white/40">
            <p>&copy; 2026 Telugu Samiti. Made with love.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
