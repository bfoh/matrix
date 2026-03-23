import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | Matrix Multi-Tech Real Estate',
    description: 'Privacy Policy for Matrix Multi-Tech Real Estate website and services.',
    other: {
        'tiktok-developers-site-verification': 'bd3NaOiMgLMti3LFmlLGFGyweCMLuza7',
    },
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <div className="max-w-4xl mx-auto px-6 py-16">
                <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
                <p className="text-gray-400 mb-8">Last updated: February 2026</p>

                <div className="space-y-8 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
                        <p className="mb-4">We collect information that you provide directly to us, including:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Name and contact information when scheduling viewings</li>
                            <li>Account information when connecting social media accounts</li>
                            <li>Communication preferences</li>
                            <li>Property inquiry details</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
                        <p className="mb-4">We use the information we collect to:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Provide and improve our real estate services</li>
                            <li>Process property viewing requests</li>
                            <li>Enable social media sharing features</li>
                            <li>Send you updates about properties you&apos;ve expressed interest in</li>
                            <li>Respond to your inquiries</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">3. Third-Party Services</h2>
                        <p>
                            Our platform integrates with third-party services including TikTok and Instagram
                            for social media features. When you connect these accounts, we access only the
                            permissions necessary to post content on your behalf. We do not access your
                            private messages, followers list, or other personal data beyond what is required
                            for the posting functionality.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
                        <p>
                            We implement appropriate security measures to protect your personal information.
                            Access tokens for connected social media accounts are stored securely and are
                            only used for the purposes you have authorized.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Data Retention</h2>
                        <p>
                            We retain your information only for as long as necessary to provide our services
                            or as required by law. You may request deletion of your data at any time by
                            contacting us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights</h2>
                        <p className="mb-4">You have the right to:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Access the personal information we hold about you</li>
                            <li>Request correction of inaccurate information</li>
                            <li>Request deletion of your personal information</li>
                            <li>Disconnect linked social media accounts at any time</li>
                            <li>Opt out of marketing communications</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">7. Cookies and Tracking</h2>
                        <p>
                            We use cookies and similar technologies to enhance your browsing experience
                            and analyze site usage. You can control cookie settings through your browser preferences.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">8. Children&apos;s Privacy</h2>
                        <p>
                            Our services are not intended for individuals under the age of 18.
                            We do not knowingly collect personal information from children.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">9. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy periodically. We will notify you of any
                            significant changes by posting the new policy on our website with an updated
                            effective date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">10. Contact Us</h2>
                        <p>
                            If you have questions about this Privacy Policy or your personal data, contact us at:<br />
                            <strong className="text-[#D9DE00]">Matrix Multi-Tech Real Estate</strong><br />
                            Email: privacy@matrixmultitech.net
                        </p>
                    </section>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800">
                    <a href="/" className="text-[#D9DE00] hover:underline">← Back to Home</a>
                </div>
            </div>
        </div>
    );
}
