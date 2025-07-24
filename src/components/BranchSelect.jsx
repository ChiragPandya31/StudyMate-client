import { useNavigate } from "react-router-dom";
import { branchData } from "../constants/branchData";

export default function BranchSelect() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Select Your Branch</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Object.entries(branchData).map(([key, branch]) => (
          <button
            key={key}
            onClick={() => navigate(`/branch/${key}`)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-white text-lg"
          >
            {branch.name}
          </button>
        ))}
      </div>
    </div>
  );
}
