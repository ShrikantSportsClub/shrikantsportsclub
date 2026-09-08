import React from "react";
import Section from "../ui/Section";
import Card from "../ui/Card";
import Button from "../ui/Button";

import p1 from "../../assets/people/person-01.png";
import p2 from "../../assets/people/person-02.png";
import p3 from "../../assets/people/person-03.png";
import p4 from "../../assets/people/person-04.png";

const LEADERS = [
  { image: p1, name: "Rohan Deshmukh", role: "Festival Coordinator", num: "01" },
  { image: p2, name: "Amit Patil", role: "Sports Convenor", num: "02" },
  { image: p3, name: "Neha Joshi", role: "Cultural Coordinator", num: "03" },
  { image: p4, name: "Sanjay More", role: "Community Welfare", num: "04" },
];

export default function PeopleSection() {
  return (
    <Section
      id="people"
      spacing="xl"
      eyebrow="The Committee"
      heading="THE HEART BEHIND IT ALL"
      description="Every magnificent celebration and sporting triumph represents countless hours of selfless dedication, planning, and brotherhood."
      headerAlign="split"
      headerAction={
        <Button to="/members" variant="secondary" size="sm">
          Meet All 20+ Members →
        </Button>
      }
    >
      <div className="grid-4" style={{ marginTop: "var(--space-6)" }} data-reveal>
        {LEADERS.map((person) => (
          <Card key={person.num} padding="none" style={{ overflow: "hidden", background: "var(--color-surface)" }}>
            <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", overflow: "hidden" }}>
              <img
                src={person.image}
                alt={`${person.name}, ${person.role}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.95)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, transparent 50%, rgba(12,10,9,0.92) 100%)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: "var(--space-3)",
                  right: "var(--space-3)",
                  fontFamily: "var(--font-display)",
                  fontSize: "1.1rem",
                  color: "var(--color-accent)",
                  fontWeight: 600,
                }}
              >
                {person.num}
              </span>
              <div
                style={{
                  position: "absolute",
                  bottom: "var(--space-4)",
                  left: "var(--space-4)",
                  right: "var(--space-4)",
                }}
              >
                <h4 style={{ fontSize: "1.15rem", color: "var(--color-text-primary)" }}>{person.name}</h4>
                <p className="caption gold-text" style={{ marginTop: "2px", letterSpacing: "0.08em" }}>
                  {person.role}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
