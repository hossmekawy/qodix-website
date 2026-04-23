"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('http://127.0.0.1:8000/api/token/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                router.push('/nexus');
            } else {
                setError('Invalid credentials.');
            }
        } catch (err) {
            setError('Connection error.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 selection:bg-white selection:text-black">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-md"
            >
                <div className="border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8 rounded-2xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-light tracking-tight text-white mb-2">Qodix Nexus</h1>
                        <p className="text-white/50 text-sm">Authorized personnel only.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-3 border border-red-500/20 bg-red-500/10 text-red-400 text-sm rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Username</label>
                            <input 
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-transparent border-b border-white/20 pb-2 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors"
                                placeholder="Admin ID"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Password</label>
                            <input 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent border-b border-white/20 pb-2 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 mt-4 bg-white text-black text-sm font-medium hover:bg-white/90 disabled:opacity-50 transition-all rounded"
                        >
                            {loading ? 'Authenticating...' : 'Access Nexus'}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
