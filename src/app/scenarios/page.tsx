"use client";

import { Icon } from '@iconify/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { fetchTemplateList, fetchUserByEmail, getEmail, getIsPro, logout, setUserInfo, TemplateCategory, TemplateSummary, useAuthProtection } from '../../lib/auth';
import { TemplateListSkeleton } from '../../components/TemplateListSkeleton';

function ScenariosContent() {
  useAuthProtection('/login');
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const currentCategory = categoryParam || 'Disagree';
  const [searchQuery, setSearchQuery] = useState('');
  const [isProUser, setIsProUser] = useState(false);
  const [email, setEmail] = useState('');
  const [categories, setCategories] = useState<TemplateCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedEmail = getEmail();
    setIsProUser(getIsPro());
    setEmail(storedEmail);

    const loadUser = async () => {
      if (!storedEmail) return;
      try {
        const user = await fetchUserByEmail(storedEmail);
        if (!user) return;
        const latestEmail = user.email || storedEmail;
        const latestIsPro = Boolean(user.is_pro ?? user.isPro);
        setEmail(latestEmail);
        setIsProUser(latestIsPro);
        setUserInfo(latestEmail, latestIsPro);
      } catch {
        return;
      }
    };

    const loadTemplates = async () => {
      try {
        const data = await fetchTemplateList();
        const list = data.categories || [];
        setCategories(list);
        if (!categoryParam && list.length > 0) {
          router.replace(`/scenarios?category=${encodeURIComponent(list[0].name)}`);
        }
      } catch (err) {
        if (err instanceof Error && err.message === 'UNAUTHORIZED') {
          logout();
          router.push('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
    loadTemplates();
  }, [router, categoryParam]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const activeCategory = categories.find((c) => c.name === currentCategory) || categories[0];
  const templates = activeCategory?.templates || [];

  const filteredTemplates = templates.filter((template) => {
    const query = searchQuery.toLowerCase();
    const tagsText = template.tags.join(' ').toLowerCase();
    return (
      template.title.toLowerCase().includes(query) ||
      template.description.toLowerCase().includes(query) ||
      tagsText.includes(query)
    );
  });
  const sortedTemplates = filteredTemplates
    .map((template, index) => ({ template, index }))
    .sort((a, b) => {
      if (a.template.is_pro === b.template.is_pro) {
        return a.index - b.index;
      }
      return a.template.is_pro ? 1 : -1;
    })
    .map((item) => item.template);

  const handleCardClick = (template: TemplateSummary) => {
    if (template.is_locked) {
      router.push('/upgrade');
    } else {
      router.push(`/scenarios/${template.id}`);
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
            <span className="font-bold text-lg tracking-tight text-slate-900">SayRight</span>
          </div>
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Account</div>
            <div className="mt-2 text-sm font-semibold text-slate-800 truncate">{email || 'unknown@domain.com'}</div>
            <div className="mt-3 flex items-center justify-between">
              {isProUser ? (
                <span className="px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-full">PRO</span>
              ) : (
                <button
                  onClick={() => router.push('/upgrade')}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Upgrade to Pro
                </button>
              )}
              <button
                onClick={handleLogout}
                className="text-xs font-semibold text-slate-400 hover:text-slate-600"
              >
                Log out
              </button>
            </div>
          </div>
          <nav className="space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-3">CATEGORIES</div>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl font-medium transition-all group ${
                  currentCategory === category.name 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon 
                  icon={
                    category.name === 'Disagree' ? 'heroicons:x-circle' :
                    category.name === 'Clarify' ? 'heroicons:chat-bubble-bottom-center-text' :
                    category.name === 'Delay' ? 'heroicons:clock' :
                    category.name === 'Update' ? 'heroicons:arrow-path' :
                    category.name === 'Ask for help' ? 'heroicons:question-mark-circle' :
                    'heroicons:shield-exclamation'
                  } 
                  className={`text-xl ${currentCategory === category.name ? 'text-white' : 'text-slate-400'}`} 
                />
                <span className="text-sm">{category.name}</span>
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
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">{activeCategory?.name || currentCategory}</h1>
              <span className="px-2.5 py-0.5 bg-slate-200 text-slate-600 text-xs font-bold rounded-full">{filteredTemplates.length} Templates</span>
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

        <div className="px-12 pb-20 pt-1">
          {isLoading ? (
            <TemplateListSkeleton />
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 overflow-visible">
            {sortedTemplates.map((template) => (
              <div 
                key={template.id}
                onClick={() => handleCardClick(template)}
                className={`animate-card bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-400 hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between h-44 relative overflow-hidden ${template.is_locked ? 'opacity-60' : ''}`}
              >
                {template.is_locked && (
                  <div className="absolute top-0 right-0 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10">
                    PRO
                  </div>
                )}

                <div className="space-y-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md uppercase tracking-wider">{template.tags[0] || 'General'}</span>
                  <p className="text-base font-semibold text-slate-800 leading-relaxed group-hover:text-indigo-700 transition-colors line-clamp-3">{template.description}</p>
                </div>

                <div className="flex justify-end items-center border-t border-slate-50 pt-3">
                  <span className="text-xs font-bold text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">Get Phrases</span>
                  <Icon icon="heroicons:arrow-right-20-solid" className="text-slate-300 ml-2 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
          )}
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
