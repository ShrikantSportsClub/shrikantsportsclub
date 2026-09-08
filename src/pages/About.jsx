import React, { useState, useEffect } from "react";
import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Divider from "../components/ui/Divider";
import Icon from "../components/ui/Icon";
import Lightbox from "../components/ui/Lightbox";
import CinematicTimeline from "../components/sections/CinematicTimeline";

import aboutHero from "../assets/About/about-hero.png";
import foundingBanner from "../assets/About/about-founding-banner.png";
import shrikant from "../assets/About/shrikant.jpg";
import ganapati from "../assets/About/about-ganapati.png";

import eyeCheckup from "../assets/About/timeline-eye-checkup.png";
import healthCheckup from "../assets/About/timeline-health-checkup.png";
import glassMosaic from "../assets/About/timeline-glass-mosaic.png";
import ashram from "../assets/About/timeline-ashram.png";
import rangoli from "../assets/About/timeline-rangoli.png";
import jyeshtha from "../assets/About/timeline-jyeshtha-nagrik.png";
import kutumb from "../assets/About/timeline-kutumb-melawa.png";
import khel from "../assets/About/timeline-khel-paithanicha.png";
import roadNaming from "../assets/About/timeline-road-naming.png";
import spl from "../assets/About/timeline-spl.png";
import carrom2024 from "../assets/About/timeline-carrom-2024.png";
import carrom2025 from "../assets/About/timeline-carrom-2025.png";

import community01 from "../assets/About/community-01.jpeg";
import community02 from "../assets/About/community-02.jpg";
import community03 from "../assets/About/community-03.jpeg";
import legacyImg from "../assets/About/about-legacy.jpg";
import aboutCommunity from "../assets/About/about-community.jpg";
import tejas01 from "../assets/About/tejas-01.jpg";
import tejas02 from "../assets/About/tejas-02.jpg";

const TIMELINE = [
  {
    year: "2016",
    title: "Eye Check Up Camp",
    category: "Health Welfare",
    text: "A pioneering step towards accessible community healthcare, providing free ophthalmology screenings and spectacles for elderly residents.",
    image: eyeCheckup,
  },
  {
    year: "2017",
    title: "Comprehensive Health Camp",
    category: "Medical Care",
    text: "Promoting good health through free general medical diagnostics, blood pressure screenings, and preventive consultations for all local families.",
    image: healthCheckup,
  },
  {
    year: "2017",
    title: "Glass Mosaic Art Workshop",
    category: "Culture & Art",
    text: "Encouraging artistic creativity, participation, and vocational expression through an interactive glass mosaic craft workshop.",
    image: glassMosaic,
  },
  {
    year: "2017",
    title: "Nityanand Ashram Donation",
    category: "Social Giving",
    text: "Standing together for a better tomorrow through essential food supplies, blankets, and educational materials distributed to Nityanand Ashram.",
    image: ashram,
  },
  {
    year: "2017",
    title: "Selfie With Rangoli Contest",
    category: "Festival Spirit",
    text: "Celebrating festive joy, women empowerment, and neighborhood creativity with an engaging rangoli competition.",
    image: rangoli,
  },
  {
    year: "2018",
    title: "Jyeshtha Nagrik Sanman",
    category: "Honoring Elders",
    text: "Felicitation ceremony honoring the senior citizens whose wisdom, blessings, and lifelong contributions form our foundation.",
    image: jyeshtha,
  },
  {
    year: "2018",
    title: "Kutumb Melawa",
    category: "Family Gathering",
    text: "Bringing hundreds of families and generations together as one united, joyful Shrikant Sports Club family.",
    image: kutumb,
  },
  {
    year: "2019",
    title: "Khel Paithanicha",
    category: "Cultural Tradition",
    text: "Keeping Maharashtrian culture and joyful competition alive through our celebrated traditional game show event for women.",
    image: khel,
  },
  {
    year: "2021",
    title: "Neighbourhood Road Naming",
    category: "Civic Identity",
    text: "A landmark civic contribution cementing the cultural identity and neighborhood pride of our community in Mumbai.",
    image: roadNaming,
  },
  {
    year: "2023",
    title: "Shrikant Premier League (SPL)",
    category: "Sports Excellence",
    text: "The sporting spirit reached new heights with the launch of our premier tennis ball cricket league, uniting local teams.",
    image: spl,
  },
  {
    year: "2024",
    title: "State Level Carrom Tournament",
    category: "State Competition",
    text: "Elevating the sporting platform with an officially recognized Maharashtra state-level carrom competition with top players.",
    image: carrom2024,
  },
  {
    year: "2025",
    title: "State Carrom Championship 2.0",
    category: "Sports Milestone",
    text: "Expanding tournament participation across Maharashtra, creating scholarships and mentorship for emerging athletes.",
    image: carrom2025,
  },
];

const TEJAS_SLIDES = [
  {
    image: tejas01,
    title: "TEJAS SHAH",
    subtitle: "1973 — 2025",
    alt: "Tejas Shah — In Loving Memory",
    objectPosition: "center top",
  },
  {
    image: tejas02,
    title: "GATTI BHAI",
    subtitle: "President & Mentor",
    alt: "Gatti Bhai leading Shrikant Sports Club procession",
    objectPosition: "center 20%",
  },
];

export default function About() {
  const [selectedTimelineImg, setSelectedTimelineImg] = useState(null);
  const [tejasSlide, setTejasSlide] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTejasSlide((prev) => (prev + 1) % TEJAS_SLIDES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Full-Screen Heritage Hero (matching Ganeshotsav 2026 design) */}
      <section className="hero-section utsav-section" id="about-hero">
        <div className="utsav-media">
          <img
            src={aboutHero}
            alt="Shrikant Sports Club Heritage & Community"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%" }}
          />
        </div>

        <div className="utsav-shade about-hero-shade" />
        <div className="hero-grain" />

        <div className="utsav-content about-hero-top-content">
          <div className="eyebrow reveal-up" data-reveal>
            ABOUT US
          </div>

          <h1 data-reveal>
            DEVOTION, SPORTS & <span className="gold-text">COMMUNITY</span>
          </h1>

          <div className="hero-actions" style={{ marginTop: "1.75rem" }} data-reveal>
            <Button to="/ganeshotsav2026" variant="primary" size="lg">
              Ganesh Utsav 2026
            </Button>
            <Button to="/contact" variant="secondary" size="lg">
              Join The Movement
            </Button>
          </div>
        </div>

        <div className="hero-scroll">
          <span>SCROLL TO DISCOVER</span>
          <i />
        </div>
      </section>

      {/* 2nd Section: THE BEGINNING */}
      <Section
        id="the-beginning"
        spacing="xl"
        eyebrow="THE BEGINNING"
        headerAlign="left"
      >
        <div style={{ position: "relative", marginBottom: "var(--space-4)" }} data-reveal>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(5rem, 12vw, 9.5rem)",
              fontWeight: 800,
              lineHeight: 0.82,
              letterSpacing: "-0.04em",
              color: "var(--color-accent)",
              opacity: 0.18,
              userSelect: "none",
            }}
          >
            1985
          </div>
          <h2
            style={{
              marginTop: "clamp(-1.4rem, -3vw, -2.4rem)",
              fontSize: "clamp(2rem, 4vw, 3.4rem)",
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: "var(--color-text-primary)",
              lineHeight: 1.15,
            }}
          >
            It started with a few <span className="gold-text">young dreamers.</span>
          </h2>
          <p
            className="body-lg"
            style={{
              marginTop: "1.25rem",
              maxWidth: "700px",
              color: "var(--color-text-secondary)",
              lineHeight: 1.75,
            }}
          >
            What began in 1985 as an energetic gathering of young neighborhood friends during local sports matches and the annual Ganesh Utsav has evolved into a powerhouse for grassroots youth development, senior citizen welfare, and cultural preservation in Mumbai.
          </p>
        </div>

        <div className="grid-12" style={{ alignItems: "center", marginTop: "var(--space-6)" }}>
          <div style={{ gridColumn: "span 6" }} data-reveal>
            <div
              style={{
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                border: "1px solid var(--color-border-accent)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.7)",
                height: "390px",
              }}
            >
              <img
                src={foundingBanner}
                alt="Founding of Shrikant Sports Club in 1985"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>

          <div style={{ gridColumn: "span 6", display: "flex", flexDirection: "column", gap: "var(--space-4)", paddingLeft: "clamp(0px, 2vw, 1.5rem)" }} data-reveal="right">
            <h3 style={{ fontSize: "1.75rem", color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>
              Rooted in Faith, Driven by Action
            </h3>
            <p className="body-base" style={{ color: "var(--color-text-secondary)", lineHeight: 1.8 }}>
              Shrikant Sports Club was conceived with a clear principle: celebration finds its highest expression when it enriches lives. By combining devotional festivities with regular youth sporting tournaments and proactive civic health camps, we ensure our community stays active, unified, and resilient.
            </p>
            <p className="body-base" style={{ color: "var(--color-text-secondary)", lineHeight: 1.8 }}>
              Every generation has a voice here — from the wisdom and guidance of our respected senior citizens (Jyeshtha Nagrik) to the raw energy of teenagers competing in cricket and carrom championships.
            </p>
            <div style={{ display: "flex", gap: "var(--space-6)", marginTop: "var(--space-2)" }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "2.25rem", color: "var(--color-accent)", fontWeight: 600 }}>
                  1985
                </div>
                <div className="caption">The Genesis</div>
              </div>
              <div style={{ width: "1px", background: "var(--color-border)" }} />
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "2.25rem", color: "var(--color-accent)", fontWeight: 600 }}>
                  25+
                </div>
                <div className="caption">Annual Initiatives</div>
              </div>
              <div style={{ width: "1px", background: "var(--color-border)" }} />
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "2.25rem", color: "var(--color-accent)", fontWeight: 600 }}>
                  5000+
                </div>
                <div className="caption">Lives Touched</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 3rd Section: Shrikant Tribute */}
      <Section
        id="in-his-memory"
        spacing="xl"
        style={{
          background: "linear-gradient(180deg, rgba(12,10,9,1) 0%, rgba(18,15,13,0.9) 50%, rgba(12,10,9,1) 100%)",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="grid-12" style={{ alignItems: "center" }}>
          <div style={{ gridColumn: "span 5" }} data-reveal>
            <div
              style={{
                position: "relative",
                maxWidth: "380px",
                margin: "0 auto",
                padding: "16px",
                background: "linear-gradient(145deg, rgba(198,163,95,0.18) 0%, rgba(12,10,9,0.95) 100%)",
                borderRadius: "var(--radius-xl)",
                border: "1px solid rgba(198,163,95,0.35)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.85), 0 0 35px rgba(198,163,95,0.12)",
              }}
            >
              <div
                style={{
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  border: "1px solid rgba(198,163,95,0.25)",
                }}
              >
                <img
                  src={shrikant}
                  alt="Shrikant — In Loving Memory"
                  style={{
                    width: "100%",
                    display: "block",
                    aspectRatio: "1101 / 1285",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "1.25rem",
                  fontFamily: "var(--font-display)",
                  fontSize: "1.35rem",
                  letterSpacing: "0.1em",
                  color: "var(--color-accent)",
                }}
              >
                SHRIKANT
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "0.8rem",
                  letterSpacing: "0.22em",
                  color: "var(--color-text-secondary)",
                  textTransform: "uppercase",
                  marginTop: "0.25rem",
                }}
              >
                Forever In Our Hearts
              </div>
            </div>
          </div>

          <div
            style={{
              gridColumn: "span 7",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-5)",
              paddingLeft: "clamp(0px, 3vw, 2.5rem)",
            }}
            data-reveal="right"
          >
            <div>
              <span
                style={{
                  display: "inline-block",
                  color: "var(--color-accent)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                The Heart & Soul of Our Brotherhood
              </span>
              <h3 style={{ fontSize: "clamp(1.75rem, 3vw, 2.35rem)", fontFamily: "var(--font-display)", color: "var(--color-text-primary)", lineHeight: 1.25 }}>
                A friendship that became a legacy.
              </h3>
            </div>

            <p className="body-lg" style={{ color: "var(--color-text-secondary)", lineHeight: 1.8 }}>
              When our dearest friend Shrikant passed away in his youth, his untimely departure left an irreplaceable void in our neighborhood. But his close circle of friends made a solemn, enduring promise: his name would never fade away into sorrow. Instead, it would become a fountain of life, unity, sportsmanship, and social service.
            </p>

            <p className="body-base" style={{ color: "var(--color-text-secondary)", lineHeight: 1.8 }}>
              From that sacred bond of friendship, <strong style={{ color: "var(--color-text-primary)" }}>Shrikant Sports Club</strong> was born. What started as local tournaments in his memory has blossomed over the past decade into a registered civic and cultural movement organizing grand annual Ganesh Utsav celebrations, civic road namings, comprehensive eye & health check-ups, and senior citizen welfare camps.
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                padding: "1.25rem 1.5rem",
                background: "rgba(198,163,95,0.06)",
                borderLeft: "3px solid var(--color-accent)",
                borderRadius: "0 var(--radius-md) var(--radius-md) 0",
              }}
            >
              <span style={{ fontSize: "1.75rem" }}>🕊️</span>
              <div style={{ fontSize: "0.95rem", color: "var(--color-text-primary)", fontStyle: "italic", lineHeight: 1.6 }}>
                "We do not merely remember Shrikant on special days — his spirit walks with us through every tournament won, every elder honored, and every hand we extend to our community."
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 4th Section: TEJAS SHAH (GATTI BHAI) */}
      <Section
        id="tejas-shah-tribute"
        spacing="xl"
        style={{
          background: "linear-gradient(180deg, rgba(12,10,9,1) 0%, rgba(18,14,12,0.85) 50%, rgba(12,10,9,1) 100%)",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="grid-12" style={{ alignItems: "center" }}>
          {/* 1 Img Placeholder with Slider of Current 2 Img */}
          <div style={{ gridColumn: "span 5" }} data-reveal>
            <div
              style={{
                position: "relative",
                maxWidth: "380px",
                margin: "0 auto",
                padding: "16px",
                background: "linear-gradient(145deg, rgba(198,163,95,0.18) 0%, rgba(12,10,9,0.95) 100%)",
                borderRadius: "var(--radius-xl)",
                border: "1px solid rgba(198,163,95,0.35)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.85), 0 0 35px rgba(198,163,95,0.12)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  border: "1px solid rgba(198,163,95,0.25)",
                  aspectRatio: "1101 / 1285",
                  background: "#14110F",
                }}
              >
                {TEJAS_SLIDES.map((slide, idx) => (
                  <img
                    key={slide.title}
                    src={slide.image}
                    alt={slide.alt}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: slide.objectPosition || "center",
                      opacity: tejasSlide === idx ? 1 : 0,
                      transform: tejasSlide === idx ? "scale(1)" : "scale(1.05)",
                      transition: "opacity 0.6s ease, transform 0.8s ease",
                      pointerEvents: tejasSlide === idx ? "auto" : "none",
                    }}
                  />
                ))}

                {/* Slider Controls Overlay */}
                <button
                  type="button"
                  onClick={() => setTejasSlide((prev) => (prev === 0 ? TEJAS_SLIDES.length - 1 : prev - 1))}
                  aria-label="Previous Photo"
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "rgba(12, 10, 9, 0.75)",
                    border: "1px solid rgba(198, 163, 95, 0.4)",
                    color: "var(--color-accent)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.85rem",
                    backdropFilter: "blur(4px)",
                    transition: "all 0.2s ease",
                    zIndex: 2,
                  }}
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={() => setTejasSlide((prev) => (prev + 1) % TEJAS_SLIDES.length)}
                  aria-label="Next Photo"
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "rgba(12, 10, 9, 0.75)",
                    border: "1px solid rgba(198, 163, 95, 0.4)",
                    color: "var(--color-accent)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.85rem",
                    backdropFilter: "blur(4px)",
                    transition: "all 0.2s ease",
                    zIndex: 2,
                  }}
                >
                  →
                </button>

                {/* Dots indicator */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "0",
                    right: "0",
                    display: "flex",
                    justifyContent: "center",
                    gap: "6px",
                    zIndex: 2,
                  }}
                >
                  {TEJAS_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setTejasSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      style={{
                        width: tejasSlide === idx ? "18px" : "6px",
                        height: "6px",
                        borderRadius: "var(--radius-pill)",
                        background: tejasSlide === idx ? "var(--color-accent)" : "rgba(255, 255, 255, 0.4)",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div
                style={{
                  textAlign: "center",
                  marginTop: "1.25rem",
                  fontFamily: "var(--font-display)",
                  fontSize: "1.35rem",
                  letterSpacing: "0.1em",
                  color: "var(--color-accent)",
                }}
              >
                {TEJAS_SLIDES[tejasSlide].title}
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "0.8rem",
                  letterSpacing: "0.22em",
                  color: "var(--color-text-secondary)",
                  textTransform: "uppercase",
                  marginTop: "0.25rem",
                }}
              >
                {TEJAS_SLIDES[tejasSlide].subtitle}
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div
            style={{
              gridColumn: "span 7",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-5)",
              paddingLeft: "clamp(0px, 3vw, 2.5rem)",
            }}
            data-reveal="right"
          >
            <div>
              <span
                style={{
                  display: "inline-block",
                  color: "var(--color-accent)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                A Pillar of Leadership & Generosity
              </span>
              <h3
                style={{
                  fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text-primary)",
                  lineHeight: 1.2,
                  fontWeight: 400,
                }}
              >
                Gatti Bhai. <br />
                <span className="gold-text">Forever one of us.</span>
              </h3>
              <div
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.9rem",
                  color: "var(--color-accent)",
                  letterSpacing: "0.15em",
                  fontFamily: "var(--font-display)",
                }}
              >
                22 March, 1973 — 15 October, 2025
              </div>
            </div>

            <p className="body-lg" style={{ color: "var(--color-text-secondary)", lineHeight: 1.8 }}>
              For over a decade, Tejas Shah led Shrikant Sports Club as its President with energy, warmth and an unwavering commitment to the community.
            </p>

            <p className="body-base" style={{ color: "var(--color-text-secondary)", lineHeight: 1.8 }}>
              His contribution to SSC and the people around him will remain an important part of the club's story.
            </p>

            <div
              style={{
                padding: "1.25rem 1.5rem",
                background: "rgba(198,163,95,0.06)",
                borderLeft: "3px solid var(--color-accent)",
                borderRadius: "0 var(--radius-md) var(--radius-md) 0",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.1rem",
                  color: "var(--color-text-primary)",
                  fontStyle: "italic",
                  lineHeight: 1.5,
                }}
              >
                "His energy, guidance, and laughter steered our biggest festivals, and his heart touched every single member of our club."
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--color-accent)",
                  marginTop: "0.5rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                TEJAS SHAH (1973 — 2025)
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 5th Section: OUR PHILOSOPHY */}
      <Section
        id="our-philosophy"
        spacing="xl"
        eyebrow="OUR PHILOSOPHY"
        heading={
          <span>
            HASTE-KHELTE, <span className="gold-text">GUNYAGOVINDANE.</span>
          </span>
        }
        description="Our philosophy has remained simple through the years: celebrate life, stay together and create happiness around us."
        headerAlign="left"
        style={{
          background: "linear-gradient(180deg, rgba(12,10,9,1) 0%, rgba(20,16,13,0.75) 50%, rgba(12,10,9,1) 100%)",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="grid-12" style={{ alignItems: "center", marginTop: "var(--space-6)" }}>
          <div style={{ gridColumn: "span 6" }} data-reveal>
            <div
              style={{
                position: "relative",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                border: "1px solid var(--color-border-accent)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.75)",
                height: "440px",
              }}
            >
              <img
                src={legacyImg}
                alt="Shrikant Sports Club Kutumb Melawa — Haste-khelte, gunyagovindane"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, transparent 60%, rgba(12,10,9,0.85) 100%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "1.25rem",
                  left: "1.5rem",
                  right: "1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "0.9rem",
                    fontFamily: "var(--font-display)",
                    letterSpacing: "0.08em",
                    color: "#F5E5C9",
                  }}
                >
                  SSC Family Celebrations
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-accent)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  Together As One
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              gridColumn: "span 6",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-5)",
              paddingLeft: "clamp(0px, 2.5vw, 2rem)",
            }}
            data-reveal="right"
          >
            <div>
              <span
                style={{
                  display: "inline-block",
                  color: "var(--color-accent)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                Living The Core Creed
              </span>
              <h3
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text-primary)",
                  lineHeight: 1.25,
                  fontWeight: 400,
                }}
              >
                Haste-khelte, <br />
                <span className="gold-text">gunyagovindane.</span>
              </h3>
            </div>

            <p className="body-lg" style={{ color: "var(--color-text-secondary)", lineHeight: 1.8 }}>
              Our philosophy has remained simple through the years: celebrate life, stay together and create happiness around us.
            </p>

            <div
              style={{
                padding: "1.5rem 1.75rem",
                background: "linear-gradient(135deg, rgba(198,163,95,0.12) 0%, rgba(12,10,9,0.85) 100%)",
                borderLeft: "3px solid var(--color-accent)",
                borderRadius: "0 var(--radius-md) var(--radius-md) 0",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.2rem, 2.2vw, 1.55rem)",
                  color: "var(--color-accent)",
                  fontStyle: "italic",
                  lineHeight: 1.4,
                }}
              >
                “Haste-khelte gunyagovindane majेत jagayache.”
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--color-text-secondary)",
                  marginTop: "0.5rem",
                  letterSpacing: "0.1em",
                }}
              >
                — Live joyfully, laugh together, and walk side-by-side in harmony.
              </div>
            </div>

            <p className="body-base" style={{ color: "var(--color-text-secondary)", lineHeight: 1.8 }}>
              Whether it is Holi, Diwali, Dahi Handi or Ganeshotsav, SSC celebrates every occasion with heart. We believe that festivals and sports are not just events on a calendar — they are sacred bridges that bring neighbours, elders, children, and families closer together as one unbroken circle.
            </p>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.25rem" }}>
              <span className="badge badge-accent">HOLI</span>
              <span className="badge badge-accent">DIWALI</span>
              <span className="badge badge-accent">DAHI HANDI</span>
              <span className="badge badge-accent">GANESHOTSAV</span>
              <span className="badge badge-accent">SPORTS TOURNAMENTS</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Milestone Journey Header */}
      <Section
        spacing="md"
        eyebrow="Milestones & Journey"
        heading="A DECADE OF MEASURABLE IMPACT"
        description="Explore the defining initiatives, philanthropic camps, and tournaments organized by Shrikant Sports Club from 2016 to today — scroll down to reveal each milestone."
        headerAlign="center"
        style={{
          background: "var(--color-bg)",
          borderTop: "1px solid var(--color-border)",
          paddingBottom: "var(--space-4)",
        }}
      />

      {/* Full-Width & Full-Height Cinematic Scroll Reveal Timeline */}
      <CinematicTimeline timeline={TIMELINE} />

      {/* Community Gallery Grid */}
      <Section
        spacing="lg"
        eyebrow="Our People in Action"
        heading="MOMENTS OF GENUINE KINSHIP"
        description="Capturing the joy, teamwork, and fellowship that define our everyday community life."
        headerAlign="split"
        headerAction={
          <Button to="/gallery" variant="secondary" size="sm">
            Explore Full Gallery →
          </Button>
        }
      >
        <div className="grid-3" style={{ marginTop: "var(--space-6)" }} data-reveal>
          <div style={{ height: "300px", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border)" }}>
            <img src={community01} alt="Community togetherness" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ height: "300px", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border)" }}>
            <img src={community02} alt="Community celebration" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ height: "300px", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border)" }}>
            <img src={community03} alt="Community event" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </Section>

      {/* Full-Screen Community Finale (same like first section before footer) */}
      <section className="hero-section utsav-section" id="community-finale">
        <div className="utsav-media">
          <img
            src={aboutCommunity}
            alt="Shrikant Sports Club Family Together"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
          />
        </div>

        <div className="utsav-shade" />
        <div className="hero-grain" />

        <div className="utsav-content">
          <div className="eyebrow reveal-up" data-reveal>
            OUR SACRED CIRCLE
          </div>

          <h2 data-reveal>
            ONE FAMILY. <em>ONE TRADITION.</em>
          </h2>

          <div className="hero-actions" style={{ marginTop: "1.75rem" }} data-reveal>
            <Button to="/contact" variant="primary" size="lg">
              Join Our Family →
            </Button>
            <Button to="/ganeshotsav2026" variant="secondary" size="lg">
              Ganesh Utsav 2026
            </Button>
          </div>
        </div>

        <div className="hero-scroll">
          <span>SHRIKANT SPORTS CLUB</span>
          <i />
        </div>
      </section>

      {/* Reusable Lightbox Modal */}
      <Lightbox
        isOpen={selectedTimelineImg !== null}
        onClose={() => setSelectedTimelineImg(null)}
        images={TIMELINE}
        currentIndex={selectedTimelineImg ? TIMELINE.findIndex((item) => item.year === selectedTimelineImg.year && item.title === selectedTimelineImg.title) : 0}
        onIndexChange={(idx) => setSelectedTimelineImg(TIMELINE[idx])}
      />
    </>
  );
}