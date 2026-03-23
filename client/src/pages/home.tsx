import { Navbar } from "@/components/Navbar";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { NoticeBoard } from "@/components/NoticeBoard";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Twitter, Instagram, ArrowUpRight, Mail, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import faculty1 from "@/assets/rkkumar.jpg";
import faculty2 from "@/assets/drkumar.png";
import designer1 from "@/assets/roy2.jpeg";
import designer2 from "@/assets/rahul.jpg";
import ugadi from "@/assets/ugadi25.png";
import freshers from "@/assets/freshers26.png";
import farewell from "@/assets/farewell25.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const aboutContent = {
  english: {
    title: "About Telugu Samiti",
    text: "Telugu Samiti brings together Telugu students, staff, and faculty, celebrating the rich origins and traditions of Telugu culture. By hosting events like Ugadi, Freshers' Meet, and Farewell Parties, we aim to honor and preserve our vibrant cultural heritage. Through cultural programs and friendly gatherings, we strive to preserve the essence of our roots and foster unity. Join us in embracing our traditions and creating unforgettable memories! ",
  },
  telugu: {
    title: "తెలుగు సమితి గురించి",
    text: "మన తెలుగు భాష, సంస్కృతి, సంప్రదాయాలను పంచుకోవడం మరియు సాంప్రదాయ వేడుకలను ఘనంగా నిర్వహించడం కోసం ఈ వేదికను రూపొందించాం. తెలుగు విద్యార్థులు, సిబ్బంది, అధ్యాపకులు అందరికీ ఏకతా మరియు స్నేహబంధాన్ని పంచే వేదిక ఇది. ఉగాది, ఫ్రెషర్స్, ఫేర్‌వెల్ వంటి పండుగలను ఘనంగా జరుపుకుంటాం, సాంస్కృతిక కార్యక్రమాల్లో పాల్గొంటాం మరియు మన సంప్రదాయాలను గౌరవిస్తూ, తెలుగు భాషా సంస్కృతి వైభవాన్ని ప్రోత్సహిస్తాం.మన సంస్కృతిని గౌరవిస్తూ, ప్రతీ సందర్భాన్ని ఆనందంగా జరుపుకుందాం!",
  }
};

const EVENTS = [
  { id: 1, title: "Ugadi", image: ugadi, link: "/ugadi" },
  { id: 2, title: "Freshers", image: freshers, link: "/freshers" },
  { id: 3, title: "Farewell", image: farewell, link: "/farewell" },
];

const MEMBER_LINKS = {
  faculty1: "https://web.iitd.ac.in/~rkkunchala/",
  faculty2: "https://web.iitd.ac.in/~dravi/",
  designer1: "https://www.linkedin.com/in/siddhartha-roy-bhyri-53b74725b",
  designer2: "https://www.linkedin.com/in/rahul-reddy-mandala?utm_source=share_via&utm_content=profile&utm_medium=member_android",
};

const CONTRIBUTORS = {
  faculty: [
    { id: 1, name: "Prof. Kunchala Ravi Kumar", role: "Advisor", image: faculty1 },
    { id: 2, name: "Prof. Digavalli Ravi Kumar", role: "Advisor", image: faculty2 },
  ],
  designers: [
    { id: 1, name: "Siddhartha Roy", role: "Tech Lead", image: designer1 },
    { id: 2, name: "Rahul Reddy", role: "Tech Lead", image: designer2 },
  ]
};

function RollingVisits({ count }: { count: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.1 });
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      setDisplayCount(0);
      const duration = 2500;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        setDisplayCount(Math.floor(easedProgress * count));
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayCount(count);
        }
      };

      requestAnimationFrame(animate);
    } else {
      setDisplayCount(0);
    }
  }, [isInView, count]);

  const roundedValue = Math.ceil(displayCount / 5) * 5;

  return (
    <div ref={ref} className="font-mono font-bold inline-flex items-baseline">
      <span className="tabular-nums">{roundedValue}</span>
      <span className="ml-0.5">+</span>
    </div>
  );
}

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 400);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const [lang, setLang] = useState<"english" | "telugu">("english");
  const toggleLang = () => {
    setLang(l => l === "english" ? "telugu" : "english");
  };

  return (
    <div className="w-full bg-background font-sans selection:bg-primary/20 flex flex-col min-h-screen">
      <Navbar />

      <main className="w-full flex-grow">
        <HeroSlideshow />

        {/* About Section */}
        <section id="about" className="w-full py-10 px-4 md:px-0 bg-background relative z-30">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full max-w-4xl"
            >
              <div className="section-box bg-white p-6 md:p-10 flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-secondary/10 transition-all duration-700"></div>

                {/* Header: Title + Toggle */}
                <div className="flex items-center justify-between mb-5 relative z-10">
                  <h3
                    className="
                      flex-1
                      text-center
                      font-serif
                      font-bold
                      leading-tight
                      px-1
                      whitespace-nowrap
                      tracking-wide
                      text-[1rem]
                      min-[400px]:text-[1.25rem]
                      sm:text-[1.6rem]
                      md:text-[2.2rem]
                    "
                  >
                    <span className="text-black">ABOUT</span>{" "}
                    <span className="text-primary">TELUGU SAMITI</span>
                  </h3>

                  <button
                    onClick={toggleLang}
                    type="button"
                    aria-label="Language toggle"
                    className={`
                      relative inline-flex items-center
                      w-[34px] h-[20px]
                      max-[399px]:w-[36px]
                      min-[400px]:w-[40px] min-[400px]:h-[22px]
                      sm:w-[48px] sm:h-[28px]
                      rounded-full
                      border-2
                      transition-colors duration-300
                      ${lang === "telugu"
                        ? "bg-primary border-primary"
                        : "bg-muted border-primary/40"}
                    `}
                  >
                    <motion.span
                      className="
                        absolute
                        left-[2px]
                        top-1/2
                        -translate-y-1/2
                        w-[14px] h-[14px]
                        min-[400px]:w-[16px] min-[400px]:h-[16px]
                        sm:w-[20px] sm:h-[20px]
                        rounded-full
                        bg-white
                        shadow-md
                        flex items-center justify-center
                        text-primary font-bold text-[10px]
                        border-1 border-primary
                        shadow-[0_0_100px_rgba(255,255,255,0.2),_0_2px_8px_rgba(0,0,0,0.25)]
                        pointer-events-none
                      "
                      animate={{ x: lang === "telugu" ? 17 : 0 }}
                      transition={{ type: "spring", stiffness: 420, damping: 26 }}
                    >
                      {lang === "english" ? "A" : "అ"}
                    </motion.span>
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={lang}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p
                      className="
                        text-[0.85rem]
                        min-[400px]:text-[0.95rem]
                        sm:text-[1.05rem]
                        md:text-[1.15rem]
                        text-muted-foreground
                        leading-relaxed
                      "
                    >
                      {aboutContent[lang].text}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </section>

        <NoticeBoard />

        {/* Events Section */}
        <section id="events" className="w-full pt-10 pb-6 bg-slate-50/50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-col items-center mb-16">
              <div className="w-20 h-1 bg-secondary rounded-full mb-4"></div>
              <h1
                className="
                  font-serif
                  font-bold
                  text-black
                  whitespace-nowrap
                  leading-none
                  drop-shadow-[0_5px_15px_rgba(0,0,0,0.0)]
                  transition-all
                  duration-500
                  max-[399px]:text-[1.45rem]
                  text-[clamp(1.85rem,4.5vw,3.5rem)]
                "
              >
                EVENTS
              </h1>
              <div className="w-20 h-1 bg-secondary rounded-full mt-4"></div>
            </div>
            <div className="flex flex-col space-y-12">
              {EVENTS.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.9, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
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
                      <div className="w-12 h-1 bg-secondary rounded-full mb-3 max-[399px]:mt-2"></div>
                      <h3 className="text-3xl md:text-5xl max-[399px]:text-2xl font-serif font-bold text-white tracking-tight">
                        {event.title}
                      </h3>
                    </div>
                    <a
                      href={event.link}
                      className="bg-white/10 opacity-100 hover:opacity-100 hover:bg-secondary text-white p-2.5 md:p-3.5 max-[399px]:px-2.5 rounded-xl backdrop-blur-md transition-all duration-300 group/btn shadow-2xl border border-white/20 animate-ripple-glass"
                    >
                      <span className="flex items-center gap-2 font-black uppercase tracking-[0.1em] text-[10px] md:text-xs max-[399px]:text-[8px] px-2 md:px-4 max-[399px]:px-1.5">
                        View
                        <ArrowUpRight className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform w-3.5 h-3.5 md:w-4 md:h-4 max-[399px]:w-3 max-[399px]:h-3" />
                      </span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="w-full py-4 flex justify-center">
          <div className="w-3/4 md:w-1/2 section-separator"></div>
        </div>

        {/* Contributors Section */}
        <section id="contributors" className="w-full pt-4 pb-16 px-4 md:px-0">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-border/50"
            >
              <h2 className="contributors-gradient-title max-[399px]:text-[1.25rem] text-[clamp(1.5rem,5vw,3rem)] font-serif font-bold mb-12 text-center whitespace-nowrap overflow-hidden">
                Meet our Key Contributors
              </h2>

              {/* Faculty Advisors */}
              <div className="mb-12">
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent flex-grow rounded-full"></div>
                  <h3 className="max-[399px]:text-[0.85rem] text-[clamp(1rem,3vw,1.75rem)] font-sans font-bold text-foreground uppercase tracking-[0.1em]">
                    Faculty Advisors
                  </h3>
                  <div className="h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent flex-grow rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 gap-8 md:gap-12">
                  {CONTRIBUTORS.faculty.map((member) => (
                    <div key={member.id} className="group text-center">
                      <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-md mb-4 relative border-2 border-white">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <a
                        href={member.id === 1 ? MEMBER_LINKS.faculty1 : MEMBER_LINKS.faculty2}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 group/link"
                      >
                        <h4 className="font-serif max-[399px]:text-[0.8rem] text-base md:text-lg font-normal text-foreground group-hover/link:text-primary transition-colors">
                          {member.name}
                        </h4>
                        <span>
                          <FontAwesomeIcon
                            icon={faArrowUpRightFromSquare}
                            className="text-primary text-sm group-hover/link:text-white transition-colors duration-300"
                          />
                        </span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Designers */}
              <div>
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent flex-grow rounded-full"></div>
                  <h3 className="max-[399px]:text-[0.85rem] text-[clamp(1rem,3vw,1.75rem)] font-sans font-bold text-foreground uppercase tracking-[0.2em]">
                    Designers
                  </h3>
                  <div className="h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent flex-grow rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 gap-8 md:gap-12">
                  {CONTRIBUTORS.designers.map((member) => (
                    <div key={member.id} className="group text-center">
                      <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-md mb-4 relative border-2 border-white">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <a
                        href={member.id === 1 ? MEMBER_LINKS.designer1 : MEMBER_LINKS.designer2}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 group/link"
                      >
                        <h4
                          className="
                            font-serif
                            max-[399px]:text-[0.8rem]
                            text-base md:text-lg
                            font-normal
                            text-foreground
                            whitespace-nowrap
                            group-hover/link:text-secondary-foreground
                            transition-colors
                          "
                        >
                          {member.name}
                        </h4>
                        <FontAwesomeIcon
                          icon={faLinkedin}
                          className="text-[#0A66C2] text-xl group-hover/link:scale-110 transition-transform duration-300"
                        />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Community & Contact Section */}
        <section className="bg-[#0f172a] py-10 max-[399px]:py-8 relative border-t border-white/5 overflow-hidden">

          {/* Single parent detects viewport — children animate via variants */}
          <motion.div
            className="max-w-4xl mx-auto px-4 flex flex-col items-center text-center space-y-4 w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.05 }}
            variants={{ hidden: {}, visible: {} }}
          >

            {/* Total Visits */}
            <motion.div
              variants={{
                hidden:   { x: -120, opacity: 0 },
                visible:  { x: 0,    opacity: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0 } }
              }}
              className="flex flex-wrap justify-center items-center gap-1 text-white/60 font-mono text-[clamp(0.7rem,3vw,1rem)] tracking-[0.2em] max-[399px]:tracking-[0.15em] font-bold uppercase text-center leading-tight"
            >
              TOTAL VISITS:{" "}
              <span className="text-secondary text-sm max-[399px]:text-[0.8rem]">
                <RollingVisits count={1000} />
              </span>
            </motion.div>

            {/* Community Message */}
            <motion.div
              variants={{
                hidden:   { y: 40, opacity: 0 },
                visible:  { y: 0,  opacity: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 } }
              }}
              className="text-lg md:text-xl max-[399px]:text-[0.9rem] font-serif italic font-medium text-white/90 tracking-wide leading-tight"
            >
              Join our community growing every day!
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={{
                hidden:   { x: 120, opacity: 0 },
                visible:  { x: 0,   opacity: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 } }
              }}
              className="flex flex-col items-center space-y-2 max-[399px]:mt-2"
            >
              <span className="text-white/40 font-mono text-sm max-[399px]:text-[0.6rem] tracking-[0.3em] font-bold uppercase">
                CONNECT US AT
              </span>
              <div className="flex space-x-6 max-[399px]:space-x-4">
                <a
                  href="https://www.instagram.com/iitd_telugusamiti?igsh=bGFsdnQ1NW00a2p5"
                  className="text-[#E4405F] hover:scale-125 transition-all drop-shadow-[0_0_15px_rgba(228,64,95,0.3)]"
                >
                  <Instagram size={26} />
                </a>
                <a
                  href="https://www.linkedin.com/company/iitd-telugu-samiti/"
                  className="text-[#0A66C2] hover:scale-125 transition-all drop-shadow-[0_0_15px_rgba(10,102,194,0.3)]"
                >
                  <Linkedin size={26} />
                </a>
                <a
                  href="https://m.youtube.com/%40teluguyuvatharamiitd?fbclid=PAdGRzdgQOTn1leHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAad8Y7WsD9YXevI2veqKx7S0-FS_m00l3QJUoNKtMlBg-fJ8MxtP-HT_lYm9gw_aem_wArYWXRVjxC7T4IZzR4xIg"
                  className="text-[#FF0000] hover:scale-125 transition-all drop-shadow-[0_0_15px_rgba(255,0,0,0.3)]"
                >
                  <Youtube size={26} />
                </a>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              variants={{
                hidden:   { x: -120, opacity: 0 },
                visible:  { x: 0,    opacity: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.45 } }
              }}
              className="flex flex-col md:flex-row items-center gap-3 text-white/60 pt-4 max-[399px]:pt-2"
            >
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
                For inquiries reach us at:
              </span>
              <div className="flex items-center gap-2 group cursor-pointer max-[399px]:mt-1">
                <div className="p-2 rounded-full bg-white/5 group-hover:bg-primary transition-colors">
                  <Mail className="w-4 h-4 text-secondary group-hover:text-white" />
                </div>
                <a
                  href="mailto:techteam.iitdtelugusamiti@gmail.com"
                  className="text-white hover:text-secondary transition-colors text-xs md:text-lg font-medium max-[399px]:text-[0.7rem]"
                >
                  techteam.iitdtelugusamiti@gmail.com
                </a>
              </div>
            </motion.div>

            {/* Feedback */}
            <motion.div
              variants={{
                hidden:   { x: 120, opacity: 0 },
                visible:  { x: 0,   opacity: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.6 } }
              }}
              className="flex items-center gap-2 text-white/70 mt-2 max-[399px]:mt-1"
            >
              <span className="text-[9px] max-[399px]:text-[8px] md:text-xs font-bold uppercase tracking-[0.2em]">
                Share Your Feedback or Experience
              </span>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeCEjiP5WOo5s1zcw7NRXYPiTwqk6hbo4HOb4cuhuShzGgU2Q/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-white transition-colors text-sm md:text-lg font-medium underline underline-offset-4"
              >
                here.
              </a>
            </motion.div>

          </motion.div>
        </section>
      </main>

      <footer className="bg-black text-white py-1.5 border-t border-white/5 mt-auto relative">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center space-y-1 pt-2">
          <p className="text-[clamp(0.7rem,2vw,0.85rem)] text-white/80 font-medium flex items-center justify-center gap-2 w-full text-center">
            Made with{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="text-red-500"
            >
              ❤️
            </motion.span>{" "}
            by Telugu Samiti Tech Team
          </p>
          <p className="text-[clamp(0.55rem,1.5vw,0.75rem)] text-white/60 text-center tracking-wide w-full max-w-full overflow-hidden whitespace-nowrap pb-1">
            © 2026 Telugu Samiti, IIT Delhi. All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
