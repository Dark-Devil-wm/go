import React from 'react';
import { Hero } from '../components/Home/Hero';
import { Services } from '../components/Home/Services';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { useSEO } from '../hooks/useSEO';

export const Home = () => {
  const navigate = useNavigate();
  useSEO('Elite Personal Training London', 'Transform your performance protocol. Luxury fitness, clinical nutrition, and body architecture in Covent Garden, London.');
  
  return (
    <div className="bg-brand-dark">
      <Hero />
      
      {/* Narrative Section */}
      <section className="py-40 px-6 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-purple/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl md:text-7xl font-sans font-bold uppercase tracking-tighter leading-none mb-12">
              Strength is <br />
              <span className="text-brand-blue italic">Silence In Motion</span>
            </h2>
            <div className="space-y-8 text-xl font-light text-white/60 leading-relaxed max-w-xl">
              <p>
                Strength Fitness isn't just a gym. It's a sanctuary for the high-achiever. We specialize in the science of transformation, blending elite physical culture with futuristic wellness technology.
              </p>
              <p>
                Our London studio at Shelton Street is the epicenter of elite personal training—where discipline meets luxury and results are the only currency.
              </p>
            </div>
            
            <button 
              onClick={() => navigate('/about')}
              className="mt-12 flex items-center gap-4 group text-brand-blue font-bold uppercase tracking-widest text-sm underline underline-offset-8"
            >
              Explore Our Philosophy
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-brand-gray rounded-3xl overflow-hidden border border-white/5 relative z-10">
              <img
                src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80"
                alt="Elite Performance"
                className="w-full h-full object-cover grayscale opacity-80"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Stat Overlays */}
            <div className="absolute -bottom-8 -left-8 glass-morphism p-8 rounded-2xl z-20 border border-white/10 neon-glow-blue">
              <div className="text-4xl font-bold font-sans italic tracking-tighter italic">98%</div>
              <div className="text-[10px] uppercase tracking-widest text-brand-blue mt-1">Client Retention</div>
            </div>
            <div className="absolute -top-8 -right-8 glass-morphism p-8 rounded-2xl z-20 border border-white/10">
              <div className="text-4xl font-bold font-sans italic tracking-tighter">150+</div>
              <div className="text-[10px] uppercase tracking-widest text-brand-blue mt-1">Transformations</div>
            </div>
          </motion.div>
        </div>
      </section>

      <Services />

      {/* Transformation Stories */}
      <section className="py-40 px-6 bg-brand-dark overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <span className="font-mono text-brand-blue text-xs uppercase tracking-[0.4em] mb-4 block">Proven Results</span>
            <h2 className="text-5xl md:text-8xl font-sans font-bold uppercase tracking-tighter leading-none">
              Transform <br />
              <span className="italic text-white/20">The Limits.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className="relative group overflow-hidden rounded-[40px] border border-white/10 aspect-square">
              <img
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80"
                alt="Transformation"
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12">
                <div className="text-4xl font-sans font-bold uppercase tracking-tighter mb-2">James W.</div>
                <div className="text-brand-blue font-mono text-xs uppercase tracking-widest">12 Weeks • -15kg Fat • +5kg Muscle</div>
              </div>
            </div>

            <div className="space-y-12">
              <div className="flex gap-8 border-b border-white/5 pb-12">
                <div className="text-7xl font-sans font-bold italic text-white/10 shrink-0">01</div>
                <div>
                  <h4 className="text-xl font-bold uppercase tracking-widest mb-4">Precision Mapping</h4>
                  <p className="text-white/40 font-light leading-relaxed">We don't guess. Every transformation begins with a clinical breakdown of your unique biology and goals.</p>
                </div>
              </div>
              <div className="flex gap-8 border-b border-white/5 pb-12">
                <div className="text-7xl font-sans font-bold italic text-white/10 shrink-0">02</div>
                <div>
                  <h4 className="text-xl font-bold uppercase tracking-widest mb-4">Elite Accountability</h4>
                  <p className="text-white/40 font-light leading-relaxed">Direct 24/7 access to your London performance coach for adjustments, motivation, and elite guidance.</p>
                </div>
              </div>
              <button 
                onClick={() => navigate('/gallery')}
                className="flex items-center gap-4 group text-white font-bold uppercase tracking-widest text-sm bg-white/5 px-8 py-4 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all"
              >
                View All Stories
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>

          {/* Transformation Grid Overlay */}
          <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah K.', stat: '-12% Body Fat', time: '8 Weeks', img: 'https://images.unsplash.com/photo-1548690312-e3b507d17a47?auto=format&fit=crop&q=80' },
              { name: 'David L.', stat: '+8kg Lean Mass', time: '16 Weeks', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80' },
              { name: 'Michael R.', stat: 'Rehab Completion', time: '12 Weeks', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 0.98 }}
                className="glass-morphism rounded-3xl p-6 border border-white/5 flex items-center gap-6 group cursor-pointer"
              >
                <div className="w-20 h-20 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all border border-white/10">
                  <img src={item.img} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-1">{item.name}</h4>
                  <p className="text-brand-blue text-[10px] font-mono uppercase tracking-widest mb-1">{item.stat}</p>
                  <p className="text-white/20 text-[9px] uppercase tracking-widest">{item.time} Blueprint</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Elite Trainers */}
      <section className="py-40 px-6 bg-brand-gray/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
            <div className="max-w-2xl">
              <span className="font-mono text-brand-blue text-xs uppercase tracking-[0.4em] mb-4 block">The Masters</span>
              <h2 className="text-5xl md:text-8xl font-sans font-bold uppercase tracking-tighter leading-none">
                Architects Of <br />
                <span className="italic text-white/20">Transformation</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Marcus Thorne', role: 'Elite Head Coach', img: '/src/assets/images/elite_personal_trainer_1779174821348.png' },
              { name: 'Elena Vovk', role: 'Clinical Nutritionist', img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80' },
              { name: 'David Mercer', role: 'Performance Scientist', img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2adfcd?auto=format&fit=crop&q=80' },
            ].map((trainer, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -20 }}
                className="group glass-morphism rounded-3xl overflow-hidden border border-white/5"
              >
                <div className="aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 relative">
                  <img src={trainer.img} alt={trainer.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-sans font-bold uppercase tracking-tight mb-2">{trainer.name}</h3>
                  <p className="text-brand-blue font-mono text-[10px] uppercase tracking-[0.3em] font-bold">{trainer.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fitness Blog / Journal */}
      <section className="py-40 px-6 bg-brand-dark">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
            <h2 className="text-5xl md:text-8xl font-sans font-bold uppercase tracking-tighter leading-none">
              High Performance <br />
              <span className="italic text-white/20">Journal</span>
            </h2>
            <button 
              onClick={() => navigate('/blog')}
              className="text-brand-blue font-bold uppercase tracking-widest text-xs border-b border-brand-blue/30 pb-2 hover:border-brand-blue transition-all"
            >
              View All Articles
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { title: 'The Science of Hypertrophy: 2024 London Protocol', category: 'Strength', date: 'May 12' },
              { title: 'Clinical Nutrition for the High-Achiever Lifestyle', category: 'Wellness', date: 'May 08' },
            ].map((post, i) => (
              <motion.article
                key={i}
                whileHover={{ x: 20 }}
                className="group cursor-pointer"
              >
                <div className="flex items-center gap-6 mb-6">
                  <span className="font-mono text-brand-blue text-[10px] uppercase tracking-widest px-3 py-1 bg-brand-blue/10 rounded-full">{post.category}</span>
                  <span className="text-white/20 font-mono text-[10px] uppercase tracking-widest">{post.date}</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-sans font-bold uppercase tracking-tighter leading-tight group-hover:text-brand-blue transition-colors">
                  {post.title}
                </h3>
                <div className="mt-8 h-[1px] bg-white/5 group-hover:bg-brand-blue transition-colors" />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-40 px-6 bg-brand-gray/50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-12 max-w-lg mx-auto rounded-[32px] overflow-hidden border border-white/5 shadow-2xl">
              <img 
                src="https://lh3.googleusercontent.com/p/AF1QipOEscBMq6j0kubY3PSGgzIcSINCXReic7GbjRp3=w461-h200-n-k-no-nu" 
                alt="Strength Studio"
                className="w-full h-auto grayscale transition-all duration-1000 hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-6xl text-brand-blue/20 font-serif mb-8 rotate-180 inline-block tracking-widest">“</div>
            <blockquote className="text-3xl md:text-5xl font-serif italic text-white/80 leading-tight mb-12">
              Excellence is never an accident. It is always the result of high intention, sincere effort, and intelligent execution.
            </blockquote>
            <cite className="font-mono text-xs uppercase tracking-[0.4em] text-white/40 block">Aristotle — Applied to Strength</cite>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/20 to-brand-purple/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="relative z-10 glass-morphism rounded-[40px] p-12 md:p-24 text-center border border-white/10">
            <h2 className="text-5xl md:text-8xl font-sans font-bold uppercase tracking-tighter mb-12 leading-none">
              Ready to redefine <br />
              <span className="italic text-brand-blue">Your Legacy?</span>
            </h2>
            <button 
              onClick={() => navigate('/contact')}
              className="bg-white text-black px-12 py-6 rounded-full font-bold uppercase tracking-widest text-base hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5"
            >
              Book Your Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
