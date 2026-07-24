import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { awards } from '../data/awards';
import { AmbientBackground } from './AmbientBackground';

export const AwardDetail = () => {
  const { index } = useParams();
  const parsedIndex = Number(index);
  const startIndex = Number.isInteger(parsedIndex) && parsedIndex >= 0 && parsedIndex < awards.length ? parsedIndex : 0;

  const [activeIndex, setActiveIndex] = useState(startIndex);
  const active = awards[activeIndex];

  const goPrev = () => setActiveIndex((i) => (i - 1 + awards.length) % awards.length);
  const goNext = () => setActiveIndex((i) => (i + 1) % awards.length);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-white dark:bg-neutral-950 min-h-screen text-neutral-950 dark:text-white pt-24 px-6">
      <AmbientBackground />
      <div className="container mx-auto relative z-10">
        <Link to="/" className="text-sm font-mono uppercase tracking-widest text-neutral-500 hover:text-neutral-950 dark:hover:text-white transition-colors mb-4 block">
          ← Back to Home
        </Link>

        {/* Large Image */}
        <div className="relative flex items-center justify-center mb-4">
          <button
            onClick={goPrev}
            aria-label="Previous award"
            className="absolute left-0 md:-left-16 z-20 flex items-center justify-center w-10 h-10 rounded-full border border-black/20 dark:border-white/20 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:border-black/50 dark:hover:border-white/50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="w-full max-w-2xl aspect-[3/4] rounded-sm overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                src={active.image}
                alt={active.title}
                className="w-full h-full object-contain"
              />
            </AnimatePresence>
          </div>

          <button
            onClick={goNext}
            aria-label="Next award"
            className="absolute right-0 md:-right-16 z-20 flex items-center justify-center w-10 h-10 rounded-full border border-black/20 dark:border-white/20 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:border-black/50 dark:hover:border-white/50 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Caption */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-2">{active.title}</h1>
          <p className="text-sm font-mono uppercase tracking-widest text-neutral-500">{active.sub}</p>
        </div>

        {/* Slider / Thumbnails */}
        <div className="flex justify-center gap-4 overflow-x-auto pb-12 px-2">
          {awards.map((award, i) => (
            <button
              key={award.title}
              onClick={() => setActiveIndex(i)}
              className={`group w-20 flex-shrink-0 text-left transition-opacity ${i === activeIndex ? 'opacity-100' : 'opacity-40 hover:opacity-80'}`}
            >
              <div className={`aspect-[3/4] overflow-hidden rounded-sm bg-neutral-100 dark:bg-neutral-900 mb-2 ${i === activeIndex ? 'ring-1 ring-black/60 dark:ring-white/60' : ''}`}>
                <img src={award.image} alt={award.title} className="w-full h-full object-cover" />
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-tight truncate">{award.title}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
