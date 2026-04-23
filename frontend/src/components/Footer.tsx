'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SocialItem {
  id: number;
  name: string;
  url: string;
}

interface FooterProps {
  logoText: string;
  tagline: string;
  socials?: SocialItem[];
}

export default function Footer({ logoText, tagline, socials = [] }: FooterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/newsletter/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <footer className="bg-white text-black pt-24 pb-12 border-t border-black/10 relative overflow-hidden">
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-4xl font-extrabold tracking-tighter mb-6 block text-black">
              {logoText}<span className="text-black/30">.</span>
            </Link>
            <p className="text-black/60 max-w-sm text-lg mb-8 font-light">
              {tagline}
            </p>
            
            <form className="flex flex-col gap-2 max-w-md" onSubmit={handleSubscribe}>
              <div className="flex items-center gap-2">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Subscribe to our newsletter" 
                  className="flex-1 bg-black/5 border border-black/10 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-black/30 transition-colors text-black placeholder:text-black/40"
                  disabled={status === 'loading'}
                />
                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-black text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-black/80 transition-colors disabled:opacity-50"
                >
                  {status === 'loading' ? '...' : 'Join'}
                </button>
              </div>
              {status === 'success' && <p className="text-sm text-green-600 ml-4 font-medium">Successfully subscribed!</p>}
              {status === 'error' && <p className="text-sm text-red-500 ml-4 font-medium">Failed to subscribe. Try again.</p>}
            </form>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 tracking-widest uppercase text-sm text-black/40">Navigation</h4>
            <ul className="space-y-4 text-black/80 text-sm font-medium">
              <li><Link href="#services" className="hover:text-black transition-colors">Services</Link></li>
              <li><Link href="/#work" className="hover:text-black transition-colors">Work</Link></li>
              <li><Link href="/#testimonials" className="hover:text-black transition-colors">Testimonials</Link></li>
              <li><Link href="/#insights" className="hover:text-black transition-colors">Insights</Link></li>
              <li><Link href="/join" className="hover:text-black transition-colors">Join Our Team</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 tracking-widest uppercase text-sm text-black/40">Socials</h4>
            <ul className="space-y-4 text-black/80 text-sm font-medium">
              {socials.length > 0 ? (
                socials.map((social) => (
                  <li key={social.id}>
                    <a href={social.url} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                      {social.name}
                    </a>
                  </li>
                ))
              ) : (
                <>
                  <li><a href="#" className="hover:text-black transition-colors">Twitter</a></li>
                  <li><a href="#" className="hover:text-black transition-colors">LinkedIn</a></li>
                  <li><a href="#" className="hover:text-black transition-colors">Instagram</a></li>
                </>
              )}
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-black/10 text-xs text-black/40 font-medium tracking-wide">
          <p>© {new Date().getFullYear()} {logoText}. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-black transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
