"use client";

import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getIsAuthed, getEmail, getIsPro } from '../lib/auth';

export default function LandingPage() {
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState(false);
  const [email, setEmail] = useState('');
  const [isPro, setIsPro] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const authed = getIsAuthed();
    setIsAuthed(authed);
    if (authed) {
      setEmail(getEmail());
      setIsPro(getIsPro());
    }
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
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-200 px-12 py-4 flex justify-between items-center min-w-[1280px] shadow-sm">
        <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => router.push('/')}>
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
             <Icon icon="heroicons:chat-bubble-left-right" className="text-white text-xl" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-slate-800">SayRight</span>
        </div>
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-4">
            {isAuthed ? (
              <div className="flex items-center space-x-3 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => router.push('/scenarios')}>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold text-slate-700">{email}</span>
                  {isPro && (
                    <span className="text-[10px] font-bold text-white bg-slate-900 px-1.5 py-0.5 rounded leading-none">PRO</span>
                  )}
                </div>
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                  {email.charAt(0).toUpperCase()}
                </div>
              </div>
            ) : (
             <button 
               onClick={() => router.push('/login')}
               className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center"
             >
               Login
               <Icon icon="heroicons:arrow-right-start-on-rectangle-20-solid" className="ml-2 w-4 h-4" />
             </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="pt-40 pb-20 px-12 w-[1280px] mx-auto">
        <div className="text-center space-y-8 animate-slide-up max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-100 mb-4 hover:bg-indigo-100 transition-colors cursor-default">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 animate-pulse"></span>
            AI-Powered Professional Communication
          </div>
          <h1 className="text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Master Professional <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Discussions</span>
          </h1>
          <p className="text-xl text-slate-600 w-full max-w-2xl mx-auto leading-relaxed font-light">
            Instantly generate tactful, persuasive, and polished responses for difficult workplace conversations. Never let a meeting turn awkward again.
          </p>
          <div className="flex items-center justify-center gap-6 pt-8">
            <button 
              onClick={() => router.push('/upgrade')}
              className="bg-slate-900 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center group min-w-[200px] justify-center"
            >
              Get Pro Access
              <Icon icon="heroicons:star-20-solid" className="ml-2 w-5 h-5 text-yellow-400 group-hover:rotate-12 transition-transform" />
            </button>
            <button 
              onClick={handleTryNow}
              className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl text-lg font-bold hover:border-indigo-600 hover:text-indigo-600 transition-all hover:bg-indigo-50 shadow-sm min-w-[200px]"
            >
              Try Demo
            </button>
          </div>
          
          <div className="pt-12 flex justify-center space-x-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Placeholder for logos */}
             <div className="flex items-center space-x-2"><Icon icon="heroicons:building-office-2" className="w-6 h-6"/> <span className="font-bold">TechCorp</span></div>
             <div className="flex items-center space-x-2"><Icon icon="heroicons:globe-alt" className="w-6 h-6"/> <span className="font-bold">GlobalBiz</span></div>
             <div className="flex items-center space-x-2"><Icon icon="heroicons:chart-bar" className="w-6 h-6"/> <span className="font-bold">FinanceFlow</span></div>
             <div className="flex items-center space-x-2"><Icon icon="heroicons:briefcase" className="w-6 h-6"/> <span className="font-bold">ConsultPro</span></div>
          </div>
        </div>

        {/* Core Scenarios */}
        <section id="scenarios" className="mt-40">
          <div className="flex items-end justify-between mb-12">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-4xl font-bold text-slate-900 leading-tight">High-Stakes Scenarios <br/> <span className="text-indigo-600">Handled with Grace</span></h2>
              <p className="text-slate-500 text-lg font-light">Select a card below to instantly copy a professional response template.</p>
            </div>
            <div className="flex space-x-3">
              <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-slate-300 transition-all">
                <Icon icon="heroicons:arrow-left-20-solid" className="w-5 h-5" />
              </button>
              <button 
                onClick={() => router.push('/scenarios')}
                className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-indigo-600 transition-all shadow-lg hover:shadow-indigo-200"
              >
                <Icon icon="heroicons:arrow-right-20-solid" className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-8">
            {/* Card 1: Disagree */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <Icon icon="heroicons:hand-raised" className="text-2xl" />
                </div>
                <div className="px-3 py-1 bg-slate-50 rounded-full text-xs font-semibold text-slate-500 uppercase tracking-wider">Conflict</div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Disagree Politely</h3>
              <p className="text-slate-500 mb-8 text-sm leading-relaxed flex-grow">When a colleague&apos;s proposal has flaws, express opposition while maintaining harmony and professionalism.</p>
              
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 group-hover:border-indigo-100 transition-colors relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <p className="text-sm text-slate-700 font-medium italic leading-relaxed pr-8">&quot;I see your point, however, I&apos;m concerned about the timeline impact...&quot;</p>
                <button 
                  onClick={() => handleCopy('c1', "I see your point, however, I'm concerned about the timeline...")}
                  className="absolute right-3 bottom-3 p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                  title="Copy to clipboard"
                >
                  <Icon icon={copiedId === 'c1' ? "heroicons:check-circle-20-solid" : "heroicons:document-duplicate"} className={`text-xl ${copiedId === 'c1' ? 'text-emerald-500' : ''}`} />
                </button>
              </div>
            </div>

            {/* Card 2: Buy Time */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                  <Icon icon="heroicons:clock" className="text-2xl" />
                </div>
                 <div className="px-3 py-1 bg-slate-50 rounded-full text-xs font-semibold text-slate-500 uppercase tracking-wider">Urgency</div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Buy Time</h3>
              <p className="text-slate-500 mb-8 text-sm leading-relaxed flex-grow">Sudden questions under pressure? Buy 10-20 seconds to think without looking awkward or unprepared.</p>
              
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 group-hover:border-amber-100 transition-colors relative">
                 <div className="absolute top-0 left-0 w-1 h-full bg-amber-500 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <p className="text-sm text-slate-700 font-medium italic leading-relaxed pr-8">&quot;That’s a great question, let me double-check the latest figures for you...&quot;</p>
                <button 
                  onClick={() => handleCopy('c2', "That’s a great question, let me double-check the figures for you...")}
                  className="absolute right-3 bottom-3 p-2 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-all"
                  title="Copy to clipboard"
                >
                  <Icon icon={copiedId === 'c2' ? "heroicons:check-circle-20-solid" : "heroicons:document-duplicate"} className={`text-xl ${copiedId === 'c2' ? 'text-emerald-500' : ''}`} />
                </button>
              </div>
            </div>

            {/* Card 3: Clarify */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                  <Icon icon="heroicons:shield-check" className="text-2xl" />
                </div>
                 <div className="px-3 py-1 bg-slate-50 rounded-full text-xs font-semibold text-slate-500 uppercase tracking-wider">Defense</div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Clarify Without Defense</h3>
              <p className="text-slate-500 mb-8 text-sm leading-relaxed flex-grow">When progress is misunderstood, clarify facts calmly instead of being defensive or emotional.</p>
              
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 group-hover:border-emerald-100 transition-colors relative">
                 <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <p className="text-sm text-slate-700 font-medium italic leading-relaxed pr-8">&quot;Just to clarify, my focus this week was primarily on the core architecture...&quot;</p>
                <button 
                   onClick={() => handleCopy('c3', "Just to clarify, my focus this week was primarily on the...")}
                   className="absolute right-3 bottom-3 p-2 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                   title="Copy to clipboard"
                >
                  <Icon icon={copiedId === 'c3' ? "heroicons:check-circle-20-solid" : "heroicons:document-duplicate"} className={`text-xl ${copiedId === 'c3' ? 'text-emerald-500' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section id="features" className="mt-40 bg-slate-900 rounded-3xl p-24 overflow-hidden relative shadow-2xl">
          <div className="grid grid-cols-2 gap-24 items-center relative z-10">
            <div className="space-y-8">
              <div className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-500/30">Why SayRight</div>
              <h2 className="text-4xl font-bold text-white leading-tight">Efficient Input, <br/>Professional Output.</h2>
              <p className="text-slate-400 text-lg leading-relaxed">Stop wasting time drafting emails or rehearsing responses. Get the perfect words in seconds.</p>
              
              <ul className="space-y-5 pt-4">
                <li className="flex items-start text-slate-300 group">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center mr-4 mt-0.5 group-hover:bg-emerald-500 transition-colors">
                    <Icon icon="heroicons:check" className="text-emerald-400 text-sm group-hover:text-white" />
                  </div>
                  <span className="group-hover:text-white transition-colors">AI models trained on Fortune 500 communication standards</span>
                </li>
                <li className="flex items-start text-slate-300 group">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center mr-4 mt-0.5 group-hover:bg-emerald-500 transition-colors">
                    <Icon icon="heroicons:check" className="text-emerald-400 text-sm group-hover:text-white" />
                  </div>
                  <span className="group-hover:text-white transition-colors">Context-aware suggestions for tone and seniority</span>
                </li>
                <li className="flex items-start text-slate-300 group">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center mr-4 mt-0.5 group-hover:bg-emerald-500 transition-colors">
                    <Icon icon="heroicons:check" className="text-emerald-400 text-sm group-hover:text-white" />
                  </div>
                  <span className="group-hover:text-white transition-colors">One-click integration with Slack, Teams, and Email</span>
                </li>
              </ul>
              
              <div className="pt-6">
                <button 
                  onClick={handleTryNow}
                  className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white hover:text-slate-900 transition-all shadow-lg hover:shadow-indigo-500/50 flex items-center"
                >
                  Start Using for Free
                  <Icon icon="heroicons:arrow-right-20-solid" className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="relative group perspective-1000">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl p-6 transform rotate-y-12 rotate-x-6 group-hover:rotate-0 transition-transform duration-700 ease-out">
                 {/* Mock UI */}
                 <div className="flex items-center space-x-2 mb-6 border-b border-slate-700 pb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                 </div>
                 <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center shrink-0">
                          <span className="text-white text-xs font-bold">Boss</span>
                        </div>
                        <div className="bg-slate-700 rounded-lg rounded-tl-none p-3 text-sm text-slate-300 w-3/4">
                            "I need the final report by this Friday. No exceptions."
                        </div>
                    </div>
                    <div className="flex items-start space-x-3 flex-row-reverse space-x-reverse">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0"><Icon icon="heroicons:sparkles-20-solid" className="text-white w-4 h-4"/></div>
                        <div className="bg-indigo-600/20 border border-indigo-500/30 rounded-lg rounded-tr-none p-3 text-sm text-indigo-100 w-3/4">
                            "I understand the urgency. However, to ensure the data accuracy we agreed upon, I can deliver a preliminary draft Friday and the full analysis by Tuesday. Would that work?"
                        </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-12">
        <div className="w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
          
          <div className="flex items-center space-x-6">
             <span className="font-semibold text-slate-700">SayRight</span>
             <span className="text-slate-300">|</span>
             <a href="#features" className="hover:text-indigo-600 transition-colors">Product</a>
             <a href="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
             <a href="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
          </div>

          <p>© 2026 SayRight Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
