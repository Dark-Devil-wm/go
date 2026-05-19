import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

const STATIC_POSTS = [
  {
    id: 'static-1',
    title: 'Hypertrophy Diagnostics: The London Protocol',
    excerpt: 'How our London masters leverage biomechanics diagnostics to bypass Plateaus and trigger high-velocity muscle growth.',
    category: 'Strength',
    date: 'May 18, 2024',
    author: 'Marcus Thorne',
    img: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&q=80',
    content: '### The Architecture of Growth\n\nClinical hypertrophy is not just about moving weight from point A to point B...'
  },
  {
    id: 'static-2',
    title: 'Clinical Nutrition for High-Performance State',
    excerpt: 'Understanding the endocrine response to high-stress executive lifestyles and how to fuel for dominance.',
    category: 'Nutrition',
    date: 'May 12, 2024',
    author: 'Elena Vovk',
    img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80',
    content: '### Fueling the Machine\n\nOptimal hormone balance is the cornerstone of elite physical performance...'
  },
  {
    id: 'static-3',
    title: 'Neurological Recovery: Beyond the Foam Roller',
    excerpt: 'Elite recovery strategies focusing on the central nervous system adaptation and parasympathetic dominance.',
    category: 'Recovery',
    date: 'May 05, 2024',
    author: 'David Mercer',
    img: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?auto=format&fit=crop&q=80',
    content: '### The CNS Reset\n\nRecovery is an active process. It is about downregulating the nervous system...'
  }
];

export const Blog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>(STATIC_POSTS);
  const [search, setSearch] = useState('');
  useSEO({
    title: 'Strength Journal - Performance Insights',
    description: 'Official performance journal of Strength Fitness London. Insights into biomechanics, clinical nutrition, and elite mindset.'
  });

  useEffect(() => {
    const q = query(collection(db, 'blog'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dynamicPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts([...dynamicPosts, ...STATIC_POSTS]);
    });
    return () => unsubscribe();
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-brand-dark pt-32 pb-24 min-h-screen">
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24 border-b border-white/5 pb-16">
          <div>
            <span className="font-mono text-brand-blue text-xs uppercase tracking-[0.4em] mb-4 block">Strength Journal</span>
            <h1 className="text-6xl md:text-9xl font-sans font-bold uppercase tracking-tighter leading-none">
              High <span className="italic text-white/20">Performance</span>
            </h1>
          </div>
          
          <div className="relative w-full max-w-md">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input 
              type="text" 
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Journal..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-5 pl-16 pr-8 text-sm outline-none focus:border-brand-blue transition-all font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {filteredPosts.map((post, i) => (
            <motion.article
              key={post.id || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => navigate(`/blog/${post.id}`)}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/9] overflow-hidden rounded-[40px] mb-8 border border-white/5 relative bg-white/5">
                <img 
                  src={post.img || post.image || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80'} 
                  alt={post.title} 
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-black/60 backdrop-blur-xl rounded-full text-[10px] font-mono uppercase tracking-widest text-brand-blue border border-brand-blue/20">
                  {post.category}
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-widest text-white/20">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 bg-white/20 rounded-full" />
                  <span>By {post.author}</span>
                </div>
                <h2 className="text-4xl font-sans font-bold uppercase tracking-tighter leading-tight group-hover:text-brand-blue transition-colors">
                  {post.title}
                </h2>
                <p className="text-white/40 font-light leading-relaxed max-w-xl">
                  {post.excerpt}
                </p>
                <button className="flex items-center gap-2 group/btn text-[10px] uppercase font-bold tracking-widest text-white/60 hover:text-white transition-colors">
                  Read Article
                  <div className="w-6 h-[1px] bg-white/20 group-hover/btn:bg-white group-hover/btn:w-10 transition-all" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
};
