import React from 'react';
import { motion } from 'motion/react';
import { Dumbbell, Shield, Zap, Target } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    title: '1-to-1 Elite Training',
    description: 'Precision mapping of your anatomy and performance goals with elite London coaches.',
    icon: Dumbbell,
    image: '/src/assets/images/elite_personal_trainer_1779174821348.png',
    path: '/training'
  },
  {
    title: 'Performance Nutrition',
    description: 'Clinical-grade nutrition protocols tailored to fuel your high-performance lifestyle.',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1547514701-427841618e47?auto=format&fit=crop&q=80',
    path: '/training'
  },
  {
    title: 'Digital High Performance',
    description: 'Bespoke online coaching that bridges the gap between London and your location.',
    icon: Shield,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80',
    path: '/memberships'
  }
];

export const Services = () => {
  const navigate = useNavigate();
  return (
    <section className="py-32 px-6 bg-brand-dark">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
          <div className="max-w-2xl">
            <span className="font-mono text-brand-blue text-xs uppercase tracking-[0.4em] mb-4 block">Our Expertise</span>
            <h2 className="text-5xl md:text-7xl font-sans font-bold uppercase tracking-tighter leading-none">
              High Performance <br />
              <span className="italic text-white/20">Ecosystem</span>
            </h2>
          </div>
          <p className="text-white/40 max-w-sm font-light text-lg">
            Every program is a masterpiece of biology, biomechanics, and discipline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              onClick={() => navigate(service.path)}
              className="group relative h-[600px] overflow-hidden rounded-3xl cursor-pointer"
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/20 to-transparent group-hover:via-black/10 transition-all duration-500" />
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute inset-0 z-20 p-10 flex flex-col justify-between">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center group-hover:bg-brand-blue group-hover:text-black transition-colors duration-500">
                  <service.icon size={20} />
                </div>
                
                <div>
                  <h3 className="text-3xl font-sans font-bold uppercase tracking-tight mb-4 group-hover:text-brand-blue transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/60 font-light text-sm leading-relaxed max-w-[250px]">
                    {service.description}
                  </p>
                  
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    className="h-[1px] bg-white/20 mt-8 group-hover:bg-brand-blue"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
