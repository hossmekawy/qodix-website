'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProjects, getHomepageData } from '@/lib/api';
import Link from 'next/link';
import { Search, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WorkIndex() {
  const [projects, setProjects] = useState<any[]>([]);
  const [socials, setSocials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Web App', 'Mobile App', 'AI Integration', 'Digital Strategy', 'SaaS'];

  useEffect(() => {
    getHomepageData().then(data => {
      if (data && data.socials) setSocials(data.socials);
    });
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const data = await getProjects(category, search);
      setProjects(data);
      setLoading(false);
    };

    const timer = setTimeout(() => fetchProjects(), 300);
    return () => clearTimeout(timer);
  }, [category, search]);

  return (
    <main className="bg-black text-white min-h-screen flex flex-col">
      <Navbar logoText="Qodix" />

      <div className="flex-1 pb-24">
        {/* Hero */}
        <section className="pt-40 pb-20 px-6 text-center border-b border-white/10">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6">OUR WORK</h1>
            <p className="text-xl md:text-2xl text-white/60 font-light">Impactful solutions crafted for ambitious brands.</p>
          </div>
        </section>

        <div className="container mx-auto px-6 max-w-7xl pt-12">
          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    category === c 
                      ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                      : 'bg-white/5 hover:bg-white/10 text-white/80'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search cases..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all text-white placeholder-white/40"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-32">
              <Loader2 className="w-8 h-8 animate-spin text-white/40" />
            </div>
          ) : (
            <>
              {projects.length === 0 ? (
                <div className="text-center py-32 text-white/50">
                  <p>No projects found matching your criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {projects.map((project: any, index: number) => (
                    <Link key={project.id} href={`/work/${project.slug}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="group relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-white/5 cursor-pointer border border-white/10 hover:border-white/30 transition-colors"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                        {project.image && (
                          <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" />
                        )}
                        
                        <div className="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-black via-black/50 to-transparent">
                          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <p className="text-sm font-mono tracking-widest text-white/70 uppercase mb-3">{project.category}</p>
                            <h4 className="text-3xl md:text-5xl font-bold mb-4">{project.title}</h4>
                            
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                              <p className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black font-medium rounded-full text-sm">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                {project.result_metric}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer logoText="Qodix" tagline="Ready to Tech It Easy? Let's talk." socials={socials} />
    </main>
  );
}
