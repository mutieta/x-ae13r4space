import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineArrowCircleDown,
  HiOutlineArrowCircleUp,
} from "react-icons/hi";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isMultimediaOpen, setIsMultimediaOpen] = useState(false);
  const [featuredArticles, setFeaturedArticles] = useState([]);

  useEffect(() => {
  const fetchArticles = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/articles");
      const json = await response.json();
      console.log("API response data:", json); // Optional: for debugging
      setFeaturedArticles(json.data.slice(0, 3)); // access json.data instead of json directly
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };
  fetchArticles();
}, []);

  const handleProfileClick = () => navigate("/AuthenticatorSignUp");
  const handleNavigation = (path) => navigate(path);

  const navItems = [
    { name: "Home", type: "route", path: "/" },
    { name: "APOD", type: "route", path: "/Apod" },
    { name: "Mission", type: "route", path: "/SpaceXmission" },
    { name: "Astronauts", type: "route", path: "/PeopleOfNasa" },
    { name: "Skywatching", type: "route", path: "/Asteroids" },
    { name: "ភាសាខ្មែរ", type: "route", path: "/khmer" },
  ];

  return (
    <header className="w-full flex justify-between items-center p-4 bg-black relative z-50">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <button className="text-white text-2xl lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>

        {/* Explore */}
        <div className="relative hidden lg:block">
          <button
            className="flex items-center space-x-2 px-6 py-2 text-white text-3xl font-bold hover:text-gray-300"
            onClick={() => setIsExploreOpen(!isExploreOpen)}
          >
            <span>Explore</span>
            {isExploreOpen ? <HiOutlineArrowCircleUp /> : <HiOutlineArrowCircleDown />}
          </button>

          {isExploreOpen && (
            <div className="mt-2 w-screen bg-black text-white shadow-lg flex z-50">
              {/* Nav Items */}
              <div className="w-64 p-6 border-r border-gray-700">
                <ul className="space-y-3">
                  {navItems.map((item, index) => (
                    <li
                      key={index}
                      className="hover:text-gray-300 cursor-pointer"
                      onClick={() => handleNavigation(item.path)}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Featured Articles */}
              <div className="flex-1 p-6">
                <h2 className="text-gray-400 text-sm font-bold mb-4">FEATURED</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {featuredArticles.map((article, index) => (
                    <div
                      key={index}
                      onClick={() => navigate(`/articles/${article.id}`)}
                      className="relative bg-cover bg-center overflow-hidden h-96 cursor-pointer hover:opacity-90 transition-opacity"
                      style={{ backgroundImage: `url(${article.thumbnail})` }}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-50 p-6 flex flex-col justify-end">
                        <h3 className="text-2xl text-white font-bold mb-4 leading-tight">
                          {article.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Input (Desktop) */}
        {!isSearchOpen && (
          <input
            type="text"
            placeholder="Search..."
            className="hidden lg:block px-4 py-2 text-white bg-black border border-white rounded-md"
          />
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <FiSearch className="lg:hidden text-white text-2xl cursor-pointer" onClick={() => setIsSearchOpen(!isSearchOpen)} />
        <FaRegUserCircle className="hidden lg:block text-white text-2xl cursor-pointer" onClick={handleProfileClick} />
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black text-white p-6 lg:hidden z-50">
          <ul className="space-y-4">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="hover:text-gray-300 cursor-pointer"
                onClick={() => handleNavigation(item.path)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="bg-black absolute top-0 left-0 w-full h-full text-white p-6 z-50 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Search the universe"
              className="w-full px-4 py-2 bg-black text-white border border-gray-300"
              autoFocus
            />
            <button className="ml-4 text-2xl text-white" onClick={() => setIsSearchOpen(false)}>
              <AiOutlineClose />
            </button>
          </div>
          <div className="bg-black text-white p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Suggested Searches</h3>
            <ul className="space-y-4">
              {[
                "Climate Change",
                "Artemis",
                "Expedition 64",
                "Mars Perseverance",
                "SpaceX Crew-2",
                "International Space Station",
              ].map((item, index) => (
                <li key={index} className="flex items-center space-x-2 border-b border-gray-200 pb-2">
                  <FiSearch className="text-gray-500" />
                  <span>{item}</span>
                </li>
              ))}
              <li className="text-blue-500 cursor-pointer pt-2 pb-7">View All Topics A-Z</li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
