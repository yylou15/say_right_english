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
        <p className="text-slate-500 mb-8">Last updated: 2026.01.26</p>

        <div className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your access to and use of the services, websites, and applications (collectively, the &quot;Service&quot;) provided by BizEnglish AI (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
            </p>
            <p className="mt-4">
              By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Eligibility</h2>
            <p>
              You must be at least 18 years old to use the Service. By using the Service, you represent that you have the legal capacity to enter into these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Description of the Service</h2>
            <p>
              We provide a web-based software application that offers digital tools and features, including but not limited to AI-powered functionality, educational content, and subscription-based access to premium services.
            </p>
            <p className="mt-2">
              The Service is provided online only. No physical goods are sold.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Accounts</h2>
            <p>
              To access certain features, you may be required to create an account. You are responsible for:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
            </ul>
            <p className="mt-2">
              We reserve the right to suspend or terminate accounts that violate these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Subscriptions and Payments</h2>
            <p>
              Some parts of the Service are offered on a paid subscription or one-time purchase basis.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Prices, billing cycles, and payment terms are displayed at the time of purchase</li>
              <li>Payments are processed by third-party payment providers</li>
              <li>We do not store your full payment information</li>
              <li>Unless otherwise stated, payments are <strong>non-refundable</strong>, except where required by law.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Free Trials</h2>
            <p>
              If a free trial is offered, it may automatically convert into a paid subscription unless canceled before the trial period ends. You are responsible for managing your subscription.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Use the Service for any illegal or unauthorized purpose</li>
              <li>Attempt to interfere with or disrupt the Service</li>
              <li>Reverse engineer, copy, or resell the Service without permission</li>
              <li>Abuse, misuse, or attempt to exploit the Service or its systems</li>
            </ul>
            <p className="mt-2">
              We reserve the right to investigate and take appropriate action for violations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Intellectual Property</h2>
            <p>
              All content, software, and materials provided through the Service are owned by or licensed to us and are protected by applicable intellectual property laws.
            </p>
            <p className="mt-2">
              You are granted a limited, non-exclusive, non-transferable license to use the Service for personal or internal business purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. User Content</h2>
            <p>
              You may submit content to the Service (&quot;User Content&quot;). You retain ownership of your User Content but grant us a limited license to process and display it as necessary to provide the Service.
            </p>
            <p className="mt-2">
              You are responsible for ensuring that your User Content does not violate any laws or third-party rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. AI and Automated Features Disclaimer</h2>
            <p>
              The Service may include AI-generated outputs. These outputs are provided for informational and educational purposes only and may not always be accurate.
            </p>
            <p className="mt-2">You acknowledge that:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>AI-generated results may contain errors</li>
              <li>You remain responsible for how you use any output</li>
              <li>We do not guarantee specific outcomes or results</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Service Availability</h2>
            <p>
              We strive to keep the Service available but do not guarantee uninterrupted or error-free operation. The Service may be modified, suspended, or discontinued at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Termination</h2>
            <p>
              We may suspend or terminate your access to the Service at our discretion, including for violation of these Terms.
            </p>
            <p className="mt-2">
              You may stop using the Service at any time. Subscription cancellations take effect according to the billing terms presented at purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Disclaimer of Warranties</h2>
            <p>
              The Service is provided &quot;as is&quot; and &quot;as available&quot;, without warranties of any kind, express or implied.
            </p>
            <p className="mt-2">
              We do not warrant that the Service will be accurate, reliable, or meet your requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages arising out of or related to your use of the Service.
            </p>
            <p className="mt-2">
              Our total liability shall not exceed the amount paid by you for the Service in the twelve (12) months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">14. Indemnification</h2>
            <p>
              You agree to indemnify and hold us harmless from any claims, damages, or expenses arising out of your use of the Service or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">15. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the applicable jurisdiction, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">16. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. The updated version will be posted on this page with a revised &quot;Last updated&quot; date.
            </p>
            <p className="mt-2">
              Continued use of the Service after changes become effective constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">17. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mt-2 font-semibold text-indigo-600">
              Email: louyuanyang@outlook.com
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-12">
        <div className="w-[1000px] mx-auto flex justify-between items-center opacity-60 text-sm font-medium">
          <p>© 2026 BizEnglish AI Assistant. All rights reserved.</p>
          <div className="flex space-x-10">
            <span className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => router.push('/privacy')}>Privacy Policy</span>
            <span className="text-indigo-600 font-bold">Terms of Service</span>
            <span className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => router.push('/contact')}>Contact Us</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
