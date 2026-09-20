import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageLayout from "./components/layout/PageLayout";

// Route-level code splitting for PageSpeed & mobile performance
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Ganeshotsav2026 = lazy(() => import("./pages/Ganeshotsav2026"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Members = lazy(() => import("./pages/Members"));
const Contact = lazy(() => import("./pages/Contact"));

// Minimal luxury loader matching dark gold aesthetic
function PageLoader() {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        background: "var(--color-bg, #FAF8F5)",
      }}
      aria-label="Loading page content"
    >
      <div
        style={{
          width: "36px",
          height: "36px",
          border: "2px solid rgba(168, 123, 36, 0.2)",
          borderTopColor: "var(--color-accent, #A87B24)",
          borderRadius: "50%",
          animation: "pageSpin 0.7s linear infinite",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-body, Manrope, sans-serif)",
          fontSize: "0.75rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--color-accent, #A87B24)",
        }}
      >
        SHRIKANT SPORTS CLUB
      </span>
      <style>{`
        @keyframes pageSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </PageLayout>
    </BrowserRouter>
  );
}