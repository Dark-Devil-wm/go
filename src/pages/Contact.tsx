import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Instagram, ArrowRight, MessageSquare, CheckCircle2 } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useSEO } from '../hooks/useSEO';

export const Contact = () => {
  useSEO({
    title: 'Support & Admission',
    description: 'Contact the London concierge for membership enquiries, performance diagnostics, and elite personal training consultations.'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: '1-to-1 Elite Training',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'applications'), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'new'
      });
      setIsSuccess(true);
    } catch (err) {
      console.error('Error submitting application:', err);
      alert('Failed to submit application. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-brand-dark pt-32 pb-24">
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="font-mono text-brand-blue text-xs uppercase tracking-[0.4em] mb-6 block">Direct Connection</span>
            <h1 className="text-6xl md:text-8xl font-sans font-bold uppercase tracking-tighter leading-none mb-12 text-white">
              The <br />
              <span className="italic text-white/20">Sanctuary</span>
            </h1>

            <div className="space-y-12">
              <div className="flex gap-8">
                <div className="w-16 h-16 glass-morphism rounded-3xl flex items-center justify-center shrink-0 border border-white/10 text-brand-blue">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold uppercase tracking-widest mb-2 text-white">Location</h4>
                  <p className="text-white/40 font-light leading-relaxed">
                    71–75 Shelton Street, London<br />WC2H 9JQ, United Kingdom
                  </p>
                </div>
              </div>

              <div className="flex gap-8">
                <div className="w-16 h-16 glass-morphism rounded-3xl flex items-center justify-center shrink-0 border border-white/10 text-brand-blue">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold uppercase tracking-widest mb-2 text-white">Concierge</h4>
                  <p className="text-white/40 font-light leading-relaxed">
                    +44 7857 596220<br />Available 08:00 - 20:00 GMT
                  </p>
                </div>
              </div>

              <div className="flex gap-8">
                <div className="w-16 h-16 glass-morphism rounded-3xl flex items-center justify-center shrink-0 border border-white/10 text-brand-blue">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold uppercase tracking-widest mb-2 text-white">Electronic</h4>
                  <p className="text-white/40 font-light leading-relaxed">
                    hello@strengthfitness.com<br />concierge@strengthfitness.com
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 flex gap-6">
              {[Instagram, MessageSquare].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 hover:border-brand-blue transition-all group">
                  <Icon size={20} className="text-white/40 group-hover:text-brand-blue" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="glass-morphism p-12 md:p-16 rounded-[48px] border border-white/10 shadow-2xl relative"
          >
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-8"
              >
                <div className="w-24 h-24 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue">
                  <CheckCircle2 size={48} />
                </div>
                <div>
                  <h3 className="text-3xl font-sans font-bold uppercase tracking-tighter mb-4 text-white">Protocol Received</h3>
                  <p className="text-white/40 font-light leading-relaxed">
                    Thank you. A London consultant will review your application and contact you within 4 hours.
                  </p>
                </div>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="px-10 py-4 border border-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all text-white"
                >
                  Apply Again
                </button>
              </motion.div>
            ) : (
              <>
                <h3 className="text-3xl font-sans font-bold uppercase tracking-tight mb-8 text-gradient">Application</h3>
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/20 font-mono">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-brand-blue transition-all text-white" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/20 font-mono">Email Address</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-brand-blue transition-all text-white" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/20 font-mono">Interest</label>
                    <select 
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-brand-blue transition-all appearance-none text-white/60"
                    >
                      <option className="bg-brand-dark">1-to-1 Elite Training</option>
                      <option className="bg-brand-dark">Digital High Performance</option>
                      <option className="bg-brand-dark">Clinical Nutrition</option>
                      <option className="bg-brand-dark">The Collective Membership</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/20 font-mono">Message (Optional)</label>
                    <textarea 
                      rows={4} 
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-brand-blue transition-all text-white"
                    ></textarea>
                  </div>
                  <button 
                    disabled={isSubmitting}
                    className="w-full py-6 bg-white text-black rounded-2xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-4 hover:bg-brand-blue transition-all group disabled:opacity-50"
                  >
                    {isSubmitting ? 'Transmitting...' : 'Submit Application'}
                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="px-6 h-[500px] mt-24">
        <div className="max-w-7xl mx-auto h-full rounded-[48px] overflow-hidden border border-white/5 glass-morphism relative">
          <div className="absolute inset-0 bg-brand-gray/50 animate-pulse flex items-center justify-center">
             <span className="font-mono text-white/10 uppercase tracking-widest">Interactive London Map Gateway</span>
          </div>
          {/* Static map reveal logic would go here */}
          <div className="absolute inset-0 bg-brand-dark/20 backdrop-blur-[2px]" />
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-24 aspect-[21/9] rounded-[48px] overflow-hidden border border-white/5 grayscale hover:grayscale-0 transition-all duration-1000"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.905626245103!2d-0.12821612338006835!3d51.51493631021481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604cc76a74653%3A0x6b107e38202b281b!2sShelton%20St%2C%20London%20WC2H%2C%20UK!5e0!3m2!1sen!2sus!4v1716100000000!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Strength Fitness London Map"
          />
        </motion.div>
      </section>
    </div>
  );
};
