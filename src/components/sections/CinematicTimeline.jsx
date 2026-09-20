import React, { useRef, useState, useEffect } from "react";

export default function CinematicTimeline({ timeline = [] }) {
  const sectionRef = useRef(null);
  const yearsNavRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Touch swipe support for mobile
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Desktop scroll-driven timeline progress (disabled on mobile)
  useEffect(() => {
    if (isMobile) return;

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

  // Preload nearby images for buttery transitions
  const [loadedIndices, setLoadedIndices] = useState(() => new Set([0, 1, 2]));

  useEffect(() => {
    setLoadedIndices((prev) => {
      const next = new Set(prev);
      next.add(activeIndex);
      if (activeIndex + 1 < timeline.length) next.add(activeIndex + 1);
      if (activeIndex - 1 >= 0) next.add(activeIndex - 1);
      return next;
    });
  }, [activeIndex, timeline.length]);

  // Scroll active year pill into view smoothly on mobile
  useEffect(() => {
    if (yearsNavRef.current) {
      const activeBtn = yearsNavRef.current.querySelector(".timeline-year-pill.active");
      if (activeBtn && typeof activeBtn.scrollIntoView === "function") {
        activeBtn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : timeline.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < timeline.length - 1 ? prev + 1 : 0));
  };

  const handleTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (!e.changedTouches || e.changedTouches.length === 0) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    // Only register horizontal swipe if it dominates vertical scroll
    if (Math.abs(deltaX) > 42 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const current = timeline[activeIndex] || timeline[0] || {};

  return (
    <>
      {/* ========================================================
          DESKTOP VIEW: Cinematic 30% Text / 70% Sticky Photograph
          (Hidden on mobile via CSS)
      ======================================================== */}
      <section
        ref={sectionRef}
        className="timeline-scroll-section timeline-desktop-section"
        id="milestones"
        style={{
          height: `${timeline.length * 85}vh`,
          position: "relative",
        }}
      >
        <div
          className="timeline-stage"
          style={{
            position: "sticky",
            height: "100svh",
          }}
        >
          {/* Background photograph with progressive cached loading */}
          <div className="timeline-bg">
            {timeline.map((item, idx) => {
              const isLoaded = loadedIndices.has(idx);
              return (
                <div
                  key={`desktop-${item.title}-${idx}`}
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

          {/* Vignette & Grain */}
          <div className="timeline-shade" />
          <div className="hero-grain" />

          {/* Left-anchored 30% text content */}
          <div className="timeline-container">
            <div className="timeline-content-box">
              <div className="timeline-year-watermark">
                {current.year}
              </div>

              <h2 className="timeline-slide-title">
                {current.title}
              </h2>
            </div>
          </div>

          {/* Desktop Navigation & Milestone Tracker */}
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
          </div>
        </div>
      </section>

      {/* ========================================================
          MOBILE VIEW: Dedicated Responsive Section with
          100% Completely Visible Uncropped Images
          (Hidden on desktop via CSS)
      ======================================================== */}
      <section
        className="timeline-mobile-section"
        id="milestones-mobile"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="timeline-mobile-container">
          {/* Header */}
          <div className="timeline-mobile-header">
            <div
              className="eyebrow"
              style={{
                color: "var(--color-accent)",
                letterSpacing: "0.2em",
                fontWeight: 700,
                fontSize: "0.95rem",
              }}
            >
              MILESTONES & JOURNEY
            </div>
            <h2 className="timeline-mobile-heading">
              Our Milestones
            </h2>
          </div>

          {/* Horizontal Scrollable Year Selector Bar */}
          <div className="timeline-mobile-years-wrap" ref={yearsNavRef}>
            <div className="timeline-mobile-years">
              {timeline.map((item, idx) => (
                <button
                  key={`year-pill-${idx}`}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`timeline-year-pill ${idx === activeIndex ? "active" : ""}`}
                >
                  {item.year}
                </button>
              ))}
            </div>
          </div>

          {/* Dedicated Milestone Card with 100% Uncropped Image */}
          <div className="timeline-mobile-card">
            {/* Image Container with 100% contain fit - ZERO CROP */}
            <div className="timeline-mobile-image-frame">
              <img
                key={current.image}
                src={current.image}
                alt={current.title}
                className="timeline-mobile-img"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Content area: Year & H2 Title only */}
            <div className="timeline-mobile-body">
              <div className="timeline-mobile-year-tag">
                {current.year}
              </div>
              <h2 className="timeline-mobile-title">
                {current.title}
              </h2>
            </div>
          </div>

          {/* Controls & Counter */}
          <div className="timeline-mobile-controls">
            <div className="timeline-mobile-counter">
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

            <div className="timeline-mobile-buttons">
              <button
                type="button"
                onClick={handlePrev}
                className="btn btn-sm btn-secondary"
                aria-label="Previous Milestone"
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="btn btn-sm btn-primary"
                aria-label="Next Milestone"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Touch navigation hint */}
          <div className="timeline-mobile-hint">
            ← Swipe left/right or tap years above →
          </div>
        </div>
      </section>
    </>
  );
}
