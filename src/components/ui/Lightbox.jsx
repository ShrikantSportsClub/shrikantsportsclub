import React, { useEffect, useCallback } from "react";

export default function Lightbox({
  isOpen,
  onClose,
  images = [],
  currentIndex = 0,
  onIndexChange,
}) {
  const count = images.length;
  const currentItem = images[currentIndex] || {};
  const currentSrc = typeof currentItem === "string" ? currentItem : currentItem.src || currentItem.image;
  const currentTitle = typeof currentItem === "string" ? "" : currentItem.title || currentItem.name || "";
  const currentCaption = typeof currentItem === "string" ? "" : currentItem.caption || currentItem.line || currentItem.role || currentItem.text || "";
  const currentCategory = typeof currentItem === "string" ? "" : currentItem.category || currentItem.year || "";

  const handlePrev = useCallback(
    (e) => {
      e?.stopPropagation();
      if (count <= 1 || !onIndexChange) return;
      onIndexChange((currentIndex - 1 + count) % count);
    },
    [currentIndex, count, onIndexChange]
  );

  const handleNext = useCallback(
    (e) => {
      e?.stopPropagation();
      if (count <= 1 || !onIndexChange) return;
      onIndexChange((currentIndex + 1) % count);
    },
    [currentIndex, count, onIndexChange]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
      else if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentSrc) return null;

  // Mobile touch swipe gestures
  const touchStartX = React.useRef(0);
  const touchStartY = React.useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <div
      className="lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox Preview"
    >
      <div className="lightbox-backdrop" />

      {/* Top Header Bar */}
      <div className="lightbox-header" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-meta">
          {currentCategory && <span className="lightbox-category">{currentCategory}</span>}
          {count > 1 && (
            <span className="lightbox-counter">
              {String(currentIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
          )}
        </div>

        <button
          type="button"
          className="lightbox-close-btn"
          onClick={onClose}
          aria-label="Close Lightbox"
        >
          ✕
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        className="lightbox-stage"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {count > 1 && (
          <button
            type="button"
            className="lightbox-nav-btn lightbox-nav-prev"
            onClick={handlePrev}
            aria-label="Previous Image"
          >
            ←
          </button>
        )}

        <div className="lightbox-image-wrapper">
          <img
            src={currentSrc}
            alt={currentTitle || "Lightbox image"}
            decoding="async"
            className="lightbox-image"
          />
        </div>

        {count > 1 && (
          <button
            type="button"
            className="lightbox-nav-btn lightbox-nav-next"
            onClick={handleNext}
            aria-label="Next Image"
          >
            →
          </button>
        )}
      </div>

      {/* Bottom Caption */}
      {(currentTitle || currentCaption) && (
        <div className="lightbox-caption" onClick={(e) => e.stopPropagation()}>
          {currentTitle && <h4>{currentTitle}</h4>}
          {currentCaption && <p>{currentCaption}</p>}
        </div>
      )}
    </div>
  );
}
