import { Suspense, lazy, useEffect, useRef, useState } from "react";
import "./closing.css";

const MemoryScene = lazy(() => import("./MemoryScene.jsx"));

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const seg = (p, from, to) => clamp((p - from) / (to - from));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

function getLayers() {
  return import.meta.glob(
    "../assets/closing/*.{png,PNG,jpg,jpeg,webp}",
    { eager: true, query: "?url", import: "default" },
  );
}

function MemoryFallback({ p }) {
  const layers = getLayers();
  const urls = Object.entries(layers)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, url]) => url);

  const ordered = urls.length >= 6
    ? [urls[5], urls[0], urls[1], urls[2], urls[3], urls[4]]
    : urls;

  const travel = easeOut(clamp(p / 0.82));
  const finale = easeOut(seg(p, 0.78, 1));
  const camZ = lerp(0, 2400, travel);

  return (
    <div className="closing-memory-fallback" aria-hidden="true">
      {ordered.map((url, i) => {
        const base = -600 - i * 620;
        const z = lerp(base + camZ, -820 + i * 8, finale);
        const near = 1 - clamp(Math.abs(z) / 320);
        const opacity = Math.max(
          clamp((-z - 60) / 700),
          finale,
        ) * 0.95;

        return (
          <img
            key={url}
            src={url}
            alt=""
            className="closing-memory-fallback-image"
            style={{
              transform: `translate3d(-50%, -50%, 0) translateZ(${z}px) scale(${lerp(1, 0.62, finale)})`,
              opacity,
              filter: `brightness(${lerp(0.7, 1, clamp(opacity))}) saturate(0.95) blur(${near * 6}px)`,
            }}
          />
        );
      })}
    </div>
  );
}

export default function EnterTheMemory() {
  const wrapRef = useRef(null);
  const progressRef = useRef(0);
  const target = useRef(0);
  const [p, setP] = useState(0);
  const [webgl, setWebgl] = useState(null);

  useEffect(() => {
    setWebgl(supportsWebGL());
  }, []);

  useEffect(() => {
    let raf = 0;

    const read = () => {
      const el = wrapRef.current;
      if (!el) return;

      const total = el.offsetHeight - window.innerHeight;
      target.current = clamp(
        total > 0 ? -el.getBoundingClientRect().top / total : 0,
      );
    };

    const tick = () => {
      progressRef.current = lerp(
        progressRef.current,
        target.current,
        0.07,
      );

      if (
        Math.abs(progressRef.current - target.current) < 0.0002
      ) {
        progressRef.current = target.current;
      }

      setP(progressRef.current);
      raf = requestAnimationFrame(tick);
    };

    read();
    progressRef.current = target.current;
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, []);

  const finale = seg(p, 0.82, 0.97);
  const intro = 1 - seg(p, 0.0, 0.1);

  return (
    <section
      ref={wrapRef}
      id="closing"
      aria-label="The closing memory of Shrikant Sports Club"
      className="closing-lovable-memory"
    >
      <div className="closing-lovable-sticky">
        <div
          className="closing-memory-ember"
          aria-hidden="true"
          style={{ opacity: 1 - seg(p, 0.06, 0.3) * 0.75 }}
        />

        {webgl === null ? null : webgl ? (
          <Suspense fallback={null}>
            <MemoryScene progressRef={progressRef} />
          </Suspense>
        ) : (
          <MemoryFallback p={p} />
        )}

        <div
          className="closing-memory-haze"
          aria-hidden="true"
          style={{ opacity: 1 - seg(p, 0.8, 1) * 0.55 }}
        />
        <div className="closing-memory-grain" aria-hidden="true" />

        <div className="closing-memory-typography" aria-hidden="true">
          <p className="closing-memory-intro" style={{ opacity: intro }}>
            ENTER THE MEMORY
          </p>

          <div className="closing-memory-stage-copy">
            {["A COMMUNITY.", "A TRADITION.", "A FAMILY."].map((text, i) => {
              const ranges = [
                [0.04, 0.3],
                [0.32, 0.58],
                [0.6, 0.79],
              ];
              const [start, end] = ranges[i];
              const a = seg(p, start, start + 0.09);
              const b = 1 - seg(p, end - 0.07, end);
              const opacity = Math.min(a, b) * (1 - finale);
              const z = lerp(-460, 210, seg(p, start, end));

              return (
                <h2
                  key={text}
                  style={{
                    opacity,
                    transform: `translate3d(-50%, -50%, 0) translateZ(${z}px) translateX(${(i - 1) * 2}vw)`,
                    filter: `blur(${lerp(14, 0, Math.min(1, opacity * 1.4))}px) drop-shadow(0 10px 46px rgba(0,0,0,0.6))`,
                  }}
                >
                  {text}
                </h2>
              );
            })}
          </div>

          <div
            className="closing-memory-finale-copy"
            style={{
              opacity: finale,
              transform: `translate3d(-50%, 0, ${lerp(-200, 0, easeOut(finale))}px)`,
            }}
          >
            <span className="closing-memory-finale-title">
              TOGETHER AS ONE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
