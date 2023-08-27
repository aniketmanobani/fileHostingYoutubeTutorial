import { Route, Router, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/Homepage";
import Upload from "./pages/UploadPage";
import ViewFile from "./pages/ViewFile";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/view/:id" element={<ViewFile />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
