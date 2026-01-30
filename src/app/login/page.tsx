"use client";

import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { login, sendCode, verifyCode } from '../../lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleSendCode = async () => {
    if (!email || cooldown > 0) return;
    setLoading(true);
    setError('');
    try {
      await sendCode(email);
      setStep('code');
      setCooldown(60);
    } catch (err: any) {
      setError(err.message);
      if (typeof err.retryAfter === 'number' && err.retryAfter > 0) {
        setCooldown(err.retryAfter);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!code) return;
    setLoading(true);
    setError('');
    try {
      await verifyCode(email, code);
      login(email);
      router.push('/scenarios');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans">
      {/* Navigation (Simplified for Login) */}
      <nav className="w-full bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center shrink-0">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push('/')}>
          <Icon icon="heroicons:bolt-solid" className="text-indigo-600 text-2xl" />
          <span className="font-bold text-xl tracking-tight text-slate-800">SayRight</span>
        </div>
        <span className="text-sm font-medium text-slate-500">v2026.01.25</span>
      </nav>

      <main className="flex-1 flex items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-slate-50 to-white">
        {/* Login Card */}
        <div className="w-full max-w-[1000px] bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl flex overflow-hidden relative min-h-[600px] animate-content">
          {/* Left Side: Branding & Visual */}
          <div className="hidden lg:flex w-1/2 bg-slate-900 p-12 flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-8">
                <Icon icon="heroicons:bolt-solid" className="text-white text-2xl" />
              </div>
              <h2 className="text-4xl font-bold text-white leading-tight">Boost Your<br /><span className="text-indigo-400">Workplace English</span></h2>
              <p className="text-slate-400 mt-6 text-lg leading-relaxed">No more tension in international meetings. Professional templates to help you communicate with confidence in any business scenario.</p>
            </div>
            <div className="relative z-10 flex items-center space-x-4 text-slate-400 text-sm">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700"></div>
                <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-indigo-600"></div>
                <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-500"></div>
              </div>
              <span>Joined by 5,000+ professionals</span>
            </div>
            {/* Decor */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
          </div>

          {/* Right Side: Login Form */}
          <div className="flex-1 p-10 md:p-16 flex flex-col justify-center relative">
            <div className="max-w-[360px] mx-auto w-full">
              <div className="mb-10">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h1>
                <p className="text-slate-500 mt-2 font-medium">Enter your email to receive a login link</p>
              </div>
              
              {/* Form Section */}
              <div className="space-y-6">
                {step === 'email' ? (
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
                    <div className="relative">
                      <input 
                        type="email" 
                        placeholder="name@company.com" 
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all placeholder:text-slate-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Icon icon="heroicons:envelope" className="absolute right-5 top-4.5 text-slate-300 text-xl" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Verification Code</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="123456" 
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all placeholder:text-slate-300"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                      />
                      <Icon icon="heroicons:key" className="absolute right-5 top-4.5 text-slate-300 text-xl" />
                    </div>
                  </div>
                )}

                {error && <p className="text-red-500 text-sm font-medium ml-1">{error}</p>}

                <button 
                  onClick={step === 'email' ? handleSendCode : handleVerify}
                  disabled={loading || (step === 'email' && cooldown > 0)}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-base shadow-xl shadow-slate-200 hover:bg-indigo-600 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span>Processing...</span>
                  ) : (
                    <>
                      <span>
                        {step === 'email'
                          ? cooldown > 0
                            ? `Resend in ${cooldown}s`
                            : 'Get Login Code'
                          : 'Verify & Login'}
                      </span>
                      <Icon icon="heroicons:arrow-right-20-solid" className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              {/* Hint Section */}
              <div className="mt-10">
                <div className="flex items-start space-x-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <Icon icon="heroicons:information-circle-solid" className="text-indigo-500 mt-0.5 text-lg" />
                  <p className="text-xs text-slate-500 leading-relaxed">
                    We don&apos;t send marketing emails. A secure code will be sent to your inbox, no password required.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Meta */}
      <footer className="h-24 flex flex-col items-center justify-center px-8 shrink-0 border-t border-slate-50">
        <p className="text-[10px] text-slate-400 mb-2">Empowering global professionals @ 2026.01.25</p>
        <div className="flex space-x-4 text-[10px] font-bold text-slate-300">
          <a href="/upgrade" className="hover:text-slate-500 transition-colors">Pricing</a>
          <span className="select-none">•</span>
          <a href="/privacy" className="hover:text-slate-500 transition-colors">Privacy Policy</a>
          <span className="select-none">•</span>
          <a href="/terms" className="hover:text-slate-500 transition-colors">Terms of Service</a>
          <span className="select-none">•</span>
          <a href="/contact" className="hover:text-slate-500 transition-colors">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}
