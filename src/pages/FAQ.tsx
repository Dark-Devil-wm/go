import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

const faqs = [
  {
    q: "How do I apply for a membership?",
    a: "Membership at Strength Fitness is selective. You can start by submitting an application via our Contact page or scheduling a diagnostic consultation with a Master Coach."
  },
  {
    q: "Do you offer guest passes?",
    a: "We prioritize the privacy and focus of our members. Guest passes are available exclusively through member invitation and must be pre-registered 24 hours in advance."
  },
  {
    q: "What is the 'Clinical Nutrition' protocol?",
    a: "Our nutritionists use blood panel data and metabolic testing to design protocols that optimize hormone health, recovery, and performance, moving beyond simple calorie counting."
  },
  {
    q: "Can I train at the London studio if I have a Digital membership?",
    a: "Digital members have access to our global ecosystem and protocols. Studio access requires a top-up session fee or an upgrade to the Studio Master tier."
  },
  {
    q: "Where is the studio located exactly?",
    a: "We are situated at 71–75 Shelton Street, Covent Garden, London. Discreet access is provided to members via our secure digital entry system."
  }
];

export const FAQ = () => {
  useSEO({
    title: 'Knowledge Base - F.A.Q',
    description: 'Find answers to common questions about admissions, memberships, clinical nutrition, and studio access at Strength Fitness London.',
    schema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    }
  });
  return (
    <div className="bg-brand-dark pt-32 pb-24 min-h-screen">
      <section className="px-6 py-24 max-w-4xl mx-auto">
        <div className="text-center mb-24">
          <span className="font-mono text-brand-blue text-xs uppercase tracking-[0.4em] mb-4 block">Knowledge Base</span>
          <h1 className="text-6xl md:text-8xl font-sans font-bold uppercase tracking-tighter leading-none mb-8">
            Common <span className="italic text-white/20">Questions</span>
          </h1>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <motion.details
              key={i}
              className="glass-morphism rounded-3xl border border-white/5 overflow-hidden group"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <summary className="p-8 flex items-center justify-between cursor-pointer list-none">
                <h3 className="text-xl font-sans font-bold uppercase tracking-tight text-white/80 group-hover:text-brand-blue transition-colors">
                  {faq.q}
                </h3>
                <ChevronDown size={20} className="text-white/20 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-8 pb-8 text-white/40 font-light leading-relaxed">
                {faq.a}
              </div>
            </motion.details>
          ))}
        </div>
      </section>
    </div>
  );
};
