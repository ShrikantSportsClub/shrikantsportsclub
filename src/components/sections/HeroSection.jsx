import React from "react";
import Button from "../ui/Button";
import Container from "../ui/Container";
import heroVideo from "../../assets/hero/ganpati-hero.mp4";
import heroPoster from "../../assets/hero/ganpati-hero.png";

export default function HeroSection() {
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      video.loop = false;
      video.play().catch(() => {});
    }
  }, []);

  const handleVideoEnded = (e) => {
    const video = e.currentTarget;
    video.pause();
    if (video.duration) {
      video.currentTime = video.duration;
    }
  };

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
        <video
          ref={videoRef}
          src={heroVideo}
          poster={heroPoster}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
            transform: "scale(1.08)",
            transformOrigin: "center center",
            filter: "brightness(0.9) contrast(1.04)",
          }}
        />
        {/* Editorial Vignette & Gradient Overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(12,10,9,0.3) 0%, rgba(12,10,9,0.08) 40%, rgba(12,10,9,0.6) 85%, #0C0A09 100%)",
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
