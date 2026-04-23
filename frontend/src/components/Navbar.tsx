'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import StartProjectModal from './StartProjectModal';

interface NavbarProps {
  logoText: string;
}

export default function Navbar({ logoText }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-md border-b border-black/10 py-4 shadow-sm' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-3xl font-extrabold tracking-tighter text-black">
            {logoText}
            <span className="text-black/30">.</span>
          </Link>

          {/* Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide uppercase text-black/60">
            <Link href="/#services" className="hover:text-black transition-colors">Services</Link>
            <Link href="/#work" className="hover:text-black transition-colors">Work</Link>
            <Link href="/#testimonials" className="hover:text-black transition-colors">Testimonials</Link>
            <Link href="/#insights" className="hover:text-black transition-colors">Insights</Link>
          </nav>

          {/* CTA */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-black text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-black/80 hover:scale-105 transition-all shadow-md"
          >
            Let's Build
          </button>
        </div>
      </motion.header>

      <StartProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
