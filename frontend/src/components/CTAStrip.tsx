'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import StartProjectModal from './StartProjectModal';

interface CTAStripProps {
  text: string;
  buttonText: string;
  buttonLink: string;
}

export default function CTAStrip({ text, buttonText, buttonLink }: CTAStripProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="contact" className="py-24 bg-white border-y border-black/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between bg-black/[0.02] p-12 md:p-16 rounded-3xl border border-black/5 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-black/5 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="relative z-10 text-center md:text-left mb-8 md:mb-0">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-black">
                {text}
              </h2>
            </div>
            
            <div className="relative z-10">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="inline-block px-10 py-5 bg-black text-white rounded-full font-bold text-sm tracking-wide uppercase shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_60px_rgba(0,0,0,0.2)] hover:scale-105 transition-all duration-300"
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </section>

      <StartProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
