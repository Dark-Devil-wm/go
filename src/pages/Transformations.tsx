import React from 'react';
import { motion } from 'motion/react';
import { useSEO } from '../hooks/useSEO';
import { Sparkles, ArrowRight } from 'lucide-react';

export const Transformations = () => {
  useSEO({
    title: 'Member Achievements - Strength Fitness',
    description: 'Real results from our London practitioners. Systematic body architecture and performance restoration.'
  });

  const transformationData = [
    {
      name: 'James Harrison',
      role: 'Private Equity Director',
      achievement: '-15% Body Fat / +5kg Lean Mass',
      timeframe: '12 Week Blueprint',
      story: 'Navigating a high-stress lifestyle while maintaining elite physical standards seemed impossible until the Strength Protocol. The diagnostics-first approach changed everything.',
      before: 'https://images.unsplash.com/photo-1594911773962-763f0dfbacaa?auto=format&fit=crop&q=80',
      after: 'https://images.unsplash.com/photo-1541534741688-6078c64b5cc5?auto=format&fit=crop&q=80'
    },
    {
      name: 'Elena Rossi',
      role: 'Creative Architect',
      achievement: 'Post-Injury Performance Restoration',
      timeframe: '16 Week Blueprint',
      story: 'After a spinal injury, I thought my heavy lifting days were over. The rehabilitation methodology at Strength Fitness rebuilt my structural integrity from the foundation up.',
      before: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80',
      after: 'https://images.unsplash.com/photo-1548690312-e3b507d17a47?auto=format&fit=crop&q=80'
    },
    {
      name: 'David Chen',
      role: 'Tech Founder',
      achievement: '+20kg Deadlift Peak Power',
      timeframe: '8 Week Power Phase',
      story: 'The data-driven tracking and endocrine optimization allowed me to hit new PRs at 42 that I couldnt hit at 25. Absolute precision in programming.',
      before: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80',
      after: 'https://images.unsplash.com/photo-1507398941214-57f1892fe482?auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="bg-brand-dark pt-32 pb-24">
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="mb-24">
          <span className="font-mono text-brand-blue text-xs uppercase tracking-[0.4em] mb-4 block">Proof of Concept</span>
          <h1 className="text-6xl md:text-9xl font-sans font-bold uppercase tracking-tighter leading-none italic">
            Physical <span className="text-white/20">Evolution</span>
          </h1>
        </div>

        <div className="space-y-48">
          {transformationData.map((item, i) => (
            <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-brand-blue flex items-center justify-center text-brand-blue">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-sans font-bold uppercase tracking-tight">{item.name}</h2>
                    <p className="text-[10px] uppercase font-mono tracking-widest text-white/40">{item.role}</p>
                  </div>
                </div>

                <div className="glass-morphism p-8 rounded-3xl border-l-4 border-l-brand-blue">
                  <div className="text-brand-blue text-sm uppercase font-bold tracking-widest mb-2">{item.achievement}</div>
                  <div className="text-white/20 text-[10px] uppercase font-mono tracking-[0.2em]">{item.timeframe} Evolution</div>
                </div>

                <blockquote className="text-2xl font-light italic text-white/60 leading-relaxed">
                  "{item.story}"
                </blockquote>

                <button className="flex items-center gap-3 group text-xs uppercase font-bold tracking-widest text-brand-blue">
                  View Full Diagnostics
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[3/4] rounded-[40px] overflow-hidden border border-white/5 grayscale opacity-40">
                    <img src={item.before} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-center font-mono text-[10px] uppercase tracking-widest text-white/20">Baseline</div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="aspect-[3/4] rounded-[40px] overflow-hidden border border-brand-blue shadow-[0_0_50px_rgba(0,242,255,0.2)]">
                    <img src={item.after} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-center font-mono text-[10px] uppercase tracking-widest text-brand-blue">Current State</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto glass-morphism rounded-[64px] p-24 border border-white/5 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-blue/5 blur-[150px] rounded-full pointer-events-none" />
          <h2 className="text-4xl md:text-7xl font-sans font-bold uppercase tracking-tighter leading-none mb-12 relative z-10 italic">
            Ready to Architect <br />
            <span className="text-white/20">Your Own Legacy?</span>
          </h2>
          <button className="bg-white text-black px-12 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-brand-blue transition-all shadow-2xl relative z-10">
            Apply for Assessment
          </button>
        </div>
      </section>
    </div>
  );
};
