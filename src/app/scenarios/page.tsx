"use client";

import { Icon } from '@iconify/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { scenarios, Scenario } from '../../data/scenarios';
import { useAuthProtection, getIsPro } from '../../lib/auth';

const categories = ["Disagree", "Clarify", "Delay", "Update", "Ask for help", "Push back"];

function ScenariosContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'Disagree';
  const [searchQuery, setSearchQuery] = useState('');
  const [isProUser, setIsProUser] = useState(false);

  useAuthProtection();

  useEffect(() => {
    setIsProUser(getIsPro());
  }, []);

  const filteredScenarios = scenarios.filter(scenario => {
    const matchesCategory = scenario.category === currentCategory;
    const matchesSearch = scenario.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          scenario.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          scenario.badge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCardClick = (scenario: Scenario) => {
    if (scenario.isPro && !isProUser) {
      router.push('/upgrade');
    } else {
      router.push(`/scenarios/${scenario.id}`);
    }
  };

  const handleCategoryClick = (category: string) => {
    router.push(`/scenarios?category=${category}`);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 sticky top-0 h-screen">
        <div className="p-6 flex-1 overflow-y-auto hide-scrollbar">
          <div className="flex items-center space-x-2 mb-8 cursor-pointer" onClick={() => router.push('/')}>
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
              <Icon icon="heroicons:book-open-solid" className="text-white text-xl" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">BizEnglish AI</span>
          </div>
          <nav className="space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-3">CATEGORIES</div>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl font-medium transition-all group ${
                  currentCategory === category 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon 
                  icon={
                    category === 'Disagree' ? 'heroicons:x-circle' :
                    category === 'Clarify' ? 'heroicons:chat-bubble-bottom-center-text' :
                    category === 'Delay' ? 'heroicons:clock' :
                    category === 'Update' ? 'heroicons:arrow-path' :
                    category === 'Ask for help' ? 'heroicons:question-mark-circle' :
                    'heroicons:shield-exclamation'
                  } 
                  className={`text-xl ${currentCategory === category ? 'text-white' : 'text-slate-400'}`} 
                />
                <span className="text-sm">{category}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-6 border-t border-slate-100 italic text-slate-400 text-xs">
          Current Date: Jan 25, 2026
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto hide-scrollbar bg-[#F8FAFC]">
        <header className="sticky top-0 z-10 bg-[#F8FAFC]/90 backdrop-blur-md px-12 py-10 flex justify-between items-end">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">{currentCategory}</h1>
              <span className="px-2.5 py-0.5 bg-slate-200 text-slate-600 text-xs font-bold rounded-full">{filteredScenarios.length} Templates</span>
            </div>
            <p className="text-slate-500 text-base">Select a scenario to view professional expressions.</p>
          </div>
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Search scenarios, keywords..." 
              className="bg-white border border-slate-200 rounded-xl px-5 py-3 text-sm w-80 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Icon icon="heroicons:magnifying-glass" className="absolute right-4 top-3.5 text-slate-400" />
          </div>
        </header>

        <div className="px-12 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
            {filteredScenarios.map((scenario, index) => (
              <div 
                key={scenario.id}
                onClick={() => handleCardClick(scenario)}
                className={`animate-card bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-400 hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between ${index === 0 ? 'h-52 p-5' : 'h-44'} relative overflow-hidden`}
              >
                {/* Pro Badge */}
                {scenario.isPro && !isProUser && (
                  <div className="absolute top-0 right-0 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10">
                    PRO
                  </div>
                )}

                <div className="space-y-3">
                  {index === 0 && (
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md uppercase tracking-wider">{scenario.badge}</span>
                  )}
                  {index !== 0 && (
                     <p className="text-lg font-medium text-slate-800 leading-snug group-hover:text-indigo-700 transition-colors line-clamp-3">{scenario.description}</p>
                  )}
                  {index === 0 && (
                     <p className="text-base font-semibold text-slate-800 leading-relaxed group-hover:text-indigo-700 transition-colors line-clamp-3">{scenario.description}</p>
                  )}
                </div>

                {index === 0 ? (
                  <div className="flex justify-end items-center border-t border-slate-50 pt-3">
                    <span className="text-xs font-bold text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">Get Phrases</span>
                    <Icon icon="heroicons:arrow-right-20-solid" className="text-slate-300 ml-2 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                  </div>
                ) : (
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-500 rounded uppercase tracking-tighter">{scenario.badge}</span>
                    <Icon icon="heroicons:chevron-right-20-solid" className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ScenariosPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <ScenariosContent />
    </Suspense>
  );
}
