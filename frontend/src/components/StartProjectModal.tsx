'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { submitProjectInquiry } from '@/lib/api';

interface StartProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StartProjectModal({ isOpen, onClose }: StartProjectModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitProjectInquiry(formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const handleClose = () => {
    onClose();
    // Reset status after close animation
    setTimeout(() => setStatus('idle'), 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white border border-black/10 rounded-3xl p-8 overflow-hidden shadow-2xl"
          >
            <button 
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 text-black/50 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {status === 'success' ? (
              <div className="py-12 text-center flex flex-col items-center">
                <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
                <h3 className="text-3xl font-bold mb-4 tracking-tight text-black">Request Received</h3>
                <p className="text-black/60 leading-relaxed max-w-sm">
                  Thank you! Our team will contact you in less than 24 hours to discuss your project.
                </p>
                <button 
                  onClick={handleClose}
                  className="mt-8 px-8 py-3 bg-black text-white font-medium rounded-full hover:scale-105 transition-transform"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-3xl font-bold mb-2 tracking-tight text-black">Let's Build</h3>
                <p className="text-black/60 mb-8">Leave your details and we'll be in touch within 24 hours.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-black/70 mb-2">Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black/30 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black/70 mb-2">Email</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black/30 transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black/70 mb-2">Phone</label>
                    <input 
                      required
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black/30 transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-500 text-sm font-medium">Something went wrong. Please try again.</p>
                  )}

                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-black/80 transition-colors flex justify-center items-center gap-2 mt-4"
                  >
                    {status === 'submitting' && <Loader2 className="w-5 h-5 animate-spin" />}
                    Start Project
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
