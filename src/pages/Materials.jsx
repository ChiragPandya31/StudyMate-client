import { useNavigate, useParams } from "react-router-dom";
import { Notebook, FileText, FlaskConical, Bot } from "lucide-react";


export default function Materials() {
  const navigate = useNavigate();
  const { course, semId, subjectId } = useParams();

  const formattedSubject = subjectId
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
    

  const features = [
    {
      title: "Notes",
      icon: <Notebook size={30} />,
      desc: "Get clear and structured notes for quick revision.",
      route: "notes",
    },
    {
      title: "PYQs",
      icon: <FileText size={30} />,
      desc: "Explore previous year questions with solutions.",
      route: "pyqs",
    },
    {
      title: "Lab Manual",
      icon: <FlaskConical size={30} />,
      desc: "Access lab programs and experiment explanations.",
      route: "lab",
    },
    {
      title: "AI Tools",
      icon: <Bot size={30} />,
      desc: "Summarize, or explain any topic.",
      route: "ai-tools",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-10 hover:shadow-lg group hover:scale-[1.03] transition-all text-lg"
      >
        ← Back
      </button>


      {/* Heading */}
      <div className="text-center mb-10 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {formattedSubject} - Semester {semId} ({course})
        </h1>
        <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto">
          Choose what you want to explore for this subject.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16 w-full">
        {features.map((feature, i) => (
          <div
            key={i}
            onClick={() =>
              navigate(`/${feature.route}/${course}/${semId}/${subjectId}`)
            }
            className="bg-[#1e293b] p-6 rounded-xl shadow-md cursor-pointer border border-transparent hover:border-blue-400 group hover:scale-[1.03] transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-blue-400">{feature.icon}</div>
              <h3 className="text-xl font-semibold group-hover:text-blue-400">
                {feature.title}
              </h3>
            </div>
            <p className="text-sm text-gray-400">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="text-white text-md text-center w-full px-4 py-6 font-semibold">
        Built for quick learning.
      </footer>
    </div>
  );
}
