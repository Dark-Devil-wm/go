import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { useNavigate } from 'react-router-dom';

export const Trainers = () => {
  const navigate = useNavigate();
  useSEO('Elite Performance Master Coaches', 'Meet our world-class coaches in London. Experts in biomechanics, clinical nutrition, and neurological performance adaptation.');

  const trainers = [
    {
      name: 'Marcus Thorne',
      role: 'Elite Head Coach',
      bio: 'Former elite athletics coach with 15+ years experience in high-performance biomechanics.',
      expertise: ['Hypertrophy', 'Biomechanics', 'Olympic Lifting'],
      img: '/src/assets/images/elite_personal_trainer_1779174821348.png'
    },
    {
      name: 'Elena Vovk',
      role: 'Clinical Nutritionist',
      bio: 'Specialist in metabolic conditioning and performance-based endocrine optimization.',
      expertise: ['Endocrine Health', 'Fat Loss', 'Supplements'],
      img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80'
    },
    {
      name: 'David Mercer',
      role: 'Performance Scientist',
      bio: 'Leading researcher in neurological training adaptation and speed development.',
      expertise: ['Neuromuscular', 'Speed', 'Conditioning'],
      img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2adfcd?auto=format&fit=crop&q=80'
    },
    {
      name: 'Sarah Chen',
      role: 'Mobility Specialist',
      bio: 'Focused on structural integrity and corrective movement patterns for long-term health.',
      expertise: ['Mobility', 'Prehab', 'Yoga'],
      img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80'
    },
    {
      name: 'Julian Ross',
      role: 'Combat Specialist',
      bio: 'Expert in high-intensity anaerobic conditioning and executive self-defense protocols.',
      expertise: ['Boxing', 'Conditioning', 'Agility'],
      img: 'https://images.unsplash.com/photo-1594911773962-763f0dfbacaa?auto=format&fit=crop&q=80'
    },
    {
      name: 'Maya Iskra',
      role: 'Foundational Strength',
      bio: 'Pioneer in structural re-engineering for post-injury performance restoration.',
      expertise: ['Rehab', 'Kettlebells', 'Barbell'],
      img: 'https://images.unsplash.com/photo-1548690312-e3b507d17a47?auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="bg-brand-dark pt-32 pb-24">
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="mb-24">
          <span className="font-mono text-brand-blue text-xs uppercase tracking-[0.4em] mb-4 block">The Masters</span>
          <h1 className="text-6xl md:text-9xl font-sans font-bold uppercase tracking-tighter leading-[0.85] mb-12">
            Elite <br />
            <span className="italic text-white/20">Practitioners</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {trainers.map((trainer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-[48px] border border-white/5 glass-morphism"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                  <img 
                    src={trainer.img} 
                    alt={trainer.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-10 flex flex-col justify-between">
                  <div>
                    <span className="text-brand-blue font-mono text-[10px] uppercase tracking-widest mb-4 block">
                      {trainer.role}
                    </span>
                    <h3 className="text-3xl font-sans font-bold uppercase tracking-tight mb-6">{trainer.name}</h3>
                    <p className="text-white/40 font-light mb-8 leading-relaxed">
                      {trainer.bio}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {trainer.expertise.map(skill => (
                        <span key={skill} className="text-[9px] uppercase tracking-widest font-mono py-1 px-3 bg-white/5 border border-white/10 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <Instagram size={18} className="text-white/20 hover:text-white cursor-pointer transition-colors" />
                      <Linkedin size={18} className="text-white/20 hover:text-white cursor-pointer transition-colors" />
                    </div>
                    <button 
                      onClick={() => navigate('/contact')}
                      className="flex items-center gap-2 group text-[10px] uppercase font-bold tracking-widest text-brand-blue"
                    >
                      View Profile
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Masterclass Section */}
        <div className="mt-48">
          <div className="mb-24">
            <span className="font-mono text-brand-blue text-xs uppercase tracking-[0.4em] mb-4 block">Specialized Knowledge</span>
            <h2 className="text-5xl md:text-8xl font-sans font-bold uppercase tracking-tighter leading-none">
              Deep Dive <br />
              <span className="italic text-white/20">Masterclasses</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'The Hypertrophy Laboratory',
                host: 'Elena Vovk',
                desc: 'A 4-hour immersive workshop on muscle fiber recruitment and metabolic stress optimization.',
                date: 'June 15, 2024',
                img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80'
              },
              {
                title: 'Neurological Peak Performance',
                host: 'David Mercer',
                desc: 'Understanding C.N.S. fatigue and how to program for high-output executive performance.',
                date: 'June 22, 2024',
                img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80'
              }
            ].map((session, i) => (
              <div key={i} className="glass-morphism rounded-[48px] border border-white/5 relative overflow-hidden group">
                <div className="aspect-video overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                  <img src={session.img} alt={session.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                </div>
                <div className="p-12">
                  <div className="flex justify-between items-center mb-8">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-blue">{session.date}</span>
                    <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse shadow-[0_0_10px_rgba(0,242,255,1)]" />
                  </div>
                  <h3 className="text-3xl font-sans font-bold uppercase tracking-tight mb-4">{session.title}</h3>
                  <p className="text-white/40 font-light mb-8 max-w-sm">{session.desc}</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-gray border border-white/10 overflow-hidden">
                      <img src="/src/assets/images/elite_personal_trainer_1779174821348.png" className="w-full h-full object-cover grayscale" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-white/20 block">Conducted by</span>
                      <span className="text-xs uppercase font-mono tracking-widest text-white/60">{session.host}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recuirment Banner */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto glass-morphism rounded-[40px] p-12 md:p-24 border border-brand-blue/10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 blur-3xl rounded-full" />
          <h2 className="text-4xl font-sans font-bold uppercase tracking-tighter mb-8 italic">Join the Elite Practitioners</h2>
          <p className="text-white/40 max-w-xl mx-auto mb-12">
            Are you one of the finest performance coaches in London? We are always looking for masters of biomechanics and clinical health.
          </p>
          <button className="bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-brand-blue transition-all">
            Join the Team
          </button>
        </div>
      </section>
    </div>
  );
};
