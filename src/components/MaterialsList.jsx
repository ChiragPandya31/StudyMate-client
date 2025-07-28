import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://studymate-server-production.up.railway.app";

const MaterialsList = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/materials`)
      .then(res => setMaterials(res.data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  return (
    <div>
      <h2>All Materials</h2>
      {materials.map((mat) => {
        const fileName = mat?.contentURL?.split("/").pop();
        const downloadLink = fileName ? `${BASE_URL}/uploads/${fileName}` : "#";

        return (
          <div key={mat._id}>
            <p><strong>{mat.title}</strong> ({mat.materialType})</p>
            <a
              href={downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              Download PDF
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default MaterialsList;
