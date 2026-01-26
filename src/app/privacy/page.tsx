"use client";

import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Privacy Policy</h1>
        <p className="text-slate-500 mb-8">Last updated: 2026.01.26</p>

        <div className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <p>
              This Privacy Policy describes how SayRight (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and protects your personal information when you use our website, applications, and services (collectively, the &quot;Service&quot;).
            </p>
            <p className="mt-4">
              By using the Service, you agree to the collection and use of information in accordance with this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
            <h3 className="text-xl font-bold text-slate-800 mb-2">1.1 Information You Provide</h3>
            <p>We may collect personal information that you voluntarily provide, including but not limited to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Email address</li>
              <li>Account login information</li>
              <li>Payment-related information (processed by third-party providers)</li>
              <li>Any content or information you submit while using the Service</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-800 mb-2 mt-6">1.2 Information Collected Automatically</h3>
            <p>When you use the Service, we may automatically collect certain information, such as:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>IP address</li>
              <li>Device type and browser information</li>
              <li>Usage data and interaction logs</li>
              <li>Cookies or similar tracking technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Provide, operate, and maintain the Service</li>
              <li>Create and manage user accounts</li>
              <li>Process payments and subscriptions</li>
              <li>Improve functionality and user experience</li>
              <li>Communicate with you regarding updates or support</li>
              <li>Ensure security and prevent fraud or abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Payments and Third-Party Processors</h2>
            <p>
              Payments for the Service are processed by third-party payment providers. We do not store full payment card details on our servers.
            </p>
            <p className="mt-2">
              Your payment information is handled in accordance with the privacy policies of the relevant payment processors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Cookies and Tracking Technologies</h2>
            <p>We may use cookies and similar technologies to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Enable essential site functionality</li>
              <li>Understand how users interact with the Service</li>
              <li>Improve performance and reliability</li>
            </ul>
            <p className="mt-2">
              You may disable cookies through your browser settings, but some features of the Service may not function properly as a result.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. AI and User Content</h2>
            <p>If the Service includes AI-powered features:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>User content may be processed by automated systems to provide functionality</li>
              <li>We do not use user content to identify individuals</li>
              <li>We do not claim ownership of user-submitted content</li>
              <li>Users are responsible for ensuring that submitted content complies with applicable laws and does not include sensitive personal data unless necessary for use of the Service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Data Sharing</h2>
            <p>We do not sell your personal information.</p>
            <p className="mt-2">We may share information only in the following circumstances:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>With service providers who help us operate the Service</li>
              <li>To comply with legal obligations or lawful requests</li>
              <li>To protect the rights, safety, and security of the Service and users</li>
            </ul>
            <p className="mt-2">All third-party partners are required to handle data responsibly.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Data Retention</h2>
            <p>
              We retain personal information only for as long as necessary to provide the Service, comply with legal obligations, and resolve disputes.
            </p>
            <p className="mt-2">
              You may request deletion of your account and associated data, subject to applicable legal requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Data Security</h2>
            <p>
              We implement reasonable technical and organizational measures to protect your information. However, no system is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. International Data Transfers</h2>
            <p>
              Your information may be processed and stored in different countries depending on the location of our service providers. By using the Service, you consent to such transfers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have rights to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Access your personal information</li>
              <li>Request correction or deletion</li>
              <li>Object to or restrict certain processing activities</li>
            </ul>
            <p className="mt-2">To exercise these rights, please contact us using the details below.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Children&apos;s Privacy</h2>
            <p>
              The Service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated &quot;Last updated&quot; date.
            </p>
            <p className="mt-2">
              Continued use of the Service after changes take effect constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
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
          <p>© 2026 SayRight. All rights reserved.</p>
          <div className="flex space-x-10">
            <span className="text-indigo-600 font-bold">Privacy Policy</span>
            <span className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => router.push('/terms')}>Terms of Service</span>
            <span className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => router.push('/contact')}>Contact Us</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
