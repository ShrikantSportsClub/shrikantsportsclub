import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImg from "../../assets/logo/shrikant-sports-club-logo.png.png";

const MENU_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Our Story & Heritage", href: "/about" },
  { label: "Ganesh Utsav 2026", href: "/ganeshotsav2026" },
  { label: "Gallery & Moments", href: "/gallery" },
  { label: "Members & Advisory", href: "/members" },
  { label: "Contact & Inquiries", href: "/contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [inRevealSection, setInRevealSection] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  // Smart scroll-direction reveal/hide & Ganpati Reveal section hiding
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if user is inside the #ganpati-reveal section
      const revealEl = document.getElementById("ganpati-reveal");
      let insideReveal = false;
      if (revealEl) {
        const rect = revealEl.getBoundingClientRect();
        // When the reveal section is active in the viewport
        if (rect.top <= 100 && rect.bottom >= 100) {
          insideReveal = true;
        }
      }
      setInRevealSection(insideReveal);

      if (insideReveal) {
        setVisible(false);
      } else if (currentScrollY <= 60) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current + 8) {
        // Scrolling down -> hide header & logo & hamburger
        setVisible(false);
      } else if (currentScrollY < lastScrollY.current - 8) {
        // Scrolling up -> show header & logo & hamburger
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
    setVisible(true);
    setInRevealSection(false);
  }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const isHeaderShown = (!inRevealSection && visible) || open;

  return (
    <>
      <header className={`site-header ${isHeaderShown ? "is-visible" : "is-hidden"}`}>
        <Link to="/" className="header-logo" aria-label="Shrikant Sports Club Home">
          <img src={logoImg} alt="Shrikant Sports Club crest" />
          <span className="header-brand">
            <strong>Shrikant</strong>
            <small>Sports Club</small>
          </span>
        </Link>

        {/* Circular Hamburger / Close Toggle Button */}
        <button
          type="button"
          className={`menu-button ${open ? "is-open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
        >
          <span />
          <span />
        </button>
      </header>

      {/* Fullscreen Luxury Editorial Menu */}
      <aside className={`fullscreen-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="menu-glow" />

        <div className="menu-shell">
          <div className="menu-meta">
            <span>SHRIKANT SPORTS CLUB</span>
            <span>GANESH UTSAV 2026</span>
          </div>

          <nav>
            {MENU_ITEMS.map((item, index) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setOpen(false)}
                style={{ "--delay": `${index * 55}ms` }}
              >
                <i>{String(index + 1).padStart(2, "0")}</i>
                <span>{item.label}</span>
                <b>↗</b>
              </Link>
            ))}
          </nav>

          <div className="menu-bottom">
            <span>COMMUNITY · TRADITION · SPORTS</span>
            <span>MUMBAI</span>
          </div>
        </div>
      </aside>
    </>
  );
}
