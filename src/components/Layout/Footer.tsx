import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="relative bg-brand-dark border-t border-white/5 pt-24 pb-12 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="inline-block mb-6">
            <span className="font-sans font-bold text-3xl tracking-tighter uppercase italic bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
              Strength Fitness<span className="text-white">.</span>
            </span>
          </Link>
          <p className="text-white/40 max-w-sm mb-8 font-light leading-relaxed">
            Revolutionizing high-performance fitness through elite coaching, cinematic experiences, and clinical precision. Transform your limits into your legacy.
          </p>
          <div className="flex items-center gap-4">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ y: -4, color: '#00f2ff' }}
                className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:border-brand-blue transition-colors"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Service Protocol</h4>
          <ul className="space-y-4">
            {[
              { name: 'FAQ', path: '/faq' },
              { name: 'Privacy Protocol', path: '/privacy' },
              { name: 'Terms Of Access', path: '/terms' },
              { name: 'Admission', path: '/contact' }
            ].map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="text-white/40 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Contact</h4>
          <ul className="space-y-6">
            <li className="flex gap-4">
              <MapPin className="text-brand-blue shrink-0" size={18} />
              <span className="text-white/40 text-sm leading-snug">
                71–75 Shelton Street, London<br />WC2H 9JQ, UK
              </span>
            </li>
            <li className="flex gap-4">
              <Phone className="text-brand-blue shrink-0" size={18} />
              <span className="text-white/40 text-sm">+44 7857 596220</span>
            </li>
            <li className="flex gap-4">
              <Mail className="text-brand-blue shrink-0" size={18} />
              <span className="text-white/40 text-sm">hello@strengthfitness.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <p className="text-white/20 text-xs font-mono tracking-widest">
          © 2024 STRENGTH FITNESS. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-8">
          <Link to="/" className="text-white/20 text-xs hover:text-white transition-colors">DESIGNED BY AI STUDIO</Link>
          <Link to="/" className="text-white/20 text-xs hover:text-white transition-colors">BACK TO TOP</Link>
        </div>
      </div>
    </footer>
  );
};
