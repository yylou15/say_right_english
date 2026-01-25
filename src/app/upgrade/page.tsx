"use client";

import { Icon } from '@iconify/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { upgradeToPro } from '@/lib/auth';

function UpgradeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const [selectedPlan, setSelectedPlan] = useState('annual');

  const handleUpgrade = () => {
    upgradeToPro();
    // Simulate processing
    setTimeout(() => {
      if (from) {
        router.push(from);
      } else {
        router.push('/scenarios');
      }
    }, 500);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6 antialiased font-sans flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden animate-in">
        <div className="flex flex-col md:flex-row min-h-[600px]">
          {/* Left: Value Prop */}
          <main className="flex-1 p-8 md:p-12 bg-white">
            <div className="mb-10">
              <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Unlock Full Expression Library</h1>
              <p className="text-slate-500 text-lg italic">Enhance the depth and precision of your workplace communication</p>
            </div>
            {/* Comparison Table */}
            <section className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-200 pb-2">Benefits Comparison</h2>
              <div className="grid grid-cols-1 gap-6">
                <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                  <span className="text-slate-600 font-medium">Examples per Scenario</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-400 line-through">1 Basic</span>
                    <span className="text-md font-bold text-indigo-600">All Tones (3+ Variations)</span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                  <span className="text-slate-600 font-medium">Deep Risk Insights (Cultural/Contextual Traps)</span>
                  <Icon icon="heroicons:check-circle-20-solid" className="text-emerald-500 text-2xl" />
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                  <span className="text-slate-600 font-medium">Offline Scenario Downloads</span>
                  <Icon icon="heroicons:check-circle-20-solid" className="text-emerald-500 text-2xl" />
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                  <span className="text-slate-600 font-medium">2026 Latest Workplace Vocabulary Updates</span>
                  <Icon icon="heroicons:check-circle-20-solid" className="text-emerald-500 text-2xl" />
                </div>
              </div>
            </section>
          </main>

          {/* Right: Plan Selection */}
          <aside className="w-full md:w-[400px] bg-slate-50/50 border-l border-slate-100 p-8 md:p-12 flex flex-col justify-between">
            <div>
              <div className="text-center mb-10">
                <span className="text-slate-400 text-sm font-medium">Choose a Subscription Plan</span>
              </div>
              <section className="space-y-4">
                {/* Annual Plan */}
                <label className="relative block cursor-pointer group">
                  <input 
                    type="radio" 
                    name="plan" 
                    value="annual" 
                    className="peer sr-only" 
                    checked={selectedPlan === 'annual'}
                    onChange={() => setSelectedPlan('annual')}
                  />
                  <div className="p-6 border-2 border-slate-200 bg-white rounded-2xl transition-all peer-checked:border-indigo-600 peer-checked:ring-4 peer-checked:ring-indigo-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">Annual Subscription</h3>
                        <p className="text-slate-400 text-xs mt-1">Billed annually, save 40%</p>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-black text-slate-900">$15</span>
                        <p className="text-slate-400 text-xs">/month</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-3 left-4 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">Most Popular</div>
                </label>

                {/* Monthly Plan */}
                <label className="relative block cursor-pointer group">
                  <input 
                    type="radio" 
                    name="plan" 
                    value="monthly" 
                    className="peer sr-only"
                    checked={selectedPlan === 'monthly'}
                    onChange={() => setSelectedPlan('monthly')}
                  />
                  <div className="p-6 border-2 border-slate-200 bg-white rounded-2xl transition-all peer-checked:border-indigo-600 peer-checked:ring-4 peer-checked:ring-indigo-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">Monthly Subscription</h3>
                        <p className="text-slate-400 text-xs mt-1">Cancel anytime</p>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-black text-slate-900">$25</span>
                        <p className="text-slate-400 text-xs">/month</p>
                      </div>
                    </div>
                  </div>
                </label>
              </section>
            </div>

            {/* CTA */}
            <div className="mt-12 space-y-6">
              <button 
                onClick={handleUpgrade}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg shadow-2xl hover:bg-indigo-600 active:scale-[0.98] transition-all"
              >
                Upgrade to Pro Now
              </button>
              <div className="text-center">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Subscription starts on 2026/01/25. Cancel anytime from your account settings.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function UpgradePage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <UpgradeContent />
    </Suspense>
  );
}
