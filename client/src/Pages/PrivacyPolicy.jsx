import React from 'react';
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const PrivacyPolicy = () => {
    return (
        <div className="bg-gradient-to-b from-white to-creme min-h-screen text-brown">
            <Header />
            <div className="max-w-4xl mx-auto px-6 mt-12 py-20">
                <h1 className="text-4xl font-bold text-[#482B19] mb-6 text-center">Privacy Policy</h1>

                <p className="mb-4">
                    At <span className="font-semibold text-[#6D4C41]">AadhyatmaSetu</span>, your privacy is very important to us. This Privacy Policy explains what information we collect, how we use it, and how we protect it.
                </p>

                <h2 className="text-2xl font-semibold text-[#6D4C41] mt-8 mb-2">1. Information We Collect</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>Personal details like your name, email address, and password when you register.</li>
                    <li>Feedback, messages, or other information you share via forms or chatbot.</li>
                    <li>Usage data, such as pages visited, search queries, and preferences.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-[#6D4C41] mt-8 mb-2">2. How We Use Your Information</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>To personalize your spiritual experience.</li>
                    <li>To provide access to content like books, podcasts, and meditation sessions.</li>
                    <li>To improve our services and support.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-[#6D4C41] mt-8 mb-2">3. How We Protect Your Data</h2>
                <p className="mb-4">
                    We use secure technologies and follow best practices to protect your personal information. Your data is never shared or sold to third parties without your consent.
                </p>

                <h2 className="text-2xl font-semibold text-[#6D4C41] mt-8 mb-2">4. Third-Party Services</h2>
                <p className="mb-4">
                    We may use trusted third-party services like Google Books API or OpenAI for content delivery. These services may collect limited data according to their own privacy policies.
                </p>

                <h2 className="text-2xl font-semibold text-[#6D4C41] mt-8 mb-2">5. Your Rights</h2>
                <p className="mb-4">
                    You have the right to access, update, or delete your personal data. You can send feedback on our <span className="underline">Feedback section</span>.
                </p>

                <h2 className="text-2xl font-semibold text-[#6D4C41] mt-8 mb-2">6. Changes to This Policy</h2>
                <p className="mb-4">
                    We may update this policy from time to time. We'll notify you of any major changes via email or on our platform.
                </p>

                <p className="mt-8 italic text-sm text-[#7B5E57]">
                    Last updated: April 2025
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
