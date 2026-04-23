'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { submitJobApplication } from '@/lib/api';
import { UploadCloud, CheckCircle, Loader2 } from 'lucide-react';

export default function JoinOurTeam() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cv_base64: '',
    image_base64: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: 'cv_base64' | 'image_base64') => {
    if (e.target.files && e.target.files[0]) {
      try {
        const base64 = await fileToBase64(e.target.files[0]);
        setFormData(prev => ({ ...prev, [field]: base64 }));
      } catch (err) {
        console.error("Error converting file to base64", err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitJobApplication(formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', cv_base64: '', image_base64: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <main className="bg-black text-white min-h-screen flex flex-col">
      <Navbar logoText="Qodix" />
      
      <div className="flex-1 flex items-center justify-center pt-32 pb-24 px-6">
        <div className="w-full max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-center">Join Our Team</h1>
          <p className="text-white/60 text-center mb-12">We are always looking for exceptional talent. Apply below.</p>
          
          {status === 'success' ? (
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-12 text-center flex flex-col items-center">
              <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
              <h3 className="text-2xl font-bold mb-2">Application Received</h3>
              <p className="text-white/60">Thank you for your interest! We will review your application and get back to you shortly.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-8 px-6 py-2 border border-white/20 rounded-full text-sm font-medium hover:bg-white/10 transition-colors"
              >
                Submit another application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 bg-white/[0.02] border border-white/10 p-8 md:p-12 rounded-3xl">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Email Address</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Phone Number</label>
                <input 
                  required
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Upload CV</label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-white/10 border-dashed rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadCloud className="w-8 h-8 mb-2 text-white/50" />
                      <p className="text-xs text-white/50 text-center px-4">{formData.cv_base64 ? 'CV Attached' : 'Click to upload PDF/Word'}</p>
                    </div>
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => handleFileChange(e, 'cv_base64')} />
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Upload Photo</label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-white/10 border-dashed rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadCloud className="w-8 h-8 mb-2 text-white/50" />
                      <p className="text-xs text-white/50 text-center px-4">{formData.image_base64 ? 'Photo Attached' : 'Click to upload Image'}</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'image_base64')} />
                  </label>
                </div>
              </div>

              {status === 'error' && (
                <p className="text-red-400 text-sm">Failed to submit application. Please try again.</p>
              )}

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-white/90 transition-colors flex justify-center items-center gap-2 mt-4"
              >
                {status === 'submitting' && <Loader2 className="w-5 h-5 animate-spin" />}
                Submit Application
              </button>
            </form>
          )}
        </div>
      </div>

      <Footer logoText="Qodix" tagline="Ready to Tech It Easy? Let's talk." socials={[]} />
    </main>
  );
}
