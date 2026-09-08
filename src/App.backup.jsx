import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact";
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./index.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/*
  SHRIKANT SPORTS CLUB — FULL CINEMATIC PARALLEL BUILD

  Asset folders expected inside:
  C:\Users\pc\SSC\src\assets\

  logo
  hero
  living-photograph
  more-than-ganpati
  moments
  people
  closing
  ganesh-utsav

  IMPORTANT:
  We intentionally use Vite's import.meta.glob() so the code does not
  assume filenames. The actual production assets remain inside src/assets.
*/

const images = import.meta.glob(
  "./assets/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
  { eager: true, query: "?url", import: "default" }
);

const videos = import.meta.glob(
  "./assets/**/*.{mp4,webm,mov,m4v,MP4,WEBM,MOV,M4V}",
  { eager: true, query: "?url", import: "default" }
);

function getFolderAssets(source, folder) {
  return Object.entries(source)
    .filter(([path]) => {
      const normalized = path.replaceAll("\\", "/").toLowerCase();
      return (
        normalized.includes(`/assets/${folder.toLowerCase()}/`) ||
        normalized.includes(`/assets/${folder.toLowerCase()}.`)
      );
    })
    .map(([path, url]) => ({
      path,
      url,
      name: path.split("/").pop()?.toLowerCase() || "",
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function firstMatching(assets, keywords = []) {
  return (
    assets.find((asset) =>
      keywords.some((keyword) => asset.name.includes(keyword))
    )?.url || assets[0]?.url || ""
  );
}

const assetGroups = {
  logo: getFolderAssets(images, "logo"),
  heroImages: getFolderAssets(images, "hero"),
  heroVideos: getFolderAssets(videos, "hero"),
  living: getFolderAssets(images, "living-photograph"),
  beyond: getFolderAssets(images, "more-than-ganpati"),
  moments: getFolderAssets(images, "moments"),
  carousel: getFolderAssets(images, "carousel"),
  people: getFolderAssets(images, "people"),
  closing: getFolderAssets(images, "closing"),
  utsavVideos: getFolderAssets(videos, "ganesh-utsav"),
};

const logo =
  firstMatching(assetGroups.logo, ["logo", "crest", "mark"]) ||
  firstMatching(images, ["logo", "crest"]);

const heroVideo =
  assetGroups.heroVideos[0]?.url ||
  firstMatching(assetGroups.heroImages, ["hero", "ganpati"]);

const living = [
  firstMatching(assetGroups.living, ["community", "communit"]),
  firstMatching(assetGroups.living, ["tradition", "traditional", "culture"]),
  firstMatching(assetGroups.living, ["family", "famil"]),
].filter(Boolean);

const beyondImages = assetGroups.beyond.map((asset) => asset.url);

const momentImages = (assetGroups.carousel.length ? assetGroups.carousel : assetGroups.moments).map((asset) => asset.url);

const peopleImages = assetGroups.people.map((asset) => asset.url);

const closingImages = assetGroups.closing.map((asset) => asset.url);

const utsavVideo = assetGroups.utsavVideos[0]?.url || "";

/* -------------------------------------------------------
   GENERIC SCROLL PROGRESS
------------------------------------------------------- */

function useProgress(ref) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      const total = rect.height + vh;
      const value = (vh - rect.top) / total;

      setProgress(Math.max(0, Math.min(1, value)));
    };

    const request = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);

    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return progress;
}

function useReveal() {
  useEffect(() => {
    const elements = [...document.querySelectorAll("[data-reveal]")];

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

/* -------------------------------------------------------
   HEADER
------------------------------------------------------- */

const MENU = [
  ["Home", "#home"],
  ["Living Photograph", "#living-photograph"],
  ["More Than Ganpati", "#more-than-ganpati"],
  ["Moments", "#moments"],
  ["People Behind the Celebration", "#people"],
  ["Ganesh Utsav 2026", "#ganesh-utsav"],
  ["Our Story", "#about"],
  ["Contact", "#contact"],
];

function Header({ open, setOpen }) {
  return (
    <>
      <header className="site-header">
        <a href="#home" className="header-logo">
          {logo ? (
            <img src={logo} alt="Shrikant Sports Club" />
          ) : (
            <span className="logo-fallback">SSC</span>
          )}
          <span className="header-brand">
            <strong>Shrikant</strong>
            <small>Sports Club</small>
          </span>
        </a>

        <button
          type="button"
          className={`menu-button ${open ? "is-open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span />
          <span />
        </button>
      </header>

      <aside className={`fullscreen-menu ${open ? "is-open" : ""}`}>
        <div className="menu-glow" />

        <div className="menu-shell">
          <div className="menu-meta">
            <span>SHRIKANT SPORTS CLUB</span>
            <span>GANESH UTSAV 2026</span>
          </div>

          <nav>
            {MENU.map(([label, href], index) => (
              <a
                href={href}
                key={label}
                onClick={() => setOpen(false)}
                style={{ "--delay": `${index * 55}ms` }}
              >
                <i>{String(index + 1).padStart(2, "0")}</i>
                <span>{label}</span>
                <b>↗</b>
              </a>
            ))}
          </nav>

          <div className="menu-bottom">
            <span>COMMUNITY · TRADITION · FAMILY</span>
            <span>MUMBAI</span>
          </div>
        </div>
      </aside>
    </>
  );
}

/* -------------------------------------------------------
   HERO — LOCAL VIDEO
------------------------------------------------------- */

function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-media">
        {heroVideo ? (
          <video
            src={heroVideo}
            autoPlay
            muted
            playsInline
            preload="auto"
            loop={false}
            onEnded={(event) => {
              // Explicitly hold the final frame. No looping.
              event.currentTarget.pause();
            }}
          />
        ) : (
          <div className="asset-warning">
            Add hero video inside
            <br />
            <code>src/assets/hero</code>
          </div>
        )}
      </div>

      <div className="hero-shade" />
      <div className="hero-grain" />

      <div className="hero-content hero-content-centered">
        <div className="eyebrow reveal-up" data-reveal>
          SHRIKANT SPORTS CLUB PRESENTS
        </div>

        <h1 className="hero-title">
          <span className="hero-line reveal-up" data-reveal>
            GANAPATI
          </span>
          <span className="hero-line hero-gold reveal-up" data-reveal>
            BAPPA MORYA
          </span>
        </h1>
      </div>

      <div className="hero-scroll">
        <span>SCROLL TO DISCOVER</span>
        <i />
      </div>
    </section>
  );
}

/* -------------------------------------------------------
   LIVING PHOTOGRAPH
   NEW EFFECT:
   Not a generic 3D camera fly-through.

   The three photographs live in one "memory chamber".
   On scroll:
   - active photograph rises from a masked horizontal seam
   - previous image drifts diagonally away
   - next image waits slightly offset behind it
   - typography tracks at another speed
   - image scale breathes
   - a thin frame rotates by a fraction
------------------------------------------------------- */

function LivingPhotograph() {
  const ref = useRef(null);
  const p = useProgress(ref);

  const stories = [
    {
      title: "A COMMUNITY",
      kicker: "01 / THE PEOPLE",
      image: living[0],
      copy:
        "A celebration becomes meaningful because people come together to create it, experience it and carry it forward.",
    },
    {
      title: "THE TRADITION",
      kicker: "02 / THE ROOTS",
      image: living[1],
      copy:
        "The rituals, memories and familiar gestures that give every celebration its sense of belonging.",
    },
    {
      title: "A FAMILY",
      kicker: "03 / THE BOND",
      image: living[2],
      copy:
        "Beyond the event itself, there is a bond that keeps people connected year after year.",
    },
  ];

  const raw = p * stories.length;
  const active = Math.min(stories.length - 1, Math.floor(raw));
  const local = Math.max(0, Math.min(1, raw - active));

  return (
    <section
      ref={ref}
      className="living-section"
      id="living-photograph"
    >
      <div className="living-sticky">
        <div className="living-label">
          <span>01</span>
          A LIVING PHOTOGRAPH
        </div>

        <div className="living-stage">
          {stories.map((story, index) => {
            const offset = index - active;
            const isActive = index === active;
            const isPrevious = offset < 0;
            const isNext = offset > 0;

            let translateX = 0;
            let translateY = 0;
            let rotate = 0;
            let scale = 1;
            let opacity = 0;

            if (isActive) {
              translateX = local * -5;
              translateY = local * -3;
              rotate = local * -1.1;
              scale = 1 + local * 0.035;
              opacity = 1;
            } else if (isPrevious) {
              translateX = -18 - local * 9;
              translateY = -10 - local * 5;
              rotate = -3 - local * 2;
              scale = 0.93;
              opacity = 0.28;
            } else if (isNext) {
              translateX = 13 + local * 5;
              translateY = 10 + local * 5;
              rotate = 2 + local;
              scale = 0.91;
              opacity = 0.32;
            }

            return (
              <figure
                key={`${story.title}-${index}`}
                className={`living-frame ${
                  isActive ? "is-active" : ""
                }`}
                style={{
                  transform: `translate3d(${translateX}%, ${translateY}%, 0) rotate(${rotate}deg) scale(${scale})`,
                  opacity,
                  zIndex: isActive ? 10 : isPrevious ? 4 : 3,
                }}
              >
                {story.image ? (
                  <img src={story.image} alt={story.title} />
                ) : (
                  <div className="asset-warning">
                    Missing living photograph
                  </div>
                )}
                <div className="living-frame-overlay" />
                <div className="living-frame-edge" />
              </figure>
            );
          })}

          <div className="living-center-line" />
        </div>

        <div className="living-copy">
          {stories.map((story, index) => (
            <div
              className={`living-copy-block ${
                index === active ? "is-active" : ""
              }`}
              key={story.title}
            >
              <span>{story.kicker}</span>
              <h2>{story.title}</h2>
              <p>{story.copy}</p>
            </div>
          ))}
        </div>

        <div className="living-index">
          {stories.map((_, i) => (
            <span className={i === active ? "active" : ""} key={i}>
              {String(i + 1).padStart(2, "0")}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------
   MORE THAN GANPATI
   Production images come ONLY from more-than-ganpati.
------------------------------------------------------- */

const BEYOND_COPY = [
  ["SPORTS", "Energy. Participation. Team spirit."],
  [
    "CULTURAL ACTIVITIES",
    "Celebrating talent, creativity and tradition.",
  ],
  [
    "SOCIAL ACTIVITIES",
    "Coming together with a sense of community and responsibility.",
  ],
  [
    "COMMUNITY EVENTS",
    "Creating opportunities for people to connect, participate and celebrate.",
  ],
];

function BeyondRow({ image, index }) {
  const ref = useRef(null);
  const p = useProgress(ref);
  const [title, line] = BEYOND_COPY[index % BEYOND_COPY.length];
  const flip = index % 2 === 1;

  // Center-outward reveal:
  // the image starts as a narrow vertical window at the centre and
  // expands symmetrically to the left and right as the row scrolls in.
  const revealProgress = Math.min(1, Math.max(0, p * 2));
  const sideInset = 38 * (1 - revealProgress);

  const textDrift = (0.5 - p) * -42;
  const numberDrift = (0.5 - p) * 62;

  return (
    <article
      ref={ref}
      className={`beyond-row ${flip ? "flip" : ""}`}
    >
      <div
        className="beyond-image beyond-center-reveal"
        style={{
          clipPath: `inset(0 ${sideInset}% 0 ${sideInset}%)`,
        }}
      >
        <div className="beyond-image-inner">
          {image ? (
            <img
              src={image}
              alt={title}
              loading="eager"
              draggable="false"
            />
          ) : (
            <div className="asset-warning">
              Missing More Than Ganpati image
            </div>
          )}
        </div>
        <div className="beyond-image-overlay" />
      </div>

      <div
        className="beyond-copy"
        style={{
          transform: `translate3d(0, ${textDrift}px, 0)`,
        }}
      >
        <div
          className="beyond-number"
          style={{
            transform: `translate3d(0, ${numberDrift}px, 0)`,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        <div
          className={`beyond-text ${
            flip ? "reveal-left" : "reveal-right"
          }`}
          data-reveal
        >
          <h3>{title}</h3>
          <p>{line}</p>
          <small>COMMUNITY · PARTICIPATION · BELONGING</small>
          <div className="gold-rule" />
        </div>
      </div>
    </article>
  );
}

function MoreThanGanpati() {
  const ref = useRef(null);
  const p = useProgress(ref);

  const imagesForRows = useMemo(
    () => [
      new URL(
        "./assets/more-than-ganpati/sports.jpg",
        import.meta.url
      ).href,
      new URL(
        "./assets/more-than-ganpati/Culture.png",
        import.meta.url
      ).href,
      new URL(
        "./assets/more-than-ganpati/social.jpg",
        import.meta.url
      ).href,
      new URL(
        "./assets/more-than-ganpati/Community.jpg",
        import.meta.url
      ).href,
    ],
    []
  );

  return (
    <section
      ref={ref}
      className="beyond-section"
      id="more-than-ganpati"
    >
      <div
        className="beyond-morya"
        style={{
          transform: `translate3d(-50%, ${(0.5 - p) * 180}px, 0)`,
        }}
      >
        MORYA
      </div>

      <div
        className="beyond-halo"
        style={{
          transform: `translate3d(-50%, ${-p * 120}px, 0)`,
        }}
      />

      <div className="beyond-container">
        <header className="beyond-header">
          <div>
            <div className="eyebrow reveal-up" data-reveal>
              <span />
              BEYOND THE FESTIVAL
            </div>

            <h2 className="beyond-title">
              <span className="reveal-up" data-reveal>MORE</span>
              <span className="reveal-up" data-reveal>THAN</span>
              <span className="reveal-up gold" data-reveal>GANPATI</span>
            </h2>
          </div>

          <div className="beyond-intro">
            <div className="beyond-statement reveal-right" data-reveal>
              A YEAR OF COMMUNITY.
              <br />
              A YEAR OF TOGETHERNESS.
            </div>

            <p className="reveal-up" data-reveal>
              The spirit of Shrikant Sports Club lives far beyond the
              festival — through sports, cultural activities, social
              initiatives and community events.
            </p>
          </div>
        </header>

        <div className="beyond-list">
          {imagesForRows.map((image, index) => (
            <BeyondRow
              key={index}
              image={image}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------
   MOMENTS — VERTICAL SCROLL -> HORIZONTAL CAROUSEL
   The centered photograph becomes the hero frame.
------------------------------------------------------- */

function Moments() {
  const ref = useRef(null);
  const p = useProgress(ref);

  const frames = momentImages.length
    ? momentImages
    : beyondImages.length
      ? beyondImages
      : living;

  const count = frames.length;
  const active = Math.min(count - 1, Math.round(p * (count - 1)));

  return (
    <section ref={ref} className="moments-section" id="moments">
      <div className="moments-sticky">
        <header className="moments-header">
          <div>
            <div className="eyebrow dark reveal-up" data-reveal>
              <span />
              MOMENTS
            </div>
            <h2 data-reveal className="moments-title reveal-up">
              THAT BRING
              <br />
              <em>US TOGETHER</em>
            </h2>
          </div>

          <p className="moments-intro reveal-up" data-reveal>
            Some moments are celebrated.
            <br />
            Some are remembered.
            <br />
            Some become part of who we are.
          </p>
        </header>

        <div className="moments-rail">
          <div
            className="moments-track"
            style={{
              transform: `translate3d(${
                -(active * 33.2) + 14
              }vw, 0, 0)`,
            }}
          >
            {frames.map((src, index) => {
              const distance = Math.abs(index - active);
              const isCenter = index === active;

              return (
                <figure
                  key={`${src}-${index}`}
                  className={`moment-frame ${
                    isCenter ? "center" : ""
                  }`}
                  style={{
                    transform: `translate3d(0, ${
                      (index % 2 ? 12 : -12) *
                      Math.min(distance, 2)
                    }px, 0) scale(${
                      isCenter ? 1 : Math.max(0.88, 0.97 - distance * 0.025)
                    })`,
                    zIndex: isCenter ? 10 : 1,
                  }}
                >
                  <img src={src} alt={`Shrikant Sports Club moment ${index + 1}`} />
                  <div className="moment-overlay" />
                  <figcaption>
                    <span>
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(count).padStart(2, "0")}
                    </span>
                    <strong>
                      {isCenter ? "A MOMENT TO REMEMBER" : "SHRIKANT"}
                    </strong>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>

        <div className="moments-progress">
          <span>{String(active + 1).padStart(2, "0")}</span>
          <i>
            <b style={{ width: `${Math.max(3, p * 100)}%` }} />
          </i>
          <span>{String(count).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------
   PEOPLE BEHIND THE CELEBRATION
   Local people assets + slow hover zoom.
------------------------------------------------------- */

function People() {
  const ref = useRef(null);
  const p = useProgress(ref);

  return (
    <section ref={ref} className="people-section" id="people">
      <div className="people-header">
        <div>
          <div className="eyebrow dark reveal-up" data-reveal>
            <span />
            THE PEOPLE BEHIND THE CELEBRATION
          </div>
          <h2 className="people-title reveal-up" data-reveal>
            THE HEART
            <br />
            <em>BEHIND IT ALL</em>
          </h2>
        </div>

        <p className="people-intro reveal-up" data-reveal>
          Every celebration has people behind it.
          <br />
          The planning. The preparation. The coordination.
          <br />
          The countless hours behind the scenes.
        </p>
      </div>

      <div className="people-grid">
        {[
          ["person-01", "Rohan Deshmukh", "Festival Coordinator"],
          ["person-02", "Amit Patil", "Sports Convenor"],
          ["person-03", "Neha Joshi", "Cultural Coordinator"],
          ["person-04", "Sanjay More", "Community Volunteer"],
        ].map(([key, name, role], index) => {
          const src = peopleImages.find((item) =>
            item.toLowerCase().includes(key)
          ) || peopleImages[index];

          return (
            <figure
              className="person-card"
              data-reveal
              key={`${key}-${src || index}`}
              style={{
                transform: `translate3d(0, ${
                  (0.5 - p) * (index % 2 ? 46 : -46)
                }px, 0)`,
              }}
            >
              <div className="person-image">
                {src ? (
                  <img
                    src={src}
                    alt={`${name}, ${role}`}
                  />
                ) : (
                  <div className="asset-warning">
                    Missing people asset
                  </div>
                )}
                <div className="person-overlay" />
                <figcaption className="person-caption">
                  <span>0{index + 1}</span>
                  <strong>{name}</strong>
                  <small>{role}</small>
                </figcaption>
              </div>
            </figure>
          );
        })}
      </div>
    </section>
  );
}

/* -------------------------------------------------------
   GANESH UTSAV 2026
------------------------------------------------------- */

function GaneshUtsav() {
  const ref = useRef(null);
  const p = useProgress(ref);

  return (
    <section ref={ref} className="utsav-section" id="ganesh-utsav">
      <div className="utsav-media">
        {utsavVideo ? (
          <video
            src={utsavVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <div className="asset-warning">
            Add Ganesh Utsav video inside
            <br />
            <code>src/assets/ganesh-utsav</code>
          </div>
        )}
      </div>

      <div className="utsav-shade" />

      <div className="utsav-content utsav-content-centered">
        <div className="eyebrow reveal-up" data-reveal>
          THE NEXT CHAPTER
        </div>

        <h2>
          GANESHOTSAV <em>2026</em>
        </h2>
      </div>
    </section>
  );
}

/* -------------------------------------------------------
   CLOSING — LAYERED SCROLL FINALE
   Each scroll phase introduces a different layer.
------------------------------------------------------- */

function Closing() {
  const ref = useRef(null);
  const p = useProgress(ref);

  const orderedClosing = useMemo(() => {
    const rank = (url) => {
      const name = url.split("/").pop()?.toLowerCase() || "";
      if (name.includes("idol")) return 0;
      const match = name.match(/layer\s*(\d+)/);
      return match ? Number(match[1]) : 99;
    };
    return [...closingImages].sort((a, b) => rank(a) - rank(b));
  }, []);

  const frames = orderedClosing.length ? orderedClosing : living;
  const phaseCount = Math.max(frames.length, 1);
  const phase = Math.min(phaseCount - 1, Math.floor(p * phaseCount));
  const local = Math.max(
    0,
    Math.min(1, p * phaseCount - phase)
  );

  return (
    <section ref={ref} className="closing-section" id="closing">
      <div className="closing-sticky">
        <div className="closing-bg-word">
          TOGETHER
        </div>

        {frames.map((src, index) => {
          const active = index === phase;
          const previous = index < phase;

          const x = active
            ? (0.5 - local) * 10
            : previous
              ? -10 - local * 8
              : 12 + local * 5;

          const y = active
            ? (0.5 - local) * 6
            : previous
              ? -9
              : 9;

          const scale = active
            ? 1 + local * 0.08
            : previous
              ? 0.96
              : 0.9;

          const opacity = active
            ? 1
            : previous
              ? 0.15
              : 0.34;

          return (
            <figure
              className="closing-layer"
              key={`${src}-${index}`}
              style={{
                transform: `translate3d(calc(-50% + ${x}vw), calc(-50% + ${y}vh), 0) scale(${scale})`,
                opacity,
                zIndex: active ? 5 : index,
              }}
            >
              {src ? (
                <img
                  src={src}
                  alt={`Closing memory ${index + 1}`}
                />
              ) : (
                <div className="asset-warning">
                  Add images to
                  <br />
                  <code>src/assets/closing</code>
                </div>
              )}
              <div className="closing-image-shade" />
            </figure>
          );
        })}

        <div className="closing-copy">
          <div
            className="closing-eyebrow"
            style={{
              opacity: Math.min(1, p * 5),
              transform: `translate3d(0, ${
                (1 - Math.min(1, p * 5)) * 35
              }px, 0)`,
            }}
          >
            TOGETHER
          </div>

          <h2>
            <span
              style={{
                opacity: p > 0.2 ? 1 : 0,
                transform: `translate3d(0, ${
                  p > 0.2 ? 0 : 40
                }px, 0)`,
              }}
            >
              TOGETHER
            </span>
            <span
              style={{
                opacity: p > 0.48 ? 1 : 0,
                transform: `translate3d(0, ${
                  p > 0.48 ? 0 : 40
                }px, 0)`,
              }}
            >
              AS ONE.
            </span>
          </h2>

          <div
            className="closing-morya"
            style={{
              opacity: p > 0.68 ? 1 : 0,
              transform: `scale(${
                p > 0.68
                  ? Math.min(1, 0.72 + (p - 0.68) * 3)
                  : 0.72
              })`,
            }}
          >
            MORYA!
          </div>

          <p
            style={{
              opacity: p > 0.82 ? 1 : 0,
              transform: `translate3d(0, ${
                p > 0.82 ? 0 : 30
              }px, 0)`,
            }}
          >
            The celebration may have its moments, traditions and
            rituals. Its true spirit lives in the people who come
            together.
          </p>
        </div>

        <div className="closing-counter">
          <span>0{phase + 1}</span>
          <i>
            <b style={{ width: `${local * 100}%` }} />
          </i>
          <span>{String(phaseCount).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------
   FOOTER
------------------------------------------------------- */

function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-marquee">
        GANPATI BAPPA MORYA · SHRIKANT SPORTS CLUB · COMMUNITY · TRADITION · FAMILY
      </div>

      <div className="footer-main">
        <div className="footer-brand">
          {logo ? (
            <img src={logo} alt="Shrikant Sports Club logo" />
          ) : (
            <div className="logo-fallback large">SSC</div>
          )}

          <h3>SHRIKANT SPORTS CLUB</h3>
          <p>
            A community built around faith, tradition, participation
            and togetherness.
          </p>
        </div>

        <div className="footer-column">
          <span>EXPLORE</span>
          <a href="#home">Home</a>
          <a href="#more-than-ganpati">More Than Ganpati</a>
          <a href="#moments">Moments</a>
          <a href="#people">People</a>
          <a href="#ganesh-utsav">Ganesh Utsav 2026</a>
        </div>

        <div className="footer-column">
          <span>CONNECT</span>
          <a href="#contact">Contact</a>
          <a href="#contact">Instagram</a>
          <a href="#contact">Facebook</a>
          <a href="#contact">YouTube</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Shrikant Sports Club</span>
        <span>GANESH UTSAV 2026</span>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------
   APP
------------------------------------------------------- */

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useReveal();

  return (
    <>
      <Header open={menuOpen} setOpen={setMenuOpen} />

      <main>
        <Hero />
        <LivingPhotograph />
        <GaneshUtsav />
        <MoreThanGanpati />
        <Moments />
        <People />
        <Closing />
        <Footer />
      </main>
    </>
  );
}
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;