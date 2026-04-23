'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import StartProjectModal from './StartProjectModal';

interface HeroProps {
  headline: string;
  typewriterWords: string;
  button1Text: string;
  button1Link: string;
  button2Text: string;
  button2Link: string;
}

export default function Hero({ typewriterWords, button1Text, button1Link, button2Text, button2Link }: HeroProps) {
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (typewriterWords) {
      setWords(typewriterWords.split(',').map(w => w.trim()));
    }
  }, [typewriterWords]);

  useEffect(() => {
    if (words.length === 0) return;
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words]);

  return (
    <>
      <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-white text-black">
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="w-8 h-[1px] bg-black"></div>
              <p className="text-xs font-mono font-bold tracking-widest uppercase text-black/60">
                TECH SOLUTION
              </p>
            </motion.div>

            {/* Headline Group */}
            <div className="mb-12">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl md:text-5xl font-light text-black/80 tracking-tight mb-2"
              >
                We don't just write code,
              </motion.h2>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[1] text-black"
              >
                WE CRAFT{" "}
                <span className="inline-block min-w-[280px] md:min-w-[420px] text-left font-serif italic font-light text-black/60">
                  <AnimatePresence mode="wait">
                    {words.length > 0 ? (
                      <motion.span
                        key={currentWordIndex}
                        initial={{ opacity: 0, y: 30, rotateX: -90 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, y: -30, rotateX: 90 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-block origin-bottom"
                      >
                        {words[currentWordIndex]}
                      </motion.span>
                    ) : (
                      <span className="inline-block">SOLUTIONS</span>
                    )}
                  </AnimatePresence>
                </span>
              </motion.h1>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-6xl font-bold tracking-tight mt-2 text-black/90"
              >
                that accelerate your success.
              </motion.h2>
            </div>

            {/* Subheadline Paragraph */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-black/60 max-w-2xl mb-12 font-light leading-relaxed"
            >
              We engineer scalable platforms and innovative digital experiences that give industry leaders their competitive edge.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center justify-start gap-6 pt-8 border-t border-black/10"
            >
              <button 
                onClick={() => setIsModalOpen(true)}
                className="group w-full sm:w-auto px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-black/80 transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
              >
                {button1Text}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link 
                href={button2Link} 
                className="w-full sm:w-auto px-8 py-4 bg-transparent text-black border border-black/20 font-bold rounded-full hover:border-black hover:bg-black/5 transition-all text-sm uppercase tracking-widest text-center"
              >
                {button2Text}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <StartProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
