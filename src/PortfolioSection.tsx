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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<{title: string, tech: string[], category: string, img: string, desc: string} | null>(null);

  const categories = ["All", "AI", "Web", "Trading", "Media", "Design", "Bots"];

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
    const matchesCategory = selectedCategory === "All" || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesQuery = !query || (
      p.title.toLowerCase().includes(query) ||
      p.desc.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.tech.some(t => t.toLowerCase().includes(query))
    );
    return matchesCategory && matchesQuery;
  });

  return (
    <section 
      id="portfolio"
      className={`${embedded ? 'py-20 md:py-28 border-t border-zinc-200/80' : 'pt-32 pb-24 min-h-screen border-t border-zinc-200/80'} bg-transparent relative z-20 bg-grid-wallpaper`}
    >
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-6 lg:px-12 bg-zinc-950/95 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-6 sm:p-10 lg:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-white/10">
          <div className="flex flex-col gap-2">
            <span className="text-[#00FF66] font-bold tracking-widest uppercase text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-ping" />
              Innovation Hub // Portfolio Works
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">Portfolio Projects</h2>
            <p className="text-zinc-300 text-sm md:text-base font-medium max-w-xl mt-2">
              Explore our comprehensive showcase of high-performance digital systems, trading bots, AI pipelines, and bespoke client architectures.
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 bg-black/60 px-4 py-2 rounded-full border border-white/15 self-start md:self-auto">
            <span className="text-[#00FF66]">{filteredProjects.length}</span> of {projects.length} Works Available
          </div>
        </div>
        
        {/* Search Bar & Category Filters */}
        <div className="flex flex-col gap-6 mb-10">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00FF66]" />
            <input 
              type="text"
              placeholder="Search 16+ projects by title, technology, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/90 backdrop-blur-xl border border-white/25 rounded-full py-4 pl-12 pr-12 text-white placeholder:text-zinc-400 font-medium focus:outline-none focus:border-[#00FF66] focus:ring-2 focus:ring-[#00FF66]/40 transition-all shadow-xl text-sm md:text-base"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => {
              const count = cat === "All" ? projects.length : projects.filter(p => p.category.toLowerCase() === cat.toLowerCase()).length;
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                    isActive 
                      ? 'bg-[#00FF66] text-black shadow-[0_0_20px_rgba(0,255,102,0.4)]' 
                      : 'bg-black/70 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/15'
                  }`}
                >
                  {cat}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-zinc-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Projects Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((p) => (
              <motion.div 
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedProject(p)}
                className="group relative bg-black/85 border border-white/15 hover:border-[#00FF66] rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:shadow-[0_15px_35px_rgba(0,255,102,0.2)] backdrop-blur-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-52 overflow-hidden relative bg-zinc-900">
                    <img 
                      src={p.img} 
                      alt={p.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                    
                    {/* Category pill */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 bg-black/85 backdrop-blur-md rounded-md border border-[#00FF66]/40 text-[9px] font-black text-[#00FF66] uppercase tracking-widest shadow-md">
                        {p.category}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="w-8 h-8 rounded-full bg-[#00FF66] text-black flex items-center justify-center shadow-lg">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  <div className="p-5 relative z-10">
                    <div className="flex gap-1.5 flex-wrap mb-3">
                      {p.tech.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-zinc-900/90 rounded border border-white/15 text-[9px] font-bold text-zinc-300 uppercase tracking-wider">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-black text-white mb-2 group-hover:text-[#00FF66] transition-colors uppercase leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-zinc-300 text-xs font-medium line-clamp-2 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-white/10 text-xs font-bold text-[#00FF66] group-hover:translate-x-1 transition-transform">
                  <span>View Details</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#00FF66]/60 rounded-2xl transition-colors pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredProjects.length === 0 && (
            <div className="col-span-full py-16 text-center text-zinc-400 font-medium bg-black/50 rounded-2xl border border-white/10">
              <p className="text-lg font-bold text-white mb-2">No projects found matching your criteria</p>
              <p className="text-sm text-zinc-400 mb-4">Try clearing your search query or selecting "All" categories.</p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                className="px-6 py-2.5 bg-[#00FF66] text-black font-bold text-xs uppercase tracking-wider rounded-full shadow-lg cursor-pointer"
              >
                Reset Filters
              </button>
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
