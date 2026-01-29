import { Navbar } from "@/components/Navbar";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { NoticeBoard } from "@/components/NoticeBoard";
import { FeedbackSection } from "@/components/FeedbackSection";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useState } from "react";
import {
  Languages,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const aboutContent = {
  english: {
    title: "About Telugu Samiti",
    text: "The Telugu Samiti at IIT Delhi is a vibrant community dedicated to preserving and promoting the rich cultural heritage of the Telugu-speaking people. We organize various events, festivals, and gatherings that bring students, faculty, and alumni together, fostering a sense of home away from home.",
    button: "Know More",
  },
  telugu: {
    title: "తెలుగు సమితి గురించి",
    text: "ఐఐటీ ఢిల్లీలోని తెలుగు సమితి, తెలుగు మాట్లాడే ప్రజల గొప్ప సాంస్కృతిక వారసత్వాన్ని పరిరక్షించడానికి మరియు ప్రోత్సహించడానికి అంకితమైన ఒక శక్తివంతమైన సంఘం. మేము విద్యార్థులు, అధ్యాపకులు మరియు పూర్వ విద్యార్థులను ఏకతాటిపైకి తెచ్చే వివిధ కార్యక్రమాలు, పండుగలు మరియు సమావేశాలను నిర్వహిస్తాము.",
    button: "మరింత తెలుసుకోండి",
  },
};

const EVENTS = [
  { id: 1, title: "Ugadi", image: "/src/assets/ugadi.png" },
  { id: 2, title: "Freshers", image: "/src/assets/freshers.png" },
  { id: 3, title: "Farewell", image: "/src/assets/farewell.png" },
];

export default function Home() {
  const [lang, setLang] = useState<"english" | "telugu">("english");
  const { scrollY } = useScroll();
  const malaY = useTransform(scrollY, [0, 500], [0, 100]);
  const malaOpacity = useTransform(scrollY, [0, 300], [0, 1]);

  const toggleLang = () => {
    setLang((l) => (l === "english" ? "telugu" : "english"));
  };

  return (
    <div className="w-full bg-background font-sans selection:bg-primary/20">
      <Navbar />

      <main className="w-full">
        <HeroSlideshow />

        {/* Flower Mala Separator */}
        <div className="relative w-full h-24 z-40 -mt-1 bg-[#3a7bd5]">
          {" "}
          {/* Match blue line background */}
          <motion.div
            style={{ y: malaY, opacity: malaOpacity }}
            className="absolute top-0 left-0 w-full h-full"
          >
            <div
              className="w-full h-full bg-repeat-x bg-contain"
              style={{
                backgroundImage: "url('/src/assets/mala_separator.png')",
              }}
            />
          </motion.div>
        </div>

        {/* About Section */}
        <section
          id="about"
          className="w-full py-20 px-4 md:px-0 bg-background relative z-30"
        >
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
                  <button
                    onClick={toggleLang}
                    className="p-4 rounded-full bg-muted hover:bg-secondary/20 transition-all text-primary shadow-sm hover:shadow-md active:scale-95"
                    title="Switch Language"
                  >
                    <Languages size={28} />
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={lang}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10">
                      {aboutContent[lang].text}
                    </p>

                    <Button className="bg-primary hover:bg-primary/90 text-white text-lg px-6 py-4 rounded-full shadow-md hover:shadow-lg transition-all scale-90 md:scale-100">
                      {aboutContent[lang].button}
                    </Button>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </section>

        <NoticeBoard />

        {/* Events Section */}
        <section id="events" className="w-full py-20 bg-slate-50/50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-col items-center mb-12">
              <div className="w-24 h-1 bg-secondary rounded-full mb-4"></div>
              <h2 className="text-5xl font-serif font-bold text-foreground">
                Events
              </h2>
              <div className="w-24 h-1 bg-secondary rounded-full mt-4"></div>
            </div>

            <div className="flex flex-col space-y-10">
              {EVENTS.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group cursor-pointer overflow-hidden rounded-[2rem] shadow-2xl aspect-[16/10] md:aspect-[21/9]"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                  <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                    <div>
                      <div className="w-12 h-1 bg-secondary rounded-full mb-3"></div>
                      <h3 className="text-4xl md:text-5xl font-serif font-bold text-white">
                        {event.title}
                      </h3>
                    </div>

                    <button className="bg-white/10 hover:bg-secondary text-white p-3 md:p-4 rounded-xl backdrop-blur-md transition-all duration-300 group/btn shadow-xl border border-white/10 scale-75 md:scale-90">
                      <span className="flex items-center gap-2 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                        View
                        <ArrowUpRight className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform w-3 h-3 md:w-4 md:h-4" />
                      </span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/10 py-20 border-y border-border/30">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-serif font-bold mb-16">
              Key Contributors
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="group">
                  <div className="aspect-square bg-white rounded-3xl overflow-hidden shadow-xl mb-6 relative">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`}
                      alt="Team Member"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-6">
                      <Linkedin className="text-white w-8 h-8 hover:scale-110 cursor-pointer transition-transform" />
                      <Twitter className="text-white w-8 h-8 hover:scale-110 cursor-pointer transition-transform" />
                    </div>
                  </div>
                  <h4 className="font-bold text-2xl">Member Name</h4>
                  <p className="text-muted-foreground text-base">Designation</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FeedbackSection />
      </main>

      <footer className="bg-foreground text-white py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-white p-1 shadow-lg">
              <img
                src="/src/assets/logo.png"
                alt="Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <h4 className="font-serif font-bold text-2xl">Telugu Samiti</h4>
              <p className="text-white/60 text-base">IIT Delhi</p>
            </div>
          </div>

          <div className="flex space-x-8">
            <a
              href="#"
              className="hover:text-secondary transition-all hover:scale-110"
            >
              <Instagram size={28} />
            </a>
            <a
              href="#"
              className="hover:text-secondary transition-all hover:scale-110"
            >
              <Twitter size={28} />
            </a>
            <a
              href="#"
              className="hover:text-secondary transition-all hover:scale-110"
            >
              <Linkedin size={28} />
            </a>
            <a
              href="#"
              className="hover:text-secondary transition-all hover:scale-110"
            >
              <Github size={28} />
            </a>
          </div>

          <div className="text-center md:text-right text-base text-white/40">
            <p>&copy; 2026 Telugu Samiti. Made with love.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
