import React from 'react';
import { motion } from 'motion/react';
import { Clock, Users, Zap, Shield, ArrowRight } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

const classes = [
  {
    title: 'High-Velocity Hypertrophy',
    time: '45 MIN',
    intensity: 'Extreme',
    capacity: '12',
    desc: 'Advanced biomechanics applied to rapid muscle growth. Focused on neurological stimulation and metabolic stress.',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80'
  },
  {
    title: 'Metabolic Conditioning',
    time: '50 MIN',
    intensity: 'High',
    capacity: '15',
    desc: 'Endocrine optimization through high-intensity functional intervals designed to maximize caloric afterburn.',
    img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80'
  },
  {
    title: 'Neuromuscular Integration',
    time: '60 MIN',
    intensity: 'Medium',
    capacity: '10',
    desc: 'Corrective movement patterns, mobility diagnostics, and structural integrity training.',
    img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80'
  },
  {
    title: 'Elite Olympic Lifting',
    time: '75 MIN',
    intensity: 'Elite',
    capacity: '8',
    desc: 'Masters-level technical instruction on Snatch and Clean & Jerk protocols.',
    img: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80'
  }
];

export const Classes = () => {
  useSEO({
    title: 'Classes & Protocols',
    description: 'Master your performance with our elite group classes in London. Biomechanics, conditioning, and elite hypertrophy.'
  });

  return (
    <div className="bg-brand-dark pt-32 pb-24">
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="mb-24">
          <span className="font-mono text-brand-blue text-xs uppercase tracking-[0.4em] mb-4 block">Performance Tiers</span>
          <h1 className="text-6xl md:text-9xl font-sans font-bold uppercase tracking-tighter leading-[0.85] mb-12">
            The <br />
            <span className="italic text-white/20">Protocols</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {classes.map((cls, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-[48px] border border-white/5 glass-morphism h-[600px]"
            >
              <div className="absolute inset-0">
                <img 
                  src={cls.img} 
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0 opacity-40 group-hover:opacity-60"
                  alt={cls.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>

              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <div className="flex gap-4 mb-6">
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-xl rounded-full border border-white/10">
                    <Clock size={14} className="text-brand-blue" />
                    <span className="text-[10px] font-mono tracking-widest text-white/80">{cls.time}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-xl rounded-full border border-white/10">
                    <Users size={14} className="text-brand-blue" />
                    <span className="text-[10px] font-mono tracking-widest text-white/80">{cls.capacity} CAP</span>
                  </div>
                </div>

                <h3 className="text-4xl font-sans font-bold uppercase tracking-tighter mb-6 leading-none">
                  {cls.title}
                </h3>
                
                <p className="text-white/40 font-light mb-8 max-w-sm line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                  {cls.desc}
                </p>

                <div className="flex items-center justify-between pt-8 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <Zap size={14} className="text-brand-blue" />
                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/60">Intensity: {cls.intensity}</span>
                  </div>
                  <button className="flex items-center gap-3 glass-morphism px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    Book Base
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy Callout */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="text-brand-blue mx-auto mb-8" size={32} />
          <h2 className="text-3xl md:text-5xl font-sans font-bold uppercase tracking-tighter mb-8 italic">Sanctuary Capacity Standards</h2>
          <p className="text-white/40 font-light leading-relaxed text-lg italic">
            To ensure elite coaching precision, all classes are capped at 12 members. 
            Discreet training protocols are delivered with clinical attention.
          </p>
        </div>
      </section>
    </div>
  );
};
