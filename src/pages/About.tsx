import React from 'react';
import { motion } from 'motion/react';
import { Shield, Target, Zap, Award } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export const About = () => {
  useSEO({
    title: 'About Us - The London Sanctuary',
    description: 'Learn about our philosophy of clinical strength and elite physical culture in London. We redefine human performance through biomechanics and precision.'
  });

  return (
    <div className="bg-brand-dark pt-32">
      {/* Hero Header */}
      <section className="px-6 py-24 md:py-40 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="font-mono text-brand-blue text-xs uppercase tracking-[0.4em] mb-8 block">Our Philosophy</span>
          <h1 className="text-6xl md:text-9xl font-sans font-bold uppercase tracking-tighter leading-[0.85] mb-12">
            The Science <br />
            <span className="italic text-white/20">Of Strength</span>
          </h1>
          <p className="max-w-3xl text-xl md:text-2xl text-white/60 font-light leading-relaxed">
            Strength Fitness is a sanctuary for those who refuse to settle. Located in the heart of London, we combine clinical precision with elite physical culture to redefine what is possible for the human body.
          </p>
        </motion.div>
      </section>

      {/* Philosophy Pillars */}
      <section className="py-32 px-6 bg-brand-gray/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            {
              title: "Clinical Precision",
              desc: "We analyze metrics, biomechanics, and data to build protocols that are biologically optimized for your unique DNA.",
              icon: Target
            },
            {
              title: "Elite Culture",
              desc: "Environment dictates outcome. Our studios are designed to foster focus, discipline, and high-performance states.",
              icon: Shield
            },
            {
              title: "Continuous Mutation",
              desc: "The plateau is a myth. We ensure constant adaptation melalui adaptive training load and neurological stimulation.",
              icon: Zap
            },
            {
              title: "London's Finest",
              desc: "Our coaches are world-class practitioners, bringing decades of experience from professional athletics and clinical health.",
              icon: Award
            }
          ].map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-morphism p-12 rounded-[40px] border border-white/5 group hover:border-brand-blue/30 transition-all"
            >
              <pillar.icon className="text-brand-blue mb-8 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-3xl font-sans font-bold uppercase tracking-tight mb-6">{pillar.title}</h3>
              <p className="text-white/40 font-light text-lg leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Story / Timeline */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-24 items-start">
            <div className="md:w-1/3 sticky top-32">
              <span className="font-mono text-brand-blue text-xs uppercase tracking-[0.4em] mb-4 block">The Evolution</span>
              <h2 className="text-5xl md:text-7xl font-sans font-bold uppercase tracking-tighter leading-none mb-8">
                Our <br />
                <span className="italic text-white/20">Journey</span>
              </h2>
              <p className="text-white/40 font-light leading-relaxed">
                From a private clinical lab to London's most exclusive performance sanctuary.
              </p>
            </div>
            
            <div className="md:w-2/3 space-y-32">
              {[
                { year: '2018', title: 'The Genesis', desc: 'Strength Fitness began as a clandestine performance laboratory in East London, serving only professional athletes and Formula 1 drivers.' },
                { year: '2020', title: 'Shelton Street Residency', desc: 'We moved to our flagship heritage building in Covent Garden, expanding our clinical methodology to discerning London executives.' },
                { year: '2022', title: 'Digital Integration', desc: 'The launch of our proprietary biometric mapping software, allowing for 24/7 client monitoring and metabolic tracking.' },
                { year: '2024', title: 'The New Standard', desc: 'Recognized as the pinnacle of elite physical culture in the UK, redefining the boundaries of human performance architecture.' }
              ].map((milestone, i) => (
                <div key={i} className="relative pl-12 border-l border-white/10">
                  <div className="absolute -left-1.5 top-0 w-3 h-3 bg-brand-blue rounded-full shadow-[0_0_15px_rgba(0,242,255,0.5)]" />
                  <div className="text-6xl font-sans font-bold italic text-white/10 mb-4">{milestone.year}</div>
                  <h3 className="text-2xl font-bold uppercase tracking-widest mb-4">{milestone.title}</h3>
                  <p className="text-white/40 font-light text-lg leading-relaxed">{milestone.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-40 px-6 bg-brand-blue/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue/5 blur-[200px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-[4/5] rounded-[48px] overflow-hidden grayscale border border-white/10"
          >
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80" 
              alt="Founder Marcus Thorne" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div>
            <span className="font-mono text-brand-blue text-xs uppercase tracking-[0.4em] mb-4 block">The Visionary</span>
            <h2 className="text-5xl md:text-7xl font-sans font-bold uppercase tracking-tighter leading-none mb-12 italic">
              Marcus Thorne
            </h2>
            <div className="space-y-8 text-xl font-light text-white/60 leading-relaxed italic">
              <p>
                "At Strength Fitness, we don't just train bodies; we architect legacies. My goal was to create a space that transcends the traditional gym—a clinical sanctum where human potential is measured, analyzed, and systematically amplified."
              </p>
              <p className="not-italic text-sm uppercase font-mono tracking-widest text-brand-blue">
                Founder & Performance Architect
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic Image Section */}
      <section className="h-[70vh] relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80" 
          className="w-full h-full object-cover grayscale opacity-40"
          alt="Studio"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-transparent to-brand-dark" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-4xl md:text-6xl font-serif italic text-white/80 text-center max-w-4xl px-6">
            "Your body is the instrument. We provide the composition."
          </h2>
        </div>
      </section>
    </div>
  );
};
