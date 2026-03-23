import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Smile, Meh, Frown, Send } from "lucide-react";
import { useRef } from "react";

export function FeedbackSection() {
  const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const emojis = [
    { icon: Frown, label: "Poor", color: "text-red-500" },
    { icon: Meh, label: "Average", color: "text-yellow-500" },
    { icon: Smile, label: "Great", color: "text-green-500" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="feedback" className="w-full py-20 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-xl bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-border/50 relative z-10"
        >
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl font-serif font-bold text-primary mb-2">
		  How was your experience?
		</h3>
		<p className="text-sm md:text-base text-muted-foreground">
		  Your feedback helps us improve the Telugu Samiti community.
		</p>

          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex justify-center gap-4 md:gap-8">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() =>
  setSelectedEmoji(prev => (prev === index ? null : index))
}

                  className={`flex flex-col items-center gap-2 transition-all duration-300 group ${selectedEmoji === index ? 'scale-110' : 'opacity-60 grayscale hover:opacity-100 hover:grayscale-0'}`}
                >
                  <div className={`p-3 rounded-xl bg-muted group-hover:bg-white group-hover:shadow-lg transition-all ${selectedEmoji === index ? 'bg-white shadow-lg ring-2 ring-primary/20' : ''}`}>
                    <emoji.icon className={`w-8 h-8 md:w-10 md:h-10 ${selectedEmoji === index ? emoji.color : 'text-muted-foreground group-hover:' + emoji.color}`} />
                  </div>
                  <span className={`text-sm font-bold uppercase tracking-widest ${selectedEmoji === index ? 'text-primary' : 'text-muted-foreground'}`}>{emoji.label}</span>
                </button>
              ))}
            </div>

            <div className="relative">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full bg-muted/50 border-none rounded-xl p-4 min-h-[50px] focus:ring-2 focus:ring-primary/20 transition-all text-lg"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitted}
              className={`w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-3 ${isSubmitted ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitted ? (
                "Thanks for your feedback!"
              ) : (
                <>
                  Send Feedback
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

