import React, { useState } from "react";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import "./Contact.css";

import peopleImage from "../assets/people.png";
import aboutCommunity from "../assets/About/about-community.jpg";
import instagramIcon from "../assets/icons/instagram.svg";
import youtubeIcon from "../assets/icons/youtube.svg";
import facebookIcon from "../assets/icons/facebook.svg";

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <>
      {/* 1st Section: Full-Screen Cinematic Hero (matching /about) */}
      <section className="hero-section utsav-section" id="contact-hero">
        <div className="utsav-media">
          <img
            src={peopleImage}
            alt="Connect with Shrikant Sports Club"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%" }}
          />
        </div>

        <div className="utsav-shade about-hero-shade" />
        <div className="hero-grain" />

        <div className="utsav-content about-hero-top-content">
          <div className="eyebrow reveal-up" data-reveal>
            CONTACT US
          </div>

          <h1 data-reveal>
            GET IN <br />
            <span className="gold-text">TOUCH</span>
          </h1>

          <div className="hero-actions" style={{ marginTop: "1.75rem" }} data-reveal>
            <Button href="#contact-connect" variant="primary" size="lg">
              Send A Message ↓
            </Button>
            <Button href="#contact-location" variant="secondary" size="lg">
              Find Us
            </Button>
          </div>
        </div>

        <div className="hero-scroll">
          <span>SCROLL TO CONNECT</span>
          <i />
        </div>
      </section>

      {/* =====================================================
          CONTACT / FORM (matching http://localhost:5174/contact)
      ===================================================== */}
      <section className="contact-connect" id="contact-connect">
        <div className="contact-connect-inner">
          <div className="contact-intro" data-reveal>
            <div className="contact-eyebrow">
              GET IN TOUCH
            </div>

            <h2>
              We'd love to hear
              <br />
              from <em>you.</em>
            </h2>

            <p>
              Whether you have a question about the
              celebration, want to volunteer, explore
              sponsorship opportunities, or simply want
              to be part of the community, we'd love
              to hear from you.
            </p>

            {/* 3 Contact Info Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
              {/* 1. Mandap & Secretariat */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                  padding: "var(--space-4)",
                  background: "var(--color-bg-elevated)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "var(--radius-pill)",
                    background: "var(--color-accent-subtle)",
                    border: "1px solid var(--color-border-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-accent)",
                    flexShrink: 0,
                  }}
                >
                  <Icon name="map-pin" size={18} />
                </div>
                <div>
                  <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-text-primary)", margin: 0, fontFamily: "var(--font-body)" }}>
                    Club Mandap & Secretariat
                  </h4>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", margin: "4px 0 0", lineHeight: 1.5, fontFamily: "var(--font-body)" }}>
                    Shrikant Sports Club,<br />
                    Cross Road No. 1, Ashok Nagar, Kandivali East, Mumbai
                  </p>
                </div>
              </div>

              {/* 2. Email & Helpline */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                  padding: "var(--space-4)",
                  background: "var(--color-bg-elevated)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "var(--radius-pill)",
                    background: "var(--color-accent-subtle)",
                    border: "1px solid var(--color-border-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-accent)",
                    flexShrink: 0,
                  }}
                >
                  <Icon name="mail" size={18} />
                </div>
                <div>
                  <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-text-primary)", margin: 0, fontFamily: "var(--font-body)" }}>
                    Email & Direct Phone
                  </h4>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", margin: "4px 0 0", lineHeight: 1.5, fontFamily: "var(--font-body)" }}>
                    contact@shrikantsportsclub.org<br />
                    +91 98200 45678 / +91 98190 12345
                  </p>
                </div>
              </div>

              {/* 3. Darshan & Timings */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                  padding: "var(--space-4)",
                  background: "var(--color-bg-elevated)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "var(--radius-pill)",
                    background: "var(--color-accent-subtle)",
                    border: "1px solid var(--color-border-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-accent)",
                    flexShrink: 0,
                  }}
                >
                  <Icon name="clock" size={18} />
                </div>
                <div>
                  <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-text-primary)", margin: 0, fontFamily: "var(--font-body)" }}>
                    Darshan & Office Hours
                  </h4>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", margin: "4px 0 0", lineHeight: 1.5, fontFamily: "var(--font-body)" }}>
                    Daily: 07:00 AM – 11:00 PM (During Utsav)<br />
                    General Office: 05:00 PM – 09:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-socials">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="social-link"
                aria-label="Instagram"
              >
                <img src={instagramIcon} alt="Instagram" />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="social-link"
                aria-label="YouTube"
              >
                <img src={youtubeIcon} alt="YouTube" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="social-link"
                aria-label="Facebook"
              >
                <img src={facebookIcon} alt="Facebook" />
              </a>
            </div>
          </div>

          {/* FORM */}
          <div className="contact-form-wrap" data-reveal>
            {formSubmitted ? (
              <div style={{ textAlign: "center", padding: "30px 10px" }}>
                <div style={{ width: "54px", height: "54px", borderRadius: "9999px", background: "rgba(198, 163, 95, 0.15)", border: "1px solid var(--color-accent)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <Icon name="check" size={28} color="var(--color-accent)" />
                </div>
                <h3 style={{ fontSize: "1.5rem", color: "#f1ede4", fontFamily: "var(--font-display)" }}>Message Sent Successfully!</h3>
                <p style={{ color: "rgba(241, 237, 228, 0.7)", marginTop: "8px", fontSize: "16px", lineHeight: 1.6 }}>
                  Thank you. Our committee coordinator has received your message and will respond promptly.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="contact-submit"
                  style={{ marginTop: "24px", maxWidth: "240px", margin: "24px auto 0" }}
                >
                  <span>SEND ANOTHER</span>
                  <b>→</b>
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-field">
                  <label htmlFor="inquiry">NATURE OF INQUIRY</label>
                  <select
                    id="inquiry"
                    name="inquiry"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="general">General Enquiry</option>
                    <option value="ganesh-utsav">Ganesh Utsav 2026</option>
                    <option value="volunteering">Volunteering</option>
                    <option value="sponsorship">Sponsorship</option>
                    <option value="sports">Sports Activities</option>
                    <option value="cultural">Cultural Activities</option>
                    <option value="community">Community Activities</option>
                    <option value="membership">Membership</option>
                    <option value="media">Media / Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="contact-field">
                  <label htmlFor="name">FULL NAME</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="phone">PHONE NUMBER</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 00000 00000"
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="message">MESSAGE</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Tell us what's on your mind"
                    required
                  />
                </div>

                <button type="submit" className="contact-submit">
                  <span>SEND MESSAGE</span>
                  <b>→</b>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          FIND US (matching reference http://localhost:5174/contact)
      ===================================================== */}
      <section className="contact-location" id="contact-location">
        <div className="contact-location-inner">
          <div className="contact-location-copy">
            <div className="contact-eyebrow" data-reveal>
              FIND US
            </div>

            <h2 data-reveal>
              Come find
              <br />
              <em>us.</em>
            </h2>

            <div className="contact-address" data-reveal>
              <span>SHRIKANT SPORTS CLUB</span>
              <p>
                Cross Road No. 1
                <br />
                Ashok Nagar
                <br />
                Kandivali East
                <br />
                Mumbai, Maharashtra
              </p>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Cross+Road+No+1+Ashok+Nagar+Kandivali+East+Mumbai"
              target="_blank"
              rel="noreferrer"
              className="directions-link"
              data-reveal
            >
              GET DIRECTIONS
              <b>↗</b>
            </a>
          </div>

          <div className="contact-map" data-reveal>
            <iframe
              title="Shrikant Sports Club location"
              src="https://www.google.com/maps?q=Cross%20Road%20No%201%20Ashok%20Nagar%20Kandivali%20East%20Mumbai&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Full-Screen Finale Before Footer (matching /about) */}
      <section className="hero-section utsav-section" id="contact-finale">
        <div className="utsav-media">
          <img
            src={aboutCommunity}
            alt="Shrikant Sports Club Community"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }}
          />
        </div>

        <div className="utsav-shade about-hero-shade" />
        <div className="hero-grain" />

        <div className="utsav-content about-hero-top-content">
          <div className="eyebrow reveal-up" data-reveal>
            ONE FAMILY · ALWAYS CONNECTED
          </div>

          <h2 data-reveal>
            OUR DOORS ARE <br />
            <em>ALWAYS OPEN.</em>
          </h2>

          <div className="hero-actions" style={{ marginTop: "1.75rem" }} data-reveal>
            <Button to="/ganeshotsav2026" variant="primary" size="lg">
              Ganesh Utsav 2026
            </Button>
            <Button to="/gallery" variant="secondary" size="lg">
              Explore Gallery
            </Button>
          </div>
        </div>

        <div className="hero-scroll">
          <span>SHRIKANT SPORTS CLUB</span>
          <i />
        </div>
      </section>
    </>
  );
}