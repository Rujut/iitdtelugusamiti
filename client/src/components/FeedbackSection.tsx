import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, ThumbsDown, Heart, Smile, Frown, Meh } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export function FeedbackSection() {
  const [clickCount, setClickCount] = useState(12450);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  
  // Simulate live counter
  useEffect(() => {
    const interval = setInterval(() => {
      setClickCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleEmojiClick = (emoji: string) => {
    setSelectedEmoji(emoji);
    toast({
      title: "Feedback Received!",
      description: `Thanks for rating us with ${emoji}`,
    });
  };

  const handleVote = (type: 'like' | 'dislike') => {
    toast({
      title: type === 'like' ? "Glad you liked it!" : "Thanks for the feedback!",
      description: "We appreciate your input.",
    });
  };

  const emojis = [
    { icon: Heart, label: "Loved it", color: "text-red-500" },
    { icon: Smile, label: "Good", color: "text-yellow-500" },
    { icon: Meh, label: "Okay", color: "text-blue-500" },
    { icon: Frown, label: "Bad", color: "text-gray-500" },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Click Counter Card */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="section-box bg-white p-8 flex flex-col items-center justify-center text-center space-y-4"
        >
          <h3 className="text-2xl font-serif font-bold text-foreground">Total Visits</h3>
          <div className="bg-muted px-8 py-4 rounded-2xl shadow-inner">
            <span className="text-6xl font-mono font-bold text-primary tracking-widest tabular-nums">
              {clickCount.toLocaleString()}
            </span>
          </div>
          <p className="text-muted-foreground text-sm">Join the community growing everyday!</p>
        </motion.div>

        {/* Feedback System */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="section-box bg-white p-8 space-y-6"
        >
          <h3 className="text-2xl font-serif font-bold text-foreground text-center">How was your experience?</h3>
          
          {/* Swiggy Style Emoji Selector */}
          <div className="flex justify-center gap-6">
            {emojis.map((item) => (
              <button
                key={item.label}
                onClick={() => handleEmojiClick(item.label)}
                className={`flex flex-col items-center gap-2 transition-transform hover:scale-110 ${selectedEmoji === item.label ? 'scale-110 font-bold' : 'opacity-70 hover:opacity-100'}`}
              >
                <item.icon className={`w-10 h-10 ${item.color} ${selectedEmoji === item.label ? 'fill-current' : ''}`} />
                <span className="text-xs">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="h-px bg-border/50 w-full my-4" />

          <div className="flex justify-center gap-4">
             <Button 
               variant="outline" 
               className="gap-2 hover:bg-green-50 hover:text-green-600 hover:border-green-200"
               onClick={() => handleVote('like')}
             >
               <ThumbsUp className="w-4 h-4" /> Useful
             </Button>
             <Button 
               variant="outline" 
               className="gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
               onClick={() => handleVote('dislike')}
             >
               <ThumbsDown className="w-4 h-4" /> Not Useful
             </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
