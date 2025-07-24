import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Sparkles } from "lucide-react";
import axios from "axios";
import { marked } from "marked";

const AiTools = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();

  const [activeTool, setActiveTool] = useState("Summarizer");
  const [inputText, setInputText] = useState("");
  const [mcqSubject, setMcqSubject] = useState("");
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (loading) return;

    if (activeTool === "MCQ") {
      if (!mcqSubject.trim()) {
        setError("*Please enter a subject.");
        return;
      }

      try {
        setError("");
        setLoading(true);
        setOutput(null);
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/ai/mcq`,
          { subject: mcqSubject.trim() }
        );
        setOutput(data.result);
      } catch (err) {
        console.error("MCQ error:", err.message);
        setError("MCQ generation failed.");
      } finally {
        setLoading(false);
      }
    } else {
      if (!inputText.trim()) {
        setError("*Please enter your question.");
        return;
      }

      try {
        setError("");
        setLoading(true);
        setOutput(null);
        const endpoint = activeTool === "Summarizer" ? "summarizer" : "explain";
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/ai/${endpoint}`,
          { text: inputText.trim() }
        );
        setOutput(data.result);
      } catch (err) {
        console.error(`${activeTool} generation failed:`, err.message);
        setError(`${activeTool} generation failed.`);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-6 text-lg"
      >
        ← Back
      </button>

        <h1 className="text-4xl font-bold text-center mb-8 flex items-center justify-center gap-2">
          <Sparkles className="text-yellow-400" /> Smart AI Tools
        </h1>

        <div className="flex justify-center flex-wrap gap-4 mb-6">
          {["Summarizer", "Explain", "MCQ"].map((tool) => (
            <button
              key={tool}
              onClick={() => {
                setActiveTool(tool);
                setInputText("");
                setMcqSubject("");
                setOutput(null);
                setError("");
              }}
              className={`px-6 py-2 rounded-full border transition-all duration-200 ${
                activeTool === tool
                  ? "bg-purple-600 shadow-lg scale-105"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {tool}
            </button>
          ))}
        </div>

        {/* Subject Input or Textarea */}
        {activeTool !== "MCQ" && (
          <>
            <textarea
              rows="4"
              className="w-full p-4 mb-6 rounded-lg bg-[#1e293b] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your topic, concept or paragraph here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </>
        )}

        {activeTool === "MCQ" && (
          <div className="space-y-4 mb-6 max-w-md px-4 py-4 mx-auto text-center">
            <input
              type="text"
              placeholder="Enter subject (e.g. DBMS, OS)"
              value={mcqSubject}
              onChange={(e) => setMcqSubject(e.target.value)}
              className="w-full rounded bg-[#1e293b] border p-4 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        )}

        {/* Generate Button */}
        <div className="text-center mb-4">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-lg font-semibold shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            {loading
              ? "Generating..."
              : `Generate${activeTool === "MCQ" ? " MCQs" : ""}`}
          </button>
        </div>
        <br />
        {/* Error Message */}
        {error && (
          <p className="text-red-700 font-semibold text-center mb-4">{error}</p>
        )}

        {/* Output */}
        {Array.isArray(output) && activeTool === "MCQ" ? (
          <div className="space-y-6 bg-[#0f172a] border border-blue-500 p-6 rounded-xl shadow-md mt-10">
            {output.map((q, idx) => (
              <div key={idx} className="bg-[#1e293b] p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">
                  Q{idx + 1}. {q.question}
                </p>
                <ul className="space-y-1 pl-4">
                  {q.options.map((opt, i) => (
                    <li key={i} className="text-gray-300">
                      {String.fromCharCode(65 + i)}) {opt}
                    </li>
                  ))}
                </ul>
                <p className="text-green-400 font-bold mt-2">
                  Answer: {q.answer}
                </p>
              </div>
            ))}
          </div>
        ) : output ? (
          <div
            className="bg-[#1e293b] p-6 rounded-xl mt-6 whitespace-pre-line text-gray-200 shadow-md prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html: marked.parse(output).replace(/\n/g, "<br/>"),
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default AiTools;
