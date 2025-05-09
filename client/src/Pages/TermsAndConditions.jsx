import React from 'react';
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const TermsAndConditions = () => {
    return (
        <div className="bg-gradient-to-b from-white to-creme min-h-screen text-brown">
            <Header />
            <div className="max-w-5xl mx-auto px-6 mt-12 py-20">
                <h1 className="text-4xl font-bold text-center mb-10 text-olive">Terms & Conditions</h1>

                <div className="space-y-8 text-lg leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
                        <p>
                            Welcome to <span className="font-semibold">AadhyatmaSetu</span>. These Terms and Conditions govern your use of our website and services.
                            By accessing or using our platform, you agree to comply with and be bound by these terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-2">2. User Responsibilities</h2>
                        <p>
                            You agree to use this website in a lawful manner. You must not use the website in a way that may impair its performance, corrupt the content,
                            or reduce its overall functionality.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-2">3. Intellectual Property</h2>
                        <p>
                            All content on this site including text, graphics, logos, and multimedia is the property of AadhyatmaSetu and is protected by applicable copyright and trademark laws.
                            You may not reproduce or distribute any content without permission.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-2">4. Third-Party Links</h2>
                        <p>
                            Our platform may include links to third-party websites. We are not responsible for the content, terms, or policies of any external sites.
                            Use them at your own discretion.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-2">5. Account & Security</h2>
                        <p>
                            If you register an account, you are responsible for maintaining its confidentiality. Notify us immediately if you suspect unauthorized activity.
                            We reserve the right to disable accounts for violations.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-2">6. Termination</h2>
                        <p>
                            We reserve the right to suspend or terminate your access to our services if you breach these terms or engage in harmful behavior.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-2">7. Changes to Terms</h2>
                        <p>
                            AadhyatmaSetu reserves the right to modify these terms at any time. We recommend reviewing this page regularly to stay informed of updates.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
                        <p>
                            If you have any questions or concerns regarding these Terms and Conditions, please contact us at <span className="underline">aadhyatmasetu@gmail.com</span>.
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TermsAndConditions;
