"use client";

import { Icon } from '@iconify/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense, useEffect } from 'react';
import Script from 'next/script';
import { upgradeToPro, getIsPro } from '../../lib/auth';

function UpgradeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const [selectedPlan, setSelectedPlan] = useState('annual');
  const [paddle, setPaddle] = useState<any>(null);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    setIsPro(getIsPro());
  }, []);

  useEffect(() => {
    // Check if Paddle is already loaded globally (e.g. from previous navigation)
    // @ts-ignore
    if (typeof window !== 'undefined' && typeof window.Paddle !== 'undefined' && !paddle) {
      // @ts-ignore
      initPaddle(window.Paddle);
    }
  }, [paddle]);

  const initPaddle = (paddleInstance: any) => {
    try {
       const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
       if (!token) {
         console.error("Paddle Client Token is missing in environment variables");
         return;
       }
       
       // Configure environment if not already configured (check if we can/should)
       // Note: set('sandbox') is safe to call multiple times usually
       paddleInstance.Environment.set('sandbox');
       
       paddleInstance.Initialize({ 
         token: token,
         eventCallback: function(data: any) {
            console.log('Paddle event:', data);
         }
       });
       
       setPaddle(paddleInstance);
       console.log("Paddle initialized successfully via useEffect/onLoad");
     } catch (e) {
       console.error("Paddle initialization failed:", e);
     }
  };

  const handleUpgrade = () => {
    if (isPro) return;

    // @ts-ignore
    const paddleInstance = paddle || window.Paddle;

    if (!paddleInstance) {
      console.error("Paddle not initialized");
      return;
    }

    const priceId = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_ONE_TIME;

    if (!priceId) {
      alert("Price ID not configured");
      return;
    }

    const userEmail = localStorage.getItem("email");
    const checkoutOptions: any = {
      items: [{ priceId: priceId, quantity: 1 }],
      settings: {
        successUrl: window.location.origin + '/scenarios',
      },
    };

    if (userEmail) {
      checkoutOptions.customer = {
        email: userEmail
      };
      checkoutOptions.customData = {
        email: userEmail // Pass in customData for easier retrieval in webhooks if needed
      };
    }

    paddleInstance.Checkout.open(checkoutOptions);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6 antialiased font-sans flex items-center justify-center relative">
      <nav className="absolute top-6 left-6 cursor-pointer group" onClick={() => router.push(from || '/scenarios')}>
        <div className="flex items-center space-x-2 text-slate-500 group-hover:text-indigo-600 transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
          <Icon icon="heroicons:arrow-left-20-solid" className="text-lg" />
          <span className="font-bold text-sm">Back</span>
        </div>
      </nav>
      <Script 
        src="https://cdn.paddle.com/paddle/v2/paddle.js" 
        onLoad={() => {
          // @ts-ignore
          if (typeof Paddle !== 'undefined') {
             // @ts-ignore
             initPaddle(Paddle);
          }
        }}
      />
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
                <span className="text-slate-400 text-sm font-medium">Upgrade Your Career</span>
              </div>
              <section className="space-y-4">
                {/* One-time Plan */}
                <label className="relative block cursor-pointer group">
                  <input 
                    type="radio" 
                    name="plan" 
                    value="lifetime" 
                    className="peer sr-only" 
                    checked={true}
                    readOnly
                  />
                  <div className="p-6 border-2 border-slate-200 bg-white rounded-2xl transition-all peer-checked:border-indigo-600 peer-checked:ring-4 peer-checked:ring-indigo-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">Lifetime Access</h3>
                        <p className="text-slate-400 text-xs mt-1">One-time payment</p>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-black text-slate-900">$10</span>
                        <p className="text-slate-400 text-xs">once</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-3 left-4 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">Best Value</div>
                </label>
              </section>
            </div>

            {/* CTA */}
            <div className="mt-12 space-y-6">
              <button 
                onClick={handleUpgrade}
                disabled={isPro}
                className={`w-full py-5 rounded-2xl font-bold text-lg shadow-2xl transition-all ${
                  isPro 
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' 
                    : 'bg-slate-900 text-white hover:bg-indigo-600 active:scale-[0.98]'
                }`}
              >
                {isPro ? 'Plan Active' : 'Get Lifetime Access'}
              </button>
              <div className="text-center">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Secure payment via Paddle. 30-day money-back guarantee.
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
