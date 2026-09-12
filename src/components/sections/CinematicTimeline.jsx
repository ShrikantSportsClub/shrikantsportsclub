import React, { useRef, useState, useEffect } from "react";

export default function CinematicTimeline({ timeline = [] }) {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // On mobile, avoid endless scroll distance and allow interactive tap controls

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollDist = -rect.top;
      const totalScroll = rect.height - window.innerHeight;
      if (totalScroll <= 0) return;
      const raw = Math.max(0, Math.min(1, scrollDist / totalScroll));
      const index = Math.min(timeline.length - 1, Math.floor(raw * timeline.length));
      setActiveIndex(index);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [timeline.length, isMobile]);

  const [loadedIndices, setLoadedIndices] = useState(() => new Set([0, 1]));

  useEffect(() => {
    setLoadedIndices((prev) => {
      const next = new Set(prev);
      next.add(activeIndex);
      if (activeIndex + 1 < timeline.length) next.add(activeIndex + 1);
      if (activeIndex - 1 >= 0) next.add(activeIndex - 1);
      return next;
    });
  }, [activeIndex, timeline.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : timeline.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < timeline.length - 1 ? prev + 1 : 0));
  };

  const current = timeline[activeIndex] || timeline[0];

  return (
    <section
      ref={sectionRef}
      className="timeline-scroll-section"
      id="milestones"
      style={{
        height: isMobile ? "auto" : `${timeline.length * 85}vh`,
        position: "relative",
      }}
    >
      <div
        className="timeline-stage"
        style={{
          position: isMobile ? "relative" : "sticky",
          height: isMobile ? "100svh" : "100svh",
          minHeight: isMobile ? "640px" : undefined,
        }}
      >
        {/* Full-width background images with progressive cached loading */}
        <div className="timeline-bg">
          {timeline.map((item, idx) => {
            const isLoaded = loadedIndices.has(idx);
            return (
              <div
                key={`${item.title}-${idx}`}
                className={`timeline-bg-slide ${idx === activeIndex ? "active" : ""}`}
              >
                {isLoaded && (
                  <img
                    src={item.image}
                    alt={item.title}
                    loading={idx === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Cinematic gradient vignette & grain */}
        <div className="timeline-shade" />
        <div className="hero-grain" />

        {/* Floating Content */}
        <div className="timeline-container">
          <div className="timeline-content-box">
            <div
              className="eyebrow"
              style={{
                color: "var(--color-accent)",
                letterSpacing: "0.26em",
                marginBottom: "0.25rem",
              }}
            >
              MILESTONES & JOURNEY · {current.year}
            </div>

            <div className="timeline-year-watermark">
              {current.year}
            </div>

            <h2 className="timeline-slide-title">
              {current.title}
            </h2>

            <div style={{ marginBottom: "1.25rem" }}>
              <span className="badge badge-accent">
                {current.category}
              </span>
            </div>

            <p className="timeline-slide-desc">
              {current.text}
            </p>
          </div>
        </div>

        {/* Bottom Milestone Navigation Bar */}
        <div className="timeline-nav-bar">
          <div className="timeline-counter-box">
            <span className="timeline-counter-active">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <div className="timeline-progress-track">
              <div
                className="timeline-progress-bar"
                style={{ width: `${((activeIndex + 1) / timeline.length) * 100}%` }}
              />
            </div>
            <span>{String(timeline.length).padStart(2, "0")}</span>
          </div>

          {isMobile ? (
            /* Mobile Quick Milestone Controls */
            <div style={{ display: "flex", gap: "8px", pointerEvents: "auto" }}>
              <button
                type="button"
                onClick={handlePrev}
                className="btn btn-sm btn-secondary"
                style={{ padding: "6px 12px", minHeight: "36px", cursor: "pointer" }}
                aria-label="Previous Milestone"
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="btn btn-sm btn-primary"
                style={{ padding: "6px 14px", minHeight: "36px", cursor: "pointer" }}
                aria-label="Next Milestone"
              >
                Next →
              </button>
            </div>
          ) : (
            <div
              className="timeline-nav-hint"
              style={{
                fontSize: "0.8rem",
                letterSpacing: "0.2em",
                color: "var(--color-accent)",
                fontFamily: "var(--font-display)",
                textTransform: "uppercase",
              }}
            >
              SCROLL TO DISCOVER ↓
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
