import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import NoteCard from "../../components/NoteCard";

const SearchPage = () => {
   const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const fetchResults = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/materials`
      );

      const filtered = data.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subject.toLowerCase().includes(query.toLowerCase())
      );

      setMaterials(filtered);
    } catch (err) {
      console.error("Error fetching search results:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [query]);

  const grouped = {
    notes: materials.filter((item) => item.materialType === "notes"),
    pyqs: materials.filter((item) => item.materialType === "pyqs"),
    labs: materials.filter((item) => item.materialType === "labs"),
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-6 text-lg"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6 text-center">
        Search Results for: <span className="text-blue-400">"{query}"</span>
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : materials.length === 0 ? (
        <p className="text-center text-gray-400">No results found.</p>
      ) : (
        <>
          {Object.entries(grouped).map(([type, items]) =>
            items.length > 0 ? (
              <div key={type} className="mb-10">
                <div className="text-2xl w-60 bg-blue-600 px-4 rounded py-2 font-semibold flex justify-center capitalize mb-6">
                  {type === "notes"
                    ? "Notes"
                    : type === "pyqs"
                    ? "PYQs"
                    : "Lab Manuals"}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {materials.map((material) => (
  <NoteCard
    key={material._id}
    title={material.title}
    contentURL={material.contentURL}
    materialId={material._id}
  />
))}

                </div>
              </div>
            ) : null
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;
