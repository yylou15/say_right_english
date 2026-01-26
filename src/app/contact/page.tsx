"use client";

import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';

export default function ContactPage() {
  const router = useRouter();

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200 px-12 py-4 flex justify-between items-center min-w-[1280px]">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push('/')}>
          <Icon icon="heroicons:sparkles-20-solid" className="text-indigo-600 text-2xl" />
          <span className="font-bold text-xl tracking-tight text-slate-800">BizEnglish AI</span>
        </div>
        <div className="flex items-center space-x-6">
            <button 
            onClick={() => router.push('/')}
            className="text-slate-500 hover:text-indigo-600 font-medium text-sm transition-colors"
            >
            Back to Home
            </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-12 w-[1000px] mx-auto min-h-[calc(100vh-200px)]">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Contact Us</h1>
        
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-200">
          <div className="flex flex-col items-center justify-center space-y-6 text-center py-10">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
              <Icon icon="heroicons:envelope" className="text-indigo-600 text-4xl" />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900">Get in Touch</h2>
            <p className="text-slate-500 max-w-md mx-auto">
              Have questions about our service, subscription plans, or need technical support? We're here to help!
            </p>
            
            <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 w-full max-w-md">
              <p className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-2">Email Support</p>
              <a 
                href="mailto:louyuanyang@outlook.com" 
                className="text-xl font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition-all flex items-center justify-center"
              >
                louyuanyang@outlook.com
                <Icon icon="heroicons:arrow-top-right-on-square-20-solid" className="ml-2 text-base" />
              </a>
            </div>

            <p className="text-sm text-slate-400 mt-8">
              We aim to respond to all inquiries within 24-48 business hours.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-12">
        <div className="w-[1000px] mx-auto flex justify-between items-center opacity-60 text-sm font-medium">
          <p>© 2026 BizEnglish AI Assistant. All rights reserved.</p>
          <div className="flex space-x-10">
            <span className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => router.push('/privacy')}>Privacy Policy</span>
            <span className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => router.push('/terms')}>Terms of Service</span>
            <span className="text-indigo-600 font-bold">Contact Us</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
