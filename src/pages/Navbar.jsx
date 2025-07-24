import { useState } from "react";
import { Link } from "react-router-dom";

const StudyNavbar = ({ onContactClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a] text-white px-4 py-2 md:hidden">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          {/* Logo or Name */}
        </Link>

        {/* Hamburger Icon */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="focus:outline-none text-white"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Slide-out Menu */}
      {isOpen && (
        <div className="fixed top-0 right-0 w-2/3 h-full bg-[#0f172a] text-white shadow-lg transition-transform duration-300 ease-in-out z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-600">
            {/* Close Icon */}
            <button
              onClick={() => setIsOpen(false)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col items-start px-4 py-4 space-y-3">
            <Link
              to="/feedback"
              onClick={() => setIsOpen(false)}
              className="w-full block px-3 py-2 rounded bg-blue-500 hover:bg-blue-700"
            >
              Ratings & Feedback
            </Link>
            <button
              onClick={() => {
                onContactClick(); // use prop from Home
                setIsOpen(false);
              }}
              className="w-full block px-3 py-2 rounded bg-blue-500 hover:bg-blue-700 text-left"
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default StudyNavbar;
