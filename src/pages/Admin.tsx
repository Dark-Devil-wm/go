import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { motion, AnimatePresence } from 'motion/react';
import { 
  collection, 
  getDocs, 
  updateDoc, 
  doc, 
  deleteDoc, 
  query, 
  orderBy,
  addDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { 
  Users, 
  Calendar as CalendarIcon, 
  FileText, 
  Settings, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Plus, 
  Edit3,
  ExternalLink,
  Search,
  ArrowUpRight,
  TrendingUp,
  Activity,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

export const Admin = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'users' | 'bookings' | 'blog' | 'analytics'>('analytics');
  const [data, setData] = useState<any>({ users: [], bookings: [], blog: [] });
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [blogForm, setBlogForm] = useState<any>({ title: '', category: '', excerpt: '', content: '', image: '' });

  useSEO({
    title: 'Command Center - Admin',
    description: 'Advanced infrastructure management for Strength Fitness London directors.'
  });

  useEffect(() => {
    if (!loading && (!user || profile?.role !== 'admin')) {
      navigate('/');
    }
  }, [user, profile, loading, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      const usersSnap = await getDocs(collection(db, 'users'));
      const bookingsSnap = await getDocs(query(collection(db, 'bookings'), orderBy('date', 'desc')));
      const blogSnap = await getDocs(query(collection(db, 'blog'), orderBy('date', 'desc')));
      
      setData({
        users: usersSnap.docs.map(d => ({ id: d.id, ...d.data() })),
        bookings: bookingsSnap.docs.map(d => ({ id: d.id, ...d.data() })),
        blog: blogSnap.docs.map(d => ({ id: d.id, ...d.data() }))
      });
    };

    if (profile?.role === 'admin') fetchData();
  }, [profile]);

  const handleUpdateStatus = async (bookingId: string, status: string) => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), { status });
      // Update local state
    } catch (error) {
      console.error(error);
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPost) {
        await updateDoc(doc(db, 'blog', editingPost.id), { ...blogForm });
      } else {
        await addDoc(collection(db, 'blog'), {
          ...blogForm,
          author: profile.displayName,
          date: new Date().toISOString(),
          published: true
        });
      }
      setIsBlogModalOpen(false);
      setEditingPost(null);
      // Refresh data
    } catch (error) {
      console.error(error);
    }
  };

  if (loading || profile?.role !== 'admin') return null;

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-dark min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <span className="font-mono text-brand-blue text-xs uppercase tracking-[0.4em] mb-4 block">Directorate Access Only</span>
          <h1 className="text-5xl md:text-7xl font-sans font-bold uppercase tracking-tighter leading-none italic">
            Command <span className="text-white/20">Center</span>
          </h1>
        </header>

        {/* Admin Navigation */}
        <div className="flex flex-wrap gap-4 mb-12">
          {[
            { id: 'analytics', label: 'Intelligence', icon: TrendingUp },
            { id: 'users', label: 'Practitioners', icon: Users },
            { id: 'bookings', label: 'Protocols', icon: Calendar },
            { id: 'blog', label: 'Journal', icon: FileText }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all border ${
                activeTab === tab.id 
                ? 'bg-white text-black border-white' 
                : 'glass-morphism text-white/40 border-white/5 hover:border-white/20'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { label: 'Network Power', value: '84.2%', trend: '+2.4%', icon: Activity },
                  { label: 'Active Protocols', value: data.bookings.length, trend: 'Optimal', icon: CalendarIcon },
                  { label: 'Member Count', value: data.users.length, trend: '+12', icon: Users },
                  { label: 'Metabolic Sync', value: 'Verified', trend: 'Online', icon: TrendingUp }
                ].map((stat, i) => (
                  <div key={i} className="glass-morphism p-8 rounded-3xl border border-white/5">
                    <stat.icon className="text-brand-blue mb-6" size={24} />
                    <div className="text-xs uppercase font-mono tracking-widest text-white/40 mb-2">{stat.label}</div>
                    <div className="text-4xl font-sans font-bold tracking-tight mb-2">{stat.value}</div>
                    <div className="text-[10px] font-mono text-brand-blue">{stat.trend}</div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="glass-morphism rounded-3xl border border-white/5 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-[10px] uppercase font-mono tracking-[0.2em] text-white/40">
                    <tr>
                      <th className="p-8">Practitioner</th>
                      <th className="p-8">Service Type</th>
                      <th className="p-8">Coordinates</th>
                      <th className="p-8">Status</th>
                      <th className="p-8">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-light text-white/60">
                    {data.bookings.map((booking: any) => (
                      <tr key={booking.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-8">{booking.userId}</td>
                        <td className="p-8 uppercase text-xs">{booking.serviceType}</td>
                        <td className="p-8 font-mono">{new Date(booking.date).toLocaleString()}</td>
                        <td className="p-8">
                          <span className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full ${
                            booking.status === 'confirmed' ? 'bg-brand-blue/20 text-brand-blue' : 'bg-red-500/20 text-red-500'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="p-8">
                          <div className="flex gap-2">
                            <button onClick={() => handleUpdateStatus(booking.id, 'confirmed')} className="p-2 hover:text-brand-blue transition-colors">
                              <CheckCircle size={18} />
                            </button>
                            <button onClick={() => handleUpdateStatus(booking.id, 'cancelled')} className="p-2 hover:text-red-500 transition-colors">
                              <XCircle size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'blog' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold uppercase tracking-tight">Journal Entries</h3>
                  <button 
                    onClick={() => { setEditingPost(null); setBlogForm({ title: '', category: '', excerpt: '', content: '' }); setIsBlogModalOpen(true); }}
                    className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-brand-blue transition-all"
                  >
                    <Plus size={14} />
                    New Entry
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {data.blog.map((post: any) => (
                    <div key={post.id} className="glass-morphism p-8 rounded-3xl border border-white/5 group">
                      <div className="text-[10px] uppercase font-mono tracking-widest text-brand-blue mb-4">{post.category}</div>
                      <h4 className="text-xl font-bold uppercase tracking-tight mb-4 group-hover:text-brand-blue transition-colors">{post.title}</h4>
                      <p className="text-white/40 text-sm font-light mb-8 line-clamp-2">{post.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-white/20 uppercase font-mono">{new Date(post.date).toLocaleDateString()}</span>
                        <div className="flex gap-4">
                          <button onClick={() => { setEditingPost(post); setBlogForm({ ...post }); setIsBlogModalOpen(true); }} className="text-white/40 hover:text-white transition-colors">
                            <Edit3 size={16} />
                          </button>
                          <button className="text-white/40 hover:text-red-500 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Blog Modal */}
      <AnimatePresence>
        {isBlogModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBlogModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl glass-morphism p-12 rounded-[48px] border border-white/10"
            >
              <h2 className="text-3xl font-sans font-bold uppercase tracking-tight mb-12">
                {editingPost ? 'Edit Journal Entry' : 'New Journal Entry'}
              </h2>
              <form onSubmit={handleBlogSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-white/40">Title</label>
                    <input 
                      type="text" 
                      value={blogForm.title}
                      onChange={e => setBlogForm({...blogForm, title: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 outline-none focus:border-brand-blue"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-white/40">Category</label>
                    <input 
                      type="text" 
                      value={blogForm.category}
                      onChange={e => setBlogForm({...blogForm, category: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 outline-none focus:border-brand-blue"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-white/40">Header Image URL</label>
                  <input 
                    type="url" 
                    value={blogForm.image || ''}
                    onChange={e => setBlogForm({...blogForm, image: e.target.value})}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 outline-none focus:border-brand-blue"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-white/40">Excerpt</label>
                  <textarea 
                    value={blogForm.excerpt}
                    onChange={e => setBlogForm({...blogForm, excerpt: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 outline-none focus:border-brand-blue h-24 resize-none"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-white/40">Content (Markdown Supported)</label>
                  <textarea 
                    value={blogForm.content}
                    onChange={e => setBlogForm({...blogForm, content: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 outline-none focus:border-brand-blue h-64 resize-none font-mono text-sm"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <button type="submit" className="flex-grow bg-white text-black py-6 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-brand-blue transition-all">
                    Initialize Protocol
                  </button>
                  <button type="button" onClick={() => setIsBlogModalOpen(false)} className="px-12 border border-white/10 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-white/5">
                    Abort
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
