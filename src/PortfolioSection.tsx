import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowUpRight } from 'lucide-react';

import imgRegenerated1778939110589 from './assets/images/regenerated_image_1778939110589.jpg';
import imgRegenerated1778939099473 from './assets/images/regenerated_image_1778939099473.jpg';
import imgRegenerated1778939119586 from './assets/images/regenerated_image_1778939119586.jpg';
import imgRegenerated1778953533186 from './assets/images/regenerated_image_1778953533186.png';
import imgRegenerated1778953529894 from './assets/images/regenerated_image_1778953529894.jpg';
import imgRegenerated1778953720833 from './assets/images/regenerated_image_1778953720833.jpg';

import marketingImg from './assets/images/marketing_skill_1782985340549.jpg';
import videoEditingImg from './assets/images/video_editing_skill_1782985354848.jpg';
import webAppImg from './assets/images/web_app_dev_skill_1782985367958.jpg';
import aiContentImg from './assets/images/ai_content_skill_1782985380890.jpg';
import cryptoTradingImg from './assets/images/crypto_trading_skill_1782985396390.jpg';
import aiToolsImg from './assets/images/ai_tools_skill_1782985409109.jpg';

import imgRegen1782991348023 from './assets/images/regenerated_image_1782991348023.webp';
import imgRegen1782991351706 from './assets/images/regenerated_image_1782991351706.webp';
import imgRegen1782991354539 from './assets/images/regenerated_image_1782991354539.jpg';
import imgRegen1782991355625 from './assets/images/regenerated_image_1782991355625.jpg';
import imgRegen1782991356356 from './assets/images/regenerated_image_1782991356356.jpg';
import imgRegen1782991358653 from './assets/images/regenerated_image_1782991358653.webp';
import imgRegen1782991361628 from './assets/images/regenerated_image_1782991361628.jpg';
import androidBg from './assets/images/android-bg-2.jpg';

export default function PortfolioSection({ embedded = false }: { embedded?: boolean } = {}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<{title: string, tech: string[], category: string, img: string, desc: string} | null>(null);

  const projects = [
    { title: "Marketing", tech: ["Digital", "SEO", "Growth"], category: "Marketing", img: marketingImg, desc: "A robust digital ecosystem tailored for hyper-growth, leveraging advanced SEO strategies and data-driven marketing campaigns to amplify brand reach." },
    { title: "Video Editing", tech: ["Premiere", "After Effects", "Color"], category: "Media", img: imgRegen1782991348023, desc: "High-end visual storytelling featuring cinematic color grading, dynamic motion graphics, and seamless transitions for maximum audience engagement." },
    { title: "Web App Development", tech: ["React", "Node.js", "Full-Stack"], category: "Web", img: imgRegen1782991351706, desc: "A highly responsive, state-of-the-art web application architecture engineered for scalability, seamless user journeys, and robust performance." },
    { title: "AI Content Creation", tech: ["Midjourney", "GPT-4", "Prompting"], category: "AI", img: aiContentImg, desc: "Pioneering the intersection of art and algorithm with AI-generated visual and textual content, optimizing creative workflows exponentially." },
    { title: "Crypto Trading", tech: ["Analysis", "Algorithms", "Markets"], category: "Trading", img: cryptoTradingImg, desc: "An institutional-grade algorithmic trading dashboard built to analyze blockchain metrics and execute high-frequency crypto market strategies." },
    { title: "AI Tools", tech: ["LLMs", "Automation", "Workflows"], category: "AI", img: aiToolsImg, desc: "A customized suite of intelligent micro-tools utilizing Large Language Models to automate repetitive cognitive tasks and data structuring." },
    { title: "AI Automation System", tech: ["Python", "OpenAI", "Zapier"], category: "AI", img: imgRegen1782991354539, desc: "A seamless enterprise automation pipeline linking critical APIs to autonomous AI agents for zero-touch operational efficiency." },
    { title: "Forex Trading Bot", tech: ["MQL4", "Python", "API"], category: "Trading", img: imgRegenerated1778939110589, desc: "A meticulously backtested foreign exchange trading algorithm incorporating real-time sentiment analysis and rapid execution protocols." },
    { title: "Telegram Tools & Bots", tech: ["Node.js", "Telegraf", "MongoDB"], category: "Bots", img: imgRegen1782991355625, desc: "An interactive, highly concurrent community management bot ecosystem delivering instant automated moderation and bespoke user tools." },
    { title: "Digital Product Markets", tech: ["React", "Stripe", "NextJS"], category: "Web", img: imgRegenerated1778939099473, desc: "A frictionless e-commerce platform specifically optimized for instant digital asset delivery, complete with secure payment gateways." },
    { title: "Canva Template Collections", tech: ["Design", "Canva", "UI/UX"], category: "Design", img: imgRegen1782991361628, desc: "A curated repository of premium, brand-ready visual templates designed for high conversion and immediate aesthetic impact." },
    { title: "Course Platforms", tech: ["LMS", "React", "Video"], category: "Web", img: imgRegen1782991356356, desc: "An immersive digital learning environment featuring secure video hosting, interactive modules, and personalized student progress tracking." },
    { title: "Conversion Landing Pages", tech: ["Tailwind", "Framer", "React"], category: "Web", img: imgRegenerated1778953720833, desc: "Psychology-driven landing page designs utilizing precise typography and fluid animations to dramatically increase funnel conversion rates." },
    { title: "Membership Systems", tech: ["Auth0", "Stripe", "Next.JS"], category: "Web", img: imgRegenerated1778939119586, desc: "A secure, multi-tiered subscription portal granting exclusive access to gated premium content and tight-knit community forums." },
    { title: "Portfolio Websites", tech: ["React", "Motion", "Tailwind"], category: "Web", img: imgRegen1782991358653, desc: "A sleek, motion-rich personal brand showcase designed to display creative works in a visually striking, memorable interactive format." },
    { title: "AI Tool Dashboards", tech: ["Vue", "Tailwind", "Python API"], category: "AI", img: imgRegenerated1778953529894, desc: "A centralized, intuitive command center connecting diverse analytical APIs and AI prompt generators into one unified user interface." },
  ];

  const filteredProjects = projects.filter(p => {
    const query = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(query) ||
      p.desc.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.tech.some(t => t.toLowerCase().includes(query))
    );
  });

  return (
    <section 
      className={`${embedded ? 'pt-8 pb-12 min-h-[600px] rounded-3xl' : 'pt-32 pb-24 min-h-screen border-t border-zinc-200/80'} bg-transparent relative z-20 bg-grid-wallpaper`}
    >
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`${embedded ? 'max-w-full px-4 sm:px-6' : 'max-w-7xl mx-auto px-6 lg:px-12 bg-zinc-950/90 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl'}`}
      >
        <div className="flex flex-col gap-2 mb-10">
          <span className="text-[#00FF66] font-bold tracking-widest uppercase text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-ping" />
            04 // Innovation Hub
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">Portfolio Projects</h2>
          <p className="text-zinc-200 text-sm md:text-base font-medium max-w-xl mt-4">Discover our diverse range of high-performance digital solutions, from automated trading systems to customized educational platforms.</p>
        </div>
        
        {/* Search Bar */}
        <div className="mb-12 relative max-w-2xl">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-zinc-300" />
            <input 
              type="text"
              placeholder="Search by title, skill, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/80 backdrop-blur-xl border border-white/25 rounded-full py-4 pl-12 pr-6 text-white placeholder:text-zinc-400 font-medium focus:outline-none focus:border-[#00FF66] focus:ring-2 focus:ring-[#00FF66]/30 transition-all shadow-xl"
            />
          </div>
        </div>
        
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredProjects.map((p, i) => (
              <motion.div 
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedProject(p)}
                className="group relative bg-zinc-950/70 border border-white/15 hover:border-[#00FF66]/50 rounded-2xl overflow-hidden cursor-pointer shadow-2xl backdrop-blur-md transition-all duration-300"
              >
                <div className="h-56 overflow-hidden relative">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
                </div>
                <div className="p-6 relative z-10 -mt-16">
                  <div className="flex gap-2 flex-wrap mb-4">
                    {p.tech.map((t, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-md border border-white/20 text-[9px] font-bold text-white uppercase tracking-wider">{t}</span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00FF66] transition-colors uppercase">{p.title}</h3>
                  <p className="text-zinc-300 text-xs font-medium line-clamp-2 leading-relaxed">{p.desc}</p>
                </div>
                
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#00FF66]/40 rounded-2xl transition-colors pointer-events-none"></div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredProjects.length === 0 && (
            <div className="col-span-full py-20 text-center text-zinc-500 font-medium">
              No projects found matching "{searchQuery}"
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-zinc-950/95 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/20 bg-grid-wallpaper"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/60 hover:bg-white hover:text-black text-white rounded-full backdrop-blur-md transition-colors border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <img src={selectedProject.img} alt={selectedProject.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent md:bg-gradient-to-r md:from-transparent md:to-zinc-950"></div>
              </div>
              
              <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
                <div className="flex gap-2 flex-wrap mb-6">
                  {selectedProject.tech.map((t, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30 rounded-full text-xs font-bold uppercase tracking-wider">{t}</span>
                  ))}
                </div>
                <h3 className="text-3xl font-black text-white uppercase mb-4 leading-tight">{selectedProject.title}</h3>
                <div className="inline-block bg-[#00FF66] text-black px-3 py-1 rounded-md text-xs font-black uppercase tracking-widest mb-6 w-max">
                  {selectedProject.category}
                </div>
                <p className="text-zinc-300 font-medium leading-relaxed">
                  {selectedProject.desc}
                </p>
                
                <div className="mt-6">
                  <button 
                    onClick={() => {
                      window.open('https://t.me/+1vH_j9h-myowZjQ0', '_blank');
                    }}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#00FF66] hover:bg-[#00FF66]/90 active:scale-95 text-black font-black uppercase tracking-widest rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(0,255,102,0.3)] hover:shadow-[0_0_30px_rgba(0,255,102,0.5)] cursor-pointer flex items-center justify-center gap-2 text-xs"
                  >
                    GET IT
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-3">Project Details</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    This project showcases expertise in {selectedProject.category.toLowerCase()}, utilizing modern methodologies to deliver high-impact results. The implementation prioritizes performance, scalability, and an intuitive user experience.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
