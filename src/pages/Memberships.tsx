import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { useNavigate } from 'react-router-dom';

export const Memberships = () => {
  const navigate = useNavigate();
  useSEO('Memberships & Admission', 'Join the elite London fitness collective. Exclusive tiers including Studio Master and The Collective for high-performance practitioners.');

  return (
    <div className="bg-brand-dark pt-32 pb-24">
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="font-mono text-brand-blue text-xs uppercase tracking-[0.4em] mb-4 block">Membership Tiers</span>
          <h1 className="text-5xl md:text-8xl font-sans font-bold uppercase tracking-tighter leading-none mb-8">
            Elite <span className="italic text-white/20">Admission</span>
          </h1>
          <p className="max-w-2xl mx-auto text-white/40 text-lg font-light">
            Access to our London studio and digital ecosystem is strictly limited to ensure uncompromising attention and service quality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            {
              name: 'Digital Elite',
              price: '199',
              period: 'month',
              features: ['Personalized Digital Protocols', 'Weekly Video Consultations', 'Custom Nutrition Mapping', 'App Access', '24/7 Coach WhatsApp'],
              color: 'white/10'
            },
            {
              name: 'Studio Master',
              price: '850',
              period: 'month',
              features: ['12 Studio Sessions (London)', 'Full Diagnostic Assessment', 'Advanced Bio-Analysis', 'Recovery Suite Access', 'Priority Booking'],
              featured: true,
              color: 'brand-blue'
            },
            {
              name: 'The Collective',
              price: '1800',
              period: 'month',
              features: ['Unlimited Studio Sessions', 'Private Personal Chef Access', 'Full Blood Panel Reviews', 'VIP Event Invitations', 'Private Gym Access'],
              color: 'brand-purple'
            }
          ].map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative glass-morphism p-12 rounded-[48px] border ${tier.featured ? 'border-brand-blue/30 scale-105 z-10' : 'border-white/5 opacity-80 hover:opacity-100'} transition-all`}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-blue text-black px-6 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Most Demanded
                </div>
              )}
              
              <div className="mb-12">
                <h3 className="text-2xl font-sans font-bold uppercase tracking-tight mb-4">{tier.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-sans font-bold tracking-tighter">£{tier.price}</span>
                  <span className="text-white/40 text-sm font-mono uppercase">/{tier.period}</span>
                </div>
              </div>

              <ul className="space-y-6 mb-12">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-4 text-sm font-light text-white/60">
                    <Check className="text-brand-blue shrink-0" size={18} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => navigate('/contact')}
                className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all ${tier.featured ? 'bg-brand-blue text-black' : 'bg-white/5 border border-white/10 hover:bg-white hover:text-black'}`}
              >
                Apply Now
                <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Perks Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto glass-morphism rounded-[40px] p-12 md:p-24 border border-white/5 text-center">
          <h2 className="text-4xl font-sans font-bold uppercase tracking-tighter mb-12 italic">Standard with every tier</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {['Luxury Towel Service', 'Cloud Spa Amenities', 'High-Speed Wi-Fi', 'Private Lockers'].map((perk) => (
              <div key={perk}>
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                  <Check size={18} className="text-brand-blue" />
                </div>
                <div className="text-[10px] uppercase font-mono tracking-widest text-white/40">{perk}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
