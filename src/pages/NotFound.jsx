import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-6">
       <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-10 hover:shadow-lg group hover:scale-[1.03] transition-all text-lg"
      >
        ← Back
      </button>
      <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-lg text-gray-300">Oops! Page not found.</p>
    </div>
  );
};

export default NotFound;
