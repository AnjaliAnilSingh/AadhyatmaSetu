import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrendingBook = () => {
  const [book, setBook] = useState(null);
  const API_KEY = import.meta.env.VITE_GOOGLEBOOKS;

  const fetchTrendingBook = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=Mahabharata&maxResults=1&orderBy=relevance&key=${API_KEY}`
      );
      if (response.data.items && response.data.items.length > 0) {
        const bookData = response.data.items[0].volumeInfo;
        setBook({
          title: bookData.title || 'Unknown Title',
          description: bookData.description || 'No description available.',
          image: bookData.imageLinks?.thumbnail || 'https://via.placeholder.com/150',
          previewLink: bookData.previewLink || '#', // Link to read the book
        });
      }
    } catch (error) {
      console.error('Error fetching the book:', error);
    }
  };

  useEffect(() => {
    fetchTrendingBook();
  }, []);

  if (!book) {
    return <p className="text-center text-[#482B19]">Loading...</p>;
  }

  return (
    <div
      className="flex items-center bg-[#F5EDE2] rounded-lg shadow-lg p-4 max-w-xl mx-auto cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105"
      onClick={() => window.open(book.previewLink, '_blank')}
    >
      <img
        src={book.image}
        alt={book.title}
        className="h-32 w-32 rounded-lg object-cover"
      />
      <div className="ml-6">
        <h2 className="text-2xl font-bold text-[#482B19] uppercase mb-3">Trending Book</h2>
        <h3 className="text-2xl text-[#482B19]">{book.title}</h3>
        <p className="text-[#6D4C41] mt-2">{book.description}</p>
        <button
          className="mt-3 px-4 py-2 bg-[#8B5E3C] text-white rounded hover:bg-[#6D4C41] transition"
          onClick={(e) => {
            e.stopPropagation(); // Prevents triggering card click event
            window.open(book.previewLink, '_blank');
          }}
        >
          View Book
        </button>
      </div>
    </div>
  );
};

export default TrendingBook;
