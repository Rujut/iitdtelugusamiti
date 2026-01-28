import { motion } from "framer-motion";
import { AlertTriangle, Bell, Info } from "lucide-react";

export function NoticeBoard() {
  const notices = [
    { id: 1, text: "Registration for Freshers Night 2026 is now open!", isNew: true },
    { id: 2, text: "General Body Meeting scheduled for next Friday at 5 PM.", isNew: true },
    { id: 3, text: "Alumni Meet registrations closing soon.", isNew: false },
    { id: 4, text: "Volunteer call for Ugadi preparations.", isNew: false },
  ];

  return (
    <section className="container mx-auto px-4 py-16 -mt-20 relative z-40">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-border/50">
        <div className="bg-primary px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bell className="text-white w-6 h-6 animate-swing" />
            <h2 className="text-2xl font-serif font-bold text-white tracking-wide">Notice Board</h2>
          </div>
          <div className="text-white/80 text-sm font-sans italic">Latest Updates</div>
        </div>
        
        <div className="p-6 bg-gradient-to-b from-white to-gray-50">
          <ul className="space-y-4">
            {notices.map((notice, index) => (
              <motion.li 
                key={notice.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 group cursor-pointer hover:bg-muted/50 p-3 rounded-lg transition-colors"
              >
                <div className="mt-1.5 text-secondary group-hover:translate-x-1 transition-transform duration-300">
                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-secondary border-b-[6px] border-b-transparent"></div>
                </div>
                
                <div className="flex-1">
                  <span className="text-foreground text-lg font-medium leading-relaxed group-hover:text-primary transition-colors">
                    {notice.text}
                  </span>
                </div>

                {notice.isNew && (
                  <span className="shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-600 animate-pulse border border-red-200">
                    NEW
                  </span>
                )}
              </motion.li>
            ))}
          </ul>
          
          <div className="mt-8 pt-4 border-t border-dashed border-gray-200 flex justify-center">
            <button className="text-sm font-bold text-primary hover:text-secondary transition-colors uppercase tracking-widest flex items-center gap-2 group">
              View All Notices
              <span className="block w-4 h-4 border-t-2 border-r-2 border-current rotate-45 group-hover:translate-x-1 transition-transform"></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
