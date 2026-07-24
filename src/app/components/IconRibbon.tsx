import React from 'react';
import { motion } from 'motion/react';
import { techIcons } from '../data/techIcons';

export const IconRibbon = () => {
  const track = [...techIcons, ...techIcons];

  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
      <motion.div
        className="flex items-center w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {track.map((icon, i) => (
          <a
            key={`${icon.name}-${i}`}
            href={icon.href}
            target="_blank"
            rel="noreferrer"
            title={icon.name}
            className="flex-shrink-0 mr-16"
          >
            <img
              src={icon.url}
              alt={icon.name}
              className="w-9 h-9 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
          </a>
        ))}
      </motion.div>
    </div>
  );
};
