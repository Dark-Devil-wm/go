import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export const NotFound = () => {
  const navigate = useNavigate();
  useSEO('404 - Not Found', 'The requested protocol could not be found in our London database.');

  return (
    <div className="h-screen w-full bg-brand-dark flex items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl"
      >
        <span className="font-mono text-brand-blue text-xs uppercase tracking-[0.5em] mb-8 block">Error Code: 404</span>
        <h1 className="text-7xl md:text-9xl font-sans font-bold uppercase tracking-tighter mb-8 italic text-white/5 underline decoration-brand-blue/20">Lost Protocol</h1>
        <p className="text-white/40 text-lg font-light leading-relaxed mb-12">
          The sanctuary credentials you provided do not match any known coordinate in our London infrastructure. 
          Please return to the base floor.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-brand-blue transition-all"
          >
            <Home size={14} />
            Back to Base
          </button>
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 glass-morphism px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs border border-white/10 hover:bg-white/5 transition-all text-white"
          >
            <ArrowLeft size={14} />
            Reverse Step
          </button>
        </div>
      </motion.div>
    </div>
  );
};
