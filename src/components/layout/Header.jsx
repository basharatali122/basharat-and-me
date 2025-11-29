"use client";
import React, { useContext, useState, useEffect } from "react";
import { href, Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import ThemeContext from "../../context/ThemeContext.jsx";
import { motion } from "framer-motion";
import axios from "axios";

const Header = () => {
  const { user, setUser, token, setToken, cartCount, wishlistCount } =
    useContext(GlobalContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Logout function
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
    }
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  // Fetch user info from backend
  const fetchUserInfo = async () => {
    if (user) return; 
    try {
      const res = await axios.get("http://localhost:3000/api/auth/me", {
        withCredentials: true,
      });
      if (res.data?.user) {
        setUser(res.data.user);
      } else if (res.data?.email) {
        setUser({ username: res.data.email });
      }
    } catch (err) {
      console.error("Failed to fetch user info:", err);
    }
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { href: "/products", text: "Products" },
    { href: "/categories", text: "Categories" },
    { href: "/business", text: "Business Plan" },
    { href: "/ranking", text: "Ranking" },
    { href: "/about", text: "About" },
    { href: "/contact", text: "Join Us" },
  ];

  return (
    <header
      className={`w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg"
          : "bg-white/90 dark:bg-gray-900/80 backdrop-blur-md"
      } border-b border-gray-200 dark:border-gray-800 fixed top-0 z-50`}
    >
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-7xl">
        <div className="flex h-14 sm:h-16 lg:h-20 items-center justify-between">
          {/* Logo - Updated for Mountain Dweller */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-md">
              <span className="text-white font-bold text-base sm:text-lg lg:text-xl">
                MD
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg sm:text-xl lg:text-2xl text-gray-900 dark:text-gray-100 leading-tight">
                Mountain
              </span>
              <span className="font-bold text-lg sm:text-xl lg:text-2xl text-blue-600 dark:text-blue-400 leading-tight -mt-1">
                Dweller
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Updated links */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.text}
                to={link.href}
                className="text-sm lg:text-base font-medium text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group"
              >
                {link.text}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Auth / Buttons / Theme */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === "light" ? "🌞" : "🌙"}
            </button>

            {!token && !user ? (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-500 transition-all shadow-md"
                >
                  Join Now
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Hi, {user?.username || user?.name || "Partner"}
                </Link>
                <Link
                  to="/business"
                  className="text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 transition-colors"
                >
                  My Business
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-500 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
                <Link
                  to="/wishlist"
                  className="relative text-xl hover:scale-110 transition-transform"
                >
                  ❤️
                  {wishlistCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </Link>
                <Link
                  to="/cart"
                  className="relative text-xl hover:scale-110 transition-transform"
                >
                  🛒
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 border-t border-gray-200 dark:border-gray-800 flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.text}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {link.text}
              </Link>
            ))}

            <div className="pt-4 mt-2 border-t border-gray-200 dark:border-gray-700 flex flex-col space-y-2">
              {/* Theme Toggle Mobile */}
              <button
                onClick={toggleTheme}
                className="px-3 py-2.5 rounded-md text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-left"
              >
                {theme === "light" ? "🌞 Light Mode" : "🌙 Dark Mode"}
              </button>

              {!token && !user ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-3 py-2.5 text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-md hover:from-blue-700 hover:to-blue-500 transition-all text-center shadow-md"
                  >
                    Start Business
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Hi, {user?.username || user?.name || "Partner"}
                  </Link>
                  <Link
                    to="/business"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-3 py-2.5 text-sm font-medium text-green-600 dark:text-green-400 rounded-md hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                  >
                    My Business
                  </Link>
                </>
              )}

              {token && user && (
                <button
                  onClick={handleLogout}
                  className="px-3 py-2.5 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors text-left"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
