import { useParams, useNavigate } from "react-router-dom";
import { branchData } from "../constants/branchData";

export default function Dashboard() {
  const { course, branch } = useParams();
  const navigate = useNavigate();

  const semesters = Object.keys(branchData[course][branch].semesters);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <button onClick={() => navigate(-1)} className="bg-blue-600 px-4 py-2 rounded mb-10 hover:shadow-lg group hover:scale-[1.03] transition-all">← Back</button>
      <h2 className="text-3xl font-bold text-center mb-8 capitalize">
        {branchData[course][branch].name} - Select Semester
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {semesters.map((sem) => (
          <div
            key={sem}
            onClick={() => navigate(`/subjects/${course}/${branch}/${sem}`)}
            className="bg-[#1e293b] p-6 rounded-xl text-center cursor-pointer hover:border-blue-400 border border-transparent transition-all hover:scale-[1.03] hover:shadow-lg"
          >
            <p className="text-lg font-semibold">Semester {sem}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
