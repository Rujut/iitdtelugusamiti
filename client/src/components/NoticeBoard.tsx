import { motion } from "framer-motion";
import { Bell } from "lucide-react";

const ANNOUNCEMENTS = [
  {
    text: "Ugadi 2026 celebrations on - 22nd March at SAC.",
    linkText: "",
    link: "",
    isNew: true,
  },
  {
    text: "Registrations for Ugadi'26 are open now!",
    linkText: "",
    link: "",
    isNew: true,
  },
  {
    text: "Detailed registration instructions can be found ",
    linkText: "here",
    link: "/static/docs/ugadi-registration-guide.pdf",
    isNew: false,
  },
  {
    text: "Farewell party (Class of 2026) - 4th April (Tentative)",
    linkText: "",
    link: "",
    isNew: false,
  },
];

export function NoticeBoard() {
  return (
    <section className="container mx-auto px-4 max-[399px]:px-2 py-10 max-[399px]:py-6 relative z-40">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-border/50">

        {/* Header */}
        <div className="bg-primary px-6 max-[399px]:px-3 py-5 max-[399px]:py-3 flex items-center justify-center">
          <div className="flex items-center space-x-4 max-[399px]:space-x-2">
            <Bell className="text-white w-8 h-8 max-[399px]:w-5 max-[399px]:h-5 animate-bounce" />
            <h2 className="text-2xl md:text-3xl max-[399px]:text-lg font-serif font-bold text-white tracking-wide">
              Announcements
            </h2>
          </div>
        </div>

        {/* Notices */}
        <div className="p-5 max-[399px]:p-3 bg-gradient-to-b from-white to-gray-50">
          <ul className="space-y-4 max-[399px]:space-y-2">
            {ANNOUNCEMENTS.map((notice, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-4 max-[399px]:space-x-2 group hover:bg-muted/30 p-4 max-[399px]:p-2 rounded-xl transition-all"
              >
                {/* Arrow */}
                <div className="mt-2 text-secondary group-hover:translate-x-1 transition-transform duration-300">
                  <div className="w-0 h-0
                    border-t-[8px] border-t-transparent
                    border-l-[12px] border-l-secondary
                    border-b-[8px] border-b-transparent
                    max-[399px]:border-t-[5px]
                    max-[399px]:border-l-[8px]
                    max-[399px]:border-b-[5px]"
                  />
                </div>

                {/* Text */}
                <div className="flex-1 text-xl max-[399px]:text-sm min-[400px]:max-[639px]:text-base font-medium leading-relaxed">
                  <span className="text-foreground group-hover:text-primary transition-colors">
                    {notice.text}
                  </span>
                  {notice.link && (
                    <a
                      href={notice.link}
                      className="ml-1 text-primary font-semibold underline hover:text-secondary"
                    >
                      {notice.linkText}
                    </a>
                  )}
                </div>

                {notice.isNew && (
                  <motion.span
                    animate={{
                      boxShadow: [
                        "0 0 0px #ef4444",
                        "0 0 15px #ef4444",
                        "0 0 0px #ef4444",
                      ],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="shrink-0 inline-flex items-center px-3 py-1 max-[399px]:px-2 max-[399px]:py-[2px] rounded-full text-xs max-[399px]:text-[9px] font-black bg-red-500 text-white border border-red-400"
                  >
                    NEW
                  </motion.span>
                )}
              </motion.li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
