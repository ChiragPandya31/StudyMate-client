import { Link } from "react-router-dom";

export default function PYQAnalyzer() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">🚧 Feature In Progress</h1>
      <p className="text-gray-600 text-lg mb-6">
        The PYQ Analyzer is not ready yet. We’re working hard to bring it to you soon.
      </p>
      <Link to="/">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
          Back to Home
        </button>
      </Link>
    </div>
  );
}
