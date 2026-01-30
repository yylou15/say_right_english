"use client";

import { Icon } from '@iconify/react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchTemplateDetail, logout, TemplateDetail, useAuthProtection } from '../../../lib/auth';

export default function ScenarioDetailsPage() {
  useAuthProtection('/login');
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [copiedTone, setCopiedTone] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [detail, setDetail] = useState<TemplateDetail | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const data = await fetchTemplateDetail(id);
        setDetail(data);
      } catch (err) {
        if (err instanceof Error && err.message === 'UNAUTHORIZED') {
          logout();
          router.push('/login');
          return;
        }
        if (err instanceof Error && err.message === 'PRO_REQUIRED') {
          router.push(`/upgrade?from=/scenarios/${id}`);
          return;
        }
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadDetail();
    }
  }, [id, router]);

  if (isLoading) {
      return <div className="p-10 text-center">Loading...</div>;
  }
  
  // Prevent flash of content for Pro scenarios
  if (error) {
    return <div className="p-10 text-center">{error}</div>;
  }

  if (!detail) {
    return <div className="p-10 text-center">Scenario not found</div>;
  }

  const handleCopy = (tone: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTone(tone);
    setTimeout(() => {
      setCopiedTone(null);
    }, 1500);
  };

  const toneHints = {
    SOFT: 'Soft tone',
    NEUTRAL: 'Neutral tone',
    FIRM: 'Firm tone',
  };

  const toneItems = [
    { tone: 'SOFT', phrase: detail.reply_soft, hint: toneHints.SOFT },
    { tone: 'NEUTRAL', phrase: detail.reply_neutral, hint: toneHints.NEUTRAL },
    { tone: 'FIRM', phrase: detail.reply_firm, hint: toneHints.FIRM },
  ];

  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push('/scenarios')}>
          <Icon icon="heroicons:chevron-left-20-solid" className="text-indigo-600 text-xl" />
          <span className="font-bold text-lg tracking-tight text-slate-800">Back to Scenarios</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-slate-400">v2026.01.25</span>
          <button className="text-slate-500 hover:text-indigo-600 transition-colors" onClick={() => navigator.clipboard.writeText(window.location.href)}>
            <Icon icon="heroicons:share-20-solid" className="text-2xl" />
          </button>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 border-b border-slate-200 pb-8">
          <div className="flex items-center space-x-2 text-indigo-600 mb-3">
            <Icon icon="heroicons:chat-bubble-left-right-solid" className="text-2xl" />
            <span className="text-sm font-bold uppercase tracking-widest">{detail.tags?.[0] || detail.category_name}</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            {detail.title}
          </h1>
          <p className="text-xl text-slate-500 italic">
            &quot;{detail.description}&quot;
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tones Cards */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-lg font-bold text-slate-700 flex items-center">
              <Icon icon="heroicons:sparkles-20-solid" className="mr-2" />
              Recommended Expressions
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {toneItems.map((item) => {
                 const isSoft = item.tone === 'SOFT';
                 const isNeutral = item.tone === 'NEUTRAL';
                 
                 const badgeColor = isSoft ? 'bg-emerald-50 text-emerald-600' : isNeutral ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-700';
                 const borderColor = isSoft ? 'border-emerald-100' : isNeutral ? 'border-indigo-100' : 'border-slate-200';
                 const btnColor = isSoft ? 'bg-emerald-600 hover:bg-emerald-700' : isNeutral ? 'bg-indigo-600 hover:bg-slate-900' : 'bg-slate-800 hover:bg-black';

                 return (
                  <div key={item.tone} className={`bg-white rounded-3xl p-6 border ${borderColor} shadow-sm hover:shadow-md transition-all flex flex-col justify-between`}>
                    <div className="flex justify-between items-start mb-4">
                      <span className={`text-xs font-black px-3 py-1 rounded-full ${badgeColor}`}>{item.tone}</span>
                      <span className="text-xs text-slate-400">{item.hint}</span>
                    </div>
                    <p className="text-lg leading-relaxed font-medium text-slate-800 mb-6">
                      &quot;{item.phrase}&quot;
                    </p>
                    <button 
                      onClick={() => handleCopy(item.tone, item.phrase)}
                      className={`w-full text-white py-3 rounded-xl flex items-center justify-center space-x-2 font-bold text-sm active:scale-95 transition-all ${copiedTone === item.tone ? 'bg-slate-900 border-slate-900' : btnColor}`}
                    >
                      <Icon icon={copiedTone === item.tone ? "heroicons:check-circle-20-solid" : "heroicons:document-duplicate-20-solid"} className={copiedTone === item.tone ? "animate-check" : ""} />
                      <span>{copiedTone === item.tone ? 'Copied!' : 'Copy Phrase'}</span>
                    </button>
                  </div>
                 );
              })}
            </div>
          </div>

          {/* Risks Sidebar */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-700 flex items-center">
              <Icon icon="heroicons:shield-exclamation-20-solid" className="mr-2" />
              Usage & Risks
            </h2>
            <div className="bg-rose-50 rounded-3xl p-8 border border-rose-100 sticky top-24">
              <div className="flex items-center space-x-2 text-rose-600 mb-4">
                <Icon icon="heroicons:exclamation-triangle-20-solid" className="text-2xl" />
                <span className="font-bold uppercase tracking-wider">Risk Level: Low</span>
              </div>
              <div className="space-y-4">
                <p className="text-sm font-bold text-rose-900">When NOT to use:</p>
                <p className="text-sm text-rose-700 leading-relaxed">
                  {detail.when_not_to_use}
                </p>
                <div className="pt-4 border-t border-rose-200">
                  <p className="text-sm font-bold text-rose-900">Best Practices:</p>
                  <ul className="mt-2 space-y-2 text-xs text-rose-700">
                    {detail.best_practices.map((bp, i) => (
                      <li key={i} className="flex items-start"><span className="mr-2 opacity-50">•</span>{bp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Progress Indicator (Mock) */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-full flex items-center justify-center">
        <div className="w-12 h-1 bg-slate-700 rounded-full"></div>
      </div>
    </div>
  );
}
