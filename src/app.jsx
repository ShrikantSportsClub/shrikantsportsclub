import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageLayout from "./components/layout/PageLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Ganeshotsav2026 from "./pages/Ganeshotsav2026";
import Gallery from "./pages/Gallery";
import Members from "./pages/Members";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ganeshotsav2026" element={<Ganeshotsav2026 />} />
          <Route path="/ganesh-utsav-2026" element={<Navigate to="/ganeshotsav2026" replace />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/members" element={<Members />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}