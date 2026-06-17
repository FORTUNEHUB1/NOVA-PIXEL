import React, { useState, useEffect } from 'react';
import { motion, useTransform, useMotionValue, useSpring } from 'motion/react';
import { Menu, X, ArrowRight, ArrowUpRight } from 'lucide-react';
import aboutBgVideo from '../assets/new_video_bg.mp4';
import smileBg from '../assets/images/smile_notebook_bg_1780572641740.png';
import project1Img from '../assets/images/regenerated_image_1780574265492.jpg';
import project2Img from '../assets/images/regenerated_image_1780574266646.jpg';
import project3Img from '../assets/images/regenerated_image_1780574269455.jpg';

export default function Home({ handleGatedLink }: { handleGatedLink: (url: string) => void }) {
  // Mouse Tracking for Interactive 3D Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const heroRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [15, -15]);
  const heroRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = clientX / innerWidth - 0.5;
    const y = clientY / innerHeight - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  // 3D Reveal variants
  const reveal3D: any = {
    initial: { opacity: 0, y: 50, rotateX: -20, scale: 0.95, transformPerspective: 1000 },
    whileInView: { opacity: 1, y: 0, rotateX: 0, scale: 1, transformPerspective: 1000 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 1, ease: "easeOut" as any }
  };
  
  const revealLeft3D: any = {
    initial: { opacity: 0, x: -50, rotateY: 20, transformPerspective: 1000 },
    whileInView: { opacity: 1, x: 0, rotateY: 0, transformPerspective: 1000 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 1, ease: "easeOut" as any }
  };
  
  const revealRight3D: any = {
    initial: { opacity: 0, x: 50, rotateY: -20, transformPerspective: 1000 },
    whileInView: { opacity: 1, x: 0, rotateY: 0, transformPerspective: 1000 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 1, ease: "easeOut" as any }
  };

  // Marquee animation variants
  const marqueeVariants: any = {
    animate: {
      x: [0, -1000],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop" as const,
          duration: 10,
          ease: "linear" as any,
        },
      },
    },
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden bg-gray-50 flex items-center justify-center">
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4" type="video/mp4" />
        </video>

        {/* Content wrapper */}
        <div className="relative z-10 flex flex-col items-center text-center mt-12 px-6">
          <span className="text-sm font-black text-white drop-shadow-md tracking-widest mb-4 uppercase">MIDZERO</span>
          
          <div className="relative mb-6 flex flex-col items-center drop-shadow-2xl">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tighter">Creativity</h1>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tighter -mt-[2px]">That Actually<br/>Pays Off</h1>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center justify-center mt-6">
            <button 
              onClick={() => handleGatedLink("https://payhip.com/midzerohub")}
              className="px-8 py-3 bg-[#FA1594] text-white rounded-full text-sm font-black uppercase tracking-widest hover:bg-[#FF3BA6] transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 cursor-pointer"
            >
              Market
            </button>
            <button 
              onClick={() => handleGatedLink("https://t.me/+1vH_j9h-myowZjQ0")}
              className="px-8 py-3 bg-[#229ED9] text-white rounded-full text-sm font-black uppercase tracking-widest hover:bg-[#1C82B3] transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 cursor-pointer"
            >
              Telegram
            </button>
            <button 
              onClick={() => handleGatedLink("https://whop.com/fortune-digital-hub")}
              className="px-8 py-3 bg-[#FF6243] text-white rounded-full text-sm font-black uppercase tracking-widest hover:bg-[#E54A2D] transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 cursor-pointer"
            >
              Whop
            </button>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="w-full bg-[#111] text-[#F0F0EE] py-6 overflow-hidden flex items-center border-y border-[#333]">
        <motion.div
          variants={marqueeVariants}
          animate="animate"
          className="flex whitespace-nowrap text-5xl md:text-7xl font-black uppercase tracking-tighter"
        >
          <span className="px-8">Welcome to MIDZERO</span>
          <span className="px-8">-</span>
          <span className="px-8">Welcome to MIDZERO</span>
          <span className="px-8">-</span>
          <span className="px-8">Welcome to MIDZERO</span>
          <span className="px-8">-</span>
          <span className="px-8">Welcome to MIDZERO</span>
          <span className="px-8">-</span>
        </motion.div>
      </div>

      {/* About Summary */}
      <section className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden bg-black text-white" style={{ minHeight: '430px' }}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
        >
          <source src={aboutBgVideo} type="video/mp4" />
        </video>
        <img 
          src={smileBg} 
          alt="Smile notebook background" 
          className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity pointer-events-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black pointer-events-none" />
        <motion.div 
          className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 justify-between items-start relative z-10"
          initial="initial"
          whileInView="whileInView"
          viewport={reveal3D.viewport}
          variants={reveal3D}
          transition={reveal3D.transition}
        >
          <div className="flex-shrink-0 pt-2 md:pt-4 relative z-20">
            <button 
              onClick={() => handleGatedLink("https://t.me/+1vH_j9h-myowZjQ0")} 
              className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest border border-white text-white rounded-full px-8 py-4 hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
            >
              More about us 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Publications */}
      <section className="py-20 border-t border-[#ddd] dark:border-white/10 bg-[#F0F0EE] dark:bg-[#111] transition-colors duration-500">
        <motion.div 
          className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center"
          initial="initial"
          whileInView="whileInView"
          viewport={reveal3D.viewport}
          variants={reveal3D}
          transition={reveal3D.transition}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-[#666] dark:text-zinc-400 mb-8 font-sans">Features & Publications</p>
          <div className="text-6xl font-black tracking-[0.2em] uppercase text-[#111] dark:text-white transition-colors">DRUM</div>
        </motion.div>
      </section>

      {/* What We Do */}
      <section className="py-24 md:py-40 px-6 md:px-12 bg-[#111] text-[#F0F0EE]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={revealLeft3D.viewport}
            variants={revealLeft3D}
            transition={revealLeft3D.transition}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-[#888] mb-6">What we do</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">Where strategy<br/>meets creativity</h2>
          </motion.div>
          <motion.div 
            className="flex items-end"
            initial="initial"
            whileInView="whileInView"
            viewport={revealRight3D.viewport}
            variants={revealRight3D}
            transition={revealRight3D.transition}
          >
            <p className="text-xl md:text-2xl font-medium tracking-tight text-[#CCC] leading-snug">
              Unlock your potential with premium digital products and high-performance trading EAs. Ready to take your trading to the next level? Join our Telegram community, explore exclusive offers on Whop, and get instant access to premium digital products and powerful trading EAs on Market
            </p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 md:py-40 px-6 md:px-12 bg-white relative overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
        >
          <source src={aboutBgVideo} type="video/mp4" />
        </video>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-16">
            <motion.div 
              className="md:w-1/3"
              initial="initial"
              whileInView="whileInView"
              viewport={revealLeft3D.viewport}
              variants={revealLeft3D}
              transition={revealLeft3D.transition}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-[#666] mb-4">SERVICES</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">What we’re good at</h2>
            </motion.div>
            
            <div className="md:w-2/3 flex flex-col">
              {[
                "Branding and packaging",
                "Graphic Design", 
                "Marketing",
                "Web design",
                "Web development",
                "Motion graphics",
                "Photo production",
                "Commercial video production"
              ].map((service, idx) => (
                <motion.div 
                  key={idx} 
                  className="group border-b border-[#ddd] flex justify-between items-center py-6 md:py-8 cursor-pointer hover:px-4 hover:bg-[#F0F0EE]/80 transition-all duration-300 backdrop-blur-sm"
                  initial={{ opacity: 0, rotateX: -20, y: 20, transformPerspective: 1000 }}
                  whileInView={{ opacity: 1, rotateX: 0, y: 0, transformPerspective: 1000 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" as any }}
                >
                  <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-[#111] transition-colors">{service}</h3>
                  <ArrowUpRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transform translate-x-[-20px] group-hover:translate-x-0 transition-all duration-300 text-[#111]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-24 border-t border-[#ddd] dark:border-white/10 bg-[#F0F0EE] dark:bg-[#111] transition-colors duration-500">
        <motion.div 
          className="max-w-7xl mx-auto px-6 md:px-12"
          initial="initial"
          whileInView="whileInView"
          viewport={reveal3D.viewport}
          variants={reveal3D}
          transition={reveal3D.transition}
        >
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[#666] dark:text-zinc-400 mb-12">Partners / Trusted by forward-thinking brands</p>
          <div className="flex flex-col items-center justify-center opacity-30 dark:opacity-50 gap-8">
             <div className="flex flex-wrap justify-center gap-12 md:gap-24 text-[#111] dark:text-white transition-colors font-sans">
                <span className="text-3xl font-black uppercase">Brand1</span>
                <span className="text-3xl font-black uppercase">Brand2</span>
                <span className="text-3xl font-black uppercase">Brand3</span>
                <span className="text-3xl font-black uppercase">Brand4</span>
             </div>
          </div>
        </motion.div>
      </section>

      {/* Works Intro */}
      <section className="pt-24 md:pt-40 px-6 md:px-12 bg-white pb-16">
        <motion.div 
          className="max-w-4xl mx-auto flex flex-col gap-8 text-center items-center"
          initial="initial"
          whileInView="whileInView"
          viewport={reveal3D.viewport}
          variants={reveal3D}
          transition={reveal3D.transition}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-[#666]">Works</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            This is how we do business. Our brand strategists integrate business, marketing, communications, analytics, and design to convey authentic, meaningful, and unique brands.
          </h2>
          <p className="text-xl md:text-2xl font-medium text-[#666] max-w-3xl">
            We believe details make the difference; we'll introduce your brand innovatively, creatively, and comprehensively to the audience. We'll get your brand to communicate with the target customer's subconscious and leave an imprint for the future.
          </p>
        </motion.div>
      </section>

      {/* Projects */}
      <section className="bg-white px-6 md:px-12 pb-40">
        <div className="max-w-7xl mx-auto flex flex-col border-t border-[#ddd] pt-24">
          
          {/* Project 1 */}
          <motion.div 
            className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-32 items-center"
            initial="initial"
            whileInView="whileInView"
            viewport={reveal3D.viewport}
            variants={reveal3D}
            transition={reveal3D.transition}
          >
            <div className="w-full lg:w-1/2 overflow-hidden aspect-[4/3] bg-[#EAEAEA] rounded-3xl" style={{ transformStyle: 'preserve-3d' }}>
              <motion.img 
                whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5, z: 20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                src={project1Img} 
                alt="LIVV Audio App" 
                className="w-full h-full object-cover transition-transform duration-700" 
                referrerPolicy="no-referrer" 
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col items-start gap-8">
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">LIVV Audio App</h3>
              <div className="space-y-4 text-sm font-medium text-[#666] tracking-tight border-l-2 border-[#111] pl-6 py-2">
                <p><strong className="text-[#111] uppercase tracking-widest text-xs">Credits:</strong></p>
                <p>UI/UX Designer: Koryun Mkhitaryan</p>
                <p>Project Manager: Tatev Hakobyan</p>
                <p>Creative Director: Elen Gasparyan</p>
              </div>
              <a href="#" className="font-bold uppercase tracking-widest text-xs border-b border-[#111] pb-1 hover:text-[#666] hover:border-[#666] transition-colors mt-4">See more &gt;&gt;</a>
            </div>
          </motion.div>

          {/* Project 2 */}
          <motion.div 
            className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-24 mb-32 items-center"
            initial="initial"
            whileInView="whileInView"
            viewport={reveal3D.viewport}
            variants={reveal3D}
            transition={reveal3D.transition}
          >
            <div className="w-full lg:w-1/2 overflow-hidden aspect-[4/3] bg-[#EAEAEA] rounded-3xl" style={{ transformStyle: 'preserve-3d' }}>
              <motion.img 
                whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5, z: 20 }}
                transition={{ duration: 0.6, ease: "easeOut" as any }}
                src={project2Img} 
                alt="Mezcal Apeña" 
                className="w-full h-full object-cover transition-transform duration-700" 
                referrerPolicy="no-referrer" 
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col items-start gap-8">
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">Branding for Mezcal Apeña</h3>
              <div className="space-y-4 text-[#333] font-medium leading-relaxed">
                <p><strong className="text-[#111] uppercase tracking-widest text-xs border-b-2 border-[#111] pb-1">About Project</strong></p>
                <p className="mt-4">Mezcal Apeña is a premium mezcal brand that distinguishes itself through a deep commitment to tradition, quality, and female empowerment. As a proud female-owned enterprise, it reveres the authenticity and rich heritage of its products...</p>
                <p><strong>Logo solution:</strong><br/>The logo combines the Mexican Woman, Agave Plant, Earrings, and Text Fragment.</p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 text-sm font-medium text-[#666] tracking-tight w-full pt-4 border-t border-[#eee]">
                 <div>
                    <p>Date: 2024</p>
                    <p>Client: Mezcal Apeña</p>
                 </div>
                 <div>
                    <p><strong className="text-[#111]">Credits:</strong></p>
                    <p>Project type: Logo design</p>
                    <p>Graphic Designer: Koryun Mkhitaryan</p>
                    <p>Project Manager: Nina Hovhannisyan</p>
                 </div>
              </div>

              <a href="#" className="font-bold uppercase tracking-widest text-xs border-b border-[#111] pb-1 hover:text-[#666] hover:border-[#666] transition-colors mt-4">See more &gt;&gt;</a>
            </div>
          </motion.div>

          {/* Project 3 */}
          <motion.div 
            className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center mb-24"
            initial="initial"
            whileInView="whileInView"
            viewport={reveal3D.viewport}
            variants={reveal3D}
            transition={reveal3D.transition}
          >
            <div className="w-full lg:w-1/2 overflow-hidden aspect-square bg-[#EAEAEA] rounded-3xl" style={{ transformStyle: 'preserve-3d' }}>
              <motion.img 
                whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5, z: 20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                src={project3Img} 
                alt="Waunt" 
                className="w-full h-full object-cover transition-transform duration-700" 
                referrerPolicy="no-referrer" 
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col items-start gap-6">
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">Waunt: Integrated marketing campaign</h3>
              <p className="text-[#333] font-medium leading-relaxed text-lg">
                MIDZERO creative agency recently had the honor of partnering with Oriflame, a globally renowned brand with a presence in over 60 countries. The task at hand was no easy feat - to launch and advertise their new line of WAUNT products specifically targeted towards the female Gen Z audience in Armenia...
              </p>
              <a href="#" className="font-bold uppercase tracking-widest text-xs border-b border-[#111] pb-1 hover:text-[#666] hover:border-[#666] transition-colors mt-4">See more &gt;&gt;</a>
            </div>
          </motion.div>

          <div className="flex justify-center pt-12">
            <button 
              onClick={() => handleGatedLink("https://payhip.com/midzerohub")}
              className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest border border-[#111] rounded-full px-12 py-5 hover:bg-[#111] hover:text-white transition-colors duration-300 cursor-pointer"
            >
              Discover all 
            </button>
          </div>

        </div>
      </section>
    </>
  );
}
