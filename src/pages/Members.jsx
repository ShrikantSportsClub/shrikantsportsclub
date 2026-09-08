import React, { useEffect } from "react";
import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import "./Members.css";

import membersBanner from "../assets/members-banner.png";
import aboutCommunity from "../assets/About/about-community.jpg";

import p01 from "../assets/people/person-01.png";
import p02 from "../assets/people/person-02.png";
import p03 from "../assets/people/person-03.png";
import p04 from "../assets/people/person-04.png";
import p05 from "../assets/people/person-05.png";
import p06 from "../assets/people/person-06.png";
import p07 from "../assets/people/person-07.png";
import p08 from "../assets/people/person-08.png";
import p09 from "../assets/people/person-09.png";
import p10 from "../assets/people/person-10.png";
import p11 from "../assets/people/person-11.png";
import p12 from "../assets/people/person-12.png";
import p13 from "../assets/people/person-13.png";
import p14 from "../assets/people/person-14.png";
import p15 from "../assets/people/person-15.png";
import p16 from "../assets/people/person-16.png";
import p17 from "../assets/people/person-17.png";
import p18 from "../assets/people/person-18.png";

const COMMITTEE_MEMBERS = [
  { img: p01, name: "Rohan Deshmukh", role: "Festival Coordinator", id: "01" },
  { img: p02, name: "Amit Patil", role: "Sports Convenor", id: "02" },
  { img: p03, name: "Neha Joshi", role: "Cultural Coordinator", id: "03" },
  { img: p04, name: "Sanjay More", role: "Community Coordinator", id: "04" },
  { img: p05, name: "Vikas Kadam", role: "Operations Lead", id: "05" },
  { img: p06, name: "Pooja Sawant", role: "Youth Affairs", id: "06" },
  { img: p07, name: "Mahesh Shinde", role: "Logistics Lead", id: "07" },
  { img: p08, name: "Anjali Gokhale", role: "Women's Wing Lead", id: "08" },
  { img: p09, name: "Siddharth Rane", role: "Sports Team", id: "09" },
  { img: p10, name: "Sneha Surve", role: "Cultural Team", id: "10" },
  { img: p11, name: "Prathamesh Bane", role: "Youth Wing", id: "11" },
  { img: p12, name: "Kavita Salvi", role: "Social Welfare", id: "12" },
  { img: p13, name: "Shrikant G. Sawant", role: "Founder & Chief Advisor", id: "13" },
  { img: p14, name: "Chandrakant Patil", role: "Senior Advisor", id: "14" },
  { img: p15, name: "Sunita Deshmukh", role: "Cultural Advisor", id: "15" },
  { img: p16, name: "Rajendra Joshi", role: "Sports Advisor", id: "16" },
  { img: p17, name: "Deepak More", role: "Civic Relations Advisor", id: "17" },
  { img: p18, name: "Vinod Shinde", role: "Logistics Advisor", id: "18" },
];

const VOLUNTEERS = [
  "Aditya Parab", "Tanvi Khedekar", "Kunal Vichare", "Mayur Sawant",
  "Rupali Jagtap", "Swapnil Dalvi", "Pravin Shirodkar", "Sayali Redkar",
  "Nilesh Ghag", "Pooja Gawde", "Sachin Shirke", "Gaurav Parkar",
];

export default function Members() {
  useEffect(() => {
    const elements = document.querySelectorAll(".members-reveal, [data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("members-visible");
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="members-page">
      {/* 1st Section: Full-Screen Cinematic Hero */}
      <section className="hero-section utsav-section" id="members-hero">
        <div className="utsav-media">
          <img
            src={membersBanner}
            alt="Shrikant Sports Club Leadership & Team"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%" }}
          />
        </div>

        <div className="utsav-shade about-hero-shade" />
        <div className="hero-grain" />

        <div className="utsav-content about-hero-top-content">
          <div className="eyebrow reveal-up" data-reveal>
            MEMBERS
          </div>

          <h1 data-reveal>
            OUR STRENGTH, <br />
            <span className="gold-text">OUR COMMUNITY.</span>
          </h1>

          <div className="hero-actions" style={{ marginTop: "1.75rem" }} data-reveal>
            <Button href="#committee-members" variant="primary" size="lg">
              Meet The Committee ↓
            </Button>
            <Button href="#volunteers" variant="secondary" size="lg">
              View Volunteers
            </Button>
          </div>
        </div>

        <div className="hero-scroll">
          <span>SCROLL TO MEET THE PEOPLE</span>
          <i />
        </div>
      </section>

      {/* 2nd Section: Unified Committee Members (All 18 members in dark theme portrait grid) */}
      <section className="committee-section" id="committee-members">
        <div className="members-container">
          <div className="section-heading members-reveal">
            <div>
              <div className="members-eyebrow">
                <span />
                OUR TEAM
              </div>
              <h2>
                COMMITTEE <em>MEMBERS.</em>
              </h2>
            </div>
            <div>
              <p>
                The dedicated individuals whose tireless year-round effort powers our celebrations, sports tournaments, and social welfare drives.
              </p>
            </div>
          </div>

          <div className="portrait-grid members-reveal">
            {COMMITTEE_MEMBERS.map((member) => (
              <figure key={member.id} className="member-portrait">
                <div className="member-circle">
                  <img src={member.img} alt={member.name} />
                </div>
                <figcaption>
                  <span>{member.id}</span>
                  <strong>{member.name}</strong>
                  <small>{member.role}</small>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 3rd Section: Volunteer Honor Roll (Matching Current Website Aesthetics) */}
      <Section
        id="volunteers"
        spacing="xl"
        style={{
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <Container size="standard">
          <div style={{ textAlign: "center", marginBottom: "var(--space-8)" }}>
            <span className="eyebrow" data-reveal>HEART & HANDS</span>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)", marginTop: "8px" }} data-reveal>
              VOLUNTEER HONOR ROLL
            </h2>
            <p className="body-sm" style={{ color: "var(--color-text-secondary)", marginTop: "6px" }} data-reveal>
              Recognizing our active youth volunteers assisting in mandap management, crowd coordination, and sports logistics.
            </p>
          </div>

          <div className="grid-4" data-reveal style={{ gap: "1rem" }}>
            {VOLUNTEERS.map((v, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "1rem 1.25rem",
                  background: "rgba(12,10,9,0.6)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border)",
                  transition: "border-color 0.3s ease, transform 0.3s ease",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "rgba(198, 163, 95, 0.15)",
                    border: "1px solid var(--color-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon name="check" size={14} color="var(--color-accent)" />
                </div>
                <span className="body-sm" style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>
                  {v}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4th Section: Full-Width Cinematic Community Banner */}
      <section className="community-section" id="community-banner">
        <div
          className="community-image"
          style={{ backgroundImage: `url(${aboutCommunity})` }}
        />
        <div className="community-overlay" />
        <div className="community-content members-reveal">
          <span>BEYOND THE COMMITTEE</span>
          <h2>
            ONE COMMUNITY, <br />
            <em>MANY HANDS.</em>
          </h2>
          <div className="community-line" />
          <p>
            Every milestone and celebration belongs to the countless volunteers, supporters, and well-wishers who stand shoulder to shoulder.
          </p>
        </div>
      </section>
    </div>
  );
}