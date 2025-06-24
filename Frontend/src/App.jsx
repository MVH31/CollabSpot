import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import DomainsPage from "./pages/DomainsPage";
import UploadPage from "./pages/UploadPage";
import PlagScanPage from "./pages/PlagScanPage";
import AboutUsPage from "./pages/AboutUsPage";
import ProjectsPage from "./pages/ProjectsPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/domains" element={<DomainsPage />} />
            <Route path="/domains/:id" element={<ProjectsPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/plagscan" element={<PlagScanPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
