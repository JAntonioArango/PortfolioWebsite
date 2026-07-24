import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

type AmbientBackgroundProps = {
  /** true = fixed to viewport (tall/scrolling pages), false = absolute to nearest positioned ancestor (single-viewport hero) */
  fixed?: boolean;
};

export const AmbientBackground = ({ fixed = true }: AmbientBackgroundProps) => {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <div className={`${fixed ? 'fixed' : 'absolute'} inset-0 z-0 pointer-events-none overflow-hidden`}>
      {/* 1. Cinematic Grain & Gradient Background */}
      <motion.div style={{ y: yBg }} className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute top-[-20%] left-[20%] w-[60vw] h-[60vw] bg-violet-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[8000ms] opacity-0 dark:opacity-100" />
        <div className="absolute bottom-[-20%] right-[20%] w-[50vw] h-[50vw] bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[10000ms] opacity-0 dark:opacity-100" />
      </motion.div>

      {/* 2. Technical Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* 3. Precision Geometric Rings */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full border border-black/10 dark:border-white/10 border-dashed opacity-50"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[450px] h-[450px] md:w-[600px] md:h-[600px] rounded-full border border-black/10 dark:border-white/10 opacity-40"
        >
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-neutral-950 dark:bg-white rounded-full shadow-[0_0_15px_rgba(0,0,0,0.25)] dark:shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
        </motion.div>
        <motion.div
          animate={{ rotate: 180 }}
          transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[800px] h-[800px] md:w-[1100px] md:h-[1100px] rounded-full border border-black/5 dark:border-white/5 border-dotted opacity-50"
        />
      </div>
    </div>
  );
};
