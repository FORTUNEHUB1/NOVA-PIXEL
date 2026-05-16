import React from 'react';
import { motion } from 'framer-motion';

import imgRegenerated1778939110589 from './assets/images/regenerated_image_1778939110589.jpg';
import imgRegenerated1778939099473 from './assets/images/regenerated_image_1778939099473.jpg';
import imgRegenerated1778939119586 from './assets/images/regenerated_image_1778939119586.jpg';
import imgRegenerated1778953533186 from './assets/images/regenerated_image_1778953533186.png';
import imgRegenerated1778953529894 from './assets/images/regenerated_image_1778953529894.jpg';
import imgRegenerated1778953720833 from './assets/images/regenerated_image_1778953720833.jpg';

export function PortfolioSection() {
  const projects = [
    { title: "AI Automation System", tech: ["Python", "OpenAI", "Zapier"], img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600", desc: "End-to-end business automation." },
    { title: "Forex Trading Bot", tech: ["MQL4", "Python", "API"], img: imgRegenerated1778939110589, desc: "High-frequency FX trading bot." },
    { title: "Telegram Tools & Bots", tech: ["Node.js", "Telegraf", "MongoDB"], img: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&w=600", desc: "Custom community management." },
    { title: "Digital Product Markets", tech: ["React", "Stripe", "NextJS"], img: imgRegenerated1778939099473, desc: "E-commerce for digital assets." },
    { title: "Canva Template Collections", tech: ["Design", "Canva", "UI/UX"], img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600", desc: "Premium aesthetic templates." },
    { title: "Course Platforms", tech: ["LMS", "React", "Video"], img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600", desc: "Custom video course hosting." },
    { title: "Conversion Landing Pages", tech: ["Tailwind", "Framer", "React"], img: imgRegenerated1778953720833, desc: "High-converting sales pages." },
    { title: "Membership Systems", tech: ["Auth0", "Stripe", "Next.JS"], img: imgRegenerated1778939119586, desc: "Exclusive community access." },
    { title: "Portfolio Websites", tech: ["React", "Motion", "Tailwind"], img: imgRegenerated1778953533186, desc: "Showcasing creative talent." },
    { title: "AI Tool Dashboards", tech: ["Vue", "Tailwind", "Python API"], img: imgRegenerated1778953529894, desc: "Analytics & AI prompt interfaces." },
  ];

  return (
    <section className="py-24 bg-zinc-100 dark:bg-[#080808] border-t border-zinc-200 dark:border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col gap-2 mb-16">
          <span className="text-blue-500 font-bold tracking-widest uppercase text-[10px]">04 // Innovation Hub</span>
          <h2 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Portfolio Projects</h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base max-w-xl mt-4">Discover our diverse range of high-performance digital solutions, from automated trading systems to customized educational platforms.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-2xl overflow-hidden cursor-pointer shadow-lg"
            >
              <div className="h-48 overflow-hidden relative">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-900 to-transparent"></div>
              </div>
              <div className="p-6 relative z-10 -mt-12">
                <div className="flex gap-2 flex-wrap mb-4">
                  {p.tech.map((t, idx) => (
                    <span key={idx} className="px-2 py-1 bg-zinc-100 dark:bg-black/50 backdrop-blur-md rounded border border-zinc-200 dark:border-white/10 text-[8px] font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">{t}</span>
                  ))}
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-blue-400 transition-colors uppercase">{p.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs">{p.desc}</p>
              </div>
              
              <div className="absolute inset-0 border-2 border-blue-500/0 group-hover:border-blue-500/50 rounded-2xl transition-colors pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
