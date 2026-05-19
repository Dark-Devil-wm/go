import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Mail, LogIn, UserPlus, AlertCircle } from 'lucide-react';
import { ThreeBackground } from '../components/Three/ThreeBackground';

export const Auth = () => {
  const { user, signIn, signUpEmail, signInEmail, resetPassword, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup' | 'select' | 'forgot'>('select');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);
    try {
      if (mode === 'signup') {
        if (!name) throw new Error('Name is required');
        await signUpEmail(email, password, name);
      } else if (mode === 'login') {
        await signInEmail(email, password);
      } else if (mode === 'forgot') {
        await resetPassword(email);
        setSuccess('Password reset link sent to your email.');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-dark flex items-center justify-center p-6 sm:p-12 overflow-hidden">
      <ThreeBackground />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-xl glass-morphism p-12 md:p-16 rounded-[48px] border border-white/10 shadow-2xl"
      >
        <div className="text-center mb-12">
          <span className="font-sans font-bold text-2xl tracking-tighter uppercase italic bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent mb-4 block">
            Strength Fitness<span className="text-white">.</span>
          </span>
          <h1 className="text-4xl md:text-5xl font-sans font-bold uppercase tracking-tighter mb-4 leading-none text-white">
            {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Join Elite' : mode === 'forgot' ? 'Reset Security' : 'Access Elite'}
          </h1>
          <p className="text-white/40 font-light text-lg">
            {mode === 'login' ? 'Enter your credentials to continue.' : mode === 'signup' ? 'Create your profile to start transformation.' : mode === 'forgot' ? 'Enter your email to receive reset instructions.' : 'Sign in to manage your performance protocol.'}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {mode === 'select' ? (
            <motion.div
              key="select"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <button
                onClick={() => signIn()}
                disabled={loading}
                className="w-full flex items-center justify-center gap-4 bg-white text-black py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-brand-blue transition-all duration-500 group shadow-xl shadow-white/5 active:scale-95 disabled:opacity-50"
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center p-1.5 shrink-0">
                  <svg viewBox="0 0 48 48" className="w-full h-full"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></svg>
                </div>
                Google Access
              </button>
              
              <button 
                onClick={() => setMode('login')}
                className="w-full py-5 border border-white/10 rounded-2xl font-bold uppercase tracking-widest text-xs text-white/60 hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-3"
              >
                <Mail size={16} />
                Email Protocol
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {(error || success) && (
                  <div className={`p-4 rounded-xl flex items-center gap-3 text-xs border ${error ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-green-500/10 border-green-500/20 text-green-500'}`}>
                    <AlertCircle size={14} />
                    {error || success}
                  </div>
                )}
                
                {mode === 'signup' && (
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-brand-blue transition-all text-white"
                      placeholder="Enter your name"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Registry Email</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-brand-blue transition-all text-white"
                    placeholder="name@nexus.com"
                  />
                </div>

                {mode !== 'forgot' && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Security Password</label>
                      {mode === 'login' && (
                        <button 
                          type="button"
                          onClick={() => setMode('forgot')}
                          className="text-[9px] uppercase tracking-widest text-brand-blue hover:text-white transition-colors"
                        >
                          Forgot?
                        </button>
                      )}
                    </div>
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-brand-blue transition-all text-white"
                      placeholder="••••••••"
                    />
                  </div>
                )}

                <button 
                  disabled={isSubmitting}
                  className="w-full py-6 bg-white text-black rounded-2xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-4 hover:bg-brand-blue transition-all group disabled:opacity-50"
                >
                  {isSubmitting ? 'Processing...' : mode === 'login' ? 'Initialize Login' : mode === 'forgot' ? 'Send Reset Link' : 'Register Protocol'}
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>

                <div className="flex flex-col gap-4 text-center">
                  {mode !== 'forgot' ? (
                    <button 
                      type="button"
                      onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                      className="text-[10px] uppercase font-bold tracking-widest text-white/40 hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                      {mode === 'login' ? <UserPlus size={14} /> : <LogIn size={14} />}
                      {mode === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
                    </button>
                  ) : (
                    <button 
                      type="button"
                      onClick={() => setMode('login')}
                      className="text-[10px] uppercase font-bold tracking-widest text-white/40 hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                      <LogIn size={14} />
                      Back to Login
                    </button>
                  )}
                  <button 
                    type="button"
                    onClick={() => setMode('select')}
                    className="text-[10px] uppercase font-bold tracking-widest text-brand-blue hover:text-white transition-colors"
                  >
                    Back to Selection
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 pt-12 border-t border-white/5 grid grid-cols-2 gap-8">
          <div className="flex flex-col items-center gap-3">
            <ShieldCheck className="text-brand-blue" size={24} />
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Secure Access</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <LogIn className="text-brand-blue" size={24} />
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Instant Sync</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
