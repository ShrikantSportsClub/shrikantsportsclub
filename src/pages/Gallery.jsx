import React, { useState } from "react";
import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import Lightbox from "../components/ui/Lightbox";

import m1 from "../assets/carousel/moment-01.jpg.jpg";
import aboutCommunity from "../assets/About/about-community.jpg";

// Eagerly import all album images strictly from src/assets/Albums
const albumImageModules = import.meta.glob(
  "../assets/Albums/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}",
  { eager: true, import: "default" }
);

// Group images strictly by their exact album folder name
const albumImagesByFolder = {};

Object.entries(albumImageModules).forEach(([filePath, resolvedUrl]) => {
  const normalized = filePath.replace(/\\/g, "/");
  const match = normalized.match(/assets\/Albums\/([^/]+)\//i);
  if (match && match[1]) {
    const folder = match[1];
    if (!albumImagesByFolder[folder]) {
      albumImagesByFolder[folder] = [];
    }
    albumImagesByFolder[folder].push(resolvedUrl);
  }
});

const ALBUMS_CONFIG = [
  {
    folder: "SSC Ganapati",
    id: "ssc-ganapati",
    title: "SSC Ganapati Celebrations",
    category: "Ganpati",
    year: "Festival",
    description: "Sacred moments, divine aartis, grand dhol-tasha aagman processions, and community devotion for Bappa.",
  },
  {
    folder: "State Level Carrom Competition 2025",
    id: "carrom-2025",
    title: "State Level Carrom Competition 2025",
    category: "Sports",
    year: "2025",
    description: "Maharashtra state-level carrom championship featuring high-stakes matches, top-ranked players, and trophy honors.",
  },
  {
    folder: "State Level Carrom Competition 2024",
    id: "carrom-2024",
    title: "State Level Carrom Competition 2024",
    category: "Sports",
    year: "2024",
    description: "State-level carrom showdown bringing together masters of the board for an exhilarating tournament in Mumbai.",
  },
  {
    folder: "SPL 2023",
    id: "spl-2023",
    title: "Shrikant Premier League (SPL) 2023",
    category: "Sports",
    year: "2023",
    description: "High-energy tennis ball cricket tournament fostering athletic excellence, neighborhood camaraderie, and teamwork.",
  },
  {
    folder: "Road Naming 2021",
    id: "road-naming-2021",
    title: "Neighbourhood Road Naming Ceremony",
    category: "Community",
    year: "2021",
    description: "Historic civic recognition cementing our neighborhood identity and honoring our club's decades of dedicated service.",
  },
  {
    folder: "Khel Paithanicha 2019",
    id: "khel-paithanicha-2019",
    title: "Khel Paithanicha 2019",
    category: "Culture",
    year: "2019",
    description: "Celebrating traditional Maharashtrian cultural games, joyful family competition, and neighborhood women empowerment.",
  },
  {
    folder: "Kutumb Melawa 2018",
    id: "kutumb-melawa-2018",
    title: "Kutumb Melawa 2018",
    category: "Community",
    year: "2018",
    description: "Grand community gathering uniting generations of club families in harmony, laughter, games, and fellowship.",
  },
  {
    folder: "Jeshtha Nagarik Sanman 2018",
    id: "jeshtha-nagarik-2018",
    title: "Jeshtha Nagarik Sanman 2018",
    category: "Community",
    year: "2018",
    description: "Felicitation ceremony honoring senior citizens whose blessings, guidance, and wisdom guide our community.",
  },
  {
    folder: "Free Eye Check Up Camp 2017",
    id: "eye-checkup-2017",
    title: "Free Eye Check Up Camp 2017",
    category: "Healthcare",
    year: "2017",
    description: "Accessible community healthcare initiative offering free vision screenings, doctor consultations, and spectacles.",
  },
  {
    folder: "Health Check Up Camp 2017",
    id: "health-camp-2017",
    title: "Comprehensive Health Check Up Camp 2017",
    category: "Healthcare",
    year: "2017",
    description: "General diagnostic medical camp providing vital screenings, blood tests, and health counsel to local families.",
  },
  {
    folder: "Glass Mosaic Workshop 2017",
    id: "glass-mosaic-2017",
    title: "Glass Mosaic Workshop 2017",
    category: "Culture",
    year: "2017",
    description: "Interactive artistic workshop inspiring creative expression, craft skills, and vocational appreciation through glass mosaic.",
  },
  {
    folder: "Selfie With Rangoli 2017",
    id: "selfie-rangoli-2017",
    title: "Selfie With Rangoli Contest 2017",
    category: "Culture",
    year: "2017",
    description: "Celebration of festive colors, traditional geometric patterns, and neighborhood artistic talent in rangoli art.",
  },
  {
    folder: "Nityanand Ashran Donation Drive 2017",
    id: "ashram-donation-2017",
    title: "Nityanand Ashram Donation Drive 2017",
    category: "Community",
    year: "2017",
    description: "Philanthropic drive distributing essential groceries, blankets, and support materials to Nityanand Ashram.",
  },
  {
    folder: "Old is Gold",
    id: "old-is-gold",
    title: "Old is Gold — Heritage Archive",
    category: "Heritage",
    year: "Archive",
    description: "Rare vintage photographs and nostalgic memorabilia from the early founding years of Shrikant Sports Club.",
  },
];

export const ALBUMS = ALBUMS_CONFIG.map((conf) => {
  const rawList = albumImagesByFolder[conf.folder] || [];
  const images = rawList.map((src, idx) => ({
    src,
    title: `${conf.title} — Photo ${idx + 1}`,
    caption: `${conf.title} (${conf.year}) — Photo ${idx + 1} of ${rawList.length}`,
    category: `${conf.category} · ${conf.year}`,
  }));

  return {
    id: conf.id,
    title: conf.title,
    category: conf.category,
    year: conf.year,
    cover: images[0]?.src || "",
    description: conf.description,
    images,
  };
}).filter((album) => album.images.length > 0);

const CATEGORIES = [
  "All Photos",
  "Ganpati",
  "Sports",
  "Community",
  "Culture",
  "Healthcare",
  "Heritage",
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All Photos");
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const filteredAlbums =
    activeCategory === "All Photos" || activeCategory === "All"
      ? ALBUMS
      : ALBUMS.filter((album) => album.category === activeCategory);

  const handleOpenAlbum = (album, startIdx = 0) => {
    setSelectedAlbum(album);
    setCurrentPhotoIndex(startIdx);
  };

  const handleCloseAlbum = () => {
    setSelectedAlbum(null);
    setCurrentPhotoIndex(0);
  };

  return (
    <>
      {/* 1st Section: Full-Screen Cinematic Hero (matching /about & /ganeshotsav2026) */}
      <section className="hero-section utsav-section" id="gallery-hero">
        <div className="utsav-media">
          <img
            src={m1}
            alt="Shrikant Sports Club Visual Chronicles"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
          />
        </div>

        <div className="utsav-shade about-hero-shade" />
        <div className="hero-grain" />

        <div className="utsav-content about-hero-top-content">
          <div className="eyebrow reveal-up" data-reveal>
            GALLERY
          </div>

          <h1 data-reveal>
            MOMENTS <br />
            <span className="gold-text">THAT STAY.</span>
          </h1>

          <div className="hero-actions" style={{ marginTop: "1.75rem" }} data-reveal>
            <Button href="#albums-section" variant="primary" size="lg">
              Explore Albums ↓
            </Button>
            <Button to="/ganeshotsav2026" variant="secondary" size="lg">
              Ganesh Utsav 2026
            </Button>
          </div>
        </div>

        <div className="hero-scroll">
          <span>SCROLL TO DISCOVER</span>
          <i />
        </div>
      </section>

      <Section id="albums-section" spacing="lg">
        {/* Category Filter Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "var(--space-8)",
          }}
          data-reveal
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`btn btn-sm ${activeCategory === cat ? "btn-primary" : "btn-secondary"}`}
              onClick={() => {
                setActiveCategory(cat);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Album Grid */}
        <div className="grid-3" data-reveal>
          {filteredAlbums.map((album) => (
            <div
              key={album.id}
              className="luxury-card-interactive"
              onClick={() => handleOpenAlbum(album, 0)}
              style={{
                cursor: "pointer",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                border: "1px solid var(--color-border)",
                background: "var(--color-surface)",
                boxShadow: "0 4px 20px rgba(28, 25, 23, 0.05)",
                display: "flex",
                flexDirection: "column",
                transition: "all 350ms cubic-bezier(0.16, 1, 0.3, 1)",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.borderColor = "var(--color-border-accent)";
                e.currentTarget.style.boxShadow = "0 16px 36px rgba(28, 25, 23, 0.1), 0 0 24px rgba(168, 123, 36, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(28, 25, 23, 0.05)";
              }}
            >
              {/* Cover Photo with Stacked Album Depth */}
              <div style={{ position: "relative", height: "270px", overflow: "hidden", background: "var(--color-surface)" }}>
                <img
                  src={album.cover}
                  alt={album.title}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, rgba(12,10,9,0.3) 0%, rgba(12,10,9,0) 45%, rgba(12,10,9,0.75) 100%)",
                  }}
                />

                {/* Top Badges */}
                <div
                  style={{
                    position: "absolute",
                    top: "14px",
                    left: "14px",
                    right: "14px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    zIndex: 2,
                  }}
                >
                  <span
                    className="badge badge-gold"
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Icon name="camera" size={13} />
                    {album.images.length} Photos
                  </span>

                  <span
                    className="caption"
                    style={{
                      background: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(6px)",
                      padding: "4px 10px",
                      borderRadius: "var(--radius-pill)",
                      fontSize: "0.7rem",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text-primary)",
                      letterSpacing: "0.08em",
                      boxShadow: "0 2px 6px rgba(28, 25, 23, 0.08)",
                    }}
                  >
                    {album.year}
                  </span>
                </div>

                {/* Category Pill on Image Bottom */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "14px",
                    zIndex: 2,
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      color: "var(--color-accent)",
                      fontWeight: 600,
                      textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                    }}
                  >
                    {album.category}
                  </span>
                </div>
              </div>

              {/* Album Card Content */}
              <div
                style={{
                  padding: "var(--space-5)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flex: 1,
                  gap: "var(--space-3)",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontFamily: "var(--font-display)",
                      fontWeight: 500,
                      lineHeight: 1.25,
                      color: "var(--color-text-primary)",
                      margin: "0 0 0.5rem 0",
                    }}
                  >
                    {album.title}
                  </h3>

                  <p
                    className="body-sm"
                    style={{
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.6,
                      margin: 0,
                      fontSize: "0.875rem",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {album.description}
                  </p>
                </div>

                {/* Thumbnail Preview Strip */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    paddingTop: "0.5rem",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {album.images.slice(0, 4).map((thumb, tIdx) => (
                    <div
                      key={tIdx}
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "var(--radius-sm)",
                        overflow: "hidden",
                        border: "1px solid rgba(255,255,255,0.12)",
                        flexShrink: 0,
                        opacity: 0.85,
                        transition: "opacity 200ms ease",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenAlbum(album, tIdx);
                      }}
                    >
                      <img
                        src={thumb.src}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                  ))}

                  {album.images.length > 4 && (
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "var(--radius-sm)",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        color: "var(--color-accent)",
                        fontWeight: 600,
                      }}
                    >
                      +{album.images.length - 4}
                    </div>
                  )}

                  <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "4px" }}>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--color-accent)",
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                      }}
                    >
                      View Album
                    </span>
                    <Icon name="arrow-up-right" size={14} style={{ color: "var(--color-accent)" }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Full-Screen Finale Before Footer (matching /about & /ganeshotsav2026) */}
      <section className="hero-section utsav-section" id="gallery-finale">
        <div className="utsav-media">
          <img
            src={aboutCommunity}
            alt="Shrikant Sports Club Community Celebration"
            loading="lazy"
            decoding="async"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }}
          />
        </div>

        <div className="utsav-shade about-hero-shade" />
        <div className="hero-grain" />

        <div className="utsav-content about-hero-top-content">
          <div className="eyebrow reveal-up" data-reveal>
            SHRIKANT SPORTS CLUB
          </div>

          <h2 data-reveal>
            EVERY MOMENT <br />
            <em>BECOMES A MEMORY.</em>
          </h2>

          <div className="hero-actions" style={{ marginTop: "1.75rem" }} data-reveal>
            <Button to="/contact" variant="primary" size="lg">
              Get In Touch →
            </Button>
            <Button to="/ganeshotsav2026" variant="secondary" size="lg">
              Ganesh Utsav 2026
            </Button>
          </div>
        </div>

        <div className="hero-scroll">
          <span>SHRIKANT SPORTS CLUB</span>
          <i />
        </div>
      </section>

      {/* Album Lightbox Modal */}
      {selectedAlbum && (
        <Lightbox
          isOpen={selectedAlbum !== null}
          onClose={handleCloseAlbum}
          images={selectedAlbum.images}
          currentIndex={currentPhotoIndex}
          onIndexChange={(idx) => setCurrentPhotoIndex(idx)}
        />
      )}
    </>
  );
}