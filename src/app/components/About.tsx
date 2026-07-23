import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import { awards } from '../data/awards';
import { IconRibbon } from './IconRibbon';

export const About = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={containerRef} id="about" className="py-32 relative bg-neutral-950 overflow-hidden">
      {/* Background Grid - Technical Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-6">
        
        {/* Section Header - Consistent Style */}
        <div className="flex items-center gap-6 mb-24">
           <div className="flex items-baseline gap-3">
              <span className="font-serif italic text-lg text-white">01</span>
              <span className="text-sm font-mono uppercase tracking-[0.3em] text-neutral-400">About Me</span>
           </div>
           <div className="h-px w-32 bg-gradient-to-r from-white/30 to-transparent" />
        </div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-20 items-start">
          
          {/* Text Content */}
          <div className="relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-8xl font-medium tracking-tighter mb-12 leading-[0.9]"
            >
              I build scalable <br />
              <span className="italic font-serif text-neutral-500">backends.</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-12 text-lg font-light text-neutral-400 leading-relaxed">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="space-y-6"
              >
                <p>
                  Specialized in Spring Boot and microservices, I design RESTful and reactive systems that prioritize clean architecture and long-term maintainability.
                </p>
                <p>
                  From JWT authentication to real-time monitoring with Prometheus and Grafana — I deliver backends ready for production from day one.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="space-y-6"
              >
                <p>
                  I leverage AI tools like Claude and Copilot to move fast on boilerplate without sacrificing quality. TDD, SonarQube, and CI/CD are non-negotiables in my workflow.
                </p>
                <p className="text-white/80">
                  A background in project management and Mechanical Engineering gives me a broader lens — I understand the systems code lives in, not just the code itself.
                </p>
              </motion.div>
            </div>

            {/* Stats & Trust */}
            <div className="mt-16 pt-16 border-t border-white/5">
               <div className="grid grid-cols-3 gap-8 mb-16">
                 <div className="space-y-2 border-r border-white/5">
                   <h4 className="text-4xl font-light text-white">2 +</h4>
                   <p className="text-sm uppercase tracking-widest text-neutral-500">Years Experience</p>
                 </div>
                 <div className="space-y-2 border-r border-white/5">
                   <h4 className="text-4xl font-light text-white">6 +</h4>
                   <p className="text-sm uppercase tracking-widest text-neutral-500">Projects Built</p>
                 </div>
                 <div className="space-y-2">
                   <h4 className="text-4xl font-light text-white">8</h4>
                   <p className="text-sm uppercase tracking-widest text-neutral-500">Awards</p>
                 </div>
               </div>

               {/* Awards and Certifications */}
               <div>
                 <span className="text-sm font-mono uppercase tracking-widest text-neutral-600 block mb-6">Awards and Certifications</span>
                 <div className="flex flex-wrap gap-6">
                   {awards.map((award, i) => (
                     <Link to={`/awards/${i}`} key={award.title}>
                       <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.5 + i * 0.15 }}
                         className="group w-28 flex-shrink-0"
                       >
                         <div className="aspect-[3/4] overflow-hidden rounded-sm bg-neutral-900 grayscale group-hover:grayscale-0 transition-all duration-700 mb-3">
                           <img src={award.image} alt={award.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                         </div>
                         <p className="text-sm font-medium text-white leading-tight">{award.title}</p>
                         <p className="text-xs font-mono text-neutral-600 mt-1 leading-tight">{award.sub}</p>
                       </motion.div>
                     </Link>
                   ))}
                 </div>
               </div>
            </div>
          </div>

          {/* Image Area */}
          <motion.div 
            style={{ opacity }}
            className="relative lg:mt-24"
          >
            <div className="relative z-10">
               <motion.div 
                 whileHover={{ scale: 0.98 }}
                 transition={{ duration: 0.5 }}
                 className="aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 ease-in-out bg-neutral-900"
               >
                 <img 
                   src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200" 
                   alt="Workspace" 
                   className="w-full h-full object-cover opacity-80" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
               </motion.div>
            </div>
          </motion.div>

        </div>

        {/* Tech Stack Ribbon */}
        <div className="mt-24 pt-16 border-t border-white/5">
          <IconRibbon />
        </div>
      </div>
    </section>
  );
};
