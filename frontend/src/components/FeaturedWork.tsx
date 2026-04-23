'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface ProjectItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  result_metric: string;
  image: string | null;
}

interface FeaturedWorkProps {
  projects: ProjectItem[];
}

export default function FeaturedWork({ projects }: FeaturedWorkProps) {
  return (
    <section id="work" className="py-32 bg-white text-black">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <h2 className="text-sm font-mono tracking-widest text-black/50 uppercase mb-4">Featured Work</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight">Our impact in action.</h3>
          </div>
          <Link href="/work" className="text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-black/60 hover:border-black/60 transition-colors w-fit">
            View All Cases
          </Link>
        </div>

        <div className="flex flex-col gap-8">
          {projects.map((project, index) => (
            <Link key={project.id} href={`/work/${project.slug}`} className="block">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-black/5 cursor-pointer shadow-sm hover:shadow-xl transition-shadow"
              >
                {project.image && (
                  <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                )}
                {/* Dark gradient overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                
                <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-sm font-mono tracking-widest text-white/70 uppercase mb-3 drop-shadow-md">{project.category}</p>
                    <h4 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">{project.title}</h4>
                    
                    {/* Hover reveal metric */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <p className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black font-bold rounded-full text-sm shadow-lg">
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
      </div>
    </section>
  );
}
