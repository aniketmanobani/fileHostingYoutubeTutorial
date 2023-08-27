import { Route, Router, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/Homepage";
import Upload from "./pages/UploadPage";
import ViewFile from "./pages/ViewFile";
import Footer from "./components/Footer";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/view/:id" element={<ViewFile />} />
          <Route path="/adminpanel">
            <Route path="" element={<Dashboard />} />
            <Route path="login" element={<AdminLogin />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
