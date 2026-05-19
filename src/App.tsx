import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { Navbar } from './components/Layout/Navbar';
import { Footer } from './components/Layout/Footer';
import { SmoothScroll } from './components/Layout/SmoothScroll';
import { AIChat } from './components/AI/AIChat';
import { motion, AnimatePresence } from 'motion/react';

// Pages
import { Home } from './pages/Home';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { About } from './pages/About';
import { Trainers } from './pages/Trainers';
import { Programs } from './pages/Programs';
import { Memberships } from './pages/Memberships';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { Gallery } from './pages/Gallery';
import { FAQ } from './pages/FAQ';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Classes } from './pages/Classes';
import { NotFound } from './pages/NotFound';
import { Admin } from './pages/Admin';
import { Transformations } from './pages/Transformations';
import { BlogPost } from './pages/BlogPost';

const ProtectedRoute = ({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) => {
  const { user, profile, loading } = useAuth();
  
  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-brand-dark">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-12 h-12 border-2 border-brand-blue rounded-full"
      />
    </div>
  );
  
  if (!user) return <Navigate to="/auth" />;
  
  if (requireAdmin && profile?.role !== 'admin') return <Navigate to="/dashboard" />;
  
  return <>{children}</>;
};

const AnimatedPage = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <SmoothScroll>
          <div className="flex flex-col min-h-screen bg-brand-dark selection:bg-brand-blue selection:text-black">
            <Navbar />
            <main className="flex-grow">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
                  <Route path="/auth" element={<AnimatedPage><Auth /></AnimatedPage>} />
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <AnimatedPage><Dashboard /></AnimatedPage>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin" 
                    element={
                      <ProtectedRoute requireAdmin>
                        <AnimatedPage><Admin /></AnimatedPage>
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
                  <Route path="/training" element={<AnimatedPage><Programs /></AnimatedPage>} />
                  <Route path="/programs" element={<AnimatedPage><Programs /></AnimatedPage>} />
                  <Route path="/memberships" element={<AnimatedPage><Memberships /></AnimatedPage>} />
                  <Route path="/trainers" element={<AnimatedPage><Trainers /></AnimatedPage>} />
                  <Route path="/classes" element={<AnimatedPage><Classes /></AnimatedPage>} />
                  <Route path="/blog" element={<AnimatedPage><Blog /></AnimatedPage>} />
                  <Route path="/blog/:id" element={<AnimatedPage><BlogPost /></AnimatedPage>} />
                  <Route path="/gallery" element={<AnimatedPage><Gallery /></AnimatedPage>} />
                  <Route path="/transformations" element={<AnimatedPage><Transformations /></AnimatedPage>} />
                  <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
                  <Route path="/faq" element={<AnimatedPage><FAQ /></AnimatedPage>} />
                  <Route path="/privacy" element={<AnimatedPage><Privacy /></AnimatedPage>} />
                  <Route path="/terms" element={<AnimatedPage><Terms /></AnimatedPage>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </main>
            <AIChat />
            <Footer />
          </div>
        </SmoothScroll>
      </Router>
    </AuthProvider>
  );
}
