import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ReaderPage from "./pages/ReaderPage";
import NarratorPage from "./pages/NarratorPage";

const AppRouter = ({ toggleTheme }) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reader" element={<ReaderPage toggleTheme={toggleTheme} />} />
        <Route path="/narrator" element={<NarratorPage toggleTheme={toggleTheme} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
