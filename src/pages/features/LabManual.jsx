import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NoteCard from "../../components/NoteCard";

const Labs = () => {
  const { course, semId, subjectId } = useParams();
  const navigate = useNavigate();

  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/materials`,
          {
            params: {
              course: course?.toLowerCase(),
              semester: semId,
              subject: subjectId?.toLowerCase(),
              materialType: "labs",
            },
          }
        );
        setMaterials(data);
      } catch (err) {
        console.error("Error fetching Labs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [course, semId, subjectId]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-6 text-lg"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-center mb-8">
        {subjectId?.toUpperCase()} - Lab Manuals
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : materials.length > 0 ? (
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
      ) : (
        <p className="text-center text-gray-400 text-lg">
          No Lab Manuals available for this subject.
        </p>
      )}
    </div>
  );
};

export default Labs;
