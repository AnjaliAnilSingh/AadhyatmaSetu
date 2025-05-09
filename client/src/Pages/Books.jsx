import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/features/auth/authSlice';
import toast from 'react-hot-toast';

const SpiritualBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const user = useSelector(selectUser);
  const token = localStorage.getItem('authToken');
  const API_KEY = 'AIzaSyBSd3Q00c8Wx4PB_Fyyw7YbdQoNi07zPNQ';

  const fetchSpiritualBooks = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=Hindu+spiritual+scriptures&maxResults=24&orderBy=relevance&filter=partial&key=${API_KEY}`
      );
      const bookData = response.data.items.map((item) => {
        const info = item.volumeInfo;
        return {
          id: item.id,
          title: info.title || 'Unknown Title',
          description: info.description || 'No description available.',
          image: info.imageLinks?.thumbnail || 'https://via.placeholder.com/150',
          previewLink: info.previewLink || '#',
        };
      });
      setBooks(bookData);
      setFilteredBooks(bookData);
      setLoading(false);
    } catch (error) {
      setError('Error fetching books. Please try again later.');
      setLoading(false);
    }
  };


  const fetchFavorites = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/favorites/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavorites(response.data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  useEffect(() => {
    fetchSpiritualBooks();
    if (user._id) {
      fetchFavorites();
    }
  }, [user]);

  useEffect(() => {
    const results = books.filter(book =>
      book.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBooks(results);
  }, [search, books]);

  const handleFavoriteToggle = async (book) => {
    if (!user._id) return alert("Please log in to save favorites.");

    try {
      const isFavorite = favorites.some(fav => fav.itemId === book.id);

      if (isFavorite) {
        await axios.delete(`http://localhost:5000/api/v1/favorites/${book.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavorites(favorites.filter(fav => fav.itemId !== book.id));
      } else {
        await axios.post("http://localhost:5000/api/v1/favorites", {
          userId: user._id,
          bookId: book.id,
          bookTitle: book.title,
          type: 'book',
          bookImage: book.image,
          bookDescription: book.description,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavorites([...favorites, { itemId: book.id, itemName: book.title }]);
        toast.success("Book added to favourites!");
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (loading) return <p className="text-center text-[#482B19]">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-brown to-olive text-white pt-8 px-8">
      <Header />
      <h1 className="text-4xl font-bold text-center mt-[100px] mb-6">Spiritual Hindu Scriptures & Books</h1>

      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder="Search for a book..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-olive"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            onClick={() => window.open(book.previewLink, '_blank')}
            className="bg-olive rounded-lg shadow-lg overflow-hidden pb-4 transition-transform transform hover:scale-105 relative cursor-pointer"
          >
            <img src={book.image} alt={book.title} className="w-full h-60 object-cover rounded" />
            <div className="mt-4 px-4">
              <h2 className="text-xl font-semibold text-[#482B19]">{book.title}</h2>
              <p className="text-[#6D4C41] mt-2 line-clamp-3">{book.description}</p>
            </div>

            {user._id && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavoriteToggle(book);
                }}
                className="absolute top-2 right-2 text-2xl text-white"
              >
                {favorites.some(fav => fav.itemId === book.id) ? (
                  <AiFillHeart className="text-red-500" />
                ) : (
                  <AiOutlineHeart />
                )}
              </button>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default SpiritualBooksPage;
