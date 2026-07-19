import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useTransform, useMotionValue, useSpring } from 'motion/react';
import { Menu, X, ArrowRight, ArrowUpRight, PhoneOff, Mic, Video, FileText, Pencil, MoreHorizontal } from 'lucide-react';
import { CoverFlowHero } from '../components/CoverFlowHero';
import { CrmDashboardMockup } from '../components/CrmDashboardMockup';
import aboutBgVideo from '../assets/klickpin-spa.mp4';
import avatarBg from '../assets/images/regenerated_image_1784470233249.jpg';
import project1Img from '../assets/images/regenerated_image_1784374184659.png';
import project2Img from '../assets/images/regenerated_image_1780574266646.jpg';
import project3Img from '../assets/images/regenerated_image_1780574269455.jpg';

import { FaTiktok, FaPinterest, FaInstagram, FaYoutube, FaFacebook, FaWhatsapp } from 'react-icons/fa';

export default function Home({ handleGatedLink }: { handleGatedLink: (url: string) => void }) {
  const navigate = useNavigate();
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
      <section 
        className="relative min-h-screen overflow-hidden bg-[#181818] flex items-end justify-start pb-16 md:pb-24 pt-32"
        style={{ 
          backgroundImage: "url('/android-bg-1.jpg')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-20 mix-blend-screen"
        >
          <source src="/hero-video-new.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

        {/* Content wrapper */}
        <div className="relative z-30 flex flex-col items-start text-left px-6 md:px-12 lg:px-20 w-full max-w-[1600px] mx-auto pb-10">
          <div className="flex flex-col lg:flex-row w-full items-center lg:items-center justify-between gap-12 lg:gap-8">
            <div className="w-full lg:w-1/2 flex flex-col items-start">
              <span className="text-xs md:text-sm font-bold text-white/70 tracking-widest mb-3 uppercase">BLACKPIXEL</span>
              
              <motion.div 
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative mb-8 flex flex-col items-start drop-shadow-2xl"
              >
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.8)] leading-none tracking-tighter pb-1 hover:bg-clip-text hover:bg-gradient-to-r hover:from-white hover:to-white/70 transition-all duration-500 text-left"
                >
                  Creativity
                </motion.h1>
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.8)] leading-none tracking-tighter -mt-[2px] text-left pb-1 hover:bg-clip-text hover:bg-gradient-to-r hover:from-white hover:to-white/70 transition-all duration-500"
                >
                  That Actually<br/>Pays Off
                </motion.h1>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="flex flex-wrap gap-2 md:gap-3 items-center justify-start bg-white/5 backdrop-blur-xl border border-white/20 p-2 md:p-2.5 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.15),inset_0_0_20px_rgba(255,255,255,0.1)] max-w-full overflow-x-auto scrollbar-hide relative group"
              >
                <button 
                  onClick={() => handleGatedLink("https://payhip.com/midzerohub")}
                  className="px-6 md:px-8 py-3 bg-[#FA1594]/80 text-white rounded-full text-xs md:text-sm font-black uppercase tracking-widest hover:bg-[#FF3BA6]/90 transition-all cursor-pointer whitespace-nowrap shadow-[0_0_15px_rgba(250,21,148,0.5)] hover:shadow-[0_0_25px_rgba(250,21,148,0.8)]"
                >
                  Market
                </button>
                <button 
                  onClick={() => handleGatedLink("https://t.me/+1vH_j9h-myowZjQ0")}
                  className="px-6 md:px-8 py-3 bg-[#229ED9]/80 text-white rounded-full text-xs md:text-sm font-black uppercase tracking-widest hover:bg-[#1C82B3]/90 transition-all cursor-pointer whitespace-nowrap shadow-[0_0_15px_rgba(34,158,217,0.5)] hover:shadow-[0_0_25px_rgba(34,158,217,0.8)]"
                >
                  Telegram
                </button>
                <button 
                  onClick={() => handleGatedLink("https://whop.com/fortune-digital-hub")}
                  className="px-6 md:px-8 py-3 bg-[#FF6243]/80 text-white rounded-full text-xs md:text-sm font-black uppercase tracking-widest hover:bg-[#E54A2D]/90 transition-all cursor-pointer whitespace-nowrap shadow-[0_0_15px_rgba(255,98,67,0.5)] hover:shadow-[0_0_25px_rgba(255,98,67,0.8)]"
                >
                  Whop
                </button>
                <button 
                  onClick={() => navigate('/portfolio')}
                  className="px-6 md:px-8 py-3 bg-[#00FF66]/80 text-black rounded-full text-xs md:text-sm font-black uppercase tracking-widest hover:bg-[#00E55C]/90 transition-all cursor-pointer whitespace-nowrap shadow-[0_0_15px_rgba(0,255,102,0.5)] hover:shadow-[0_0_25px_rgba(0,255,102,0.8)]"
                >
                  Skill
                </button>
              </motion.div>
            </div>

            <div className="w-full lg:w-1/2 flex justify-center perspective-[1200px] mt-8 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, rotateY: 25, rotateX: 10, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  rotateY: -15, 
                  rotateX: 5, 
                  scale: 1,
                  y: [0, -10, 0]
                }}
                transition={{ 
                  duration: 1.2, 
                  ease: "easeOut",
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="relative w-[280px] sm:w-[320px] aspect-[9/16] rounded-[2.5rem] p-4 flex flex-col justify-between overflow-hidden shadow-[0_0_60px_rgba(255,255,255,0.1),-20px_20px_40px_rgba(0,0,0,0.5)] border-4 border-white/10 bg-black/60 backdrop-blur-md"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* The video element remains a direct child of this div to preserve CSS targeting */}
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-[40%] object-cover rounded-2xl border border-white/10 shadow-inner"
                  src="/side-video.mp4"
                />

                {/* Floating self-avatar image (PIP) inside the video call frame */}
                <div className="absolute top-[65px] right-4 w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl z-20 hover:scale-105 transition-transform duration-300 pointer-events-auto">
                  <img 
                    src={avatarBg} 
                    alt="Self View" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Video call controls overlay (positioned absolutely over the video region) */}
                <div className="absolute top-4 left-4 right-4 h-[40%] flex flex-col justify-between p-3 pointer-events-none z-10">
                  <div className="flex justify-between items-center">
                    <span className="bg-black/40 backdrop-blur-md text-[10px] text-white font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-[#00FF66] rounded-full animate-pulse"></span>
                      Jonah Jude
                    </span>
                    <span className="bg-black/40 backdrop-blur-md text-[10px] text-white/90 font-medium px-2 py-0.5 rounded-full">
                      36 min
                    </span>
                  </div>
                  <div className="flex justify-center gap-2 pointer-events-auto">
                    <button className="w-7 h-7 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all cursor-pointer">
                      <Mic size={12} />
                    </button>
                    <button className="w-7 h-7 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all cursor-pointer">
                      <Video size={12} />
                    </button>
                    <button className="w-7 h-7 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-all cursor-pointer shadow-lg shadow-red-500/30">
                      <PhoneOff size={11} />
                    </button>
                  </div>
                </div>

                {/* Summary Card */}
                <div className="w-full bg-white/95 backdrop-blur-md text-slate-800 p-3.5 rounded-2xl shadow-lg border border-white/20 transition-all hover:scale-[1.02] duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 bg-[#00FF66] rounded-full"></div>
                      <span className="text-xs font-black uppercase tracking-wider text-slate-900">Summary</span>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600">
                      <Pencil size={11} />
                    </button>
                  </div>
                  
                  <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase block mb-1.5">Documents:</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-50 border border-slate-100 p-2 rounded-xl flex flex-col justify-between min-h-[50px] relative hover:bg-slate-100/50 transition-all cursor-pointer">
                      <FileText size={16} className="text-[#FF7A59] mb-1" />
                      <span className="text-[10px] font-black text-slate-800 tracking-tight truncate">Brief.pdf</span>
                      <span className="text-[8px] text-slate-400 font-medium">9.4 MB</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-2 rounded-xl flex flex-col justify-between min-h-[50px] relative hover:bg-slate-100/50 transition-all cursor-pointer">
                      <FileText size={16} className="text-[#229ED9] mb-1" />
                      <span className="text-[10px] font-black text-slate-800 tracking-tight truncate">Specs.pdf</span>
                      <span className="text-[8px] text-slate-400 font-medium">12.1 MB</span>
                    </div>
                  </div>
                </div>

                {/* Goal Card */}
                <div className="w-full bg-white/5 border border-white/10 p-3 rounded-2xl shadow-inner relative overflow-hidden transition-all hover:bg-white/10 duration-300">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-white">Goal:</span>
                    <button className="text-white/40 hover:text-white/60">
                      <Pencil size={11} />
                    </button>
                  </div>
                  <p className="text-[10px] leading-relaxed text-gray-300 tracking-tight">
                    Reduce security incidents by <strong className="text-[#00FF66]">50%</strong>. This goal is quantitative, measurable, and highly impactful.
                  </p>
                </div>

                {/* Glass reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none rounded-[2rem]"></div>
              </motion.div>
            </div>
          </div>
          
          {/* CRM Dashboard UI Integration */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="w-full mt-12 z-40 relative"
          >
            <CrmDashboardMockup />
          </motion.div>
        </div>
      </section>

      {/* About Summary */}
      <section className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden bg-black text-white" style={{ minHeight: '430px' }}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-100 pointer-events-none"
        >
          <source src="/about-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        <motion.div 
          className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 justify-center items-center relative z-10 p-12 rounded-3xl transition-all duration-300"
          initial="initial"
          whileInView="whileInView"
          viewport={reveal3D.viewport}
          variants={reveal3D}
          transition={reveal3D.transition}
        >
          <div className="flex-shrink-0 pt-2 md:pt-4 relative z-20 flex flex-col items-center gap-8">
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <a href="#" className="w-14 h-14 rounded-[1.25rem] flex items-center justify-center text-white bg-black/40 backdrop-blur-md border border-white/20 hover:bg-black/60 hover:scale-110 transition-all shadow-lg shadow-black/20">
                <FaTiktok className="w-7 h-7" />
              </a>
              <a href="#" className="w-14 h-14 rounded-[1.25rem] flex items-center justify-center text-white bg-[#E60023]/60 backdrop-blur-md border border-white/20 hover:bg-[#E60023]/80 hover:scale-110 transition-all shadow-lg shadow-[#E60023]/20">
                <FaPinterest className="w-7 h-7" />
              </a>
              <a href="#" className="w-14 h-14 rounded-[1.25rem] flex items-center justify-center text-white bg-gradient-to-tr from-[#f09433]/70 via-[#dc2743]/70 to-[#bc1888]/70 backdrop-blur-md border border-white/20 hover:scale-110 transition-all shadow-lg shadow-[#dc2743]/20">
                <FaInstagram className="w-7 h-7" />
              </a>
              <a href="#" className="w-14 h-14 rounded-[1.25rem] flex items-center justify-center text-white bg-[#FF0000]/60 backdrop-blur-md border border-white/20 hover:bg-[#FF0000]/80 hover:scale-110 transition-all shadow-lg shadow-[#FF0000]/20">
                <FaYoutube className="w-7 h-7" />
              </a>
              <a href="#" className="w-14 h-14 rounded-[1.25rem] flex items-center justify-center text-white bg-[#1877F2]/60 backdrop-blur-md border border-white/20 hover:bg-[#1877F2]/80 hover:scale-110 transition-all shadow-lg shadow-[#1877F2]/20">
                <FaFacebook className="w-7 h-7" />
              </a>
              <a href="#" className="w-14 h-14 rounded-[1.25rem] flex items-center justify-center text-white bg-[#25D366]/60 backdrop-blur-md border border-white/20 hover:bg-[#25D366]/80 hover:scale-110 transition-all shadow-lg shadow-[#25D366]/20">
                <FaWhatsapp className="w-7 h-7" />
              </a>
            </div>

            <button 
              onClick={() => handleGatedLink("https://t.me/+1vH_j9h-myowZjQ0")} 
              className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest border border-white/40 bg-white/10 backdrop-blur-md text-white rounded-full px-8 py-4 hover:bg-white/20 hover:border-white active:bg-[#00FF66]/40 active:border-[#00FF66] active:shadow-[0_0_40px_#00FF66,inset_0_0_20px_#00FF66] transition-all duration-300 cursor-pointer shadow-sm"
            >
              More about us 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Marquee */}
      <div className="w-full bg-white/10 dark:bg-black/20 backdrop-blur-xl text-white py-6 overflow-hidden flex items-center border-y border-white/20 shadow-2xl relative z-20 -mt-[100px]">
        <motion.div
          variants={marqueeVariants}
          animate="animate"
          className="flex whitespace-nowrap text-5xl md:text-7xl font-black uppercase tracking-tighter drop-shadow-md"
        >
          <motion.span 
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="px-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-[length:200%_auto] pb-2"
          >
            Welcome to BLACKPIXEL
          </motion.span>
          <span className="px-8 text-white">-</span>
          <motion.span 
            initial={{ backgroundPosition: "100% 50%" }}
            animate={{ backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="px-8 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-green-500 bg-[length:200%_auto] pb-2"
          >
            Welcome to BLACKPIXEL
          </motion.span>
          <span className="px-8 text-white">-</span>
          <motion.span 
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="px-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-[length:200%_auto] pb-2"
          >
            Welcome to BLACKPIXEL
          </motion.span>
          <span className="px-8 text-white">-</span>
          <motion.span 
            initial={{ backgroundPosition: "100% 50%" }}
            animate={{ backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="px-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-500 to-red-500 bg-[length:200%_auto] pb-2"
          >
            Welcome to BLACKPIXEL
          </motion.span>
          <span className="px-8 text-white">-</span>
        </motion.div>
      </div>

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
      <section className="py-24 md:py-40 px-6 md:px-12 bg-white transition-colors duration-500 relative overflow-hidden">
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
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-[#111]">What we’re good at</h2>
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
                BLACKPIXEL creative agency recently had the honor of partnering with Oriflame, a globally renowned brand with a presence in over 60 countries. The task at hand was no easy feat - to launch and advertise their new line of WAUNT products specifically targeted towards the female Gen Z audience in Armenia...
              </p>
              <a href="#" className="font-bold uppercase tracking-widest text-xs border-b border-[#111] pb-1 hover:text-[#666] hover:border-[#666] transition-colors mt-4">See more &gt;&gt;</a>
            </div>
          </motion.div>

          <div className="flex justify-center pt-12">
            <button 
              onClick={() => handleGatedLink("https://payhip.com/midzerohub")}
              className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest border border-[#111]/20 bg-[#111]/5 backdrop-blur-md rounded-full px-12 py-5 hover:bg-[#111]/10 text-[#111] active:bg-[#00FF66]/40 active:border-[#00FF66] active:shadow-[0_0_40px_#00FF66,inset_0_0_20px_#00FF66] transition-all duration-300 cursor-pointer shadow-sm"
            >
              Discover all 
            </button>
          </div>

        </div>
      </section>
    </>
  );
}
