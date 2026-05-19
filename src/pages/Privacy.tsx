import React from 'react';
import { useSEO } from '../hooks/useSEO';
import { Shield } from 'lucide-react';

export const Privacy = () => {
  useSEO({
    title: 'Privacy Protocol',
    description: 'Strength Fitness high-performance data sovereignty and privacy standards for our London members.'
  });
  return (
    <div className="bg-brand-dark pt-40 pb-24 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <Shield className="text-brand-blue" size={32} />
          <h1 className="text-5xl md:text-7xl font-sans font-bold uppercase tracking-tighter italic text-white/20">Privacy Protocol</h1>
        </div>
        <div className="space-y-16 text-white/60 font-light leading-relaxed text-lg">
          <section className="glass-morphism p-12 rounded-[40px] border border-white/5">
            <h2 className="text-xl font-bold uppercase tracking-[0.3em] text-brand-blue mb-6">1. Data Sovereignty</h2>
            <p className="mb-4">Strength Fitness respects the clinical nature of your performance data. We collect personal information, biometrics, and training logs solely to enhance your performance protocol.</p>
            <p>Our commitment is to your transformation, not your data monetization. Every metric tracked is a tool for your personal advancement.</p>
          </section>
          <section className="glass-morphism p-12 rounded-[40px] border border-white/5">
            <h2 className="text-xl font-bold uppercase tracking-[0.3em] text-brand-blue mb-6">2. Security Standards</h2>
            <p className="mb-4">Your records are encrypted and stored within our secure London infrastructure. Biometric data is treated with clinical-grade confidentiality and is never shared with third-party advertisers or unauthorized entities.</p>
            <p>We leverage advanced encryption protocols to ensure that your metabolic and performance history remains exclusive to you and your authorized coaching team.</p>
          </section>
          <section className="glass-morphism p-12 rounded-[40px] border border-white/5">
            <h2 className="text-xl font-bold uppercase tracking-[0.3em] text-brand-blue mb-6">3. Right to Erasure</h2>
            <p>Members retain the right to request full deletion of their profiles and performance history at any time through our digital concierge. Upon termination of membership, all biometric data is purged within 30 days unless otherwise requested.</p>
          </section>
        </div>
      </div>
    </div>
  );
};
