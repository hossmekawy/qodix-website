'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getBlogs, getHomepageData } from '@/lib/api';
import Link from 'next/link';
import { Search, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function InsightsIndex() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [socials, setSocials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Insights', 'Engineering', 'Design', 'AI & Tech', 'Tutorials'];

  useEffect(() => {
    // Fetch socials for footer
    getHomepageData().then(data => {
      if (data && data.socials) setSocials(data.socials);
    });
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const data = await getBlogs(category, search);
      setBlogs(data);
      setLoading(false);
    };

    // Debounce search slightly
    const timer = setTimeout(() => {
      fetchBlogs();
    }, 300);

    return () => clearTimeout(timer);
  }, [category, search]);

  const featuredPost = blogs.length > 0 ? blogs[0] : null;
  const gridPosts = blogs.length > 1 ? blogs.slice(1) : [];

  return (
    <main className="bg-white text-black min-h-screen flex flex-col">
      <div className="bg-black">
        <Navbar logoText="Qodix" />
      </div>

      <div className="flex-1 pb-24">
        {/* Minimal Hero */}
        <section className="pt-32 pb-16 px-6 text-center border-b border-black/10">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4">INSIGHTS</h1>
            <p className="text-xl text-black/60">Tech talk, tutorials, and industry deep-dives.</p>
          </div>
        </section>

        <div className="container mx-auto px-6 max-w-7xl pt-12">
          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    category === c ? 'bg-black text-white' : 'bg-black/5 hover:bg-black/10 text-black'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-black/20 rounded-full focus:outline-none focus:border-black transition-colors"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-32">
              <Loader2 className="w-8 h-8 animate-spin text-black/40" />
            </div>
          ) : (
            <>
              {blogs.length === 0 ? (
                <div className="text-center py-32 text-black/50">
                  <p>No posts found matching your criteria.</p>
                </div>
              ) : (
                <>
                  {/* Featured Post */}
                  {featuredPost && (
                    <Link href={`/insights/${featuredPost.slug}`} className="block mb-20 group">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-black/[0.02] rounded-3xl p-6 md:p-10 border border-black/5 hover:border-black/20 transition-colors">
                        <div className="aspect-video bg-black/10 rounded-2xl overflow-hidden relative">
                          {featuredPost.image && (
                            <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-black/50 mb-4">
                            <span className="bg-black/10 px-3 py-1 rounded-full text-black">{featuredPost.category}</span>
                            <span>{featuredPost.read_time}</span>
                            <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                          </div>
                          <h2 className="text-3xl md:text-5xl font-bold mb-6 group-hover:underline decoration-2 underline-offset-4">{featuredPost.title}</h2>
                          <p className="text-black/60 text-lg mb-8 line-clamp-3">{featuredPost.summary}</p>
                          <div className="flex items-center gap-4">
                            {featuredPost.author_avatar ? (
                              <img src={featuredPost.author_avatar} alt={featuredPost.author_name} className="w-12 h-12 rounded-full object-cover bg-black/10" />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center font-bold text-lg">{featuredPost.author_name[0]}</div>
                            )}
                            <div>
                              <p className="font-bold">{featuredPost.author_name}</p>
                              <p className="text-sm text-black/50">{featuredPost.author_role}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}

                  {/* Grid */}
                  {gridPosts.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {gridPosts.map((post: any, index: number) => (
                        <Link key={post.id} href={`/insights/${post.slug}`}>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group cursor-pointer h-full border border-black/10 rounded-2xl p-4 hover:border-black/30 transition-colors bg-white flex flex-col"
                          >
                            <div className="aspect-[4/3] bg-black/5 overflow-hidden rounded-xl mb-6 relative">
                              {post.image && (
                                <img 
                                  src={post.image} 
                                  alt={post.title} 
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                />
                              )}
                              <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
                                {post.category}
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="text-2xl font-bold mb-3 group-hover:underline underline-offset-4 decoration-2">
                                {post.title}
                              </h4>
                              <p className="text-black/60 line-clamp-2 mb-6">
                                {post.summary}
                              </p>
                            </div>
                            
                            <div className="flex items-center justify-between border-t border-black/10 pt-4 mt-auto">
                              <div className="flex items-center gap-3">
                                {post.author_avatar ? (
                                  <img src={post.author_avatar} alt={post.author_name} className="w-8 h-8 rounded-full object-cover bg-black/10" />
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center font-bold text-xs">{post.author_name[0]}</div>
                                )}
                                <div>
                                  <p className="text-sm font-bold">{post.author_name}</p>
                                  <p className="text-[10px] text-black/50 uppercase tracking-widest">{post.date}</p>
                                </div>
                              </div>
                              <span className="text-xs font-mono text-black/40">{post.read_time}</span>
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>

      <Footer logoText="Qodix" tagline="Ready to Tech It Easy? Let's talk." socials={socials} />
    </main>
  );
}
