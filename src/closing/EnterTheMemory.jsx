import React, { useEffect, useRef, useState } from "react";
import MemoryScene from "./MemoryScene";

export default function EnterTheMemory() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;

      if (scrollable <= 0) {
        setProgress(0);
        return;
      }

      const value = -rect.top / scrollable;

      setProgress(
        Math.max(0, Math.min(1, value))
      );
    };

    updateProgress();

    window.addEventListener(
      "scroll",
      updateProgress,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateProgress
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateProgress
      );

      window.removeEventListener(
        "resize",
        updateProgress
      );
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="ssc-closing-memory"
    >
      <div className="ssc-closing-sticky">
        <MemoryScene progress={progress} />

        <div
          className="ssc-closing-message"
          style={{
            opacity:
              progress > 0.82
                ? Math.min(
                    1,
                    (progress - 0.82) / 0.18
                  )
                : 0,
          }}
        >
          <div className="ssc-closing-eyebrow">
            SHRIKANT SPORTS CLUB
          </div>

          <h2>
            Together
            <br />
            As One
          </h2>
        </div>
      </div>
    </section>
  );
}