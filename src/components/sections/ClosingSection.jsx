import React from "react";
import Section from "../ui/Section";
import Container from "../ui/Container";
import Button from "../ui/Button";

export default function ClosingSection() {
  return (
    <Section
      id="closing"
      spacing="xl"
      style={{
        background: "radial-gradient(ellipse at 50% 60%, rgba(198,163,95,0.08) 0%, rgba(12,10,9,1) 75%)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <Container size="narrow" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-6)" }}>
        <div className="eyebrow" data-reveal="fade">
          OUR SACRED PLEDGE
        </div>

        <h2 className="display-editorial" data-reveal style={{ textTransform: "uppercase" }}>
          TOGETHER <span className="gold-text">AS ONE</span>
        </h2>

        <p className="body-lg" data-reveal style={{ color: "var(--color-text-secondary)", maxWidth: "700px" }}>
          The celebration may have its festive days, traditions, and competitions — but its true, everlasting spirit lives in the hearts of the people who stand together.
        </p>

        <div
          data-reveal
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            color: "var(--color-accent)",
            fontWeight: 600,
            letterSpacing: "0.1em",
            marginTop: "var(--space-2)",
          }}
        >
          MORYA!
        </div>

        <div data-reveal style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", justifyContent: "center", marginTop: "var(--space-4)" }}>
          <Button to="/contact" variant="primary" size="lg">
            Join Our Community
          </Button>
          <Button to="/ganeshotsav2026" variant="secondary" size="lg">
            Explore 2026 Utsav
          </Button>
        </div>
      </Container>
    </Section>
  );
}
