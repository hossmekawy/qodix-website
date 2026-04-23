'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialItem {
  id: number;
  client_name: string;
  role: string;
  company: string;
  quote: string;
  logo: string | null;
}

interface TestimonialsProps {
  testimonials: TestimonialItem[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-32 bg-white text-black overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h2 className="text-sm font-mono tracking-widest text-black/50 uppercase mb-16">Client Voices</h2>
        
        <div className="relative h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <p className="text-2xl md:text-4xl font-light leading-relaxed tracking-tight mb-8">
                "{testimonials[currentIndex].quote}"
              </p>
              <div>
                <p className="font-bold text-lg">{testimonials[currentIndex].client_name}</p>
                <p className="text-black/50 uppercase tracking-widest text-xs mt-1">
                  {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button onClick={prev} className="p-3 border border-black/20 text-black/50 rounded-full hover:bg-black/5 hover:text-black transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={next} className="p-3 border border-black/20 text-black/50 rounded-full hover:bg-black/5 hover:text-black transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
