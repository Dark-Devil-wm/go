import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar as CalendarIcon, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, userId }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    serviceType: '1-to-1 Elite Training',
    date: '',
    time: '09:00',
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const bookingDate = new Date(`${formData.date}T${formData.time}`);
      await addDoc(collection(db, 'users', userId, 'bookings'), {
        userId,
        serviceType: formData.serviceType,
        date: bookingDate.toISOString(),
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setStep(3);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative z-10 w-full max-w-lg glass-morphism rounded-[40px] border border-white/10 overflow-hidden"
          >
            <div className="p-8 md:p-12">
              <button onClick={onClose} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors">
                <X size={24} />
              </button>

              {step === 1 && (
                <div className="space-y-8">
                  <div>
                    <span className="font-mono text-brand-blue text-[10px] uppercase tracking-[0.4em] mb-3 block">Step 01</span>
                    <h2 className="text-3xl font-sans font-bold uppercase tracking-tighter">Select Service</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {['1-to-1 Elite Training', 'Performance Nutrition', 'Digital High Performance'].map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setFormData({ ...formData, serviceType: type });
                          setStep(2);
                        }}
                        className="w-full p-6 text-left border border-white/5 bg-white/5 rounded-2xl hover:border-brand-blue/50 transition-all group flex items-center justify-between"
                      >
                        <span className="font-bold uppercase tracking-widest text-sm">{type}</span>
                        <ArrowRight size={16} className="text-white/20 group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <div>
                    <span className="font-mono text-brand-blue text-[10px] uppercase tracking-[0.4em] mb-3 block">Step 02</span>
                    <h2 className="text-3xl font-sans font-bold uppercase tracking-tighter">Schedule Session</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Preferred Date</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-brand-blue outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Preferred Time</label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-brand-blue outline-none transition-all appearance-none"
                      >
                        {Array.from({ length: 12 }, (_, i) => i + 8).map(hour => (
                          <option key={hour} value={`${hour.toString().padStart(2, '0')}:00`} className="bg-brand-dark">
                            {hour}:00
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="pt-4 flex gap-4">
                      <button onClick={() => setStep(1)} className="flex-1 py-4 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all">Back</button>
                      <button 
                        onClick={handleSubmit} 
                        disabled={!formData.date || loading}
                        className="flex-3 py-4 bg-brand-blue text-black rounded-xl text-xs font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                      >
                        {loading ? 'Confirming...' : 'Confirm Booking'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="text-center py-12 space-y-8">
                  <div className="w-20 h-20 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={40} className="text-brand-blue" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-sans font-bold uppercase tracking-tighter mb-4">Request Sent</h2>
                    <p className="text-white/40 font-light leading-relaxed">
                      Your elite session request has been received. Our London concierge will confirm within 2 hours.
                    </p>
                  </div>
                  <button onClick={onClose} className="w-full py-5 bg-white text-black rounded-2xl font-bold uppercase tracking-widest text-sm hover:scale-105 transition-all">
                    Back to Dashboard
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
