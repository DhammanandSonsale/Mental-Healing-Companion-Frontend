import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [user, setUser] = useState(null); // 🧠 store user details
  const profileMenuRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const activePath = location.pathname;

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleNavClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  // ✅ Check user login state
  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    };

    checkUser();

    // ✅ React to login/signup/logout events (triggered by AuthPage)
    window.addEventListener("storage", checkUser);

    // ✅ Also check whenever route changes
    return () => window.removeEventListener("storage", checkUser);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Logout confirmation popup
  const handleLogout = () => setShowLogoutConfirm(true);
  const confirmLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage")); // notify all components
    setShowLogoutConfirm(false);
    navigate("/login");
  };
  const cancelLogout = () => setShowLogoutConfirm(false);

  return (
    <>
      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between h-20 mx-6 sm:mx-10 md:mx-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition"
            onClick={() => handleNavClick("/")}
          >
            <i className="fas fa-brain mr-2"></i>
            Mental Healing Companion
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
            {[
              { name: "Home", path: "/" },
              { name: "Daily Healing", path: "/dailyhealing" },
              { name: "Resources", path: "/resources" },
              { name: "Contact", path: "/contact" },
              { name: "About", path: "/about" },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`hover:text-indigo-600 transition ${
                  activePath === link.path ? "text-indigo-600 font-semibold" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Profile or Login */}
            {isLoggedIn ? (
              <div className="relative" ref={profileMenuRef}>
                <img
                  src="/assets/images/DefaultProf.jpg"
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-indigo-500 cursor-pointer hover:scale-105 transition"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                />
                {showProfileMenu && (
                  <div className="absolute right-0 mt-3 bg-white shadow-lg rounded-xl p-3 w-44 text-gray-700">
                   
                    <Link
                      to="/dashboard"
                      className="block px-3 py-2 hover:bg-indigo-50 rounded-md"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-indigo-600 text-white px-5 py-2 rounded-full shadow hover:bg-indigo-700 transition">
                  Login
                </button>
              </Link>
            )}
          </nav>

          {/* Hamburger (Mobile) */}
          <div
            className="md:hidden text-2xl cursor-pointer text-gray-700"
            onClick={toggleMenu}
          >
            {isOpen ? "✕" : "☰"}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md shadow-md rounded-b-2xl mx-6 sm:mx-10 mt-2 py-4 px-6 transition-all duration-300">
            <ul className="flex flex-col gap-4 text-gray-700 font-medium text-center">
              {[
                { name: "Home", path: "/" },
                { name: "Resources", path: "/resources" },
                { name: "Contact", path: "/contact" },
                { name: "About", path: "/about" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className={`block py-2 hover:text-indigo-600 transition ${
                      activePath === link.path ? "text-indigo-600 font-semibold" : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}

              {/* Mobile: Profile or Login */}
              {isLoggedIn ? (
                <li className="flex flex-col items-center">
                  <img
                    src="/assets/images/DefaultProf.jpg"
                    alt="Profile"
                    className="w-14 h-14 rounded-full border-2 border-indigo-500 mb-2"
                  />
                  <Link
                    to="/dashboard"
                    className="block py-1 text-gray-700 hover:text-indigo-600"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="mt-2 text-red-600 hover:underline"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <Link to="/login">
                    <button className="w-full bg-indigo-600 text-white py-2 rounded-full shadow hover:bg-indigo-700 transition">
                      Login
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </header>

      {/* 🧘 Logout Confirmation Popup */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <h3 className="text-lg font-semibold mb-3">Confirm Logout</h3>
            <p className="text-gray-600 mb-5">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Logout
              </button>
              <button
                onClick={cancelLogout}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
