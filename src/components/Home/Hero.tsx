import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import { ThreeBackground } from '../Three/ThreeBackground';

const ASSETS = {
  hero: '/src/assets/images/luxury_gym_hero_1779174801938.png',
};

export const Hero = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Media */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-brand-dark z-10" />
        <img
          src={ASSETS.hero}
          alt="Luxury Gym"
          className="w-full h-full object-cover scale-110"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <ThreeBackground />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block font-mono text-brand-blue text-xs uppercase tracking-[0.4em] mb-8">
            Established London 2024
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-sans font-bold uppercase tracking-tighter leading-[0.9] mb-8">
            <span className="block italic text-white/40">Unlock Elite</span>
            <span className="block text-white">Strength</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 font-light mb-12 px-6">
            Luxury personal training and world-class performance coaching designed for the extraordinary.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => navigate('/auth')}
              className="w-full sm:w-auto bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-brand-blue transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl shadow-white/5"
            >
              Start Your Journey
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto glass-morphism px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-all duration-500 border border-white/20"
            >
              Book Consultation
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-40">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} className="text-white/40" />
        </motion.div>
      </motion.div>

      {/* Floating Elements / Particles placeholder */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-brand-blue/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};
