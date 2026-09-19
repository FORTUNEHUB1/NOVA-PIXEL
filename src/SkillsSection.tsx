import React from 'react';
import { motion } from 'motion/react';
import { Code2, Cpu, Bot, Palette, Layout, BookOpen, MessageSquare, Monitor, Share2, GraduationCap, Zap, PenTool } from 'lucide-react';

export function SkillsSection() {
  const skills = [
    { name: "Website Development", icon: <Code2 size={24} />, level: 95, color: "text-blue-500" },
    { name: "AI Automation", icon: <Cpu size={24} />, level: 90, color: "text-purple-500" },
    { name: "Bot Development", icon: <Bot size={24} />, level: 92, color: "text-green-500" },
    { name: "Canva Design", icon: <Palette size={24} />, level: 88, color: "text-pink-500" },
    { name: "Digital Product Creation", icon: <Layout size={24} />, level: 94, color: "text-orange-500" },
    { name: "Forex Education Content", icon: <BookOpen size={24} />, level: 85, color: "text-indigo-500" },
    { name: "Telegram Community Building", icon: <MessageSquare size={24} />, level: 89, color: "text-sky-500" },
    { name: "UI/UX Design", icon: <Monitor size={24} />, level: 91, color: "text-rose-500" },
    { name: "Social Media Branding", icon: <Share2 size={24} />, level: 87, color: "text-emerald-500" },
    { name: "Online Course Creation", icon: <GraduationCap size={24} />, level: 93, color: "text-amber-500" },
    { name: "No-code Tools", icon: <Zap size={24} />, level: 90, color: "text-yellow-500" },
    { name: "Content Strategy", icon: <PenTool size={24} />, level: 86, color: "text-violet-500" },
  ];

  return (
    <section className="py-24 bg-transparent border-t border-white/10 relative z-20 bg-grid-wallpaper">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center gap-2 mb-16">
          <span className="text-[#00FF66] font-bold tracking-widest uppercase text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-ping" />
            03 // Technical Expertise
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">Core Skills</h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl mt-4">A visual breakdown of our specialized capabilities in the digital landscape, from high-end development to strategic content creation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5, borderColor: "rgba(0, 255, 102, 0.5)" }}
              className="bg-zinc-950/70 backdrop-blur-xl border border-white/15 rounded-2xl p-6 transition-all duration-300 shadow-xl group hover:shadow-[0_0_25px_rgba(0,255,102,0.15)]"
            >
              <div className={`w-12 h-12 rounded-xl bg-black/60 flex items-center justify-center mb-4 shadow-inner border border-white/10 group-hover:scale-110 transition-transform text-[#00FF66]`}>
                {skill.icon}
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">{skill.name}</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  <span>Proficiency</span>
                  <span className="text-[#00FF66]">{skill.level}%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`h-full bg-gradient-to-r from-[#00FF66] to-[#00CC52] rounded-full shadow-[0_0_10px_rgba(0,255,102,0.5)]`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
