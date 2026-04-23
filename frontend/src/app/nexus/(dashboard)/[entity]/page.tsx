"use client";

import { useEffect, useState, use } from 'react';
import axios from 'axios';
import { NEXUS_ENTITIES, EntityConfig } from '@/lib/nexusConfig';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EntityPage({ params }: { params: Promise<{ entity: string }> }) {
    // Next 15 requires unwraping params with use() if they are used in client components that aren't wrapped in Suspense manually, or we can just `use` them
    const { entity } = use(params);
    const config = NEXUS_ENTITIES[entity];

    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [formData, setFormData] = useState<any>({});

    const fetchConfig = () => {
        return {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        };
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/${config.endpoint}/`, fetchConfig());
            // If it's a singleton, there might only be one result, or it returns a list
            if (config.singleton) {
                const item = Array.isArray(res.data) ? res.data[0] : res.data?.results?.[0];
                if (item) {
                    setEditingItem(item);
                    setFormData(item);
                    setIsFormOpen(true);
                } else {
                    // Create mode for singleton
                    setIsFormOpen(true);
                }
            } else {
                setData(res.data.results || res.data);
            }
        } catch (err) {
            console.error("Failed to fetch data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (config) fetchData();
    }, [config]);

    if (!config) return <div>Invalid entity</div>;

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Use FormData for file uploads if there are image fields
            const hasFile = config.fields.some(f => f.type === 'image');
            let payload: any = formData;
            let headers = fetchConfig().headers;

            if (hasFile) {
                const fd = new FormData();
                Object.keys(formData).forEach(key => {
                    // If it's a file object or string
                    if (formData[key] !== null && formData[key] !== undefined) {
                        // Don't re-upload URL strings for images if they haven't changed
                        if (config.fields.find(f => f.name === key)?.type === 'image' && typeof formData[key] === 'string') {
                            // skip if it's already a URL
                        } else {
                            fd.append(key, formData[key]);
                        }
                    }
                });
                payload = fd;
                headers = { ...headers, 'Content-Type': 'multipart/form-data' };
            }

            if (editingItem?.id) {
                // Determine lookup field, default to id. Some viewsets use slug.
                let lookupValue = editingItem.id;
                // Temporary hack: Check if we have a slug field in config and no id, use slug.
                // But typically editingItem.id or editingItem.slug
                const idField = editingItem.slug && config.endpoint !== 'comments' && config.endpoint !== 'join' ? editingItem.slug : editingItem.id;
                
                await axios.patch(`http://127.0.0.1:8000/api/${config.endpoint}/${idField}/`, payload, { headers });
            } else {
                await axios.post(`http://127.0.0.1:8000/api/${config.endpoint}/`, payload, { headers });
            }
            
            if (!config.singleton) {
                setIsFormOpen(false);
                setEditingItem(null);
                setFormData({});
                fetchData();
            } else {
                alert('Saved successfully.');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to save.');
        }
    };

    const handleDelete = async (item: any) => {
        if (!confirm('Are you sure?')) return;
        try {
            const idField = item.slug && config.endpoint !== 'comments' ? item.slug : item.id;
            await axios.delete(`http://127.0.0.1:8000/api/${config.endpoint}/${idField}/`, fetchConfig());
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleFieldChange = (name: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="max-w-6xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-light">{config.name}</h1>
                </div>
                {!config.singleton && !isFormOpen && (
                    <button 
                        onClick={() => {
                            setEditingItem(null);
                            setFormData({});
                            setIsFormOpen(true);
                        }}
                        className="bg-white text-black px-4 py-2 rounded flex items-center gap-2 hover:bg-white/90 text-sm font-medium transition-colors"
                    >
                        <Plus size={16} /> New Record
                    </button>
                )}
            </div>

            {loading ? (
                <div className="animate-pulse bg-white/5 h-64 rounded-xl"></div>
            ) : (
                <div className="relative">
                    <AnimatePresence mode="wait">
                        {!isFormOpen && !config.singleton && (
                            <motion.div 
                                key="table"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.01]"
                            >
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/10 text-white/50 text-xs uppercase tracking-wider">
                                            {config.listFields.map(f => (
                                                <th key={f} className="p-4">{f.replace('_', ' ')}</th>
                                            ))}
                                            <th className="p-4 w-24">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, idx) => (
                                            <tr key={item.id || item.slug || idx} className="border-b border-white/5 hover:bg-white/[0.02]">
                                                {config.listFields.map(f => (
                                                    <td key={f} className="p-4 truncate max-w-xs text-sm">
                                                        {item[f]}
                                                    </td>
                                                ))}
                                                <td className="p-4 flex gap-3">
                                                    <button onClick={() => { setEditingItem(item); setFormData(item); setIsFormOpen(true); }} className="text-white/40 hover:text-white">
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button onClick={() => handleDelete(item)} className="text-red-400/40 hover:text-red-400">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {data.length === 0 && (
                                            <tr>
                                                <td colSpan={config.listFields.length + 1} className="p-8 text-center text-white/40">
                                                    No records found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </motion.div>
                        )}

                        {isFormOpen && (
                            <motion.div 
                                key="form"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="border border-white/10 bg-white/[0.02] p-8 rounded-xl"
                            >
                                <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                                    <h2 className="text-xl font-light">
                                        {editingItem ? 'Edit Record' : 'Create Record'}
                                    </h2>
                                    {!config.singleton && (
                                        <button onClick={() => setIsFormOpen(false)} className="text-white/50 hover:text-white">
                                            <X size={20} />
                                        </button>
                                    )}
                                </div>

                                <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
                                    {config.fields.map(field => (
                                        <div key={field.name}>
                                            <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">
                                                {field.label}
                                            </label>
                                            
                                            {field.type === 'textarea' ? (
                                                <textarea 
                                                    value={formData[field.name] || ''}
                                                    onChange={e => handleFieldChange(field.name, e.target.value)}
                                                    className="w-full bg-black/50 border border-white/20 p-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors rounded min-h-[150px]"
                                                />
                                            ) : field.type === 'boolean' ? (
                                                <input 
                                                    type="checkbox"
                                                    checked={formData[field.name] || false}
                                                    onChange={e => handleFieldChange(field.name, e.target.checked)}
                                                    className="w-5 h-5 accent-white bg-black/50 border border-white/20"
                                                />
                                            ) : field.type === 'image' ? (
                                                <div>
                                                    {typeof formData[field.name] === 'string' && formData[field.name] && (
                                                        <img src={formData[field.name]} className="h-20 mb-2 rounded" alt="Preview" />
                                                    )}
                                                    <input 
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={e => handleFieldChange(field.name, e.target.files?.[0])}
                                                        className="text-sm text-white/50 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all"
                                                    />
                                                </div>
                                            ) : (
                                                <input 
                                                    type={field.type === 'number' ? 'number' : 'text'}
                                                    value={formData[field.name] || ''}
                                                    onChange={e => handleFieldChange(field.name, e.target.value)}
                                                    className="w-full bg-black/50 border border-white/20 p-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors rounded"
                                                />
                                            )}
                                        </div>
                                    ))}

                                    <div className="pt-4">
                                        <button 
                                            type="submit"
                                            className="bg-white text-black px-6 py-3 rounded flex items-center gap-2 hover:bg-white/90 text-sm font-medium transition-colors"
                                        >
                                            <Save size={16} /> Save Changes
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
