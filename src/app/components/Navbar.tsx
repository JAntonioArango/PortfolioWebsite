import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: 'About', to: '/#about' },
    { name: 'Work', to: '/#work' },
    { name: 'Services', to: '/#services' },
    { name: 'Contact', to: '/#contact' }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md py-4 border-b border-black/5 dark:border-white/5' : 'py-8 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="text-2xl font-bold tracking-tighter mix-blend-normal text-neutral-500 dark:mix-blend-difference dark:text-white z-50">
              ANTONIO.DEV
            </Link>
          </motion.div>

          <div className="flex items-center gap-6">
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link
                    to={item.to}
                    className="text-base uppercase tracking-widest hover:text-neutral-950/70 dark:hover:text-white/70 transition-colors relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-neutral-950 dark:bg-white transition-all group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="z-50 w-9 h-9 rounded-full flex items-center justify-center border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-950 dark:text-white transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden z-50 text-neutral-950 dark:text-white"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu — rendered via portal to escape the transformed <motion.nav> containing block,
          so `fixed inset-0` always covers the true viewport regardless of scroll/animation state */}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: "tween", duration: 0.4 }}
              className="fixed inset-0 z-[60] bg-white text-neutral-950 dark:bg-neutral-950 dark:text-white flex flex-col items-center justify-center gap-12 md:hidden"
            >
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="absolute top-8 right-6 text-neutral-950 dark:text-white"
              >
                <X />
              </button>

              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="text-4xl font-medium tracking-tight hover:text-neutral-500 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
