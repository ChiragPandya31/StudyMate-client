import { useEffect, useState } from "react";
import StarRating from "../components/StarRating";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [avgRating, setAvgRating] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async () => {
    if (!rating) return alert("Please select a rating before submitting.");
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/feedback`, {
        rating,
        comment,
      });
      setRating(0);
      setComment("");
      setSubmitted(true);
      fetchFeedbacks();
    } catch (err) {
      console.error("Feedback submit error:", err);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/feedback`);
      setFeedbacks(res.data.feedbacks);
      setAvgRating(res.data.avgRating);
    } catch (err) {
      console.error("Failed to load feedbacks:", err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 max-w-full mx-auto">
       <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded mb-10 hover:shadow-lg group hover:scale-[1.03] transition-all text-lg"
      >
        ← Back
      </button>
      <h2 className="text-4xl font-bold text-center mb-6">Rate & Review StudyMate</h2>

      <div className="bg-[#1e293b] p-6 rounded-xl shadow-md mb-8">
        <p className="text-lg mb-4 font-semibold">How would you rate your experience?</p>
        <StarRating rating={rating} onChange={setRating} /><br />

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          className="w-full mt-4 p-4 rounded-lg bg-[#0f172a] border mb-6 border-gray-600"
          placeholder="Write your thoughts..."
        />
        <br />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow-lg"
        >
          Submit Feedback
        </button>

        {submitted && (
          <p className="text-green-400 mt-3 ">Thanks for your feedback!</p>
        )}
      </div>

      {avgRating && (
        <div className="mb-6 text-center">
          <h3 className="text-xl font-bold">⭐ Average Rating: {avgRating}/5</h3>
        </div>
      )}

      <div className="space-y-4">
        {feedbacks.map((fb, i) => (
          <div key={i} className="bg-[#1e293b] p-4 rounded-lg">
            <p className="text-yellow-400 font-semibold mb-1">⭐ {fb.rating}</p>
            {fb.comment && <p className="text-gray-300">{fb.comment}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
