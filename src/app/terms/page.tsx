import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | Matrix Multi-Tech Real Estate',
    description: 'Terms of Service for Matrix Multi-Tech Real Estate website and services.',
    other: {
        'tiktok-developers-site-verification': 'pvXJfDDsEfJqZtB82xyU9DHQlPOb9Sx0',
    },
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <div className="max-w-4xl mx-auto px-6 py-16">
                <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
                <p className="text-gray-400 mb-8">Last updated: February 2026</p>

                <div className="space-y-8 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using the Matrix Multi-Tech Real Estate website (matrixmultitech.net),
                            you accept and agree to be bound by the terms and provisions of this agreement.
                            If you do not agree to these terms, please do not use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Services</h2>
                        <p>
                            Matrix Multi-Tech Real Estate provides a platform for browsing real estate listings,
                            scheduling property viewings, and connecting with real estate professionals.
                            We may also provide social media integration features for sharing property content.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">3. User Accounts</h2>
                        <p>
                            Some features of our service may require you to create an account or connect
                            third-party accounts (such as TikTok or Instagram). You are responsible for
                            maintaining the confidentiality of your account credentials and for all activities
                            that occur under your account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Property Listings</h2>
                        <p>
                            All property listings are provided for informational purposes. While we strive
                            for accuracy, we do not guarantee the completeness or accuracy of listing information.
                            Property availability, pricing, and features should be verified directly with our agents.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Social Media Features</h2>
                        <p>
                            Our platform may allow you to share content to social media platforms. By using
                            these features, you agree to comply with the respective platform&apos;s terms of service.
                            We are not responsible for content once it is published to third-party platforms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">6. Intellectual Property</h2>
                        <p>
                            All content on this website, including text, graphics, logos, images, and software,
                            is the property of Matrix Multi-Tech Real Estate and is protected by copyright laws.
                            You may not reproduce, distribute, or create derivative works without our written permission.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">7. Limitation of Liability</h2>
                        <p>
                            Matrix Multi-Tech Real Estate shall not be liable for any indirect, incidental,
                            special, consequential, or punitive damages resulting from your use of or inability
                            to use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">8. Changes to Terms</h2>
                        <p>
                            We reserve the right to modify these terms at any time. Changes will be effective
                            immediately upon posting to the website. Your continued use of the service
                            constitutes acceptance of the modified terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">9. Contact Information</h2>
                        <p>
                            For questions about these Terms of Service, please contact us at:<br />
                            <strong className="text-[#D9DE00]">Matrix Multi-Tech Real Estate</strong><br />
                            Email: info@matrixmultitech.net
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
