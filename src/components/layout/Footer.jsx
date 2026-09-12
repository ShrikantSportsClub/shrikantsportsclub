import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/logo/shrikant-sports-club-logo.png.png";
import instagramIcon from "../../assets/icons/instagram.svg";
import youtubeIcon from "../../assets/icons/youtube.svg";
import facebookIcon from "../../assets/icons/facebook.svg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" id="contact">
      <div className="footer-main">
        <div className="footer-brand">
          <img src={logoImg} alt="Shrikant Sports Club Logo" className="footer-logo-img" />

          <h3>SHRIKANT SPORTS CLUB</h3>

          <p>
            A community built around faith, tradition, sportsmanship, participation and togetherness in Mumbai.
          </p>
        </div>

        <div className="footer-column">
          <span>EXPLORE</span>
          <Link to="/">Home</Link>
          <Link to="/about">Our Story & Heritage</Link>
          <Link to="/ganeshotsav2026">Ganesh Utsav 2026</Link>
          <Link to="/gallery">Moments & Gallery</Link>
          <Link to="/members">Members & Advisory</Link>
        </div>

        <div className="footer-column">
          <span>CONNECT</span>
          <Link to="/contact">Contact</Link>
          <a
            href="https://www.instagram.com/shrikantsportsclub/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link footer-social-instagram"
          >
            <img src={instagramIcon} alt="" className="footer-social-icon" />
            <span>Instagram ↗</span>
          </a>
          <a
            href="https://www.youtube.com/c/ShrikantSportsClub"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link footer-social-youtube"
          >
            <img src={youtubeIcon} alt="" className="footer-social-icon" />
            <span>YouTube ↗</span>
          </a>
          <a
            href="https://www.facebook.com/shrikantsportsclub/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link footer-social-facebook"
          >
            <img src={facebookIcon} alt="" className="footer-social-icon" />
            <span>Facebook ↗</span>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {currentYear} Shrikant Sports Club</span>
        <span className="footer-credit">
          Made with ❤️ by <a href="https://indepthseo.com" target="_blank" rel="noopener noreferrer">IndepthSEO</a>
        </span>
        <span>GANESH UTSAV 2026</span>
      </div>
    </footer>
  );
}
