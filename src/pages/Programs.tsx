import React from 'react';
import { motion } from 'motion/react';
import { Clock, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

export const Programs = () => {
  const navigate = useNavigate();
  useSEO('Performance Protocols', 'Discover our data-driven performance blueprints. From Absolute Strength to Metabolic Matrix, forged in our London laboratory.');
  const programs = [
    {
      title: 'Hypertrophy Protocol',
      desc: 'Advanced muscle architecture through high-volume tension and metabolic stress control.',
      metrics: '8 Weeks • 4 Days/Week',
      category: 'Muscle Building',
      img: 'https://images.unsplash.com/photo-1581009146145-b5ef03a94e77?auto=format&fit=crop&q=80'
    },
    {
      title: 'Metabolic Matrix',
      desc: 'Clinical fat loss protocol optimized for neurological performance and fat-oxidation efficiency.',
      metrics: '12 Weeks • 5 Days/Week',
      category: 'Conditioning',
      img: 'https://images.unsplash.com/photo-1541534741688-6078c64b52d3?auto=format&fit=crop&q=80'
    },
    {
      title: 'Absolute Strength',
      desc: 'Neuromuscular efficiency and maximum output training for elite performance seekers.',
      metrics: '10 Weeks • 3 Days/Week',
      category: 'Strength',
      img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80'
    },
    {
      title: 'Corrective Flow',
      desc: 'Elite mobility and structural prehab designed to unlock athletic potential and longevity.',
      metrics: 'Ongoing • 2 Days/Week',
      category: 'Mobility',
      img: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="bg-brand-dark pt-32 pb-24">
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
          <div className="max-w-2xl">
            <span className="font-mono text-brand-blue text-xs uppercase tracking-[0.4em] mb-4 block">Experimental Design</span>
            <h1 className="text-5xl md:text-8xl font-sans font-bold uppercase tracking-tighter leading-none">
              The <br />
              <span className="italic text-white/20">Protocols</span>
            </h1>
          </div>
          <p className="text-white/40 max-w-sm font-light text-lg">
            High-performance blueprints forged in our London laboratory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group relative h-[500px] rounded-[40px] overflow-hidden border border-white/5 cursor-pointer"
            >
              <div className="absolute inset-0 z-0 scale-110 group-hover:scale-100 transition-transform duration-1000 grayscale opacity-60">
                <img 
                  src={program.img} 
                  alt={program.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              <div className="absolute inset-0 z-20 p-12 flex flex-col justify-between">
                <div>
                  <span className="text-brand-blue font-mono text-[10px] uppercase tracking-widest py-1.5 px-4 bg-brand-blue/10 border border-brand-blue/20 rounded-full">
                    {program.category}
                  </span>
                </div>
                <div>
                  <h3 className="text-4xl font-sans font-bold uppercase tracking-tighter mb-4 transition-colors group-hover:text-brand-blue">
                    {program.title}
                  </h3>
                  <p className="text-white/60 font-light max-w-md mb-8 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    {program.desc}
                  </p>
                  <div className="flex items-center gap-8 pt-8 border-t border-white/10">
                    <div className="flex items-center gap-2 text-white/40 font-mono text-[10px] uppercase tracking-widest">
                      <Clock size={14} />
                      {program.metrics}
                    </div>
                    <div className="flex items-center gap-2 text-white/40 font-mono text-[10px] uppercase tracking-widest">
                      <Users size={14} />
                      Elite Access
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Booking Prompt */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center glass-morphism p-16 rounded-[48px] border border-white/5">
          <h2 className="text-4xl font-sans font-bold uppercase tracking-tighter mb-6">Need a custom blueprint?</h2>
          <p className="text-white/40 text-lg font-light mb-12">
            Speak to a London Master Coach for a personalized diagnostic session and custom performance protocol.
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="flex items-center gap-4 bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-widest text-sm mx-auto hover:bg-brand-blue transition-all"
          >
            Book Consultation
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};
