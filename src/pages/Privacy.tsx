import React from 'react';

export const Privacy = () => {
  return (
    <div className="bg-brand-dark pt-40 pb-24 px-6">
      <div className="max-w-4xl mx-auto prose prose-invert font-light">
        <h1 className="text-5xl font-sans font-bold uppercase tracking-tighter mb-12 italic text-white/20">Privacy Protocol</h1>
        <div className="space-y-8 text-white/60">
          <section>
            <h2 className="text-xl font-bold uppercase tracking-widest text-brand-blue mb-4">1. Data Sovereignty</h2>
            <p>Strength Fitness respects the clinical nature of your performance data. We collect personal information, biometrics, and training logs solely to enhance your performance protocol.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold uppercase tracking-widest text-brand-blue mb-4">2. Security Standards</h2>
            <p>Your records are encrypted and stored within our secure London infrastructure. Biometric data is treated with clinical-grade confidentiality and is never shared with third-party advertisers.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold uppercase tracking-widest text-brand-blue mb-4">3. Right to Erasure</h2>
            <p>Members retain the right to request full deletion of their profiles and performance history at any time through our digital concierge.</p>
          </section>
        </div>
      </div>
    </div>
  );
};
