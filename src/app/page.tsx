"use client";

import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getIsAuthed } from '../lib/auth';

export default function LandingPage() {
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setIsAuthed(getIsAuthed());
  }, []);

  const handleTryNow = () => {
    if (isAuthed) {
      router.push('/scenarios');
    } else {
      router.push('/login');
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 overflow-x-auto min-w-[1280px]">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200 px-12 py-4 flex justify-between items-center min-w-[1280px]">
        <div className="flex items-center space-x-2">
          <Icon icon="heroicons:sparkles-20-solid" className="text-indigo-600 text-2xl" />
          <span className="font-bold text-xl tracking-tight text-slate-800">SayRight</span>
        </div>
        <div className="flex items-center space-x-6">
          <span className="text-sm font-medium text-slate-500 hover:text-indigo-600 cursor-pointer transition-colors">v2026.01.25</span>
          <button 
            onClick={handleTryNow}
            className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-600 transition-all shadow-md active:scale-95"
          >
            Try Now
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main className="pt-32 pb-20 px-12 w-[1200px] mx-auto">
        <div className="text-center space-y-10 animate-slide-up">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-100">
            <Icon icon="heroicons:bolt-20-solid" className="mr-2" />
            Ready for Global Collaboration
          </div>
          <h1 className="text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Never Feel <span className="text-indigo-600">Awkward</span> in Meetings
          </h1>
          <p className="text-xl text-slate-500 w-[800px] mx-auto leading-relaxed">
            Get instant, appropriate, and professional templates. Designed for busy professionals to maintain elegance during conflicts, discussions, and urgent responses.
          </p>
          <div className="flex items-center justify-center gap-6 pt-6">
            <button 
              onClick={() => router.push('/upgrade')}
              className="bg-indigo-600 text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-slate-900 transition-all shadow-xl hover:shadow-indigo-200 flex items-center group"
            >
              Get Pro Access
              <Icon icon="heroicons:star-20-solid" className="ml-2 group-hover:scale-110 transition-transform" />
            </button>
            <button 
              onClick={handleTryNow}
              className="bg-white text-slate-700 border-2 border-slate-200 px-10 py-4 rounded-xl text-lg font-bold hover:border-indigo-600 hover:text-indigo-600 transition-all"
            >
              Try for Free
            </button>
          </div>
        </div>

        {/* Core Scenarios */}
        <section className="mt-32">
          <div className="flex items-end justify-between mb-12 border-l-4 border-indigo-600 pl-6">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold text-slate-900">Core Scenarios</h2>
              <p className="text-slate-500 text-lg">Click cards to quickly copy professional phrases</p>
            </div>
            <div className="flex space-x-3">
              <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white cursor-not-allowed">
                <Icon icon="heroicons:chevron-left-20-solid" />
              </div>
              <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-white cursor-pointer hover:text-indigo-600">
                <Icon icon="heroicons:chevron-right-20-solid" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-10">
            {/* Card 1: Disagree */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon icon="heroicons:chat-bubble-left-right" className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Disagree Politely</h3>
              <p className="text-slate-500 mb-6 text-sm leading-relaxed">When a colleague&apos;s proposal has flaws, express opposition while maintaining harmony.</p>
              <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100 group-hover:bg-white transition-colors relative overflow-hidden">
                <code className="text-xs text-indigo-700 font-mono italic">&quot;I see your point, however, I&apos;m concerned about the timeline...&quot;</code>
                <button 
                  onClick={() => handleCopy('c1', "I see your point, however, I'm concerned about the timeline...")}
                  className="absolute right-2 bottom-2 text-slate-400 hover:text-indigo-600 cursor-pointer"
                >
                  <Icon icon={copiedId === 'c1' ? "heroicons:check-circle-20-solid" : "heroicons:document-duplicate"} className={`text-lg ${copiedId === 'c1' ? 'text-emerald-500' : ''}`} />
                </button>
              </div>
              <div 
                onClick={() => router.push('/scenarios')}
                className="flex items-center text-sm font-semibold text-indigo-600 cursor-pointer"
              >
                More Variations <Icon icon="heroicons:chevron-right-20-solid" className="ml-1" />
              </div>
            </div>

            {/* Card 2: Buy Time */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group">
              <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon icon="heroicons:clock" className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Buy Time</h3>
              <p className="text-slate-500 mb-6 text-sm leading-relaxed">Sudden questions under pressure? Buy 10-20 seconds to think without looking awkward.</p>
              <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100 group-hover:bg-white transition-colors relative overflow-hidden">
                <code className="text-xs text-amber-700 font-mono italic">&quot;That’s a great question, let me double-check the figures for you...&quot;</code>
                <button 
                  onClick={() => handleCopy('c2', "That’s a great question, let me double-check the figures for you...")}
                  className="absolute right-2 bottom-2 text-slate-400 hover:text-indigo-600 cursor-pointer"
                >
                  <Icon icon={copiedId === 'c2' ? "heroicons:check-circle-20-solid" : "heroicons:document-duplicate"} className={`text-lg ${copiedId === 'c2' ? 'text-emerald-500' : ''}`} />
                </button>
              </div>
              <div 
                onClick={() => router.push('/scenarios')}
                className="flex items-center text-sm font-semibold text-amber-600 cursor-pointer"
              >
                More Variations <Icon icon="heroicons:chevron-right-20-solid" className="ml-1" />
              </div>
            </div>

            {/* Card 3: Clarify */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon icon="heroicons:shield-check" className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Clarify Without Defense</h3>
              <p className="text-slate-500 mb-6 text-sm leading-relaxed">When progress is misunderstood, clarify facts calmly instead of being defensive.</p>
              <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100 group-hover:bg-white transition-colors relative overflow-hidden">
                <code className="text-xs text-emerald-700 font-mono italic">&quot;Just to clarify, my focus this week was primarily on the...&quot;</code>
                <button 
                   onClick={() => handleCopy('c3', "Just to clarify, my focus this week was primarily on the...")}
                   className="absolute right-2 bottom-2 text-slate-400 hover:text-indigo-600 cursor-pointer"
                >
                  <Icon icon={copiedId === 'c3' ? "heroicons:check-circle-20-solid" : "heroicons:document-duplicate"} className={`text-lg ${copiedId === 'c3' ? 'text-emerald-500' : ''}`} />
                </button>
              </div>
              <div 
                onClick={() => router.push('/scenarios')}
                className="flex items-center text-sm font-semibold text-emerald-600 cursor-pointer"
              >
                More Variations <Icon icon="heroicons:chevron-right-20-solid" className="ml-1" />
              </div>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section className="mt-40 bg-slate-900 rounded-[4rem] p-20 overflow-hidden relative">
          <div className="grid grid-cols-2 gap-20 items-center relative z-10">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Efficient Input, Professional Output</h2>
              <ul className="space-y-4">
                <li className="flex items-center text-slate-300">
                  <Icon icon="heroicons:check-circle-solid" className="text-emerald-400 mr-3 text-xl" />
                  AI models trained on real workplace contexts
                </li>
                <li className="flex items-center text-slate-300">
                  <Icon icon="heroicons:check-circle-solid" className="text-emerald-400 mr-3 text-xl" />
                  Available on mobile and desktop 24/7
                </li>
                <li className="flex items-center text-slate-300">
                  <Icon icon="heroicons:check-circle-solid" className="text-emerald-400 mr-3 text-xl" />
                  One-click copy to meeting chat boxes
                </li>
              </ul>
              <button 
                onClick={handleTryNow}
                className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-slate-900 transition-all"
              >
                Sign Up for Free
              </button>
            </div>
            <div className="relative">
              {/* Placeholder for image */}
              <div className="w-full h-64 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 rotate-2 group-hover:rotate-0 transition-transform duration-500 flex items-center justify-center text-slate-500">
                  App Preview Image
              </div>
              <div className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg border border-slate-100 hidden md:block">
                <p className="text-xs font-bold text-slate-900 mb-1">Typing...</p>
                <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-indigo-500"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-12">
        <div className="w-[1200px] mx-auto flex justify-between items-center opacity-60 text-sm font-medium">
          <p>© 2026 SayRight. All rights reserved.</p>
          <div className="flex space-x-10">
            <a href="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
            <a href="/contact" className="hover:text-indigo-600 transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
