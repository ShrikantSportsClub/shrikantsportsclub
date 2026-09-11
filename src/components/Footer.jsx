import React from "react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-logo-mark">SSC</div>

          <div className="footer-brand-name">
            <strong>SHRIKANT</strong>
            <span>SPORTS CLUB</span>
          </div>
        </div>

        <div className="footer-links">
          <a href="/#home">Home</a>
          <a href="/#living-photograph">Living Photograph</a>
          <a href="/#more-than-ganpati">More Than Ganpati</a>
          <a href="/#moments">Moments</a>
          <a href="/#people">People</a>
          <a href="/#ganesh-utsav">Ganesh Utsav 2026</a>
          <a href="/#about">Our Story</a>
          <a href="/contact">Contact</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Shrikant Sports Club</span>
        <span className="footer-credit">
          Made with ❤️ by <a href="https://indepthseo.com" target="_blank" rel="noopener noreferrer">IndepthSEO</a>
        </span>
        <span>GANPATI BAPPA MORYA</span>
      </div>
    </footer>
  );
}