import { Route, Router, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/Homepage";

function App() {
  return (
    <div className="container">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
