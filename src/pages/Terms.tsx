import React from 'react';
import { useSEO } from '../hooks/useSEO';
import { Scale } from 'lucide-react';

export const Terms = () => {
  useSEO('Terms of Access', 'The official terms, code of conduct, and membership commitments for Strength Fitness London practitioners.');
  return (
    <div className="bg-brand-dark pt-40 pb-24 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <Scale className="text-brand-blue" size={32} />
          <h1 className="text-5xl md:text-7xl font-sans font-bold uppercase tracking-tighter italic text-white/20">Terms Of Access</h1>
        </div>
        <div className="space-y-16 text-white/60 font-light leading-relaxed text-lg">
          <section className="glass-morphism p-12 rounded-[40px] border border-white/5">
            <h2 className="text-xl font-bold uppercase tracking-[0.3em] text-brand-blue mb-6">1. Elite Conduct</h2>
            <p className="mb-4">Strength Fitness maintains a focused, high-performance environment. Members agree to adhere to our code of conduct, which prioritizes mutual respect, discipline, and the absolute sanctuary of other practitioners.</p>
            <p>Unauthorized photography and disruptive behavior are strictly prohibited to maintain the focus required for elite results.</p>
          </section>
          <section className="glass-morphism p-12 rounded-[40px] border border-white/5">
            <h2 className="text-xl font-bold uppercase tracking-[0.3em] text-brand-blue mb-6">2. Membership Commitment</h2>
            <p className="mb-4">Our transformations require consistency. Monthly tiers are based on a minimum commitment period specified during admission. This ensures we can allocate resources and coaching hours with maximum precision for your development.</p>
            <p>Cancellations must be received 30 days in advance through our digital concierge or in-person at the London studio.</p>
          </section>
          <section className="glass-morphism p-12 rounded-[40px] border border-white/5">
            <h2 className="text-xl font-bold uppercase tracking-[0.3em] text-brand-blue mb-6">3. Clinical Liability</h2>
            <p className="mb-4">Participation in high-intensity protocols requires independent medical clearance. Strength Fitness is not liable for injuries resulting from non-disclosure of pre-existing medical conditions.</p>
            <p>Every member must complete a full diagnostic screening before engaging in level-3 intensity protocols.</p>
          </section>
        </div>
      </div>
    </div>
  );
};
