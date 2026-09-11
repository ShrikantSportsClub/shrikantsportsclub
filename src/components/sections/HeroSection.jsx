import React from "react";
import Button from "../ui/Button";
import Container from "../ui/Container";
import heroPoster from "../../assets/hero/ganpati-hero.png";

const YOUTUBE_VIDEO_ID = "P0LGoPN6jK8";
const YOUTUBE_EMBED_URL = `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&controls=0&loop=0&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&modestbranding=1&fs=0&vq=hd1080&enablejsapi=1`;

export default function HeroSection() {
  return (
    <section
      className="site-section hero-hero-wrap"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#0C0A09",
      }}
    >
      {/* Background Media */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        <img
          src={heroPoster}
          alt="Shrikant Ganpati"
          className="hero-poster-fallback"
        />
        <div className="hero-youtube-wrap">
          <iframe
            src={YOUTUBE_EMBED_URL}
            title="Ganpati Background Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            tabIndex={-1}
            className="hero-youtube-iframe"
          />
        </div>
        {/* Editorial Vignette & Gradient Overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(180deg, rgba(12,10,9,0.65) 0%, rgba(12,10,9,0.48) 35%, rgba(12,10,9,0.3) 55%, transparent 72%, transparent 100%)",
          }}
        />
      </div>

      <Container
        size="standard"
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: "var(--space-13)",
          paddingBottom: "var(--space-11)",
        }}
      >
        <div
          style={{
            maxWidth: "860px",
            marginInline: "auto",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--space-5)",
          }}
        >
          <div className="eyebrow" data-reveal="fade">
            SHRIKANT SPORTS CLUB PRESENTS
          </div>

          <h1 className="display-hero" data-reveal style={{ textTransform: "uppercase" }}>
            <span>GANAPATI </span>
            <span className="gold-text">BAPPA MORYA</span>
          </h1>

          <div
            data-reveal
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-4)",
              justifyContent: "center",
              marginTop: "var(--space-2)",
            }}
          >
            <Button to="/ganeshotsav2026" variant="primary" size="lg">
              Ganesh Utsav 2026
            </Button>
            <Button to="/about" variant="secondary" size="lg">
              Our Heritage & Story
            </Button>
          </div>
        </div>
      </Container>

      {/* Scroll to Discover Cue */}
      <div
        style={{
          position: "absolute",
          bottom: "var(--space-6)",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--space-2)",
        }}
      >
        <span className="caption" style={{ letterSpacing: "0.2em", color: "var(--color-text-muted)" }}>
          SCROLL TO DISCOVER
        </span>
        <div
          style={{
            width: "1px",
            height: "28px",
            background: "linear-gradient(180deg, var(--color-accent), transparent)",
          }}
        />
      </div>
    </section>
  );
}
