import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'motion/react';
import { collection, query, getDocs, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Calendar, Clock, Trophy, User as UserIcon, LogOut, ChevronRight, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BookingModal } from '../components/Dashboard/BookingModal';

export const Dashboard = () => {
  const { user, profile, loading, logOut } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const q = query(
      collection(db, 'users', user.uid, 'bookings'),
      orderBy('date', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [user, navigate]);

  if (loading || !profile) {
    return (
      <div className="h-screen bg-brand-dark flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-12 h-12 border-2 border-brand-blue rounded-full border-t-transparent"
        />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-dark min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <span className="font-mono text-brand-blue text-xs uppercase tracking-[0.4em] mb-4 block">Personal Dashboard</span>
            <h1 className="text-5xl md:text-7xl font-sans font-bold uppercase tracking-tighter leading-none">
              Welcome Back, <br />
              <span className="italic text-white/20">{profile.displayName?.split(' ')[0]}</span>
            </h1>
          </div>
          <button 
            onClick={() => logOut()}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors uppercase font-mono text-[10px] tracking-widest border border-white/10 px-6 py-3 rounded-full"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: 'Sessions Completed', value: '24', icon: Trophy },
                { label: 'Upcoming Bookings', value: bookings.length.toString(), icon: Calendar },
                { label: 'Current Level', value: 'Elite', icon: UserIcon },
              ].map((stat, i) => (
                <div key={i} className="glass-morphism p-8 rounded-3xl border border-white/5">
                  <stat.icon className="text-brand-blue mb-6" size={24} />
                  <div className="text-4xl font-sans font-bold italic tracking-tighter mb-1">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40 font-mono">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Upcoming Sessions */}
            <div className="glass-morphism rounded-3xl border border-white/5 overflow-hidden">
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-xl font-sans font-bold uppercase tracking-tight">Your Schedule</h3>
                <button 
                  onClick={() => setIsBookingOpen(true)}
                  className="flex items-center gap-2 text-xs font-mono text-brand-blue uppercase tracking-widest hover:text-white transition-colors"
                >
                  <Plus size={14} />
                  Book New
                </button>
              </div>
              <div className="p-8">
                {bookings.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-white/40 font-light italic mb-8">No scheduled sessions at this time.</p>
                    <button 
                      onClick={() => setIsBookingOpen(true)}
                      className="bg-white text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all"
                    >
                      Schedule 1-to-1
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-brand-blue/30 transition-all group">
                        <div className="flex items-center gap-6">
                          <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue">
                            <Clock size={20} />
                          </div>
                          <div>
                            <div className="font-bold uppercase tracking-widest text-sm mb-1">{booking.serviceType}</div>
                            <div className="text-xs text-white/40 font-light">{new Date(booking.date).toLocaleDateString()} at {new Date(booking.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1 rounded-full ${booking.status === 'confirmed' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                            {booking.status}
                          </span>
                          <ChevronRight className="text-white/20 group-hover:text-white transition-colors" size={16} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-12">
            <div className="glass-morphism p-8 rounded-3xl border border-white/5">
              <h3 className="text-xl font-sans font-bold uppercase tracking-tight mb-8 text-gradient">Program Recommendation</h3>
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80" 
                  alt="Recommended" 
                  className="w-full h-full object-cover grayscale opacity-60"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-4 left-4 font-bold uppercase text-xs tracking-widest">Project: Hypertrophy</div>
              </div>
              <p className="text-white/40 text-sm font-light leading-relaxed mb-8">
                Based on your results, we recommend the 8-week precision muscle building protocol.
              </p>
              <button className="w-full py-4 border border-brand-blue/20 text-brand-blue rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand-blue hover:text-black transition-all">
                View Protocol
              </button>
            </div>

            <div className="glass-morphism p-8 rounded-3xl border border-white/5">
              <h3 className="text-xl font-sans font-bold uppercase tracking-tight mb-8">Your Coach</h3>
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-full bg-brand-gray border border-white/10 overflow-hidden">
                  <img src="/src/assets/images/elite_personal_trainer_1779174821348.png" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <div className="font-bold uppercase tracking-widest text-sm">Marcus Thorne</div>
                  <div className="text-xs text-brand-blue uppercase tracking-widest mt-1">Elite Performance</div>
                </div>
              </div>
              <button className="w-full mt-8 bg-white/5 py-4 rounded-xl text-xs font-bold uppercase tracking-widest border border-white/5 hover:border-white/20 transition-all">
                Direct Message
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        userId={user?.uid || ''} 
      />
    </div>
  );
};
