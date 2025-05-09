import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectUser } from "../redux/features/auth/authSlice";
import AadhyatmaSetuLogo from "../assets/AadhyatmaSetuLogo.png";
import { Link as RouterLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("authToken");
    setIsUserMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full px-6 flex items-center justify-between z-50 bg-white bg-opacity-5 backdrop-blur-lg shadow-lg border-b border-white/10">
      {/* Logo */}
      <div className="text-xl font-bold text-grey">
        <RouterLink to="/">
          <img
            src={AadhyatmaSetuLogo}
            alt="logo"
            className="h-[100px] w-[150px] ml-[40px]"
          />
        </RouterLink>
      </div>

      {/* Center Options (Desktop) */}
      <nav className="hidden md:flex space-x-8 relative ml-20">
        <RouterLink to="/aboutus" className="cursor-pointer text-creme font-semibold text-xl hover:text-olive hover:font-extrabold transition">
          ABOUT
        </RouterLink>
        <RouterLink to="/requisites" className="cursor-pointer text-creme font-semibold text-xl hover:text-olive hover:font-extrabold transition">
          REQUISITES
        </RouterLink>
        <RouterLink to="/books" className="cursor-pointer text-creme font-semibold text-xl hover:text-olive hover:font-extrabold transition">
          BOOKS
        </RouterLink>
        <RouterLink to="/podcasts" className="cursor-pointer text-creme font-semibold text-xl hover:text-olive hover:font-extrabold transition">
          PODCASTS
        </RouterLink>
        <RouterLink to="/songs" className="cursor-pointer text-creme font-semibold text-xl hover:text-olive hover:font-extrabold transition">
          SONGS
        </RouterLink>
        <RouterLink to="/meditation" className="cursor-pointer text-creme font-semibold text-xl hover:text-olive hover:font-extrabold transition">
          MEDITATION
        </RouterLink>
      </nav>

      {/* Right Buttons */}
      <div className="hidden md:flex space-x-4">
        {user._id ? (
          // User icon with dropdown menu
          <div className="relative">
            <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center space-x-2 text-creme text-xl cursor-pointer">
              <FaUserCircle size={32} className="hover:text-olive transition" />
              <span className="text-grey">{user.username}</span> {/* Display username next to the icon */}
            </button>

            {/* User dropdown menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white bg-opacity-90 shadow-lg rounded-lg flex flex-col">
                <RouterLink to="/user-dashboard" className="px-4 py-2 text-brown hover:bg-creme hover:text-gray-800 transition" onClick={() => setIsUserMenuOpen(false)}>
                  Dashboard
                </RouterLink>
                <button onClick={handleLogout} className="px-4 py-2 text-brown hover:bg-creme hover:text-gray-800 transition text-left">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          // Login and Signup buttons
          <>
            <RouterLink to="/login" className="relative flex items-center gap-2 px-4 py-3 rounded-md text-[18px] font-bold text-[hsla(0,0%,90%)] bg-gradient-to-br from-olive to-brown hover:scale-110 transition">
              Login
            </RouterLink>
            <RouterLink to="/signup" className="relative px-5 py-3 rounded-md border-2 border-white text-grey hover:text-white hover:scale-110 transition">
              Signup
            </RouterLink>
          </>
        )}
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="relative md:hidden">
        <button className="text-xl p-2 text-creme font-semibold hover:font-extrabold hover:bg-grey hover:rounded-xl transition" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>

        {/* Dropdown Menu (Mobile) */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white bg-opacity-50 shadow-lg rounded-lg flex flex-col">
            <RouterLink to="/aboutus" className="cursor-pointer px-4 py-2 text-brown hover:bg-creme hover:text-gray-800 transition" onClick={() => setIsMenuOpen(false)}>
              About
            </RouterLink>
            <RouterLink to="/requisites" className="cursor-pointer px-4 py-2 text-brown hover:bg-creme hover:text-gray-800 transition" onClick={() => setIsMenuOpen(false)}>
              Requisites
            </RouterLink>
            <RouterLink to="/books" className="cursor-pointer px-4 py-2 text-brown hover:bg-creme hover:text-gray-800 transition" onClick={() => setIsMenuOpen(false)}>
              Books
            </RouterLink>
            <RouterLink to="/podcasts" className="cursor-pointer px-4 py-2 text-brown hover:bg-creme hover:text-gray-800 transition" onClick={() => setIsMenuOpen(false)}>
              Podcasts
            </RouterLink>
            <RouterLink to="/songs" className="cursor-pointer px-4 py-2 text-brown hover:bg-creme hover:text-gray-800 transition" onClick={() => setIsMenuOpen(false)}>
              Songs
            </RouterLink>
            <RouterLink to="/meditation" className="cursor-pointer px-4 py-2 text-brown hover:bg-creme hover:text-gray-800 transition" onClick={() => setIsMenuOpen(false)}>
              Meditation
            </RouterLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

