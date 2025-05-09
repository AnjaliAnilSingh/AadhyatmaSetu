import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import Homebg from "../assets/Homebg.jpg";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import Slogan from "../Components/Slogan";
import TrendingBook from "../Components/TrendingBook";
import PodcastSection from "../Components/PodcastSection";
import MusicSection from '../Components/SongSection';
import Footer from "../Components/Footer"


function LandingPage() {
    const navigate = useNavigate(); 

    return (
        <section id="home">
            <div className="relative h-screen w-screen">
                <div
                    className="absolute inset-0 opacity-90 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${Homebg})`, 
                    }}
                ></div>

                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-transparent"></div>
                <div className="relative z-10">
                    <Header />
                    <Hero/>
                    <Slogan/>
                    <TrendingBook/>
                    <PodcastSection/>
                    <MusicSection/>
                    <Footer/>
                </div>
            </div>
        </section>
    );
}

export default LandingPage;
