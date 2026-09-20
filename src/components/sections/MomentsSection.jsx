import React, { useState } from "react";
import Section from "../ui/Section";
import Card from "../ui/Card";
import Icon from "../ui/Icon";
import Button from "../ui/Button";
import Lightbox from "../ui/Lightbox";

import m1 from "../../assets/carousel/moment-01.jpg.jpg";
import m2 from "../../assets/carousel/moment-02.jpg.jpg";
import m3 from "../../assets/carousel/moment-03.jpg.jpg";
import m4 from "../../assets/carousel/moment-04.jpg.jpg";
import m5 from "../../assets/carousel/moment-05.jpg.jpg";
import m6 from "../../assets/carousel/moment-06.jpg.jpg";
import m7 from "../../assets/carousel/moment-07.jpg.png";
import m8 from "../../assets/carousel/moment-08.jpg.jpg";

const MOMENTS = [
  { src: m1, title: "The Grand Aagman", tag: "Tradition" },
  { src: m2, title: "Devotional Aarti", tag: "Worship" },
  { src: m3, title: "Community Kutumb Melawa", tag: "Kinship" },
  { src: m4, title: "SPL Cricket Championship", tag: "Sports" },
  { src: m5, title: "State Carrom Tournament", tag: "Competition" },
  { src: m6, title: "Khel Paithanicha", tag: "Culture" },
  { src: m7, title: "Youth Volunteer Team", tag: "Service" },
  { src: m8, title: "Visarjan Procession", tag: "Celebration" },
];

export default function MomentsSection() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <Section
      id="moments"
      spacing="xl"
      eyebrow="Unforgettable Memories"
      heading="MOMENTS THAT BRING US TOGETHER"
      description="Some moments are celebrated, some are cherished, and some become an indelible part of our collective heritage."
      headerAlign="center"
      headerAction={
        <div style={{ textAlign: "center", marginTop: "var(--space-4)" }}>
          <Button to="/gallery" variant="secondary" size="sm">
            View All Moments in Gallery →
          </Button>
        </div>
      }
    >
      <div className="grid-4" style={{ marginTop: "var(--space-6)" }} data-reveal>
        {MOMENTS.map((moment, idx) => (
          <div
            key={idx}
            className="luxury-card-interactive"
            onClick={() => setSelectedImage(moment)}
            style={{
              position: "relative",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              border: "1px solid var(--color-border)",
              cursor: "pointer",
              aspectRatio: "4/3",
              background: "var(--color-surface)",
            }}
          >
            <img
              src={moment.src}
              alt={moment.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 400ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, transparent 40%, rgba(12,10,9,0.85) 100%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "var(--space-3)",
                left: "var(--space-3)",
                right: "var(--space-3)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                pointerEvents: "none",
              }}
            >
              <div>
                <span className="caption gold-text" style={{ fontSize: "0.6875rem" }}>
                  {moment.tag}
                </span>
                <p style={{ color: "#FFFFFF", fontSize: "0.875rem", fontWeight: 600 }}>
                  {moment.title}
                </p>
              </div>
              <span className="caption" style={{ color: "rgba(255, 255, 255, 0.75)" }}>
                0{idx + 1}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <Lightbox
          isOpen={Boolean(selectedImage)}
          onClose={() => setSelectedImage(null)}
          images={MOMENTS.map((m) => ({ src: m.src, title: m.title, category: m.tag }))}
          currentIndex={MOMENTS.findIndex((m) => m.title === selectedImage.title)}
          onIndexChange={(idx) => setSelectedImage(MOMENTS[idx])}
        />
      )}
    </Section>
  );
}
