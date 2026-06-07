import React from 'react';
import { motion } from 'motion/react';
import { Play, Star, Users, Clock, Globe, ArrowRight } from 'lucide-react';

export function CoursesSection() {
  const courses = [
    {
      title: "Full-Stack Website Mastery",
      desc: "Learn to build high-performance, modern websites from scratch using React, Node, and more.",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600",
      rating: 4.9,
      students: "1.2k",
      duration: "12 hours"
    },
    {
      title: "Canva Design for Beginners",
      desc: "Unlock the power of Canva to create professional-grade branding and marketing materials.",
      img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600",
      rating: 4.8,
      students: "800+",
      duration: "5 hours"
    },
    {
      title: "Building AI Automations",
      desc: "Harness AI to automate your business workflows, lead generation, and content creation.",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600",
      rating: 5.0,
      students: "500+",
      duration: "8 hours"
    },
    {
      title: "Bot Development Blueprint",
      desc: "Master the art of creating custom Telegram, Discord, and trading bots for various niches.",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600",
      rating: 4.7,
      students: "400+",
      duration: "10 hours"
    },
    {
      title: "Digital Product Empire",
      desc: "Step-by-step guide to conceptualizing, creating, and scaling your own digital products.",
      img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600",
      rating: 4.9,
      students: "950+",
      duration: "7 hours"
    },
    {
      title: "Forex Education Basics",
      desc: "The foundations of market analysis, risk management, and institutional trading logic.",
      img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600",
      rating: 4.6,
      students: "2.1k",
      duration: "15 hours"
    },
    {
      title: "Growing Online Communities",
      desc: "Learn strategic methods to build and engage loyal followers in Telegram and Discord.",
      img: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&w=600",
      rating: 4.8,
      students: "1.5k",
      duration: "6 hours"
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#080808] border-t border-zinc-200 dark:border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center gap-2 mb-16">
          <span className="text-purple-500 font-bold tracking-widest uppercase text-[10px]">07 // Educational Academy</span>
          <h2 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Featured Courses</h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base max-w-xl mt-4">Elevate your skills with our expert-led online programs designed for real-world impact and professional growth.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 rounded-2xl overflow-hidden hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all shadow-md"
            >
              <div className="relative aspect-video overflow-hidden">
                <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md border border-white/50 rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-white fill-current" />
                  </div>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-500 tracking-widest mb-4">
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500 fill-current" /> {course.rating}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {course.students} Students</span>
                  <span className="flex items-center gap-1 ml-auto"><Clock className="w-3 h-3" /> {course.duration}</span>
                </div>

                <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight mb-3 line-clamp-1">{course.title}</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-6 line-clamp-2 leading-relaxed flex-1">{course.desc}</p>

                <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-900 dark:text-white group/link">
                  Enroll Now <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-white/10 rounded-2xl p-8 text-center bg-transparent group cursor-pointer hover:border-purple-500/50 transition-colors"
          >
             <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
               <Globe className="w-8 h-8 text-purple-500" />
             </div>
             <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-2">View Academy</h3>
             <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Access 50+ masterclasses</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
