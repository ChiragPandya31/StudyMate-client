import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Notebook,
  Bot,
  FileText,
  Search,
  ArrowRight,
} from "lucide-react";

import student from "../assets/student.png";
import ContactUs from "./ContactUs";
import StudyNavbar from "./Navbar";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const contactRef = useRef(null);
  const navigate = useNavigate();

  const scrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center px-4 py-12">
      {/* Pass scroll function to navbar */}
      <StudyNavbar onContactClick={scrollToContact} />

      <h1 className="text-4xl md:text-5xl font-bold mb-2 cursor-pointer">
        <span className="text-blue-400">Study</span>Mate
      </h1>
      <p className="text-lg text-gray-300 text-center max-w-xl">
        Access all your study essentials - PYQs, labs & AI tools instantly,
      </p>
      <p className="text-lg text-gray-300 mb-6 text-center max-w-xl">
        Organized, Simplified, All at one place.
      </p>

      {/* Search Bar */}
      <div className="w-full max-w-xl mb-10">
        <div className="flex items-center bg-[#1e293b] text-white rounded-full border border-gray-700 px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
          <Search className="text-blue-400" size={20} />
          <input
            type="text"
            placeholder="Search notes, topics or PYQs..."
            className="flex-grow bg-[#1e293b] w-full px-4 text-white placeholder-gray-400 focus:outline-none border-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchTerm.trim()) {
                navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
              }
            }}
          />
          <button
            onClick={() => {
              if (searchTerm.trim()) {
                navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
              }
            }}
          >
            <ArrowRight
              className="text-blue-400 flex justify-end hover:text-blue-500 transition"
              size={22}
            />
          </button>
        </div>
      </div>

      <div className="mb-10">
        <img
          src={student}
          alt="Student"
          className="w-[280px] md:w-[360px] transition-transform duration-300 ease-in-out hover:animate-shake"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <button
          onClick={() => navigate("/diploma")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full flex items-center gap-2"
        >
          <GraduationCap size={18} />
          Diploma
        </button>
        <button
          onClick={() => navigate("/degree")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full flex items-center gap-2"
        >
          <GraduationCap size={18} />
          B.Tech
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl mb-16">
        <FeatureCard
          icon={<Notebook size={28} />}
          title="Study Materials"
          onClick={() => navigate("/materials")}
          desc="Browse Notes, PYQs, and Lab Manuals by branch, semester & subject."
        />
        <FeatureCard
          icon={<FileText size={28} />}
          title="PYQ Analyzer"
          onClick={() => navigate("/pyq-analyzer")}
          desc="Previous Year Questions Analyzer."
        />
        <FeatureCard
          icon={<Bot size={28} />}
          title="AI Tools"
          onClick={() => navigate("/ai-tools")}
          desc="Summarize and explain topics along with MCQs using AI Tool."
        />
        <FeatureCard
          icon={<FileText size={28} />}
          title="Quiz Battle"
          onClick={() => navigate("/quiz-battle")}
          desc="Explore the AI-Powered Quiz Challange."
        />
      </div>

      {/* Contact Section With Ref */}
      <div ref={contactRef}>
        <ContactUs />
      </div>

      <button
        onClick={() => navigate("/feedback")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-lg"
      >
        Ratings & Feedback
      </button>

      <div className="text-white text-lg p-6 font-semibold">
        Built by Students, for Students. ❤️
      </div>

      <footer className="border-t border-gray-700 text-sm text-gray-400">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <p className="text-center">
      © {new Date().getFullYear()} StudyMate. All rights reserved.
    </p>
    <p className="text-center mt-2">
      Designed & developed by{" "}
      <span className="font-medium text-blue-400">Chirag Pandya</span>
    </p>
  </div>
</footer>

    </div>
  );
};

const FeatureCard = ({ icon, title, desc, onClick }) => (
  <div
    onClick={onClick}
    className="bg-[#1e293b] p-4 rounded-xl text-center shadow-md hover:scale-[1.03] transition-all cursor-pointer"
  >
    <div className="flex justify-center mb-2 text-purple-400">{icon}</div>
    <h3 className="text-lg font-semibold mb-1">{title}</h3>
    <p className="text-sm text-gray-300">{desc}</p>
  </div>
);

export default Home;
