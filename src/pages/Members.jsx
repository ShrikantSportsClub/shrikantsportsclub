import React, { useState, useEffect } from "react";
import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import "./Members.css";

import membersBanner from "../assets/members-banner.png";
import aboutCommunity from "../assets/About/about-community.jpg";

const FOUNDER_MEMBERS = [
  { id: "01", name: "Late Vijay Shetye", role: "Founder Member", tag: "Founder Member" },
  { id: "02", name: "Late Avinash Thorat", role: "Founder Member", tag: "Founder Member" },
  { id: "03", name: "Pradeep Bhosle", role: "Founder Member", tag: "Founder Member" },
  { id: "04", name: "Nilesh Vibhakar", role: "Founder Member", tag: "Founder Member" },
  { id: "05", name: "Tushar Reghe", role: "Founder Member", tag: "Founder Member" },
  { id: "06", name: "Sudhir Kulkarni", role: "Founder Member", tag: "Founder Member" },
  { id: "07", name: "Prasad Prabhu", role: "Founder Member", tag: "Founder Member" },
  { id: "08", name: "Vasant Pai", role: "Founder Member", tag: "Founder Member" },
  { id: "09", name: "Satish Patil", role: "Founder Member", tag: "Founder Member" },
  { id: "10", name: "Milind Navghare", role: "Founder Member", tag: "Founder Member" },
  { id: "11", name: "Prakash Khanapurkar", role: "Founder Member", tag: "Founder Member" },
];

const CORE_COMMITTEE = [
  { id: "01", name: "Sandeep Ayre", role: "President", tag: "Core Committee" },
  { id: "02", name: "Pranav Nikumbh", role: "Vice President", tag: "Core Committee" },
  { id: "03", name: "Swapnil Patil", role: "Secretary", tag: "Core Committee" },
  { id: "04", name: "Rupesh Raut", role: "Deputy Secretary", tag: "Core Committee" },
  { id: "05", name: "Milind Gaonkar", role: "Treasurer", tag: "Core Committee" },
  { id: "06", name: "Sanil Pednekar", role: "Deputy Treasurer", tag: "Core Committee" },
];

const EXECUTIVE_COMMITTEE = [
  { id: "01", name: "Hitesh Dedhia", role: "Executive Member", tag: "Executive Committee" },
  { id: "02", name: "Mayur Pawar", role: "Executive Member", tag: "Executive Committee" },
  { id: "03", name: "Vivek Parmar", role: "Executive Member", tag: "Executive Committee" },
  { id: "04", name: "Siddhant Paralikar", role: "Executive Member", tag: "Executive Committee" },
  { id: "05", name: "Amey Chavan", role: "Executive Member", tag: "Executive Committee" },
  { id: "06", name: "Saurabh Sawant", role: "Executive Member", tag: "Executive Committee" },
  { id: "07", name: "Shashank Shesh", role: "Executive Member", tag: "Executive Committee" },
];

const ADVISORY_COMMITTEE = [
  { id: "01", name: "Parag Gandhi", role: "Advisor", tag: "Advisory Committee" },
  { id: "02", name: "Sameer Chavan", role: "Advisor", tag: "Advisory Committee" },
  { id: "03", name: "Rashid Siddiqui", role: "Advisor", tag: "Advisory Committee" },
  { id: "04", name: "Anup Kazani", role: "Advisor", tag: "Advisory Committee" },
  { id: "05", name: "Vinay Zore", role: "Advisor", tag: "Advisory Committee" },
  { id: "06", name: "Prakash Chellari", role: "Advisor", tag: "Advisory Committee" },
];

const CATEGORY_GROUPS = [
  {
    id: "founder",
    title: "Founder Members",
    badge: "FOUNDATION · 1985",
    members: FOUNDER_MEMBERS,
  },
  {
    id: "core",
    title: "Core Committee",
    badge: "EXECUTIVE LEADERSHIP",
    members: CORE_COMMITTEE,
  },
  {
    id: "executive",
    title: "Executive Committee",
    badge: "OPERATIONS & EVENTS",
    members: EXECUTIVE_COMMITTEE,
  },
  {
    id: "advisory",
    title: "Advisory Committee",
    badge: "GUIDANCE & COUNSEL",
    members: ADVISORY_COMMITTEE,
  },
];

const VOLUNTEERS = [
  "Jayanti Parmar",
  "Amit Parmar",
  "Vinayak Zore",
  "Kumar Raju",
  "Bhavesh Poonater",
  "Bharat Navghare",
  "Pradeep Ayare",
  "Prakash Ayare",
  "Amit Dharod",
  "Uttam Dharod",
  "Rashid Siddiqui",
  "Saquib Siddiqui",
  "Arun Patil",
  "Shreyas Shirgaonkar",
  "Sherry Mathew",
  "Yajuvendra Sengar",
  "Siddesh Pawar",
  "Sharad Pawar",
  "Ravi Pawar",
  "Onkar Dichwalkar",
];

export default function Members() {
  const [activeTab, setActiveTab] = useState("all");

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
  }, [activeTab]);

  const displayedGroups =
    activeTab === "all"
      ? CATEGORY_GROUPS
      : CATEGORY_GROUPS.filter((group) => group.id === activeTab);

  const totalMembersCount =
    FOUNDER_MEMBERS.length +
    CORE_COMMITTEE.length +
    EXECUTIVE_COMMITTEE.length +
    ADVISORY_COMMITTEE.length;

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

      {/* 2nd Section: COMMITTEE MEMBERS (Matching Homepage "The Heart Behind It All" Layout) */}
      <section className="people-section members-people-section" id="committee-members">
        <div className="people-header">
          <div>
            <div className="eyebrow dark reveal-up" data-reveal>
              <span />
              OUR TEAM
            </div>
            <h2 className="people-title reveal-up" data-reveal>
              COMMITTEE
              <br />
              <em>MEMBERS.</em>
            </h2>
          </div>

          <div className="people-intro-wrap reveal-up" data-reveal>
            <div className="people-badge">LEADERSHIP & SERVICE</div>
            <p className="people-intro">
              The dedicated individuals whose tireless year-round effort powers our celebrations, sports tournaments, and social welfare drives.
            </p>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="members-category-tabs" data-reveal>
          <button
            type="button"
            className={`members-tab-btn ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Members <span className="members-tab-count">({totalMembersCount})</span>
          </button>
          {CATEGORY_GROUPS.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`members-tab-btn ${activeTab === cat.id ? "active" : ""}`}
              onClick={() => setActiveTab(cat.id)}
            >
              {cat.title} <span className="members-tab-count">({cat.members.length})</span>
            </button>
          ))}
        </div>

        {/* Grouped Committee Grids (Homepage person-card & people-grid Layout) */}
        <div className="members-groups-container">
          {displayedGroups.map((group) => (
            <div className="members-group-wrap" key={group.id} id={group.id}>
              <div className="category-group-header" data-reveal>
                <div className="category-group-title-wrap">
                  <span className="people-badge">{group.badge}</span>
                  <h3 className="category-group-title">{group.title}</h3>
                </div>
                <span className="category-group-count">{group.members.length} Members</span>
              </div>

              <div className="people-grid members-people-grid">
                {group.members.map((member) => (
                  <article
                    className="person-card"
                    data-reveal
                    key={`${group.id}-${member.name}`}
                  >
                    <div className="person-card-top">
                      <span className="person-card-index">{member.id}</span>
                      <span className="person-card-tag">{member.tag}</span>
                    </div>

                    <div className="person-card-main">
                      <div className="person-card-role">
                        <span className="person-role-en">{member.role}</span>
                      </div>
                      <h3 className="person-card-name">{member.name}</h3>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3rd Section: Volunteer Honor Roll (Exact 20 Volunteers) */}
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
              Recognizing our active youth volunteers assisting in mandap management, crowd coordination, festive drives, and sports logistics.
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