"use client";

import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';

export default function TermsPage() {
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
      <main className="pt-32 pb-20 px-12 w-[1000px] mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Terms of Service</h1>
        <p className="text-slate-500 mb-8">Last updated: January 26, 2026</p>

        <div className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the BizEnglish AI Assistant service ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Description of Service</h2>
            <p>
              BizEnglish AI Assistant provides AI-powered professional English expression templates and communication assistance for business professionals. We reserve the right to modify, suspend, or discontinue the Service at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. User Accounts</h2>
            <p>
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Subscriptions and Payments</h2>
            <p>
              Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring and periodic basis ("Billing Cycle").
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>
                    <strong>Payment Processing:</strong> We use third-party payment processors (e.g., Stripe) to handle payment transactions. By making a purchase, you authorize us to share your payment information with these processors to complete the transaction.
                </li>
                <li>
                    <strong>Cancellation:</strong> You may cancel your Subscription renewal either through your account management page or by contacting our customer support team.
                </li>
                <li>
                    <strong>Refunds:</strong> Certain refund requests for Subscriptions may be considered by BizEnglish AI on a case-by-case basis and granted at the sole discretion of BizEnglish AI.
                </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of BizEnglish AI and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Termination</h2>
            <p>
              We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Limitation of Liability</h2>
            <p>
              In no event shall BizEnglish AI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Changes</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at support@bizenglish.ai.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-12">
        <div className="w-[1000px] mx-auto flex justify-between items-center opacity-60 text-sm font-medium">
          <p>© 2026 BizEnglish AI Assistant. All rights reserved.</p>
          <div className="flex space-x-10">
            <span className="cursor-pointer hover:text-indigo-600 transition-colors">Privacy Policy</span>
            <span className="text-indigo-600 font-bold">Terms of Service</span>
            <span className="cursor-pointer hover:text-indigo-600 transition-colors">Contact Us</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
