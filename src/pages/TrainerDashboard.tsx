import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { motion, AnimatePresence } from 'motion/react';
import { 
  collection, 
  getDocs, 
  updateDoc, 
  doc, 
  query, 
  where,
  orderBy,
  addDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { 
  User, 
  FileText, 
  Calendar, 
  Activity, 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle,
  Clock,
  LayoutDashboard,
  Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

export const TrainerDashboard = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'clients' | 'content' | 'schedule'>('profile');
  const [trainerData, setTrainerData] = useState<any>(null);
  const [clients, setClients] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);

  useSEO({
    title: 'Trainer Dashboard - Protocol Management',
    description: 'Manage your practitioners, performance journal, and scheduling.'
  });

  useEffect(() => {
    if (!loading && (!user || (profile?.role !== 'trainer' && profile?.role !== 'admin'))) {
      navigate('/dashboard');
    }
  }, [user, profile, loading, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      // Fetch trainer profile
      const trainerSnap = await getDocs(query(collection(db, 'trainers'), where('trainerId', '==', user.uid)));
      if (!trainerSnap.empty) {
        setTrainerData({ id: trainerSnap.docs[0].id, ...trainerSnap.docs[0].data() });
      }

      // Fetch bookings/clients
      // In a real app, we'd query by trainerId
      const bookingsSnap = await getDocs(collection(db, 'bookings'));
      setClients(bookingsSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      // Fetch trainer's blog posts
      const postsSnap = await getDocs(query(collection(db, 'blog'), where('author', '==', profile?.displayName), orderBy('date', 'desc')));
      setPosts(postsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    };

    if (user && profile) fetchData();
  }, [user, profile]);

  if (loading || (profile?.role !== 'trainer' && profile?.role !== 'admin')) return null;

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-dark min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <span className="font-mono text-brand-blue text-xs uppercase tracking-[0.4em] mb-4 block">Practitioner Console</span>
            <h1 className="text-5xl md:text-7xl font-sans font-bold uppercase tracking-tighter leading-none italic">
              Performance <span className="text-white/20">Studio</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 glass-morphism p-4 rounded-3xl border border-white/5">
            <div className="w-12 h-12 rounded-2xl bg-brand-blue/20 flex items-center justify-center text-brand-blue">
              <User size={24} />
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono tracking-widest text-white/40">Active Session</div>
              <div className="text-sm font-bold uppercase">{profile?.displayName}</div>
            </div>
          </div>
        </header>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {[
            { label: 'Active Clients', value: clients.length, icon: Users, color: 'text-brand-blue' },
            { label: 'Energy Output', value: '142kWh', icon: Activity, color: 'text-brand-blue' },
            { label: 'Hours Taught', value: '1,240', icon: Clock, color: 'text-brand-blue' },
            { label: 'Success Rate', value: '98.4%', icon: CheckCircle, color: 'text-brand-blue' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-morphism p-8 rounded-[32px] border border-white/5"
            >
              <stat.icon className={`${stat.color} mb-6`} size={20} />
              <div className="text-[10px] uppercase font-mono tracking-widest text-white/40 mb-2">{stat.label}</div>
              <div className="text-3xl font-sans font-bold tracking-tight">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-4 mb-12">
          {[
            { id: 'profile', label: 'Identity', icon: User },
            { id: 'clients', label: 'Practitioners', icon: Users },
            { id: 'content', label: 'Journal', icon: FileText },
            { id: 'schedule', label: 'Calendar', icon: Calendar }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all border ${
                activeTab === tab.id 
                ? 'bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.1)]' 
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
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
            className="min-h-[400px]"
          >
            {activeTab === 'profile' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="glass-morphism p-10 rounded-[48px] border border-white/5 space-y-10">
                  <h3 className="text-2xl font-bold uppercase tracking-tight italic">Avatar Configuration</h3>
                  <div className="flex items-center gap-8">
                    <div className="w-32 h-32 rounded-[32px] overflow-hidden border border-white/10 grayscale">
                      <img src={trainerData?.image || profile?.avatar} className="w-full h-full object-cover" alt="Profile" />
                    </div>
                    <button className="text-[10px] uppercase font-bold tracking-widest text-brand-blue border border-brand-blue/20 px-6 py-3 rounded-xl hover:bg-brand-blue hover:text-black transition-all">
                      Update Image
                    </button>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-mono tracking-widest text-white/40">Professional Bio</label>
                      <textarea 
                        defaultValue={trainerData?.bio}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 outline-none focus:border-brand-blue h-32 resize-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-mono tracking-widest text-white/40">Specialization</label>
                      <input 
                        type="text"
                        defaultValue={trainerData?.specialization}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 outline-none focus:border-brand-blue"
                      />
                    </div>
                    <button className="w-full bg-white text-black py-4 rounded-xl font-bold uppercase tracking-widest text-[10px]">
                      Sync Profile
                    </button>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="glass-morphism p-10 rounded-[48px] border border-white/5">
                    <h3 className="text-xl font-bold uppercase tracking-tight mb-8">Performance Awards</h3>
                    <div className="space-y-4">
                      {trainerData?.certifications?.map((cert: string, i: number) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                          <span className="text-[10px] uppercase font-mono tracking-widest text-white/60">{cert}</span>
                          <CheckCircle size={14} className="text-brand-blue" />
                        </div>
                      ))}
                      <button className="w-full flex items-center justify-center gap-2 py-4 border border-white/5 rounded-2xl text-[10px] uppercase font-mono tracking-widest text-white/30 hover:bg-white/5 transition-all">
                        <Plus size={14} /> Add Certification
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'clients' && (
              <div className="glass-morphism rounded-[48px] border border-white/5 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-[10px] uppercase font-mono tracking-[0.2em] text-white/40">
                    <tr>
                      <th className="p-8">Practitioner</th>
                      <th className="p-8">Service Type</th>
                      <th className="p-8">Schedule</th>
                      <th className="p-8">Status</th>
                      <th className="p-8">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-light text-white/60">
                    {clients.map((client: any) => (
                      <tr key={client.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-8 font-bold text-white uppercase tracking-tight">{client.name || 'Anonymous'}</td>
                        <td className="p-8 uppercase text-xs">{client.serviceType}</td>
                        <td className="p-8 font-mono text-[10px]">{new Date(client.date).toLocaleString()}</td>
                        <td className="p-8">
                          <span className={`text-[9px] uppercase font-bold tracking-widest px-3 py-1 rounded-full ${
                            client.status === 'confirmed' ? 'bg-brand-blue/20 text-brand-blue' : 'bg-white/10 text-white/40'
                          }`}>
                            {client.status}
                          </span>
                        </td>
                        <td className="p-8">
                          <button className="text-brand-blue hover:underline uppercase text-[9px] font-bold tracking-widest">Protocol Intake</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center px-4">
                  <h3 className="text-2xl font-bold uppercase tracking-tight italic">Research Journal</h3>
                  <button className="flex items-center gap-2 bg-brand-blue text-black px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-[0_0_20px_rgba(0,242,255,0.2)]">
                    <Plus size={14} /> New Entry
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post: any) => (
                    <div key={post.id} className="glass-morphism p-8 rounded-[40px] border border-white/5 group relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex gap-2">
                          <button className="p-2 bg-white/5 rounded-lg hover:bg-brand-blue hover:text-black transition-all">
                            <Edit3 size={14} />
                          </button>
                          <button className="p-2 bg-white/5 rounded-lg hover:bg-red-500 transition-all">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="text-[9px] uppercase font-mono tracking-widest text-brand-blue mb-4">{post.category}</div>
                      <h4 className="text-lg font-bold uppercase tracking-tight mb-4 group-hover:text-brand-blue transition-colors">{post.title}</h4>
                      <p className="text-white/40 text-xs line-clamp-2 font-light mb-8">{post.excerpt}</p>
                      <div className="flex justify-between items-center text-[9px] uppercase font-mono text-white/20">
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <span>{post.published ? 'Published' : 'Draft'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
