import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PYQAnalyzer() {
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!files.length) return;

    const formData = new FormData();
    for (const file of files) {
      formData.append("pdfs", file);
    }

    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/analyze`, formData);
      const formattedResults = Object.entries(res.data).map(
        ([filename, data]) => ({
          subject: data.subject || filename,
          repeated: data.repeated_questions || [],
          years: Object.entries(data.years || {}).map(([year, units]) => ({
            year,
            units: Object.entries(units).map(([unit, questions]) => ({
              unit,
              questions,
            })),
          })),
        })
      );
      setResults(formattedResults);
    } catch (err) {
      alert("Something went wrong during analysis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <button onClick={() => navigate(-1)} className="bg-blue-600 px-4 py-2 rounded mb-10 hover:shadow-lg group hover:scale-[1.03] transition-all">← Back</button>

      <h1 className="text-3xl font-bold mb-6 text-center">
        PYQ Pattern Analyzer
      </h1>

      {/* Upload Section */}
      <div className="max-w-xl mx-auto bg-[#1e293b] p-6 rounded-lg shadow mb-8">
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
          className="mb-4 block w-full text-white"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze PYQs"}
        </button>
      </div>

      {/* Show Uploaded File Names */}
      {files.length > 0 && (
        <div className="mb-8 text-sm text-gray-400 text-center">
          <p className="mb-2">Uploaded PDFs:</p>
          <ul>
            {files.map((f, idx) => (
              <li key={idx}>{f.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Results Section */}
      <div className="max-w-4xl mx-auto">
        {results.map((res, index) => (
          <div key={index} className="bg-[#1e293b] p-4 rounded-lg mb-6">
            <h3 className="text-xl font-bold mb-2 text-blue-400">
              {res.subject}
            </h3>

            {res.error ? (
              <p className="text-red-400">❌ {res.error}</p>
            ) : (
              <>
                {/* Repeated Questions */}
                {res.repeated?.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-lg text-yellow-400 mb-1">
                      • Repeated Questions:
                    </h4>
                    <ul className="list-disc list-inside text-gray-300">
                      {res.repeated.map((q, idx) => (
                        <li key={idx}>{q}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Grouped by Year and Units */}
                {res.years.map((yearGroup, i) => (
                  <div key={i} className="mb-4">
                    <h4 className="font-semibold text-white text-lg mb-2">
                      {yearGroup.year}
                    </h4>
                    {yearGroup.units.map((unit, j) => (
                      <div key={j} className="mb-2">
                        <p className="text-gray-300 font-medium">{unit.unit}</p>
                        <ul className="list-disc list-inside text-gray-400">
                          {Array.isArray(unit.questions) &&
                            unit.questions.map((q, k) => (
                              <li key={k}>
                                {typeof q === "string"
                                  ? q
                                  : q.question + (q.repeated ? " 🔁" : "")}
                              </li>
                            ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
