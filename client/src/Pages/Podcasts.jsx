import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const PodcastCard = ({ title, duration, views, videoId }) => {
  return (
    <div className="bg-olive rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-105">
      <iframe
        className="w-full h-40"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allowFullScreen
      ></iframe>

      <div className="p-4 text-white">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className="flex justify-between text-sm">
          <span>{views}</span>
          <span>{duration}</span>
        </div>
      </div>
    </div>
  );
};

const Podcasts = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const podcasts = [
    {
      videoId: "xCtMcg9kSdI",
      title: "Overcome Fear, Anger & Anxiety!",
      duration: "20:36",
      views: "870K+ VIEWS",
    },
    {
      videoId: "T1n1ojsOIEs",
      title: "How To Never Lose Focus",
      duration: "17:03",
      views: "225K+ VIEWS",
    },
    {
      videoId: "iKcaIxm55AQ",
      title: "REAL Purpose Of Spiritual Life",
      duration: "1:41:56",
      views: "1.9M+ VIEWS",
    },
    {
      videoId: "oGyXFehv_iM",
      title: "Spiritual Healing and Mind Mastery",
      duration: "2:14:54",
      views: "5M+ VIEWS",
    },
    {
      videoId: "4ZQkYSpmOdU",
      title: "How Do We Handle Hard Times in Life?",
      duration: "11:48",
      views: "9.8M+ VIEWS",
    },
    {
      videoId: "2QmfG06ZEcQ",
      title: "ASLI Gita Gyaan",
      duration: "1:26:23",
      views: "1.5M+ VIEWS",
    },
    {
      videoId: "6b0yyYw96M8",
      title: "Finding Spiritual Balance In Your Life",
      duration: "1:48:59",
      views: "34K+ VIEWS",
    },
    {
      videoId: "l0rYsD7YbKs",
      title: "5 Tips To Add Spirituality In Your Busy Life",
      duration: "2:32",
      views: "68K+ VIEWS",
    },
    {
      videoId: "zCT3wcoZ9ds",
      title: "How to Stop Overthinking?",
      duration: "10:16",
      views: "6M+ VIEWS",
    },
    {
      videoId: "rkWbKSn71vo",
      title: "Want To Heal Your Emotional Pain?",
      duration: "11:23",
      views: "2.6M+ VIEWS",
    },
    {
      videoId: "GmnIGdoxGBs",
      title: "19 Minutes Will Change Your Life Forever ",
      duration: "19:07",
      views: "1.6M+ VIEWS",
    },
    {
      videoId: "xzI5-U4S6AE",
      title: "When Nothing Seems to Go Your Way and You See No HOPE",
      duration: "2:15",
      views: "2.9M+ VIEWS",
    },
  ];

  const filteredPodcasts = podcasts.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-brown to-olive text-white pt-8 px-8">
        <h2 className="text-4xl font-bold text-center mb-8 mt-[100px]">Podcasts</h2>
        <div className="max-w-md mx-auto mb-10">
          <input
            type="text"
            placeholder="Search podcasts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-olive"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPodcasts.length > 0 ? (
            filteredPodcasts.map((podcast, index) => (
              <PodcastCard key={index} {...podcast} />
            ))
          ) : (
            <p className="text-center col-span-full text-lg text-[#FFEEDD]">No matching podcasts found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Podcasts;
