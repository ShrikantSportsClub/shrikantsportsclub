import React, { useState } from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Card from "../ui/Card";
import communityImg from "../../assets/living-photograph/Community.png";
import traditionImg from "../../assets/living-photograph/Tradition.png";
import familyImg from "../../assets/living-photograph/Family.png";

const STORIES = [
  {
    id: "01",
    kicker: "01 / THE PEOPLE",
    title: "A Community of Devotion",
    description:
      "A celebration becomes truly meaningful when hundreds of families unite to create, experience, and carry the sacred spirit forward.",
    image: communityImg,
    stat: "1000+ Families United",
  },
  {
    id: "02",
    kicker: "02 / THE ROOTS",
    title: "Timeless Cultural Traditions",
    description:
      "The rituals, aartis, devotional music, and sacred gestures that ground every generation in belonging and spiritual heritage.",
    image: traditionImg,
    stat: "10+ Years of Tradition",
  },
  {
    id: "03",
    kicker: "03 / THE BOND",
    title: "An Unbreakable Family",
    description:
      "Beyond the festival itself, the bond of Shrikant Sports Club keeps hearts and neighborhoods connected 365 days a year.",
    image: familyImg,
    stat: "Year-Round Brotherhood",
  },
];

export default function LivingPhotographSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentStory = STORIES[activeIndex];

  return (
    <Section
      id="living-photograph"
      spacing="xl"
      eyebrow="A Living Photograph"
      heading="THE PILLARS OF OUR TOGETHERNESS"
      description="Ganesh Utsav is more than an event — it is a living, breathing tapestry of collective devotion, enduring tradition, and genuine kinship."
      headerAlign="split"
    >
      <div className="grid-12" style={{ alignItems: "stretch", marginTop: "var(--space-6)" }}>
        {/* Visual Frame */}
        <div style={{ gridColumn: "span 7" }} data-reveal>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "480px",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              border: "1px solid var(--color-border)",
              background: "var(--color-surface)",
            }}
          >
            {STORIES.map((story, idx) => (
              <img
                key={story.id}
                src={story.image}
                alt={story.title}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: activeIndex === idx ? 1 : 0,
                  transform: activeIndex === idx ? "scale(1)" : "scale(1.04)",
                  transition: "opacity 500ms ease, transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            ))}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, transparent 50%, rgba(12,10,9,0.8) 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "var(--space-5)",
                left: "var(--space-5)",
                right: "var(--space-5)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div>
                <span className="caption gold-text" style={{ letterSpacing: "0.15em" }}>
                  {currentStory.kicker}
                </span>
                <h4 style={{ color: "var(--color-text-primary)", marginTop: "4px" }}>
                  {currentStory.title}
                </h4>
              </div>
              <span className="badge badge-gold">{currentStory.stat}</span>
            </div>
          </div>
        </div>

        {/* Narrative Accordion / Selector */}
        <div
          style={{
            gridColumn: "span 5",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)",
            justifyContent: "center",
          }}
          data-reveal="right"
        >
          {STORIES.map((story, idx) => {
            const isActive = activeIndex === idx;
            return (
              <Card
                key={story.id}
                interactive
                padding="md"
                onClick={() => setActiveIndex(idx)}
                style={{
                  cursor: "pointer",
                  borderColor: isActive ? "var(--color-border-accent)" : "var(--color-border)",
                  background: isActive ? "var(--color-surface-hover)" : "var(--color-surface)",
                  transition: "all var(--transition-base)",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-4)" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.4rem",
                      fontWeight: 600,
                      color: isActive ? "var(--color-accent)" : "var(--color-text-muted)",
                      lineHeight: 1,
                      marginTop: "2px",
                    }}
                  >
                    {story.id}
                  </span>
                  <div>
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        color: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                      }}
                    >
                      {story.title}
                    </h3>
                    <p
                      className="body-sm"
                      style={{
                        marginTop: "var(--space-2)",
                        color: isActive ? "var(--color-text-secondary)" : "var(--color-text-muted)",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {story.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
