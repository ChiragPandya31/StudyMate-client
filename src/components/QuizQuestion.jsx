import { useState } from "react";

export default function QuizQuestion({ data, qno }) {
  const [selected, setSelected] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  const handleOption = (option) => {
    if (showAnswer) return;
    setSelected(option);
    setShowAnswer(true);
  };

  return (
    <div className="p-4 border border-blue-300 rounded bg-blue-50 shadow-sm mb-10">
      <div className="font-semibold mb-2 text-blue-800">
        Q{qno}. {data.question}
      </div>
      <div className="grid gap-2">
        {data.options.map((opt, i) => {
          const isCorrect = showAnswer && opt === data.answer;
          const isWrong = showAnswer && opt === selected && opt !== data.answer;

          return (
            <button
              key={i}
              onClick={() => handleOption(opt)}
              className={`px-4 py-2 text-left border rounded transition-all duration-150 ${
                isCorrect
                  ? "bg-green-100 border-green-500 text-green-800"
                  : isWrong
                  ? "bg-red-800 border-red-500 text-red-800"
                  : "bg-white border-gray-300 hover:bg-blue-100"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
