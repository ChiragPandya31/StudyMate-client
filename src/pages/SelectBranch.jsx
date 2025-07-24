import { useNavigate, useLocation } from "react-router-dom";
import { branchData } from "../constants/branchData";

export default function SelectBranch() {
  const path = useLocation().pathname;
  const course = path.includes("diploma") ? "diploma" : "degree";
  const navigate = useNavigate();

  const branches = Object.keys(branchData[course]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <button onClick={() => navigate(-1)} 
      className="bg-blue-600 px-4 py-2 rounded mb-10 hover:shadow-lg group hover:scale-[1.03] transition-all">← Back</button>
      <h2 className="text-3xl font-bold text-center mb-8 capitalize">{course} - Select Branch</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {branches.map((branch) => (
          <div
            key={branch}
            onClick={() => navigate(`/dashboard/${course}/${branch}`)}
            className="bg-[#152034] p-6 rounded-xl text-center cursor-pointer hover:border-blue-500 border border-transparent hover:shadow-lg group hover:scale-[1.03] transition-all"
          >
            <p className="text-lg font-semibold capitalize">{branchData[course][branch].name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
