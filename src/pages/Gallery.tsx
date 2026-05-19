import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2 } from 'lucide-react';

const images = [
  { url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80', title: 'The Performance Floor', category: 'Studio' },
  { url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80', title: 'Clinical Diagnostics', category: 'Lab' },
  { url: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80', title: 'Elite Equipment', category: 'Studio' },
  { url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80', title: 'Transformation Sanctuary', category: 'Space' },
  { url: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80', title: 'Endocrine Optimization', category: 'Expertise' },
  { url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2adfcd?auto=format&fit=crop&q=80', title: 'Speed Development', category: 'Expertise' },
  { url: '/src/assets/images/luxury_gym_hero_1779174801938.png', title: 'London Base', category: 'Studio' },
  { url: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&q=80', title: 'The Labs', category: 'Lab' },
];

export const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <div className="bg-brand-dark pt-32 pb-24">
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="mb-24">
          <span className="font-mono text-brand-blue text-xs uppercase tracking-[0.4em] mb-4 block">Visual Culture</span>
          <h1 className="text-6xl md:text-9xl font-sans font-bold uppercase tracking-tighter leading-[0.85] mb-12">
            The <br />
            <span className="italic text-white/20">Sanctuary</span>
          </h1>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group cursor-pointer break-inside-avoid rounded-[32px] overflow-hidden border border-white/5"
              onClick={() => setSelectedImg(img.url)}
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <span className="text-brand-blue font-mono text-[9px] uppercase tracking-widest block mb-2">{img.category}</span>
                <h3 className="text-xl font-sans font-bold uppercase tracking-tight">{img.title}</h3>
              </div>
              <div className="absolute top-8 right-8 w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImg(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl cursor-zoom-out"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-10 max-w-5xl w-full aspect-video rounded-3xl overflow-hidden shadow-2xl"
            >
              <img src={selectedImg} className="w-full h-full object-cover" alt="Selected" referrerPolicy="no-referrer" />
              <button 
                onClick={() => setSelectedImg(null)}
                className="absolute top-8 right-8 w-12 h-12 glass-morphism rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all"
              >
                <X size={24} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
