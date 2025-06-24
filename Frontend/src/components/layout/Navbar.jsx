import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                to="/"
                className="text-green-600 font-bold text-xl hover:text-green-700 transition-colors"
              >
                CollabSpot
              </Link>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                  : "text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/domains"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                  : "text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
              }
            >
              Explore Domains
            </NavLink>
            <NavLink
              to="/upload"
              className={({ isActive }) =>
                isActive
                  ? "bg-green-500 text-white px-3 py-2 rounded-md text-sm font-medium animate-scale"
                  : "bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium animate-scale"
              }
            >
              Upload Project
            </NavLink>
            <NavLink
              to="/plagscan"
              className={({ isActive }) =>
                isActive
                  ? "bg-green-700 text-white px-3 py-2 rounded-md text-sm font-medium animate-scale"
                  : "bg-green-700 hover:bg-green-800 text-white px-3 py-2 rounded-md text-sm font-medium animate-scale"
              }
            >
              PlagScan
            </NavLink>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                  : "text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
              }
            >
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </span>
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 block px-3 py-2 rounded-md text-base font-medium"
                  : "text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Home
              </span>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 block px-3 py-2 rounded-md text-base font-medium"
                  : "text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </NavLink>
            <NavLink
              to="/domains"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 block px-3 py-2 rounded-md text-base font-medium"
                  : "text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Explore Domains
            </NavLink>
            <NavLink
              to="/upload"
              className={({ isActive }) =>
                isActive
                  ? "bg-green-500 text-white block px-3 py-2 rounded-md text-base font-medium"
                  : "bg-green-500 hover:bg-green-600 text-white block px-3 py-2 rounded-md text-base font-medium"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Upload Project
            </NavLink>
            <NavLink
              to="/plagscan"
              className={({ isActive }) =>
                isActive
                  ? "bg-green-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                  : "bg-green-700 hover:bg-green-800 text-white block px-3 py-2 rounded-md text-base font-medium"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              PlagScan
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
