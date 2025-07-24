// src/pages/Subject.jsx
import { useParams, useNavigate } from "react-router-dom";
import { branchData } from "../constants/branchData";

export default function Subject() {
  const { course, branch, semId } = useParams();
  const navigate = useNavigate();

  const subjects = branchData[course][branch].semesters[semId];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <button onClick={() => navigate(-1)} className="bg-blue-600 px-4 py-2 rounded mb-10 hover:shadow-lg group hover:scale-[1.03] transition-all">← Back</button>
      <h2 className="text-3xl font-bold text-center mb-8 capitalize">
        Semester {semId} - {branchData[course][branch].name}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {subjects.map((subject, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/materials/${course}/${semId}/${subject.toLowerCase().replace(/\s/g, "-")}`)}
            className="bg-[#1e293b]group hover:scale-[1.03] transition-all p-6 rounded-xl text-center cursor-pointer hover:border-blue-400 border border-transparent hover:shadow-lg"
          >
            <p className="text-lg font-semibold">{subject}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
