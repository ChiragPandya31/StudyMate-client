import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NoteCard from "../../components/NoteCard";

const Notes = () => {
  const { course, semId, subjectId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const normalize = (value) => value?.toLowerCase().trim();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/materials`,
          {
            params: {
              course: normalize(course),
              semester: semId?.toString(),
              subject: normalize(subjectId),
              materialType: "notes",
            },
          }
        );
        console.log("Fetched Notes:", data);
        setNotes(data);
      } catch (err) {
        console.error("Error fetching notes:", err);
        setNotes([]); // fallback to empty
      } finally {
        setLoading(false);
      }
    };

    // Run only when no query is active
    if (!query) {
      fetchNotes();
    }
  }, [course, semId, subjectId, query]);

  useEffect(() => {
    if (!query) return;

    const fetchSearchResults = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/materials`
        );

        const filtered = data.filter(
          (item) =>
            item.materialType === "notes" &&
            (item.title.toLowerCase().includes(query.toLowerCase()) ||
              item.subject.toLowerCase().includes(query.toLowerCase()))
        );

        setNotes(filtered);
      } catch (err) {
        console.error("Search error:", err);
        setNotes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-6 text-lg"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-center mb-8">
        {subjectId?.toUpperCase()} - Notes
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : notes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {notes.map((material) => (
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
          No Notes available for this subject.
        </p>
      )}
    </div>
  );
};

export default Notes;
