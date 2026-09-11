import React from "react";
import Section from "../ui/Section";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Badge from "../ui/Badge";
import utsavPoster from "../../assets/Ganeshotsav2026/ganeshotsav-hero.png";
import utsavVideo from "../../assets/ganesh-utsav/ganesh-utsav-2026.mp4";

export default function GaneshUtsavHighlightSection() {
  return (
    <Section
      id="ganesh-utsav"
      spacing="xl"
      eyebrow="The Grand Festival"
      heading={
        <span>
          GANESHOTSAV <span className="gold-text">2026</span>
        </span>
      }
      description="Join us for 10 magnificent days of devotional prayers, grand processions, cultural performances, sports tournaments, and community feasts."
      headerAlign="center"
    >
      {/* Video & Banner Showcase */}
      <div
        data-reveal
        style={{
          position: "relative",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          border: "1px solid var(--color-border-accent)",
          background: "#14110F",
          marginTop: "var(--space-8)",
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "460px" }}>
          <video
            src={utsavVideo}
            poster={utsavPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.9)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(12,10,9,0.65) 0%, rgba(12,10,9,0.35) 45%, transparent 72%, transparent 100%)",
            }}
          />
        </div>

        {/* Floating Info Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "var(--space-8)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Badge variant="gold">Grand 10-Day Festival</Badge>
            <div className="caption" style={{ letterSpacing: "0.15em", color: "var(--color-text-primary)" }}>
              MUMBAI · 2026
            </div>
          </div>

          <div style={{ maxWidth: "600px" }}>
            <h3 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "var(--color-text-primary)" }}>
              The Sacred Aagman to Visarjan
            </h3>
            <p className="body-base" style={{ color: "var(--color-text-secondary)", marginTop: "var(--space-2)" }}>
              Experience authentic Maharashtrian cultural celebrations, Dhol Tasha beats, grand daily aartis, and compassionate community outreach.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", marginTop: "var(--space-6)" }}>
              <Button to="/ganeshotsav2026" variant="primary">
                View Full Event Schedule
              </Button>
              <Button to="/contact" variant="secondary">
                Register as Volunteer
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Highlights Grid */}
      <div className="grid-3" style={{ marginTop: "var(--space-8)" }} data-reveal>
        <Card padding="md">
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-2)" }}>
            <Icon name="calendar" size={20} color="var(--color-accent)" />
            <span className="caption gold-text" style={{ letterSpacing: "0.1em" }}>SACRED RITUALS</span>
          </div>
          <h4 style={{ fontSize: "1.2rem" }}>Daily Aartis & Pujan</h4>
          <p className="body-sm" style={{ marginTop: "8px" }}>
            Morning and evening aartis attended by hundreds of devotees, filled with devotion, prasad distribution, and traditional bhajans.
          </p>
        </Card>

        <Card padding="md">
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-2)" }}>
            <Icon name="trophy" size={20} color="var(--color-accent)" />
            <span className="caption gold-text" style={{ letterSpacing: "0.1em" }}>SPORTS & GAMES</span>
          </div>
          <h4 style={{ fontSize: "1.2rem" }}>Youth & Community Contests</h4>
          <p className="body-sm" style={{ marginTop: "8px" }}>
            Exciting carrom matches, cricket league playoffs, drawing competitions, cooking showdowns, and traditional cultural showcases.
          </p>
        </Card>

        <Card padding="md">
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-2)" }}>
            <Icon name="heart" size={20} color="var(--color-accent)" />
            <span className="caption gold-text" style={{ letterSpacing: "0.1em" }}>COMMUNITY SERVICE</span>
          </div>
          <h4 style={{ fontSize: "1.2rem" }}>Health & Eye Checkup Drives</h4>
          <p className="body-sm" style={{ marginTop: "8px" }}>
            Free medical camps, eye screenings, senior citizen felicitation, and philanthropic donation drives for local ashrams and schools.
          </p>
        </Card>
      </div>
    </Section>
  );
}
