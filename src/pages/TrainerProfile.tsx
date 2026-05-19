import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Linkedin, 
  Twitter as TwitterIcon, 
  Award, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ArrowLeft,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

const TRAINERS_DATA: Record<string, any> = {
  'marcus-thorne': {
    name: 'Marcus Thorne',
    role: 'Elite Head Coach',
    bio: 'Former elite athletics coach with 15+ years experience in high-performance biomechanics. Marcus works with high-profile athletes and executives to architect peak physical form through technical precision.',
    expertise: ['Hypertrophy', 'Biomechanics', 'Olympic Lifting'],
    certifications: ['Level 4 Personal Training', 'ASCA Strength & Conditioning', 'Precision Nutrition L2'],
    experience: '15+ Years',
    img: '/src/assets/images/elite_personal_trainer_1779174821348.png',
    social: {
      instagram: 'https://instagram.com/marcusthorne',
      linkedin: 'https://linkedin.com/in/marcusthorne',
      twitter: 'https://twitter.com/marcusth'
    },
    schedule: [
      { day: 'Mon', times: ['06:00', '08:00', '16:00'] },
      { day: 'Tue', times: ['07:00', '09:00', '15:00'] },
      { day: 'Wed', times: ['06:00', '08:00', '17:00'] },
      { day: 'Thu', times: ['07:00', '09:00', '16:00'] },
      { day: 'Fri', times: ['06:00', '10:00', '14:00'] }
    ]
  },
  'elena-vovk': {
    name: 'Elena Vovk',
    role: 'Clinical Nutritionist',
    bio: 'Specialist in metabolic conditioning and performance-based endocrine optimization. Elena combines clinical data with practical training to transform body composition.',
    expertise: ['Endocrine Health', 'Fat Loss', 'Supplements'],
    certifications: ['MSc Clinical Nutrition', 'ISSN Sports Nutrition', 'Poliquin BioSignature'],
    experience: '10+ Years',
    img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80',
    social: {
      instagram: 'https://instagram.com/elenavovk',
      linkedin: 'https://linkedin.com/in/elenavovk'
    },
    schedule: [
      { day: 'Mon', times: ['09:00', '11:00', '14:00'] },
      { day: 'Tue', times: ['10:00', '12:00', '15:00'] },
      { day: 'Wed', times: ['09:00', '11:00', '14:00'] },
      { day: 'Thu', times: ['10:00', '12:00', '15:00'] },
      { day: 'Fri', times: ['09:00', '13:00'] }
    ]
  }
};

export const TrainerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const trainer = id ? TRAINERS_DATA[id] : null;

  useSEO({
    title: trainer ? `${trainer.name} - Performance Coach` : 'Trainer Profile',
    description: trainer?.bio?.substring(0, 160)
  });

  const [selectedDay, setSelectedDay] = useState(trainer?.schedule?.[0]?.day);

  if (!trainer) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-brand-dark px-6 text-center">
        <h2 className="text-4xl font-sans font-bold uppercase mb-8">Trainer Not Found</h2>
        <button onClick={() => navigate('/trainers')} className="text-brand-blue uppercase font-bold tracking-widest text-xs flex items-center gap-2">
          <ArrowLeft size={14} /> Back to Team
        </button>
      </div>
    );
  }

  return (
    <div className="bg-brand-dark pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <button 
          onClick={() => navigate('/trainers')} 
          className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors uppercase font-mono text-[10px] tracking-widest mb-12"
        >
          <ArrowLeft size={14} /> Back to Team
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-16">
            <header className="space-y-6">
              <div className="text-brand-blue text-xs uppercase font-mono tracking-[0.4em]">{trainer.role}</div>
              <h1 className="text-6xl md:text-8xl font-sans font-bold uppercase tracking-tighter italic leading-none">
                {trainer.name}
              </h1>
              <div className="flex flex-wrap gap-8 pt-8 border-t border-white/5">
                <div className="flex items-center gap-3 text-white/40 font-mono text-[10px] uppercase tracking-widest">
                  <Clock size={14} className="text-brand-blue" />
                  {trainer.experience} Experience
                </div>
                <div className="flex items-center gap-3 text-white/40 font-mono text-[10px] uppercase tracking-widest">
                  <MapPin size={14} className="text-brand-blue" />
                  Covent Garden Studio
                </div>
              </div>
            </header>

            <div className="aspect-[21/9] rounded-[48px] overflow-hidden border border-white/5 grayscale">
              <img src={trainer.img} alt={trainer.name} className="w-full h-full object-cover" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-8">
                <h3 className="text-2xl font-bold uppercase tracking-tight italic">Philosophy</h3>
                <p className="text-white/60 leading-relaxed font-light text-lg">
                  {trainer.bio}
                </p>
                <div className="flex gap-4 pt-4">
                  {trainer.social.instagram && (
                    <a href={trainer.social.instagram} target="_blank" rel="noreferrer" className="p-4 rounded-full glass-morphism border border-white/10 hover:border-brand-blue transition-colors">
                      <Instagram size={20} />
                    </a>
                  )}
                  {trainer.social.linkedin && (
                    <a href={trainer.social.linkedin} target="_blank" rel="noreferrer" className="p-4 rounded-full glass-morphism border border-white/10 hover:border-brand-blue transition-colors">
                      <Linkedin size={20} />
                    </a>
                  )}
                  {trainer.social.twitter && (
                    <a href={trainer.social.twitter} target="_blank" rel="noreferrer" className="p-4 rounded-full glass-morphism border border-white/10 hover:border-brand-blue transition-colors">
                      <TwitterIcon size={20} />
                    </a>
                  )}
                </div>
              </div>

              <div className="space-y-12">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-brand-blue mb-6">Specializations</h3>
                  <div className="space-y-4">
                    {trainer.expertise.map((item: string) => (
                      <div key={item} className="flex items-center gap-3 text-white/60">
                        <CheckCircle2 size={16} className="text-brand-blue" />
                        <span className="uppercase font-mono text-xs tracking-widest">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-brand-blue mb-6">Certifications</h3>
                  <div className="space-y-4">
                    {trainer.certifications.map((item: string) => (
                      <div key={item} className="flex items-center gap-3 text-white/60">
                        <Award size={16} className="text-brand-blue" />
                        <span className="uppercase font-mono text-[10px] tracking-widest">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Scheduling */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 glass-morphism rounded-[48px] p-10 border border-white/10 space-y-10">
              <div className="text-center pb-8 border-b border-white/5">
                <h3 className="text-2xl font-bold uppercase tracking-tight mb-2">Protocol Intake</h3>
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/40">Initialize your transformation</p>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center px-4">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-white/40">Weekly Availability</span>
                  <Calendar size={14} className="text-brand-blue" />
                </div>
                
                <div className="grid grid-cols-5 gap-2">
                  {trainer.schedule.map((slot: any) => (
                    <button
                      key={slot.day}
                      onClick={() => setSelectedDay(slot.day)}
                      className={`py-3 rounded-xl border text-[10px] font-bold uppercase transition-all ${
                        selectedDay === slot.day 
                        ? 'bg-brand-blue text-black border-brand-blue' 
                        : 'border-white/5 text-white/40 hover:border-white/20'
                      }`}
                    >
                      {slot.day}
                    </button>
                  ))}
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {trainer.schedule.find((s: any) => s.day === selectedDay)?.times.map((time: string) => (
                    <button
                      key={time}
                      className="w-full py-4 px-6 rounded-xl border border-white/5 text-xs font-mono tracking-widest hover:border-brand-blue transition-all flex justify-between items-center group"
                    >
                      {time}
                      <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">SELECT</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <button 
                  onClick={() => navigate('/contact')}
                  className="w-full bg-white text-black py-6 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-brand-blue transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                >
                  Initiate Booking
                </button>
                <button className="w-full flex items-center justify-center gap-3 py-6 rounded-2xl border border-white/10 font-bold uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all">
                  <MessageSquare size={14} />
                  Private Inquiry
                </button>
              </div>

              <div className="pt-6 border-t border-white/5">
                <div className="flex items-center gap-4 text-white/20 text-[9px] uppercase font-mono tracking-[0.2em] leading-relaxed">
                  <CheckCircle2 size={12} className="flex-shrink-0" />
                  Admission subject to diagnostic evaluation. Secure processing guaranteed.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
