import React, { useState, useEffect } from 'react';
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import AboutUs1 from "../assets/AboutUs1.jpg";
import AboutUs2 from "../assets/AboutUs2.jpg";
import AboutUs3 from "../assets/AboutUs3.jpeg";
import AboutUs4 from "../assets/AboutUs4.jpg"

const images = [AboutUs1, AboutUs2, AboutUs3, AboutUs4];

const AboutUs = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-brown to-olive text-white pt-8">
            <Header />
            <h1 className="text-4xl font-bold text-white mt-[100px] text-center mb-12">About Us</h1>

            <div className="flex flex-col md:flex-row justify-center items-center gap-12 px-6 md:px-20">
                {/* Left: About Text */}
                <div className="max-w-xl text-olive leading-relaxed text-center md:text-left">
                    <p className="mb-6">
                        Welcome to <span className="font-semibold text-creme">AadhyatmaSetu</span>, your sacred space for spiritual growth and self-discovery.
                        Rooted in the timeless wisdom of Hindu scriptures, we aim to bridge ancient teachings with modern life.
                    </p>
                    <p className="mb-6">
                        Our platform offers access to spiritual books, guided meditations, lectures, personalized AI-powered Gita wisdom,
                        and tools that empower you on your journey towards inner peace and higher consciousness.
                    </p>
                    <p className="mb-6">
                        Whether you're a seeker of knowledge, a practitioner of yoga, or someone looking to explore deeper meanings in life,
                        we’re here to support and inspire you every step of the way.
                    </p>
                    <p className="mb-6">
                        Thank you for being a part of this journey with us. Let’s walk the path of dharma together.
                    </p>
                    <p className="text-sm italic text-white">— The AadhyatmaSetu Team</p>
                </div>

                <div className="w-full md:w-[400px] h-[300px] relative overflow-hidden rounded-xl shadow-lg">
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Slide ${index}`}
                            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
                        />
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AboutUs;
