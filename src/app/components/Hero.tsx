import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { AmbientBackground } from './AmbientBackground';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const yText = useTransform(scrollY, [0, 500], [0, 200]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);
  
  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden px-6 bg-white dark:bg-neutral-950">
      
      <AmbientBackground fixed={false} />

      {/* Main Content */}
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md text-sm font-mono tracking-widest uppercase text-neutral-600 dark:text-neutral-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for new projects
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-7xl md:text-[8.5rem] font-medium tracking-tighter leading-[0.85] mb-12 mix-blend-normal text-neutral-500 dark:mix-blend-difference dark:text-white"
        >
          Build <br />
          <span className="italic font-serif text-neutral-500">Automate</span>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row items-center gap-6 md:gap-16 text-lg font-light text-neutral-600 dark:text-neutral-400 max-w-4xl mx-auto"
        >
          <p className="md:text-right flex-1 leading-relaxed">
            Java Backend Developer specialized in<br />
            Spring Boot, microservices, and clean architecture.
          </p>
          <div className="w-px h-16 bg-black/10 dark:bg-white/10 hidden md:block" />
          <p className="md:text-left flex-1 leading-relaxed">
            Based in Medellín, Colombia,<br />
            working globally.
          </p>
        </motion.div>
      </motion.div>

      {/* Minimal Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-black/20 dark:via-white/20 to-transparent overflow-hidden">
          <motion.div
            animate={{ y: [-100, 100] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-full h-1/2 bg-gradient-to-b from-transparent via-neutral-950 dark:via-white to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
};
