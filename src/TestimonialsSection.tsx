import React from 'react';
import { motion } from 'framer-motion';

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Nova Nexus Labs absolutely transformed our trading algorithms. Their high-frequency bot runs flawlessly.",
      author: "Alex Mercer",
      role: "Lead Trader, Quantifi",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150"
    },
    {
      quote: "The Canva Pro templates saved my agency hundreds of hours. Truly aesthetic and premium design.",
      author: "Sarah Jenkins",
      role: "Creative Director",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150"
    },
    {
      quote: "I bought the ChatGPT prompt pack. It instantly leveled up the entire marketing department's output.",
      author: "David Chen",
      role: "CMO, TechFlow",
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150"
    },
    {
      quote: "Our bespoke AI Dashboard allows us to visualize real-time data seamlessly. Highly recommend Nova.",
      author: "Elena Rodriguez",
      role: "Operations Manager",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150"
    }
  ];

  return (
    <section className="py-24 bg-transparent border-t border-white/10 relative z-20 overflow-hidden bg-grid-wallpaper">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col items-center text-center gap-2 mb-16">
          <span className="text-[#00FF66] font-bold tracking-widest uppercase text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-ping" />
            06 // Client Feedback
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">Client Success</h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl mt-4">Hear from the pioneers who leveraged our solutions to transform their workflows and dominate their industries.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-zinc-950/70 backdrop-blur-xl border border-white/15 hover:border-[#00FF66]/50 rounded-2xl p-8 relative shadow-2xl transition-all duration-300"
            >
              <div className="text-[#00FF66]/20 text-6xl absolute top-4 left-4 font-serif leading-none">"</div>
              <p className="text-zinc-300 text-sm italic mb-8 relative z-10 leading-relaxed">
                "{t.quote}"
              </p>
              
              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <img src={t.img} alt={t.author} className="w-12 h-12 rounded-full object-cover border-2 border-[#00FF66]/40" />
                <div>
                  <h4 className="text-white font-bold text-sm uppercase">{t.author}</h4>
                  <p className="text-[#00FF66] text-[10px] uppercase font-bold tracking-wider">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
