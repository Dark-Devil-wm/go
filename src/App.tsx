import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { Navbar } from './components/Layout/Navbar';
import { Footer } from './components/Layout/Footer';
import { SmoothScroll } from './components/Layout/SmoothScroll';
import { AIChat } from './components/AI/AIChat';

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

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <SmoothScroll>
          <div className="flex flex-col min-h-screen bg-brand-dark selection:bg-brand-blue selection:text-black">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/about" element={<About />} />
                <Route path="/training" element={<Programs />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/memberships" element={<Memberships />} />
                <Route path="/trainers" element={<Trainers />} />
                <Route path="/classes" element={<Classes />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
              </Routes>
            </main>
            <AIChat />
            <Footer />
          </div>
        </SmoothScroll>
      </Router>
    </AuthProvider>
  );
}
