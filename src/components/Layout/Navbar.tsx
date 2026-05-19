import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, User as UserIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../hooks/useAuth';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Training', path: '/training' },
    { name: 'Memberships', path: '/memberships' },
    { name: 'Trainers', path: '/trainers' },
    { name: 'Classes', path: '/classes' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Journal', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4 md:px-12',
          isScrolled ? 'py-4 backdrop-blur-xl bg-black/60 border-b border-white/10' : 'py-8'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-sans font-bold text-2xl tracking-tighter uppercase italic bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent group-hover:to-brand-blue transition-all duration-300">
              Strength<span className="text-white">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:text-brand-blue',
                  pathname === link.path ? 'text-brand-blue' : 'text-white/60'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <Link to="/dashboard" className="flex items-center gap-3 glass-morphism px-5 py-2.5 rounded-full border border-white/10 hover:border-brand-blue transition-all group">
                <div className="w-8 h-8 rounded-full bg-brand-gray overflow-hidden border border-white/10">
                  <img src={profile?.avatar} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold group-hover:text-brand-blue">Dashboard</span>
              </Link>
            ) : (
              <button 
                onClick={() => navigate('/auth')}
                className="glass-morphism px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 group hover:bg-white hover:text-black transition-all duration-500 border border-white/20"
              >
                Access Elite
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center p-12"
          >
            <div className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-sans font-bold uppercase tracking-tighter text-white hover:text-brand-blue transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => {
                  setIsOpen(false);
                  navigate(user ? '/dashboard' : '/auth');
                }}
                className="mt-8 bg-brand-blue text-black px-12 py-5 rounded-full font-bold uppercase tracking-widest text-sm shadow-2xl shadow-brand-blue/20"
              >
                {user ? 'Dashboard' : 'Access Elite'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
