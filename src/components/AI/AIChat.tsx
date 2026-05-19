import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Loader2, Phone } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMsg = message;
    setMessage('');
    setChat(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setChat(prev => [...prev, { role: 'ai', content: data.text }]);
    } catch (err) {
      setChat(prev => [...prev, { role: 'ai', content: 'Connection issue. Elite trainers are handling high volume.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <motion.a
          href="https://wa.me/447857596220"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
        >
          <Phone size={28} />
        </motion.a>
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-brand-blue text-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all neon-glow-blue"
        >
          <MessageCircle size={28} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-28 right-8 z-50 w-[350px] md:w-[400px] h-[550px] glass-morphism rounded-[32px] overflow-hidden flex flex-col shadow-2xl border border-white/20"
          >
            <div className="bg-white/10 p-6 flex items-center justify-between border-b border-white/10">
              <div>
                <h3 className="font-sans font-bold uppercase tracking-widest text-sm">Strength AI</h3>
                <p className="text-[10px] text-brand-blue uppercase tracking-widest mt-1">Virtual Assistant</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-4 scrollbar-hide">
              {chat.length === 0 && (
                <div className="text-center mt-12">
                  <p className="text-white/40 text-sm font-light italic">"Unlock your potential. Ask me anything about our London programs."</p>
                </div>
              )}
              {chat.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-brand-blue text-black font-medium' : 'bg-white/5 border border-white/10 text-white/80'}`}>
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                    <Loader2 className="w-5 h-5 animate-spin text-brand-blue" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-white/10 bg-black/20">
              <div className="relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about transformations..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-14 text-sm focus:outline-none focus:border-brand-blue transition-colors"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-2 top-2 w-10 h-10 bg-brand-blue text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
