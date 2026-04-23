"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DashboardHome() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Just fetching homepage data to show some quick stats
        const fetchData = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/homepage-data/');
                setStats({
                    projects: res.data.projects?.length || 0,
                    blogs: res.data.blogs?.length || 0,
                    services: res.data.services?.length || 0,
                    testimonials: res.data.testimonials?.length || 0,
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-light mb-2">Welcome to Nexus</h1>
            <p className="text-white/50 mb-12">Manage all aspects of the Qodix digital presence.</p>

            {loading ? (
                <div className="animate-pulse flex gap-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-32 w-48 bg-white/5 rounded"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <StatCard title="Total Projects" value={stats?.projects} />
                    <StatCard title="Active Services" value={stats?.services} />
                    <StatCard title="Blog Posts" value={stats?.blogs} />
                    <StatCard title="Testimonials" value={stats?.testimonials} />
                </div>
            )}
        </div>
    );
}

function StatCard({ title, value }: { title: string, value: number }) {
    return (
        <div className="p-6 border border-white/10 bg-white/[0.02] rounded-xl flex flex-col justify-between h-32">
            <span className="text-white/50 text-sm">{title}</span>
            <span className="text-4xl font-light">{value}</span>
        </div>
    );
}
