import React from "react";
import Section from "../ui/Section";
import Card from "../ui/Card";
import sportsImg from "../../assets/more-than-ganpati/sports.jpg";
import cultureImg from "../../assets/more-than-ganpati/Culture.png";
import socialImg from "../../assets/more-than-ganpati/social.jpg";
import communityImg from "../../assets/more-than-ganpati/Community.jpg";

const PILLARS = [
  {
    num: "01",
    title: "Sports & Athletics",
    kicker: "ENERGY · PARTICIPATION · EXCELLENCE",
    desc: "From the Shrikant Premier League (SPL) cricket tournament to state-level carrom tournaments, we cultivate teamwork, sportsmanship, and fitness among our youth.",
    image: sportsImg,
  },
  {
    num: "02",
    title: "Cultural Heritage",
    kicker: "ART · EXPRESSION · TRADITION",
    desc: "Khel Paithanicha, dance competitions, glass mosaic workshops, rangoli contests, and classical bhajan evenings keeping our vibrant culture alive for the next generation.",
    image: cultureImg,
  },
  {
    num: "03",
    title: "Social Welfare",
    kicker: "COMPASSION · RESPONSIBILITY · SERVICE",
    desc: "Free comprehensive eye checkups, dental screening camps, blood donation drives, and regular essential supply donations to Nityanand Ashram.",
    image: socialImg,
  },
  {
    num: "04",
    title: "Community Gatherings",
    kicker: "KINSHIP · BELONGING · TOGETHERNESS",
    desc: "Kutumb Melawa family meets, Jyeshtha Nagrik Sanman (honoring our elders), and civic development initiatives bringing all generations together.",
    image: communityImg,
  },
];

export default function MoreThanGanpatiSection() {
  return (
    <Section
      id="more-than-ganpati"
      spacing="xl"
      eyebrow="Beyond The Festival"
      heading={
        <span>
          MORE THAN <span className="gold-text">GANPATI</span>
        </span>
      }
      description="The spirit of Shrikant Sports Club thrives throughout the entire year through sports, cultural arts, social welfare, and neighbourhood camaraderie."
      headerAlign="split"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)", marginTop: "var(--space-8)" }}>
        {PILLARS.map((pillar, idx) => {
          const isEven = idx % 2 === 1;
          return (
            <div
              key={pillar.num}
              data-reveal
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
                gap: "var(--space-8)",
                alignItems: "center",
              }}
            >
              {/* Image side */}
              <div
                style={{
                  gridColumn: isEven ? "span 6" : "span 6",
                  order: isEven ? 2 : 1,
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  border: "1px solid var(--color-border)",
                  height: "360px",
                }}
              >
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 400ms ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
              </div>

              {/* Text side */}
              <div
                style={{
                  gridColumn: isEven ? "span 6" : "span 6",
                  order: isEven ? 1 : 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-3)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2.5rem",
                    fontWeight: 400,
                    color: "var(--color-accent)",
                    lineHeight: 1,
                  }}
                >
                  {pillar.num}
                </span>
                <span className="caption" style={{ letterSpacing: "0.15em", color: "var(--color-accent)" }}>
                  {pillar.kicker}
                </span>
                <h3 style={{ fontSize: "1.75rem", color: "var(--color-text-primary)" }}>{pillar.title}</h3>
                <p className="body-base" style={{ color: "var(--color-text-secondary)" }}>
                  {pillar.desc}
                </p>
                <div style={{ width: "40px", height: "1px", background: "var(--color-accent)", marginTop: "var(--space-2)" }} />
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
