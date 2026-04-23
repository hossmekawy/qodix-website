'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface BlogItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  read_time: string;
  date: string;
  summary: string;
  image: string | null;
}

interface BlogTeaserProps {
  blogs: BlogItem[];
}

export default function BlogTeaser({ blogs }: BlogTeaserProps) {
  return (
    <section id="insights" className="py-32 bg-white text-black">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <h2 className="text-sm font-mono tracking-widest text-black/50 uppercase mb-4">Insights</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Thoughts & Perspectives.</h3>
          </div>
          <Link href="/insights" className="text-sm font-medium uppercase tracking-widest border-b border-black pb-1 hover:text-black/60 hover:border-black/60 transition-colors w-fit flex items-center gap-2">
            Read Our Blog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <Link key={blog.id} href={`/insights/${blog.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group cursor-pointer h-full"
              >
                <div className="aspect-[4/3] bg-black/5 overflow-hidden rounded-xl mb-6 relative">
                  {blog.image && (
                    <img 
                      src={blog.image} 
                      alt={blog.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-black/50 mb-3">
                  <span className="bg-black/5 px-2 py-1 rounded">{blog.category}</span>
                  <span>{blog.read_time}</span>
                </div>
                <h4 className="text-2xl font-bold mb-3 group-hover:underline underline-offset-4 decoration-2">
                  {blog.title}
                </h4>
                <p className="text-black/60 line-clamp-2">
                  {blog.summary}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
