import { useEffect, useState } from "react";
import axios from "axios";

const MaterialsList = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/materials")
      .then(res => setMaterials(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>All Materials</h2>
      {materials.map((mat) => (
        <div key={mat._id}>
          <p><strong>{mat.title}</strong> ({mat.materialType})</p>
         <a
          href={`https://studymate-server-production.up.railway.app/download/${mat.contentURL.split("/").pop()}`}
          target="_blank"
          rel="noopener noreferrer"
            >
          Download PDF
        </a>
          
        </div>
      ))}
    </div>
  );
};

export default MaterialsList;
