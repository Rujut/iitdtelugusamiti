import { useState, useEffect } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { Heart, Smile, Meh, Frown } from "lucide-react";
import { useRef } from "react";

function RollingNumber({ value, isInView }: { value: number; isInView: boolean }) {
  const spring = useSpring(0, { stiffness: 40, damping: 20 });
  const [displayValue, setDisplayValue] = useState("0.0");

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    } else {
      spring.set(0);
    }
  }, [isInView, value, spring]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      setDisplayValue(latest.toFixed(1));
    });
    return () => unsubscribe();
  }, [spring]);

  return <span>{displayValue}</span>;
}

export function FeedbackSection() {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { amount: 0.5 });

  const handleEmojiClick = (emoji: string) => {
    setSelectedEmoji(prev => prev === emoji ? null : emoji);
  };

  const emojis = [
    { icon: Heart, label: "Loved it", color: "text-red-500" },
    { icon: Smile, label: "Good", color: "text-yellow-500" },
    { icon: Meh, label: "Okay", color: "text-blue-500" },
    { icon: Frown, label: "Bad", color: "text-gray-500" },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-8 items-stretch">
        {/* Total Visits Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="section-box bg-white p-10 flex flex-col items-center justify-center text-center space-y-4"
        >
          <div ref={counterRef} className="flex flex-col items-center">
            <h3 className="text-3xl font-serif font-bold text-foreground mb-2">
              Total Visits: <span className="text-primary tabular-nums"><RollingNumber value={12.5} isInView={isInView} />K</span>
            </h3>
            <p className="text-muted-foreground text-lg italic">Join the community growing everyday!</p>
          </div>
        </motion.div>

        {/* Feedback System */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="section-box bg-white p-10 space-y-8 flex flex-col justify-center"
        >
          <h3 className="text-3xl font-serif font-bold text-foreground text-center">How was your experience?</h3>
          
          <div className="flex justify-center gap-10">
            {emojis.map((item) => (
              <button
                key={item.label}
                onClick={() => handleEmojiClick(item.label)}
                className={`flex flex-col items-center gap-3 transition-all duration-300 transform ${selectedEmoji === item.label ? 'scale-125' : 'opacity-50 grayscale hover:opacity-100 hover:grayscale-0'}`}
              >
                <item.icon className={`w-12 h-12 ${item.color} ${selectedEmoji === item.label ? 'fill-current' : ''}`} />
                <span className={`text-sm font-bold ${selectedEmoji === item.label ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
