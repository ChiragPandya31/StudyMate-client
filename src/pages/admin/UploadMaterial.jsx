import { useState } from "react";

const UploadMaterial = () => {
  const [formData, setFormData] = useState({
    course: "degree",
    semester: "",
    subject: "",
    materialType: "notes",
    title: "",
  });

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a PDF file.");
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("course", formData.course.toLowerCase());
    data.append("semester", formData.semester);
    data.append("subject", formData.subject.toLowerCase());
    data.append("materialType", formData.materialType.toLowerCase());
    data.append("title", formData.title);

    try {
      setUploading(true);

      const res = await fetch("https://studymate-server-production.up.railway.app/api/materials", {
        method: "POST",
        body: data, // ✅ send FormData, not formData
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Upload failed: ${errorText}`);
      }

      const result = await res.json();

      alert("✅ Material uploaded successfully!");
      console.log("Upload success:", result);

      // Reset
      setFormData({
        course: "degree",
        semester: "",
        subject: "",
        materialType: "notes",
        title: "",
      });
      setFile(null);
      document.getElementById("fileInput").value = "";

    } catch (err) {
      console.error("Upload error:", err);
      alert("❌ Upload failed. Check your file and internet.");
    } finally {
      setUploading(false);
    }
  };

  const getSemesterOptions = () => {
    const max = formData.course === "diploma" ? 6 : 8;
    return Array.from({ length: max }, (_, i) => i + 1);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Admin Upload Panel
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-[#1e293b] p-6 rounded-xl shadow-lg max-w-xl mx-auto"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 gap-4">
          <select
            name="course"
            value={formData.course}
            onChange={(e) =>
              setFormData({
                ...formData,
                course: e.target.value,
                semester: "",
                subject: "",
              })
            }
            className="p-4 rounded bg-[#0f172a] border border-gray-600"
          >
            <option value="degree">Degree</option>
            <option value="diploma">Diploma</option>
          </select>

          <select
            name="semester"
            value={formData.semester}
            onChange={(e) =>
              setFormData({
                ...formData,
                semester: e.target.value,
                subject: "",
              })
            }
            className="p-4 rounded bg-[#0f172a] border border-gray-600"
            required
          >
            <option value="">Select Semester</option>
            {getSemesterOptions().map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>

          <select
            name="materialType"
            value={formData.materialType}
            onChange={handleChange}
            className="p-4 rounded bg-[#0f172a] border border-gray-600"
          >
            <option value="notes">Notes</option>
            <option value="pyqs">PYQs</option>
            <option value="labs">Lab Manual</option>
          </select>

          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject (e.g., operating-system)"
            className="p-4 rounded bg-[#0f172a] border border-gray-600"
            required
          />

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="PDF Title (e.g., TOC Unit 1 Notes)"
            className="p-4 rounded bg-[#0f172a] border border-gray-600"
            required
          />

          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="p-4 rounded bg-[#0f172a] border border-gray-600"
            required
            id="fileInput"
          />

          <button
            type="submit"
            disabled={uploading}
            className={`${
              uploading ? "bg-gray-600" : "bg-purple-600 hover:bg-purple-700"
            } text-white px-4 py-2 rounded mb-6 text-lg`}
          >
            {uploading ? "Uploading..." : "Upload Material"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadMaterial;
