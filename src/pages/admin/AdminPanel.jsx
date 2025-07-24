import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("Notes");
  const [allMaterials, setAllMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const tabs = ["Notes", "PYQs", "LabManual"];
  

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
  };

  const fetchMaterials = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/materials`
      );
      setAllMaterials(data.reverse());
    } catch (err) {
      console.error("Error fetching materials:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);
  const typeMap = {
    Notes: "notes",
    PYQs: "pyqs",
    LabManual: "labs",
  };
  
  const filteredData = allMaterials.filter(
    (item) => item.materialType === typeMap[activeTab]
  );


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/materials/${id}`
      );

      if (res.status === 200) {
        alert("Material deleted successfully.");
        fetchMaterials();
      } else {
        throw new Error(res.data?.message || "Unknown delete error");
      }
    } catch (err) {
      console.error("Failed to delete material:", err);
      alert(`Failed to delete the material.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-center flex-1 ml-20 mt-5">
          Admin Panel - All Material
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold"
        >
          Logout
        </button>
      </div>

      <div className="flex justify-center gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full border text-md font-semibold transition ${
              activeTab === tab
                ? "bg-blue-600"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : filteredData.length === 0 ? (
        <p className="text-center text-gray-400 text-sm mt-6">
          No {activeTab} materials uploaded yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredData.map((item) => (
            <div
              key={item._id}
              className="bg-[#1e293b] p-4 rounded-xl border border-gray-700 shadow"
            >
              <h2 className="text-lg font-bold mb-2 truncate">{item.title}</h2>
              <p className="text-sm text-gray-300">
                <span className="font-medium">Subject:</span> {item.subject}
              </p>
              <p className="text-sm text-gray-300">
                <span className="font-medium">Semester:</span> {item.semester}
              </p>
              <p className="text-sm text-gray-300">
                <span className="font-medium">Course:</span> {item.course}
              </p>
              <p className="text-sm text-gray-300">
                <span className="font-medium">Views:</span> {item.views}
              </p>
              <a
                href={item.contentURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 mt-2 inline-block hover:underline text-sm break-words"
              >
                🔗 Preview / Download
              </a>
              <br />
              <button
                onClick={() => handleDelete(item._id)}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-semibold"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
