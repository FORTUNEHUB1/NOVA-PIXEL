import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function CoverFlowHero() {
  const [activeIndex, setActiveIndex] = useState(4);
  const totalCards = 9;
  
  return (
    <div className="w-full h-full flex flex-col bg-transparent text-white overflow-hidden relative font-sans z-40 mt-8" style={{ minHeight: '600px' }}>
      
      {/* Top Bar */}
      <div className="flex justify-start items-center mb-12 gap-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm backdrop-blur-md transition-all text-white/80">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
          Folders (14)
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm backdrop-blur-md transition-all text-white/80">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
          Tags (44)
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm backdrop-blur-md transition-all text-white/80">
          Small
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </button>
      </div>

      {/* Cover Flow Area */}
      <div className="relative flex-1 flex justify-center items-center perspective-[1200px] mb-24 min-h-[400px]">
        {Array.from({ length: totalCards }).map((_, i) => {
          const offset = i - activeIndex;
          const absOffset = Math.abs(offset);
          const isCenter = offset === 0;
          
          let rotateY = offset * -25;
          let translateX = offset * 45;
          let translateZ = absOffset * -150;
          let zIndex = 100 - absOffset;
          let opacity = isCenter ? 1 : Math.max(0, 1 - absOffset * 0.2);
          
          return (
            <motion.div
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`absolute top-1/2 left-1/2 w-56 h-72 -mt-36 -ml-28 rounded-2xl cursor-pointer transition-all duration-500 shadow-2xl ${
                isCenter 
                  ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-[0_0_60px_rgba(74,222,128,0.4)] border border-green-300 z-50' 
                  : 'bg-white/5 backdrop-blur-xl border border-white/20'
              }`}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                zIndex,
                opacity,
              }}
              animate={{
                rotateY: offset * -25,
                x: offset * 45,
                z: absOffset * -150,
                opacity: isCenter ? 1 : Math.max(0, 1 - absOffset * 0.2)
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {isCenter && (
                <div className="p-5 flex flex-col h-full justify-between">
                  <div>
                    <h3 className="font-bold text-xl text-white">Corporate</h3>
                    <p className="text-sm text-green-100">Jan 01 - Mar 31</p>
                  </div>
                  <div className="text-5xl font-black text-white">87%</div>
                  <div className="text-sm font-semibold text-white tracking-widest uppercase">Compliance</div>
                </div>
              )}
              {!isCenter && (
                <div className="p-4 flex flex-col h-full justify-end opacity-40">
                   <div className="w-8 h-8 rounded-full bg-white/30 mb-2"></div>
                   <div className="w-16 h-2 bg-white/30 rounded"></div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-auto z-10 relative">
        {/* Key Dates Table */}
        <div className="bg-[#111111]/80 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
          <h3 className="text-xl font-bold mb-1 text-white">Key Dates</h3>
          <p className="text-xs text-white/50 mb-8">Chronolys Community smarter together</p>
          <div className="w-full">
            <div className="grid grid-cols-3 text-xs font-semibold text-white/40 pb-3 mb-4">
              <div>Date</div>
              <div className="col-span-2">Event</div>
            </div>
            <div className="grid grid-cols-3 items-center text-sm mb-4">
              <div className="font-bold text-white flex gap-3 items-center">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/50 text-xs">+</div>
                <div>2 Weeks<br/><span className="text-[10px] font-normal text-white/40">01/12/2025</span></div>
              </div>
              <div className="col-span-2 bg-white/5 px-4 py-3 rounded-xl text-white/80 border border-white/5">Autorenew date</div>
            </div>
            <div className="grid grid-cols-3 items-center text-sm">
              <div className="font-bold text-white/50 flex gap-3 items-center">
                <div className="w-6 h-6 flex items-center justify-center text-transparent">-</div>
                <div>2 Months<br/><span className="text-[10px] font-normal text-white/30">03/12/2025</span></div>
              </div>
              <div className="col-span-2 bg-white/5 px-4 py-3 rounded-xl text-white/50 border border-white/5">Termination date</div>
            </div>
          </div>
        </div>

        {/* Compliance Glow Card */}
        <div className="bg-gradient-to-br from-green-500/90 to-emerald-800/90 backdrop-blur-3xl border border-green-400/30 rounded-[2rem] p-8 shadow-[0_0_80px_rgba(74,222,128,0.15)] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
          
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
              <h3 className="text-2xl font-black text-white mb-1 tracking-tight">Compliance</h3>
              <p className="text-sm text-green-100/80 font-medium">Recent activity</p>
            </div>
            <div className="flex gap-2">
               <div className="px-4 py-1.5 bg-white/10 border border-white/20 backdrop-blur-md rounded-full text-xs font-semibold text-white">Vendor</div>
               <div className="px-4 py-1.5 bg-white/10 border border-white/20 backdrop-blur-md rounded-full text-xs font-semibold text-white">DPA</div>
            </div>
          </div>
          
          <div className="mb-8 relative z-10">
             <div className="flex justify-between text-xs font-semibold text-green-100/80 mb-3">
               <span>Annual Data Privacy Audit</span>
               <span>Finalized</span>
             </div>
             <div className="w-full h-1.5 bg-black/20 rounded-full relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-[85%] bg-white rounded-full shadow-[0_0_10px_white]"></div>
             </div>
          </div>

          <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-4 relative z-10 hover:bg-black/30 transition-all cursor-pointer">
             <div className="w-12 h-12 bg-white/10 border border-white/10 rounded-xl flex items-center justify-center shadow-inner">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
             </div>
             <div>
                <p className="text-sm font-bold text-white mb-0.5">GDPR Compliance Report v4.pdf</p>
                <p className="text-xs text-green-100/80">compliance@aegis.legal</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
