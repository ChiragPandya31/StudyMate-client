import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function QuizBattle() {
  const [subject, setSubject] = useState("");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [showResult, setShowResult] = useState(false);

  const navigate = useNavigate();

  const startQuiz = async () => {
    if (!subject) return alert("Enter a subject to start quiz!");

    try {
      const res = await axios.get(`${BASE_URL}/api/quiz`, {
        params: { subject },
      });

      if (!res.data.questions.length) {
        return alert("No questions found for this subject.");
      }

      setQuestions(res.data.questions);
      setCurrent(0);
      setScore(0);
      setSelected("");
      setShowResult(false);
    } catch (err) {
      alert("Failed to fetch questions.");
      console.error(err);
    }
  };

  const handleOptionClick = (option) => {
    if (selected) return;

    setSelected(option);
    if (option === questions[current].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (current + 1 === questions.length) {
        setShowResult(true);
      } else {
        setCurrent(current + 1);
        setSelected("");
      }
    }, 3000);
  };

  return (
    <div className="p-6 w-full mx-auto min-h-screen bg-[#0f172a] text-white">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-10 hover:shadow-lg group hover:scale-[1.03] transition-all text-lg"
      >
        ← Back
      </button>
      <h2 className="text-4xl font-bold text-center mb-8 flex items-center justify-center gap-2">
        <Sparkles className="text-yellow-400" /> AI-Powered Quiz Battle
      </h2>

      {!questions.length && (
        <div className="grid grid-cols-1 gap-4 ">
          <input
            placeholder="Enter subject (e.g. dbms, os, java, etc)"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="p-4 flex rounded bg-[#0f172a] border border-gray-100"
          />
          <button
            onClick={startQuiz}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-lg shadow-lg"
          >
            Start Quiz
          </button>
        </div>
      )}

      {questions.length > 0 && !showResult && (
        <div className="space-y-4">
          <div className="p-4 rounded border border-gray-700 bg-[#1e293b]">
            <div className="text-lg font-semibold mb-4">
              Q{current + 1}. {questions[current].question}
            </div>
            <br />

            <div className="grid gap-4">
              {questions[current].options.map((opt, i) => {
                const isCorrect = selected && opt === questions[current].answer;
                const isWrong =
                  selected &&
                  opt === selected &&
                  opt !== questions[current].answer;

                return (
                  <button
                    key={i}
                    onClick={() => handleOptionClick(opt)}
                    className={`px-4 py-2 text-left rounded border transition-all duration-150 ${
                      isCorrect
                        ? "bg-green-800 border-green-500 text-green-100"
                        : isWrong
                        ? "bg-red-800 border-red-500 text-red-100"
                        : "bg-[#0f172a] border-gray-600 hover:bg-[#202632]"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            <div className="text-sm text-gray-400 text-right mt-4">
              Question {current + 1} of {questions.length}
            </div>
          </div>
        </div>
      )}

      {showResult && (
        <div className="text-center space-y-4 mt-8">
          <h3 className="text-2xl font-bold text-green-400">Quiz Finished</h3>
          <p className="text-lg">
            You scored:{" "}
            <span className="text-blue-400 font-semibold">{score}</span> out of{" "}
            <span className="text-blue-400 font-semibold">
              {questions.length}
            </span>
          </p>
          <br />
          <button
            onClick={() => {
              setQuestions([]);
              setSubject("");
              setShowResult(false);
              setCurrent(0);
              setScore(0);
              setSelected("");
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow-lg"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
