import React, { useState } from "react";
import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Divider from "../components/ui/Divider";
import Icon from "../components/ui/Icon";

import hero from "../assets/Ganeshotsav2026/ganeshotsav-hero.png";
import ganeshotsavClosing from "../assets/Ganeshotsav2026/ganeshotsav-closing.png";
import ganeshUtsavVideo from "../assets/ganesh-utsav/ganesh-utsav-2026.mp4";
import aagman from "../assets/Ganeshotsav2026/event-aagman.png";
import bhajan from "../assets/Ganapati2026/Bhajan Sandhya.png";
import cooking from "../assets/Ganapati2026/Cooking Competition.png";
import pooja from "../assets/Ganapati2026/Satyanarayan.png";
import sports from "../assets/Ganapati2026/Sposrts.png";
import dental from "../assets/Ganapati2026/Dental.png";
import drawing from "../assets/Ganapati2026/Drawing.png";
import dance from "../assets/Ganapati2026/Dance.png";
import fancyDress from "../assets/Ganapati2026/Facncy.png";
import visarjan from "../assets/Ganapati2026/Visarjan.png";

const EVENTS = [
  {
    id: "aagman",
    date: "14 SEP",
    day: "MONDAY",
    title: "AAGMAN — THE SACRED ARRIVAL",
    time: "10:00 AM",
    location: "MAIN MANDAP",
    category: "Devotional",
    description:
      "The celebration commences with the grand arrival procession of Bappa, traditional Dhol Tasha beats, and sthapana pooja.",
    image: aagman,
  },
  {
    id: "bhajan",
    date: "14 SEP",
    day: "MONDAY",
    title: "DEVOTIONAL BHAJAN SANDHYA",
    time: "07:30 PM",
    location: "MAIN MANDAP",
    category: "Devotional",
    description:
      "An evening of transcendent devotional music, classical kirtan, and collective prayers in the divine presence of Bappa.",
    image: bhajan,
  },
  {
    id: "cooking",
    date: "18 SEP",
    day: "FRIDAY",
    title: "COMMUNITY COOKING COMPETITION",
    time: "04:00 PM",
    location: "CLUB COURTYARD",
    category: "Cultural",
    description:
      "A festive celebration of authentic regional Maharashtrian delicacies, traditional modak making, and family culinary talent.",
    image: cooking,
  },
  {
    id: "pooja",
    date: "19 SEP",
    day: "SATURDAY",
    title: "SHRI SATYANARAYAN MAHAPOOJA",
    time: "11:00 AM",
    location: "MAIN MANDAP",
    category: "Devotional",
    description:
      "Sacred Vedic rituals and Satyanarayan Pooja followed by community Maha-Prasad distribution for thousands of devotees.",
    image: pooja,
  },
  {
    id: "sports",
    date: "20 SEP",
    day: "SUNDAY",
    title: "YOUTH SPORTS & CARROM TOURNAMENT",
    time: "09:00 AM",
    location: "SPORTS COMPLEX",
    category: "Sports",
    description:
      "Action-packed carrom matches, rapid chess fixtures, and athletic activities promoting active fitness and sportsmanship.",
    image: sports,
  },
  {
    id: "dental",
    date: "20 SEP",
    day: "SUNDAY",
    title: "FREE DENTAL & HEALTH CHECKUP CAMP",
    time: "02:00 PM",
    location: "COMMUNITY HALL",
    category: "Health",
    description:
      "Comprehensive medical examinations, dental hygiene checkups, and free consultations by visiting expert doctors.",
    image: dental,
  },
  {
    id: "drawing",
    date: "21 SEP",
    day: "MONDAY",
    title: "CHILDREN'S ART & DRAWING CONTEST",
    time: "05:00 PM",
    location: "CLUB COURTYARD",
    category: "Cultural",
    description:
      "Fostering creativity and festive joy among children with an exciting drawing contest on cultural themes.",
    image: drawing,
  },
  {
    id: "dance",
    date: "22 SEP",
    day: "TUESDAY",
    title: "TRADITIONAL DANCE COMPETITION",
    time: "07:00 PM",
    location: "MAIN STAGE",
    category: "Cultural",
    description:
      "Electrifying folk, classical, and fusion dance performances by young talents and community troupes.",
    image: dance,
  },
  {
    id: "fancy-dress",
    date: "23 SEP",
    day: "WEDNESDAY",
    title: "FANCY DRESS & CULTURAL SHOWCASE",
    time: "06:30 PM",
    location: "MAIN STAGE",
    category: "Cultural",
    description:
      "A vibrant evening where children and youth portray mythological characters and historical icons of Maharashtra.",
    image: fancyDress,
  },
  {
    id: "visarjan",
    date: "24 SEP",
    day: "THURSDAY",
    title: "GRAND VISARJAN PROCESSION",
    time: "04:00 PM",
    location: "PROCESSION ROUTE",
    category: "Devotional",
    description:
      "A sacred, emotionally stirring farewell procession with chants of 'Pudhchya Varshi Lavkar Ya' and flower showers.",
    image: visarjan,
  },
];

const CATEGORIES = ["All", "Devotional", "Cultural", "Sports", "Health"];

export default function Ganeshotsav2026() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredEvents =
    selectedCategory === "All"
      ? EVENTS
      : EVENTS.filter((e) => e.category === selectedCategory);

  return (
    <>
      {/* 1st Section: Full-Screen Cinematic Hero (same as /about first section) */}
      <section className="hero-section utsav-section" id="ganeshotsav-hero">
        <div className="utsav-media">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={hero}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source src={ganeshUtsavVideo} type="video/mp4" />
          </video>
        </div>

        <div className="utsav-shade about-hero-shade" />
        <div className="hero-grain" />

        <div className="utsav-content about-hero-top-content">
          <div className="eyebrow reveal-up" data-reveal>
            GANESH UTSAV 2026
          </div>

          <h1 className="h1" data-reveal>
            GANESHOTSAV <span className="gold-text">2026</span>
          </h1>

          <div className="hero-actions" data-reveal>
            <Button href="#schedule" variant="primary" size="lg">
              View Full Schedule →
            </Button>
            <Button to="/contact" variant="secondary" size="lg">
              Volunteer With Us
            </Button>
          </div>
        </div>

        <div className="hero-scroll">
          <span>SHRIKANT SPORTS CLUB</span>
          <i />
        </div>
      </section>

      {/* Daily Aarti Timings Banner */}
      <Section spacing="sm" style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
        <Container size="standard">
          <div style={{ textAlign: "center", marginBottom: "var(--space-6)" }}>
            <span className="eyebrow">DAILY DEVOTIONS</span>
            <h3 style={{ fontSize: "1.5rem", marginTop: "6px" }}>DAILY AARTI TIMETABLE</h3>
          </div>
          <div className="grid-4" data-reveal>
            <Card padding="sm" style={{ textAlign: "center" }}>
              <span className="caption gold-text">MORNING</span>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 600, color: "var(--color-text-primary)", margin: "4px 0" }}>
                08:00 AM
              </div>
              <p className="caption">Kakad Aarti & Pujan</p>
            </Card>
            <Card padding="sm" style={{ textAlign: "center" }}>
              <span className="caption gold-text">AFTERNOON</span>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 600, color: "var(--color-text-primary)", margin: "4px 0" }}>
                12:30 PM
              </div>
              <p className="caption">Madhyana Aarti & Bhog</p>
            </Card>
            <Card padding="sm" style={{ textAlign: "center" }}>
              <span className="caption gold-text">EVENING</span>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 600, color: "var(--color-text-primary)", margin: "4px 0" }}>
                07:30 PM
              </div>
              <p className="caption">Sandhya Maha Aarti</p>
            </Card>
            <Card padding="sm" style={{ textAlign: "center" }}>
              <span className="caption gold-text">NIGHT</span>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 600, color: "var(--color-text-primary)", margin: "4px 0" }}>
                10:00 PM
              </div>
              <p className="caption">Shej Aarti & Shanti Path</p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Festival Schedule */}
      <Section
        id="schedule"
        spacing="xl"
        eyebrow="Program Itinerary"
        heading="10-DAY FESTIVAL SCHEDULE"
        description="Filter events by category and plan your visit to experience the sacred festivities and competitions."
        headerAlign="split"
        headerAction={
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`btn btn-sm ${selectedCategory === cat ? "btn-primary" : "btn-secondary"}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        }
      >
        <div className="grid-2" style={{ marginTop: "var(--space-8)" }} data-reveal>
          {filteredEvents.length === 0 ? (
            <div style={{ gridColumn: "span 2", textAlign: "center", padding: "var(--space-8)" }}>
              <p className="body-lg" style={{ color: "var(--color-text-secondary)" }}>
                No events found in this category.
              </p>
            </div>
          ) : (
            filteredEvents.map((evt) => (
              <Card
                key={evt.id}
                interactive
                padding="none"
                className="event-schedule-card"
                onClick={() => setSelectedEvent(evt)}
                style={{
                  cursor: "pointer",
                  overflow: "hidden",
                  alignItems: "stretch",
                }}
              >
              <div className="event-card-media" style={{ position: "relative" }}>
                <img
                  src={evt.image}
                  alt={evt.title}
                  loading="lazy"
                  decoding="async"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "var(--space-2)",
                    left: "var(--space-2)",
                  }}
                >
                  <span className="badge badge-gold" style={{ fontSize: "0.6875rem" }}>
                    {evt.date}
                  </span>
                </div>
              </div>

              <div style={{ padding: "var(--space-5)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "var(--space-2)" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span className="caption gold-text" style={{ fontSize: "0.6875rem" }}>
                      {evt.day} · {evt.time}
                    </span>
                    <span className="badge" style={{ fontSize: "0.625rem", padding: "2px 6px" }}>
                      {evt.category}
                    </span>
                  </div>
                  <h4 style={{ fontSize: "1.1rem", marginTop: "6px", color: "var(--color-text-primary)" }}>
                    {evt.title}
                  </h4>
                  <p className="body-sm" style={{ color: "var(--color-text-secondary)", marginTop: "4px" }}>
                    {evt.description}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", color: "var(--color-accent)" }}>
                  <Icon name="map-pin" size={14} />
                  <span>{evt.location}</span>
                </div>
              </div>
            </Card>
            ))
          )}
        </div>
      </Section>

      {/* Full-Screen Festival Finale before Footer (same as /about before footer section) */}
      <section className="hero-section utsav-section" id="ganeshotsav-finale">
        <div className="utsav-media">
          <img
            src={ganeshotsavClosing}
            alt="Ganpati Bappa Morya"
            loading="lazy"
            decoding="async"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }}
          />
        </div>

        <div className="utsav-shade" />
        <div className="hero-grain" />

        <div className="utsav-content">
          <div className="eyebrow reveal-up" data-reveal>
            GANPATI BAPPA MORYA
          </div>

          <h2 data-reveal>
            EXPERIENCE THE DIVINE. <em>JOIN US.</em>
          </h2>

          <div className="hero-actions" style={{ marginTop: "1.75rem" }} data-reveal>
            <Button to="/contact" variant="primary" size="lg">
              Volunteer With Us →
            </Button>
            <Button to="/gallery" variant="secondary" size="lg">
              View Festival Gallery
            </Button>
          </div>
        </div>

        <div className="hero-scroll">
          <span>SHRIKANT SPORTS CLUB · GANESHOTSAV 2026</span>
          <i />
        </div>
      </section>

      {/* Lightbox for Event Preview */}
      {selectedEvent && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
            background: "rgba(28, 25, 23, 0.72)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
          onClick={() => setSelectedEvent(null)}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "640px",
              width: "100%",
              background: "var(--color-bg-elevated, #FFFFFF)",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--color-border)",
              boxShadow: "0 24px 60px rgba(28, 25, 23, 0.25)",
              overflow: "hidden",
              padding: "1.5rem",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              aria-label="Close event preview"
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                zIndex: 10,
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(28, 25, 23, 0.06)",
                border: "1px solid var(--color-border)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-text-primary)",
              }}
            >
              <Icon name="close" size={18} />
            </button>
            <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", maxHeight: "360px" }}>
              <img src={selectedEvent.image} alt={selectedEvent.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
                <span className="badge badge-gold">{selectedEvent.date} ({selectedEvent.day})</span>
                <span className="badge">{selectedEvent.time}</span>
                <span className="badge">{selectedEvent.location}</span>
              </div>
              <h3 style={{ color: "var(--color-text-primary)", fontSize: "1.35rem", fontWeight: 600 }}>
                {selectedEvent.title}
              </h3>
              <p className="body-sm" style={{ color: "var(--color-text-secondary)", marginTop: "8px", lineHeight: 1.6 }}>
                {selectedEvent.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}