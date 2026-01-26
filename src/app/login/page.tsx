"use client";

import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { login } from '../../lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    if (email) {
      login(email);
      router.push('/scenarios');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans">
      {/* Navigation (Simplified for Login) */}
      <nav className="w-full bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center shrink-0">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push('/')}>
          <Icon icon="heroicons:bolt-solid" className="text-indigo-600 text-2xl" />
          <span className="font-bold text-xl tracking-tight text-slate-800">BizEnglish AI</span>
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
                <button 
                  onClick={handleLogin}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-base shadow-xl shadow-slate-200 hover:bg-indigo-600 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 group"
                >
                  <span>Get Login Code</span>
                  <Icon icon="heroicons:arrow-right-20-solid" className="group-hover:translate-x-1 transition-transform" />
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
          <Link href="/privacy" className="hover:text-slate-500 transition-colors">Privacy Policy</Link>
          <span className="select-none">•</span>
          <Link href="/terms" className="hover:text-slate-500 transition-colors">Terms of Service</Link>
          <span className="select-none">•</span>
          <Link href="/contact" className="hover:text-slate-500 transition-colors">Contact Us</Link>
        </div>
      </footer>
    </div>
  );
}
