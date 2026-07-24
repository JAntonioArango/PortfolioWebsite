import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Server, GitBranch, Activity, Bot } from 'lucide-react';

const services = [
  {
    icon: Server,
    title: "Full-Stack Development",
    description: "Spring Boot microservices and RESTful / reactive APIs built for scale, extended end-to-end with React frontends for complete product delivery."
  },
  {
    icon: GitBranch,
    title: "DevOps & CI/CD",
    description: "Docker containers, automated GitHub pipelines, and quality gates with SonarQube and JaCoCo."
  },
  {
    icon: Activity,
    title: "Monitoring & Observability",
    description: "Real-time system health with Prometheus and Grafana. Know your service before it fails."
  },
  {
    icon: Bot,
    title: "AI Automation",
    description: "Multi-agent AI pipelines and AI-assisted development workflows — from automated code review and CI verification to AI-driven feature delivery."
  }
];

export const Services = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} id="services" className="py-32 px-6 bg-white dark:bg-neutral-950 relative overflow-hidden">
       {/* Dynamic Background */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />
       <motion.div
         animate={{ rotate: 360 }}
         transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
         className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] border border-black/5 dark:border-white/5 rounded-full pointer-events-none opacity-50 dashed-border"
         style={{ borderStyle: 'dashed' }}
       />
       <motion.div
         animate={{ rotate: -360 }}
         transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
         className="absolute top-[20%] right-[10%] w-[600px] h-[600px] border border-black/5 dark:border-white/5 rounded-full pointer-events-none opacity-30"
       />

      <div className="container mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-32 grid md:grid-cols-2 gap-16 items-end">
          <div>
            <div className="flex items-center gap-6 mb-8">
               <div className="flex items-baseline gap-3">
                  <span className="font-serif italic text-lg text-neutral-950 dark:text-white">03</span>
                  <span className="text-sm font-mono uppercase tracking-[0.3em] text-neutral-600 dark:text-neutral-400">/ Services</span>
               </div>
               <div className="h-px w-32 bg-gradient-to-r from-black/30 dark:from-white/30 to-transparent" />
            </div>
            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-9xl font-medium tracking-tighter leading-none"
            >
              Digital <br />
              <span className="italic font-serif text-neutral-500">Solutions</span>
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="md:pl-12 border-l border-black/10 dark:border-white/10 relative"
          >
            <div className="absolute top-0 left-[-1px] h-12 w-[1px] bg-gradient-to-b from-neutral-950 dark:from-white to-transparent" />
            <p className="text-xl md:text-2xl font-light text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Clean architecture, battle-tested tooling, and a production-first mindset — from API design to deployment.
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-24 group/list">
          {services.map((service, index) => (
            <motion.div
               key={index}
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.1, duration: 0.8 }}
               className={`
                 relative 
                 ${index % 2 === 1 ? 'lg:mt-32' : ''} 
                 transition-all duration-500 ease-out
                 hover:!opacity-100 group-hover/list:opacity-20
               `}
            >
               {/* Editorial Decorative Corners */}
               <div className="absolute -top-6 -left-6 w-3 h-3 border-t border-l border-black/20 dark:border-white/20 transition-all duration-500 group-hover:w-[calc(100%+3rem)] group-hover:h-[calc(100%+3rem)] group-hover:border-black/10 dark:group-hover:border-white/10 pointer-events-none" />
               <div className="absolute -bottom-6 -right-6 w-3 h-3 border-b border-r border-black/20 dark:border-white/20 transition-all duration-500 group-hover:w-[calc(100%+3rem)] group-hover:h-[calc(100%+3rem)] group-hover:border-black/10 dark:group-hover:border-white/10 pointer-events-none" />
               
               <ServiceCard service={service} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index }: { service: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="group p-8 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-500 backdrop-blur-sm"
    >
      <div className="mb-8 w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
        <service.icon className="w-6 h-6" />
      </div>

      <h3 className="text-xl font-medium mb-4 tracking-tight">{service.title}</h3>
      <p className="text-neutral-600 dark:text-neutral-400 font-light leading-relaxed group-hover:text-neutral-500 dark:group-hover:text-neutral-300 transition-colors">
        {service.description}
      </p>
    </motion.div>
  );
};
