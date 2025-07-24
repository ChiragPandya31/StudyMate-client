import { useState } from "react";
import axios from "axios";

export default function PyqUpload() {
  const [formData, setFormData] = useState({
    course: "", semester: "", subject: "", year: "", question: "", chapter: "", type: "Theory"
  });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/pyq/upload", formData);
      alert("✅ PYQ uploaded successfully!");
    } catch (err) {
      alert("❌ Upload failed: " + err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Upload PYQ</h2>
      

    
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        {["course", "semester", "subject", "year", "chapter", "question"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            required
            onChange={handleChange}
            className="px-4 py-2 rounded flex gap-4 flex-col bg-[#0f172a] border border-gray-600 "
          />
        ))}

   <select
            name="materialType"
            value={formData.materialType}
            onChange={handleChange}
            className="px-4 py-2 rounded bg-[#0f172a] border border-gray-400"
          >
             <option value="Theory">Theory</option>
          <option value="Numerical">Numerical</option>
          <option value="Diagram">Diagram</option>
          </select>

        
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-6 text-lg">
          Upload PYQ
        </button>
      </form>
        </div>
    
  );
}
