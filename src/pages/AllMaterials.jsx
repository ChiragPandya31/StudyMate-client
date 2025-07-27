import { useEffect, useState } from "react";
import axios from "axios";
import NoteCard from "../components/NoteCard";
import { useNavigate } from "react-router-dom";

const AllMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("notes");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/materials`
        );
        setMaterials(data);
      } catch (err) {
        console.error("Error fetching materials:", err);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };

    fetchAll();
  }, []);

  const filtered = materials.filter((item) => item.materialType === activeTab);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 px-4 py-2 rounded mb-10 hover:shadow-lg group hover:scale-[1.03] transition-all"
      >
        ← Back
      </button>
      <h1 className="text-3xl font-bold text-center mb-8">
        All Study Materials
      </h1>

      <div className="flex justify-center gap-4 mb-6">
        {["notes", "pyqs", "labs"].map((type) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`px-4 py-2 rounded-full border ${
              activeTab === type ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-gray-400 text-lg">Loading...</p>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((material) => (
  <NoteCard
  key={material._id}
  title={material.title}
  contentURL={material.contentURL}
  materialId={material._id}
/>
))}


        </div>
      ) : (
        <p className="text-center text-gray-400 text-lg">
          No {activeTab.toUpperCase()} materials available.
        </p>
      )}
    </div>
  );
};

export default AllMaterials;
