import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useSEO } from '../hooks/useSEO';
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const STATIC_POSTS = [
  {
    id: 'static-1',
    title: 'Hypertrophy Diagnostics: The London Protocol',
    excerpt: 'How our London masters leverage biomechanics diagnostics to bypass Plateaus and trigger high-velocity muscle growth.',
    category: 'Strength',
    date: 'May 18, 2024',
    author: 'Marcus Thorne',
    img: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&q=80',
    content: '### The Architecture of Growth\n\nClinical hypertrophy is not just about moving weight from point A to point B. It is about maximizing the biological response to mechanical tension. \n\nAt Strength Fitness London, we utilize peak-power diagnostics to identify exactly where your neurological drive drops off, allowing us to prescription-load the movement through its entire range.'
  },
  {
    id: 'static-2',
    title: 'Clinical Nutrition for High-Performance State',
    excerpt: 'Understanding the endocrine response to high-stress executive lifestyles and how to fuel for dominance.',
    category: 'Nutrition',
    date: 'May 12, 2024',
    author: 'Elena Vovk',
    img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80',
    content: '### Fueling the Machine\n\nOptimal hormone balance is the cornerstone of elite physical performance. For the London executive, cortisol is often the enemy of progress. \n\nOur nutritional protocols focus on glycemic control and micronutrient density to ensure your brain and body remain in a constant state of anabolic readiness, regardless of how many board meetings you have.'
  },
  {
    id: 'static-3',
    title: 'Neurological Recovery: Beyond the Foam Roller',
    excerpt: 'Elite recovery strategies focusing on the central nervous system adaptation and parasympathetic dominance.',
    category: 'Recovery',
    date: 'May 05, 2024',
    author: 'David Mercer',
    img: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?auto=format&fit=crop&q=80',
    content: '### The CNS Reset\n\nRecovery is an active process. It is about downregulating the nervous system to allow for deep structural repair. \n\nWe utilize advanced breathing protocols and neurological stimulus to shift our practitioners from a sympathetic "fight or flight" mode into a parasympathetic recovery state within minutes of completing a high-intensity protocol.'
  }
];

export const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      // Check static first
      const staticPost = STATIC_POSTS.find(p => p.id === id);
      if (staticPost) {
        setPost(staticPost);
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'blog', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  useSEO({
    title: post?.title || 'Journal Entry',
    description: post?.excerpt || 'Read the latest performance insights from Strength Fitness London.',
    ogType: 'article',
    ogImage: post?.image || post?.img,
    schema: post ? {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "image": [post.image || post.img],
      "datePublished": post.date,
      "author": [{
        "@type": "Person",
        "name": post.author
      }]
    } : null
  });

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-brand-dark">
      <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!post) return (
    <div className="h-screen flex flex-col items-center justify-center bg-brand-dark px-6 text-center">
      <h2 className="text-4xl font-sans font-bold uppercase mb-8">Article Not Found</h2>
      <Link to="/blog" className="text-brand-blue uppercase font-bold tracking-widest text-xs flex items-center gap-2">
        <ArrowLeft size={14} />
        Back to Journal
      </Link>
    </div>
  );

  return (
    <div className="bg-brand-dark pt-32 pb-24 min-h-screen">
      <article className="max-w-4xl mx-auto px-6">
        <Link to="/blog" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors uppercase font-mono text-[10px] tracking-widest mb-12">
          <ArrowLeft size={14} />
          Back to Journal
        </Link>

        <header className="mb-16">
          <div className="text-brand-blue text-xs uppercase font-mono tracking-[0.4em] mb-6">{post.category}</div>
          <h1 className="text-5xl md:text-7xl font-sans font-bold uppercase tracking-tighter leading-tight mb-12 italic">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-8 text-white/40 text-[10px] uppercase font-mono tracking-widest border-y border-white/5 py-8">
            <div className="flex items-center gap-2">
              <User size={14} className="text-brand-blue" />
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-brand-blue" />
              {new Date(post.date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-brand-blue" />
              {Math.ceil((post.content?.length || 0) / 1000)} MIN READ
            </div>
          </div>
        </header>

        <div className="aspect-[21/9] rounded-[48px] overflow-hidden mb-16 border border-white/5 grayscale">
          <img src={post.image || post.img} className="w-full h-full object-cover" alt={post.title} />
        </div>

        <div className="prose prose-invert prose-brand max-w-none">
          <div className="markdown-body text-white/70 leading-relaxed text-lg font-light space-y-8">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>

        <footer className="mt-24 pt-12 border-t border-white/5">
          <div className="glass-morphism p-12 rounded-[48px] border border-white/5 text-center">
            <h3 className="text-2xl font-bold uppercase mb-4 italic">Join the Conversation</h3>
            <p className="text-white/40 mb-8 max-w-md mx-auto">Subscribe for weekly performance research and clinical diagnostics.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input type="email" placeholder="ENTER EMAIL" className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-mono" />
              <button className="bg-white text-black px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-brand-blue transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
};
