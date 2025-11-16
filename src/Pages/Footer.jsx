import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-indigo-50 to-indigo-100 border-t border-gray-200 py-20 px-6 sm:px-10 md:px-16 text-gray-700">
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-bold text-indigo-600">
            Mental Healing Companion
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
            Your compassionate space for mental wellness, self-discovery, and
            support — available anytime, anywhere.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a
              href="#"
              className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow hover:bg-indigo-600 hover:text-white transition"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow hover:bg-indigo-600 hover:text-white transition"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow hover:bg-indigo-600 hover:text-white transition"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow hover:bg-indigo-600 hover:text-white transition"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-gray-900">
            Quick Links
          </h4>
          <ul className="space-y-3">
            <li>
              <Link
                to="/"
                className="text-gray-600 hover:text-indigo-600 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/resources"
                className="text-gray-600 hover:text-indigo-600 transition"
              >
                Resources
              </Link>
            </li>
            <li>
              <Link
                to="/questionaire"
                className="text-gray-600 hover:text-indigo-600 transition"
              >
                Quiz
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-indigo-600 transition"
              >
                Community
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-gray-900">
            Resources
          </h4>
          <ul className="space-y-3">
            <li>
              <a href="/resources" className="text-gray-600 hover:text-indigo-600">
                CBT Exercises
              </a>
            </li>
            <li>
              <a href="/resources" className="text-gray-600 hover:text-indigo-600">
                Mindfulness Guides
              </a>
            </li>
            <li>
              <a href="/resources" className="text-gray-600 hover:text-indigo-600">
                Self-Care Tips
              </a>
            </li>
            <li>
              <a href="/AIChatSupport" className="text-gray-600 hover:text-indigo-600">
                AI Chat Support
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-gray-900">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="mailto:support@mentalhealing.com"
                className="text-gray-600 hover:text-indigo-600"
              >
                mentalhealingcompanion@gamil.com
              </a>
            </li>
            <li>
              <a
                href="tel:+911234567890"
                className="text-gray-600 hover:text-indigo-600"
              >
                +91 83085603**
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-indigo-600">
                Maharashtra
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
        © 2025 Mental Healing Companion. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
