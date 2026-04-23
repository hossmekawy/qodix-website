"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
    LayoutDashboard, 
    FileText, 
    Image as ImageIcon, 
    Layers, 
    BarChart, 
    FolderKanban, 
    MessageSquareQuote, 
    Settings, 
    Mail, 
    Users, 
    Briefcase,
    MessageCircle,
    Send,
    LogOut,
    Link as LinkIcon
} from 'lucide-react';

const navItems = [
    { name: 'Dashboard', path: '/nexus', icon: LayoutDashboard },
    { name: 'Hero Section', path: '/nexus/hero', icon: ImageIcon },
    { name: 'Site Settings', path: '/nexus/settings', icon: Settings },
    { name: 'Email Config', path: '/nexus/email-config', icon: Mail },
    { name: 'Page Content', path: '/nexus/pages', icon: FileText },
    { name: 'Blog Posts', path: '/nexus/blogs', icon: FileText },
    { name: 'Projects', path: '/nexus/projects', icon: FolderKanban },
    { name: 'Services', path: '/nexus/services', icon: Layers },
    { name: 'Tech Stack', path: '/nexus/tech-stack', icon: Layers },
    { name: 'Testimonials', path: '/nexus/testimonials', icon: MessageSquareQuote },
    { name: 'Stats', path: '/nexus/stats', icon: BarChart },
    { name: 'Social Links', path: '/nexus/socials', icon: LinkIcon },
    { name: 'Comments', path: '/nexus/comments', icon: MessageCircle },
    { name: 'Job Apps', path: '/nexus/join', icon: Briefcase },
    { name: 'Inquiries', path: '/nexus/inquiry', icon: Send },
    { name: 'Subscribers', path: '/nexus/newsletter', icon: Users },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            router.push('/nexus/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        router.push('/nexus/login');
    };

    if (!isAuthenticated) return <div className="min-h-screen bg-black" />;

    return (
        <div className="min-h-screen bg-black text-white flex selection:bg-white selection:text-black">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 flex flex-col bg-white/[0.01]">
                <div className="h-16 flex items-center px-6 border-b border-white/10">
                    <span className="text-xl font-light tracking-widest">QODIX</span>
                    <span className="ml-2 text-xs uppercase tracking-widest text-white/40">Nexus</span>
                </div>
                
                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        const Icon = item.icon;
                        
                        return (
                            <Link 
                                key={item.path} 
                                href={item.path}
                                className={`flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                                    isActive 
                                        ? 'bg-white text-black font-medium' 
                                        : 'text-white/60 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <Icon size={18} className={isActive ? 'text-black' : 'text-white/40'} />
                                <span className="text-sm">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>

                <div className="p-4 border-t border-white/10">
                    <button 
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-3 py-2 rounded text-white/60 hover:text-white hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut size={18} className="text-white/40" />
                        <span className="text-sm">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={pathname}
                    className="p-8"
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
}
