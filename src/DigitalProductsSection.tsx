import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, ChevronRight, FileText, Layout, Cpu, Bot, Download, GraduationCap, Zap } from 'lucide-react';

export function DigitalProductsSection() {
  const products = [
    {
      title: "Canva Pro Templates",
      desc: "Premium social media & branding templates for high-end digital presence.",
      icon: <Layout size={24} />,
      price: "$29",
      category: "Design",
      img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600"
    },
    {
      title: "Forex Strategy PDFs",
      desc: "Comprehensive trading blueprints and risk management guides.",
      icon: <FileText size={24} />,
      price: "$49",
      category: "Education",
      img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600"
    },
    {
      title: "AI Automation Tools",
      desc: "Custom scripts and prompt engineering kits for workflow optimization.",
      icon: <Cpu size={24} />,
      price: "$199",
      category: "Tech",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600"
    },
    {
      title: "Trading Bots (MT4/5)",
      desc: "High-frequency algorithmic trading systems for major assets.",
      icon: <Bot size={24} />,
      price: "$499",
      category: "Software",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600"
    },
    {
      title: "Digital Product Assets",
      desc: "Stock footage, graphics, and elements for product creation.",
      icon: <Download size={24} />,
      price: "$19",
      category: "Creative",
      img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600"
    },
    {
      title: "Educational Resources",
      desc: "Worksheets, planners, and templates for online learners.",
      icon: <GraduationCap size={24} />,
      price: "$15",
      category: "Education",
      img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600"
    },
    {
      title: "Productivity Planners",
      desc: "Elite Notion setups and digital planners for entrepreneurs.",
      icon: <Zap size={24} />,
      price: "$39",
      category: "Utility",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600"
    }
  ];

  return (
    <section className="py-24 bg-zinc-50 dark:bg-[#050505] border-t border-zinc-200 dark:border-white/5 relative z-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center gap-2 mb-16">
          <span className="text-blue-500 font-bold tracking-widest uppercase text-[10px]">05 // Digital Marketplace</span>
          <h2 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Product Showcase</h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base max-w-xl mt-4">Premium assets and tools engineered to accelerate your digital growth and streamline complex workflows.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-[40px] overflow-hidden flex flex-col h-full shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-900 to-transparent"></div>
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className="px-3 py-1 bg-white/90 dark:bg-black/60 backdrop-blur-md rounded-full text-[8px] font-bold uppercase tracking-widest text-zinc-900 dark:text-white border border-white/20">{p.category}</span>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-black/40 flex items-center justify-center text-blue-500 border border-zinc-100 dark:border-white/5">
                    {p.icon}
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white uppercase tracking-tight">{p.title}</h3>
                </div>
                
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-8 line-clamp-2 leading-relaxed">{p.desc}</p>
                
                <div className="mt-auto flex items-center justify-between border-t border-zinc-100 dark:border-white/5 pt-6">
                  <span className="text-2xl font-black text-zinc-900 dark:text-white tracking-tighter">{p.price}</span>
                  <button className="bg-zinc-900 dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-all group/btn">
                    View Product
                    <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
