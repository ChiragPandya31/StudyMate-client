import {Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Materials from "./pages/Materials";
import Notes from "./pages/features/Notes";
import Pyqs from "./pages/features/Pyqs";
import LabManual from "./pages/features/LabManual";
import AiTools from "./pages/features/AiTools";
import SearchPage from "./pages/features/SearchPage";
import UploadMaterial from "./pages/admin/UploadMaterial";
import AdminPanel from "./pages/admin/AdminPanel";
import NotFound from "./pages/NotFound";
import PyqUpload from "./pages/PyqUpload";
import QuizBattle from "./pages/QuizChallenge";
import PYQAnalyzer from "./pages/PYQAnalyzer";
import Feedback from "./pages/Feedback";
import Subject from "./pages/Subjects";
import SelectBranch from "./pages/SelectBranch";
import AllMaterials from "./pages/AllMaterials";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AdminLogin from "./pages/admin/AdminLogin";

function App() {
  return (
  
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/pyq-upload" element={<PyqUpload />} />
        <Route path="/pyq-analyzer" element={<PYQAnalyzer />} />
        <Route path="/degree" element={<SelectBranch />} />
        <Route path="/diploma" element={<SelectBranch />} />
        <Route path="/dashboard/:course/:branch" element={<Dashboard />} />
        <Route path="/subjects/:course/:branch/:semId" element={<Subject />} />
        <Route path="/materials/:course/:semId/:subjectId" element={<Materials />} />
        <Route path="/notes/:course/:semId/:subjectId" element={<Notes />} />
        <Route path="/pyqs/:course/:semId/:subjectId" element={<Pyqs />} />
        <Route path="/lab/:course/:semId/:subjectId" element={<LabManual />} />
        <Route path="/ai-tools/:course/:semId/:subjectId" element={<AiTools />} />
        <Route path="/ai-tools" element={<AiTools />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/quiz-battle" element={<QuizBattle />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/materials" element={<AllMaterials />} />
        <Route path="*" element={<NotFound />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminPanel />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedAdminRoute>
              <UploadMaterial />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    
  );
}

export default App;
