import React from 'react';

export const Terms = () => {
  return (
    <div className="bg-brand-dark pt-40 pb-24 px-6">
      <div className="max-w-4xl mx-auto prose prose-invert font-light">
        <h1 className="text-5xl font-sans font-bold uppercase tracking-tighter mb-12 italic text-white/20">Terms Of Access</h1>
        <div className="space-y-8 text-white/60">
          <section>
            <h2 className="text-xl font-bold uppercase tracking-widest text-brand-blue mb-4">1. Elite Conduct</h2>
            <p>Strength Fitness maintains a focused, high-performance environment. Members agree to adhere to our code of conduct, which prioritizes mutual respect, discipline, and the sanctuary of other practitioners.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold uppercase tracking-widest text-brand-blue mb-4">2. Membership Commitment</h2>
            <p>Our transformations require consistency. Monthly tiers are based on a minimum commitment period specified during admission. Cancellations must be received 30 days in advance.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold uppercase tracking-widest text-brand-blue mb-4">3. Clinical Liability</h2>
            <p>Participation in high-intensity protocols requires medical clearance. Strength Fitness is not liable for injuries resulting from non-disclosure of medical conditions.</p>
          </section>
        </div>
      </div>
    </div>
  );
};
