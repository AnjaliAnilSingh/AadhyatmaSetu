import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Diya from "../assets/Diya.jpg";
import TulsiMala from "../assets/TulsiMala.jpg";
import GitaStand from "../assets/GitaStand.jpg";
import TulsiKanthiMala from "../assets/TulsiKanthiMala.jpg";
import RudrakshaMala from "../assets/RudrakshaMala.jpg";
import MorPankh from "../assets/MorPankh.jpg";
import JapaBag from "../assets/JapaBag.jpg";
import IncenseStick from "../assets/IncenseStick.jpg";
import BhagavadGitaBook from "../assets/BhagavadGitaBook.jpg";
import MahabharatBook from "../assets/MahabharatBook.jpg";
import RamayanBook from "../assets/RamayanBook.jpg";
import Ramcharitmanas from "../assets/Ramcharitmanas.jpg"

const products = [
    { id: 1, name: "Tulsi Japa Mala", image: TulsiMala, link: "https://www.amazon.in/s?k=tulsi+japa+mala" },
    { id: 2, name: "Gita Stand", image: GitaStand, link: "https://www.amazon.in/s?k=gita+stand" },
    { id: 3, name: "Tulsi Kanthi Mala", image: TulsiKanthiMala, link: "https://www.amazon.in/s?k=tulsi+kanthi+mala" },
    { id: 4, name: "Rudraksha Mala", image: RudrakshaMala, link: "https://www.amazon.in/s?k=rudraksha+mala" },
    { id: 5, name: "Mor Pankh", image: MorPankh, link: "https://www.amazon.in/s?k=mor+pankh" },
    { id: 6, name: "Japa Bag", image: JapaBag, link: "https://www.amazon.in/s?k=japa+bag" },
    { id: 7, name: "Diya", image: Diya, link: "https://www.amazon.in/s?k=diya+lamp" },
    { id: 8, name: "Incense Sticks", image: IncenseStick, link: "https://www.amazon.in/s?k=incense+sticks" },
    { id: 9, name: "Shrimad Bhagavad Gita", image: BhagavadGitaBook, link: "https://www.amazon.in/Bhagavad-Gita-Hindi-Books-Worlds/dp/B08BK672GF" },
    { id: 10, name: "Mahabharat Book", image: MahabharatBook, link: "https://www.amazon.in/Mahabharat-Hindi-Anuwad-Sahit-Bhag-1-ebook/dp/B07DMJD8R5" },
    { id: 11, name: "Ramayan Book", image: RamayanBook, link: "https://www.amazon.in/Shri-Ramayana-Hindi-M-Rajasve/dp/9354405894" },
    { id: 12, name: "Shri Ram Charitmanas", image: Ramcharitmanas, link: "https://www.amazon.in/gorakhpur-ramcharitmanas-Tulsidas-Ramcharitmanas-Hardcover/dp/B09BD6P7M3/ref=pd_lpo_d_sccl_1/259-1574086-7768710?pd_rd_w=CLmO7&content-id=amzn1.sym.e0c8139c-1aa1-443c-af8a-145a0481f27c&pf_rd_p=e0c8139c-1aa1-443c-af8a-145a0481f27c&pf_rd_r=MSY0FV1WNTY6HHKD6F8M&pd_rd_wg=ywYsw&pd_rd_r=b7fd09e8-d881-45e5-8829-fa0ff318012f&pd_rd_i=B09BD6P7M3&psc=1" },
];

const Requisites = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-brown to-olive text-white pt-8 px-8">
            <Header />
            <h1 className="text-4xl font-bold text-center text-white mt-[100px] mb-6">Requisites</h1>

            {/* 🔍 Search Bar */}
            <div className="max-w-md mx-auto mb-12">
                <input
                    type="text"
                    placeholder="Search for an item..."
                    className="w-full max-w-md px-4 py-2 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-olive"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* 🛍 Product Grid */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <a
                            key={product.id}
                            href={product.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-olive rounded-2xl shadow-xl hover:scale-105 transition-transform hover:shadow-2xl p-4 flex flex-col items-center text-center"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-40 w-40 object-cover rounded-xl mb-4"
                            />
                            <h2 className="text-xl font-semibold text-brown">{product.name}</h2>
                        </a>
                    ))
                ) : (
                    <p className="text-center col-span-full text-lg text-yellow-100">No items found.</p>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Requisites;
