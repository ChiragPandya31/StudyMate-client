import { useState } from "react";
import { MoreVertical } from "lucide-react";
import pdfimg from "../assets/pdfimg.png";
import axios from "axios";

const NoteCard = ({ title, contentURL, materialId }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handlePreviewDownload = async () => {
    if (!contentURL || !materialId) {
      alert("Missing contentURL or materialId");
      return;
    }

    try {
      window.open(contentURL, "_blank");
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/materials/${materialId}/view`
      );
      setMenuOpen(false);
    } catch (error) {
      console.error("Error tracking view or opening PDF:", error);
      alert("PDF not available. Please try again later.");
    }
  };

  return (
    <div className="relative bg-[#1e293b] rounded-xl p-4 shadow-md hover:shadow-lg transition-all">
      <div className="absolute top-4 right-4">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
          <MoreVertical />
        </button>

        {menuOpen && (
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[90vw] max-w-xs bg-[#0f172a] rounded-md shadow-lg z-10 border text-white border-gray-200">
            <button
              onClick={handlePreviewDownload}
              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#0f172a] hover:text-white transition"
            >
              Preview / Download
            </button>
          </div>
        )}
      </div>
      <img
        src={pdfimg}
        alt="PDF"
        className="w-24 h-28 object-contain mx-auto mb-3"
      />
      <h3 className="text-lg font-semibold text-white truncate">{title}</h3>
    </div>
  );
};

export default NoteCard;
