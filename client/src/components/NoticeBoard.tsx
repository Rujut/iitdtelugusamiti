import { motion } from "framer-motion";
import { Bell } from "lucide-react";

export function NoticeBoard() {
  const notices = [
    { id: 1, text: "Registration for Freshers Night 2026 is now open!", isNew: true },
    { id: 2, text: "General Body Meeting scheduled for next Friday at 5 PM.", isNew: true },
    { id: 3, text: "Alumni Meet registrations closing soon.", isNew: false },
    { id: 4, text: "Volunteer call for Ugadi preparations.", isNew: false },
  ];

  return (
    <section className="container mx-auto px-4 py-16 relative z-40">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-border/50">
        <div className="bg-primary px-6 py-5 flex items-center justify-center">
          <div className="flex items-center space-x-4">
            <Bell className="text-white w-8 h-8 animate-bounce" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-wide">Announcements</h2>
          </div>
        </div>
        
        <div className="p-8 bg-gradient-to-b from-white to-gray-50">
          <ul className="space-y-6">
            {notices.map((notice, index) => (
              <motion.li 
                key={notice.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-4 group cursor-pointer hover:bg-muted/30 p-4 rounded-xl transition-all"
              >
                <div className="mt-2 text-secondary group-hover:translate-x-1 transition-transform duration-300">
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-secondary border-b-[8px] border-b-transparent"></div>
                </div>
                
                <div className="flex-1">
                  <span className="text-foreground text-xl font-medium leading-relaxed group-hover:text-primary transition-colors">
                    {notice.text}
                  </span>
                </div>

                {notice.isNew && (
                  <motion.span 
                    animate={{ boxShadow: ["0 0 0px #ef4444", "0 0 15px #ef4444", "0 0 0px #ef4444"] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="shrink-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-red-500 text-white border border-red-400"
                  >
                    NEW
                  </motion.span>
                )}
              </motion.li>
            ))}
          </ul>
          
          <div className="mt-10 pt-6 border-t border-dashed border-gray-200 flex justify-center">
            <button className="text-sm font-black text-primary hover:text-secondary transition-all uppercase tracking-[0.2em] flex items-center gap-3 group">
              View All
              <span className="block w-5 h-5 border-t-2 border-r-2 border-current rotate-45 group-hover:translate-x-2 transition-transform"></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
