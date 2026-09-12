import React, { useEffect, useRef, useState } from "react";

// Import the 6 composition layers from src/assets
import layer1Idol from "../../assets/Layer 1.png";
import layer2Floor from "../../assets/Layer 2.png";
import layer3Temple from "../../assets/Layer 3.png";
import layer4Trees from "../../assets/Layer 4.png";
import layer5Sky from "../../assets/Layer 5.png";
import layer6Girl from "../../assets/Layer 6.png";

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const seg = (p, from, to) => clamp((p - from) / (to - from));
const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

// Proper depth order from furthest background (Sky) to nearest foreground (Devotee)
const REVEAL_LAYERS = [
  {
    src: layer5Sky,
    alt: "Sunset Sky Backdrop",
    z: 10,
    start: 0.00,
    span: 0.14,
    fromY: -30,
  },
  {
    src: layer3Temple,
    alt: "Illuminated Temple Architecture",
    z: 20,
    start: 0.14,
    span: 0.14,
    fromY: -60,
  },
  {
    src: layer4Trees,
    alt: "Overhead Trees and Canopy",
    z: 30,
    start: 0.28,
    span: 0.14,
    fromY: -80,
  },
  {
    src: layer2Floor,
    alt: "Sacred Floor, Rangoli and Brass Diyas",
    z: 40,
    start: 0.42,
    span: 0.14,
    fromY: 50,
  },
  {
    src: layer1Idol,
    alt: "Divine Ganpati Bappa on Throne",
    z: 50,
    start: 0.56,
    span: 0.16,
    fromY: -70,
  },
  {
    src: layer6Girl,
    alt: "Little Girl in Traditional Dress Praying",
    z: 60,
    start: 0.72,
    span: 0.14,
    fromY: 40,
  },
];

export default function GanpatiScrollReveal() {
  const wrapRef = useRef(null);
  const target = useRef(0);
  const current = useRef(0);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;

    const read = () => {
      const el = wrapRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      target.current = clamp(total > 0 ? -el.getBoundingClientRect().top / total : 0);
    };

    const tick = () => {
      current.current = lerp(current.current, target.current, 0.09);
      if (Math.abs(current.current - target.current) < 0.0002) {
        current.current = target.current;
      }
      setP(current.current);
      raf = requestAnimationFrame(tick);
    };

    read();
    current.current = target.current;
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, []);

  const messageProgress = seg(p, 0.84, 0.96);

  return (
    <section
      ref={wrapRef}
      id="ganpati-reveal"
      aria-label="Ganpati Divine Parallax Assembly Scene"
      className="ganpati-reveal-section"
    >
      <div className="ganpati-reveal-sticky">
        {/* Floating top eyebrow */}
        <div className="ganpati-reveal-meta">
          <span className="eyebrow">THE REVEAL</span>
          <span className="caption gold-text" style={{ letterSpacing: "0.2em" }}>
            SCROLL TO ASSEMBLE
          </span>
        </div>

        {/* Full-bleed composition canvas */}
        <div className="ganpati-reveal-canvas">
          {REVEAL_LAYERS.map((layer) => {
            const t = easeOutExpo(seg(p, layer.start, layer.start + layer.span));
            const translateY = lerp(layer.fromY, 0, t);
            const opacity = clamp(t * 1.5);

            return (
              <div
                key={layer.alt}
                className="ganpati-reveal-layer"
                style={{
                  zIndex: layer.z,
                  transform: `translate3d(0, ${translateY}%, 0)`,
                  opacity,
                  willChange: "transform, opacity",
                }}
              >
                <img
                  src={layer.src}
                  alt={layer.alt}
                  loading="lazy"
                  decoding="async"
                  className="ganpati-reveal-layer-img"
                />
              </div>
            );
          })}

          {/* Vignette Scrim */}
          <div
            className="ganpati-reveal-scrim"
            style={{
              opacity: messageProgress,
            }}
          />

          {/* Climax Finale Message */}
          <div
            className="ganpati-reveal-message"
            style={{
              opacity: messageProgress,
              transform: `translate3d(0, ${lerp(30, 0, easeOutExpo(messageProgress))}px, 0)`,
            }}
          >
            <span className="ganpati-reveal-eyebrow">
              ॐ गं गणपतये नमः
            </span>
            <h2 className="ganpati-reveal-title">
              TOGETHER AS ONE
            </h2>
            <div className="ganpati-reveal-morya">
              GANAPATI BAPPA MORYA
            </div>
          </div>
        </div>

        {/* Bottom edge progress line */}
        <div className="ganpati-reveal-footer">
          <div className="ganpati-reveal-track">
            <div
              className="ganpati-reveal-bar"
              style={{ width: `${Math.max(4, p * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
