// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import HospitalExplorer from "./pages/Explore_now.js"; // import your explore page
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/explore" element={<HospitalExplorer />} />
      </Routes>
    </Router>
  );
}

export default App;
