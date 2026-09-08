import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../ui/Button";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Ganesh Utsav 2026", path: "/ganeshotsav2026" },
  { label: "Gallery", path: "/gallery" },
  { label: "Members", path: "/members" },
  { label: "Contact", path: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
        <div className="site-container">
          <div className="header-inner">
            {/* Brand Logo */}
            <Link to="/" className="header-logo" aria-label="Shrikant Sports Club Home">
              <div className="header-logo-mark">SSC</div>
              <div className="header-brand-title">
                <strong>SHRIKANT</strong>
                <span>SPORTS CLUB</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="header-nav" aria-label="Main Navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link ${isActive(link.path) ? "is-active" : ""}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA & Mobile Menu Toggle */}
            <div className="header-actions">
              <Button to="/contact" variant="primary" size="sm">
                Get In Touch
              </Button>

              <button
                type="button"
                className={`menu-toggle ${mobileMenuOpen ? "is-open" : ""}`}
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label={mobileMenuOpen ? "Close Menu" : "Open Navigation Menu"}
                aria-expanded={mobileMenuOpen}
              >
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Luxury Mobile Overlay */}
      <aside className={`mobile-overlay ${mobileMenuOpen ? "is-open" : ""}`} aria-hidden={!mobileMenuOpen}>
        <div className="site-container" style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "var(--space-4)" }}>
              <div className="eyebrow">SHRIKANT SPORTS CLUB</div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-ghost"
                style={{ fontSize: "1.2rem", padding: "8px" }}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <nav className="mobile-nav-links">
              {NAV_LINKS.map((link, idx) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`mobile-nav-link ${isActive(link.path) ? "is-active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{link.label}</span>
                  <span className="num">{String(idx + 1).padStart(2, "0")} ↗</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="mobile-overlay-footer">
            <span>COMMUNITY · TRADITION · SPORTS</span>
            <span>MUMBAI</span>
          </div>
        </div>
      </aside>
    </>
  );
}
