'use client';

import { motion } from 'framer-motion';

interface TechItem {
  id: number;
  name: string;
  logo_svg: string;
}

interface MarqueeProps {
  techStack: TechItem[];
}

export default function Marquee({ techStack }: MarqueeProps) {
  // Duplicate for seamless loop
  const duplicatedTechStack = [...techStack, ...techStack];

  return (
    <div className="py-12 border-y border-black/5 overflow-hidden bg-black/[0.02] relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
      
      <motion.div 
        className="flex gap-16 items-center w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
      >
        {duplicatedTechStack.map((tech, index) => (
          <div key={index} className="flex items-center gap-4 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" title={tech.name}>
            {tech.logo_svg ? (
              <img src={tech.logo_svg} alt={tech.name} className="h-10 object-contain" />
            ) : (
              <span className="text-xl font-medium tracking-wide uppercase">{tech.name}</span>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
