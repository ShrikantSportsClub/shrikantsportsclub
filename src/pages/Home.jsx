import React, { useEffect, useRef, useState } from "react";
import Button from "../components/ui/Button";
import Lightbox from "../components/ui/Lightbox";
import GanpatiScrollReveal from "../components/sections/GanpatiScrollReveal";

// Import core assets
import heroPoster from "../assets/hero/ganpati-hero.png";

import livingCommunity from "../assets/living-photograph/Community.png";
import livingTradition from "../assets/living-photograph/Tradition.png";
import livingFamily from "../assets/living-photograph/Family.png";

import beyondSports from "../assets/more-than-ganpati/sports.jpg";
import beyondCulture from "../assets/more-than-ganpati/Culture.png";
import beyondSocial from "../assets/more-than-ganpati/social.jpg";
import beyondCommunity from "../assets/more-than-ganpati/Community.jpg";

import m1 from "../assets/carousel/moment-01.jpg.jpg";
import m2 from "../assets/carousel/moment-02.jpg.jpg";
import m3 from "../assets/carousel/moment-03.jpg.jpg";
import m4 from "../assets/carousel/moment-04.jpg.jpg";
import m5 from "../assets/carousel/moment-05.jpg.jpg";
import m6 from "../assets/carousel/moment-06.jpg.jpg";
import m7 from "../assets/carousel/moment-07.jpg.png";
import m8 from "../assets/carousel/moment-08.jpg.jpg";


import utsavVideo from "../assets/ganesh-utsav/ganesh-utsav-2026.mp4";
import utsavPoster from "../assets/Ganeshotsav2026/ganeshotsav-hero.png";

/* -------------------------------------------------------
   SCROLL PROGRESS HOOK
------------------------------------------------------- */

function useProgress(ref) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = rect.height + vh;
      const value = (vh - rect.top) / total;
      setProgress(Math.max(0, Math.min(1, value)));
    };

    const request = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);

    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return progress;
}

/* -------------------------------------------------------
   HERO SECTION
------------------------------------------------------- */

const YOUTUBE_VIDEO_ID = "P0LGoPN6jK8";
const YOUTUBE_EMBED_URL = `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&controls=0&loop=0&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&modestbranding=1&fs=0&vq=hd1080&enablejsapi=1`;

function Hero() {
  const playerRef = useRef(null);

  useEffect(() => {
    let player = null;

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;
      const iframe = document.getElementById("hero-youtube-iframe");
      if (!iframe) return;

      player = new window.YT.Player("hero-youtube-iframe", {
        events: {
          onReady: (event) => {
            event.target.mute();
            event.target.playVideo();
          },
          onStateChange: (event) => {
            // When video finishes (YT.PlayerState.ENDED === 0), pause on final frame
            if (event.data === 0) {
              const duration = event.target.getDuration();
              event.target.seekTo(Math.max(0, duration - 0.1), true);
              event.target.pauseVideo();
            }
          },
        },
      });
      playerRef.current = player;
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      if (!document.getElementById("yt-iframe-api")) {
        const tag = document.createElement("script");
        tag.id = "yt-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }

      const prevOnYouTubeIframeAPIReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prevOnYouTubeIframeAPIReady === "function") {
          prevOnYouTubeIframeAPIReady();
        }
        initPlayer();
      };
    }

    return () => {
      if (player && typeof player.destroy === "function") {
        player.destroy();
      }
    };
  }, []);

  return (
    <section className="hero-section" id="home">
      <div className="hero-media">
        {/* Fallback poster while YouTube buffers */}
        <img
          src={heroPoster}
          alt="Shrikant Ganpati"
          className="hero-poster-fallback"
        />

        {/* YouTube Video Background */}
        <div className="hero-youtube-wrap">
          <iframe
            id="hero-youtube-iframe"
            src={YOUTUBE_EMBED_URL}
            title="Ganpati Background Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            tabIndex={-1}
            className="hero-youtube-iframe"
          />
        </div>
      </div>

      <div className="hero-shade" />
      <div className="hero-grain" />

      <div className="hero-content">
        <div className="eyebrow reveal-up" data-reveal>
          HOME
        </div>

        <h1 className="hero-title">
          <span className="hero-line reveal-up" data-reveal>
            GANAPATI
          </span>
          <span className="hero-line hero-gold reveal-up" data-reveal>
            BAPPA MORYA
          </span>
        </h1>

        <div className="hero-actions" data-reveal>
          <Button to="/ganeshotsav2026" variant="primary" size="lg">
            Ganesh Utsav 2026
          </Button>
          <Button to="/about" variant="secondary" size="lg">
            Our Story
          </Button>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------
   LIVING PHOTOGRAPH (MEMORY CHAMBER)
------------------------------------------------------- */

const LIVING_STORIES = [
  {
    title: "A COMMUNITY",
    kicker: "01 / THE PEOPLE",
    image: livingCommunity,
    category: "Community Spirit",
    caption: "A celebration becomes meaningful because people come together to create it, experience it and carry it forward.",
  },
  {
    title: "THE TRADITION",
    kicker: "02 / THE ROOTS",
    image: livingTradition,
    category: "Heritage & Rituals",
    caption: "The rituals, memories and familiar gestures that give every celebration its sense of belonging.",
  },
  {
    title: "A FAMILY",
    kicker: "03 / THE BOND",
    image: livingFamily,
    category: "Togetherness",
    caption: "Beyond the event itself, there is a bond that keeps people connected year after year.",
  },
];

function LivingPhotograph({ onOpenLightbox }) {
  const ref = useRef(null);
  const p = useProgress(ref);

  const raw = p * LIVING_STORIES.length;
  const active = Math.min(LIVING_STORIES.length - 1, Math.floor(raw));
  const local = Math.max(0, Math.min(1, raw - active));

  return (
    <section ref={ref} className="living-section" id="living-photograph">
      <div className="living-sticky">
        <div className="living-label">
          <span>01</span>
          A LIVING PHOTOGRAPH
        </div>

        <div className="living-stage">
          {LIVING_STORIES.map((story, index) => {
            const offset = index - active;
            const isActive = index === active;
            const isPrevious = offset < 0;
            const isNext = offset > 0;

            let translateX = 0;
            let translateY = 0;
            let rotate = 0;
            let scale = 1;
            let opacity = 0;

            if (isActive) {
              translateX = local * -5;
              translateY = local * -3;
              rotate = local * -1.1;
              scale = 1 + local * 0.035;
              opacity = 1;
            } else if (isPrevious) {
              translateX = -18 - local * 9;
              translateY = -10 - local * 5;
              rotate = -3 - local * 2;
              scale = 0.93;
              opacity = 0.28;
            } else if (isNext) {
              translateX = 13 + local * 5;
              translateY = 10 + local * 5;
              rotate = 2 + local;
              scale = 0.91;
              opacity = 0.32;
            }

            return (
              <figure
                key={`${story.title}-${index}`}
                className={`living-frame ${isActive ? "is-active" : ""}`}
                onClick={() => onOpenLightbox(LIVING_STORIES, index)}
                style={{
                  transform: `translate3d(${translateX}%, ${translateY}%, 0) rotate(${rotate}deg) scale(${scale})`,
                  opacity,
                  zIndex: isActive ? 10 : isPrevious ? 4 : 3,
                  cursor: "pointer",
                }}
                title="Click to expand photograph"
              >
                <img src={story.image} alt={story.title} />
                <div className="living-frame-overlay" />
                <div className="living-frame-edge" />
              </figure>
            );
          })}

          <div className="living-center-line" />
        </div>

        <div className="living-copy">
          {LIVING_STORIES.map((story, index) => (
            <div
              className={`living-copy-block ${index === active ? "is-active" : ""}`}
              key={story.title}
            >
              <span>{story.kicker}</span>
              <h2>{story.title}</h2>
              <p>{story.caption}</p>
            </div>
          ))}
        </div>

        <div className="living-index">
          {LIVING_STORIES.map((_, i) => (
            <span className={i === active ? "active" : ""} key={i}>
              {String(i + 1).padStart(2, "0")}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------
   MORE THAN GANPATI
------------------------------------------------------- */

const BEYOND_DATA = [
  { title: "SPORTS", line: "Energy. Participation. Team spirit. SPL cricket and state carrom tournaments.", img: beyondSports, category: "Sports Excellence" },
  { title: "CULTURAL ACTIVITIES", line: "Celebrating talent, music, arts, and Maharashtrian tradition.", img: beyondCulture, category: "Heritage & Arts" },
  { title: "SOCIAL ACTIVITIES", line: "Coming together with medical health camps, eye checkups, and ashram drives.", img: beyondSocial, category: "Social Welfare" },
  { title: "COMMUNITY EVENTS", line: "Kutumb Melawa, youth programs, and honoring our senior citizens.", img: beyondCommunity, category: "Community Unity" },
];

function BeyondRow({ data, index, onOpenLightbox }) {
  const ref = useRef(null);
  const p = useProgress(ref);
  const flip = index % 2 === 1;

  const revealProgress = Math.min(1, Math.max(0, p * 2));
  const sideInset = 38 * (1 - revealProgress);

  const textDrift = (0.5 - p) * -42;
  const numberDrift = (0.5 - p) * 62;

  return (
    <article ref={ref} className={`beyond-row ${flip ? "flip" : ""}`}>
      <div
        className="beyond-image"
        onClick={() => onOpenLightbox(BEYOND_DATA, index)}
        style={{
          clipPath: `inset(0 ${sideInset}% 0 ${sideInset}%)`,
          cursor: "pointer",
        }}
        title="Click to view full photograph"
      >
        <div className="beyond-image-inner">
          <img src={data.img} alt={data.title} loading="eager" draggable="false" />
        </div>
        <div className="beyond-image-overlay" />
      </div>

      <div
        className="beyond-copy"
        style={{
          transform: `translate3d(0, ${textDrift}px, 0)`,
        }}
      >
        <div
          className="beyond-number"
          style={{
            transform: `translate3d(0, ${numberDrift}px, 0)`,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className={`beyond-text ${flip ? "reveal-left" : "reveal-right"}`} data-reveal>
          <h3>{data.title}</h3>
          <p>{data.line}</p>
          <small>COMMUNITY · PARTICIPATION · BELONGING</small>
          <div className="gold-rule" />
        </div>
      </div>
    </article>
  );
}

function MoreThanGanpati({ onOpenLightbox }) {
  const ref = useRef(null);
  const p = useProgress(ref);

  return (
    <section ref={ref} className="beyond-section" id="more-than-ganpati">
      <div
        className="beyond-morya"
        style={{
          transform: `translate3d(-50%, ${(0.5 - p) * 180}px, 0)`,
        }}
      >
        MORYA
      </div>

      <div
        className="beyond-halo"
        style={{
          transform: `translate3d(-50%, ${-p * 120}px, 0)`,
        }}
      />

      <div className="beyond-container">
        <header className="beyond-header">
          <div>
            <div className="eyebrow reveal-up" data-reveal>
              <span />
              BEYOND THE FESTIVAL
            </div>

            <h2 className="beyond-title">
              <span className="reveal-up" data-reveal>MORE</span>
              <span className="reveal-up" data-reveal>THAN</span>
              <span className="reveal-up gold" data-reveal>GANPATI</span>
            </h2>
          </div>

          <div className="beyond-intro">
            <div className="beyond-statement reveal-right" data-reveal>
              A YEAR OF COMMUNITY.
              <br />
              A YEAR OF TOGETHERNESS.
            </div>

            <p className="reveal-up" data-reveal>
              The spirit of Shrikant Sports Club lives far beyond the festival — through sports, cultural activities, social initiatives and community events.
            </p>
          </div>
        </header>

        <div className="beyond-list">
          {BEYOND_DATA.map((item, index) => (
            <BeyondRow key={index} data={item} index={index} onOpenLightbox={onOpenLightbox} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------
   MOMENTS SECTION (HORIZONTAL SCROLL RAIL)
------------------------------------------------------- */

const MOMENT_ITEMS = [
  { src: m1, title: "Aagman Sohala", category: "Ganesh Utsav", caption: "Welcoming Ganapati Bappa with grand dhol-tasha beats and devotion." },
  { src: m2, title: "Maha Aarti", category: "Devotion", caption: "Hundreds gather for the divine evening prayers and blessings." },
  { src: m3, title: "SPL Cricket League", category: "Sports Excellence", caption: "Grassroots youth sports league celebrating athletic spirit in Mumbai." },
  { src: m4, title: "Cultural Night", category: "Tradition", caption: "Celebrating authentic Maharashtrian dance, music, and dramatic arts." },
  { src: m5, title: "Free Health Camp", category: "Social Welfare", caption: "Comprehensive medical and eye checkup camp for community residents." },
  { src: m6, title: "Kutumb Melawa", category: "Family & Unity", caption: "Bringing families across generations together in shared harmony." },
  { src: m7, title: "Senior Citizens Honor", category: "Respect & Roots", caption: "Honoring the pillars and mentors of our community." },
  { src: m8, title: "Visarjan Miravnuk", category: "Grand Finale", caption: "Bidding a heartfelt, joyous farewell with promises to return next year." },
];

function Moments({ onOpenLightbox }) {
  const ref = useRef(null);
  const p = useProgress(ref);

  const count = MOMENT_ITEMS.length;
  const active = Math.min(count - 1, Math.round(p * (count - 1)));

  return (
    <section ref={ref} className="moments-section" id="moments">
      <div className="moments-sticky">
        <header className="moments-header">
          <div>
            <div className="eyebrow dark reveal-up" data-reveal>
              <span />
              MOMENTS
            </div>
            <h2 data-reveal className="moments-title reveal-up">
              THAT BRING
              <br />
              <em>US TOGETHER</em>
            </h2>
          </div>

          <p className="moments-intro reveal-up" data-reveal>
            Some moments are celebrated.
            <br />
            Some are remembered.
            <br />
            Some become part of who we are.
          </p>
        </header>

        <div className="moments-rail">
          <div
            className="moments-track"
            style={{
              transform: `translate3d(${-(active * 33.2) + 14}vw, 0, 0)`,
            }}
          >
            {MOMENT_ITEMS.map((item, index) => {
              const distance = Math.abs(index - active);
              const isCenter = index === active;

              return (
                <figure
                  key={`${item.title}-${index}`}
                  className={`moment-frame ${isCenter ? "center" : ""}`}
                  onClick={() => onOpenLightbox(MOMENT_ITEMS, index)}
                  style={{
                    transform: `translate3d(0, ${(index % 2 ? 10 : 0) * Math.min(distance, 2)
                      }px, 0) scale(${isCenter ? 1 : Math.max(0.88, 0.97 - distance * 0.025)
                      })`,
                    zIndex: isCenter ? 10 : 1,
                    cursor: "pointer",
                  }}
                  title="Click to view full image"
                >
                  <img src={item.src} alt={item.title} />
                  <div className="moment-overlay" />
                  <figcaption>
                    <span>
                      {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                    </span>
                    <strong>{item.title}</strong>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>

        <div className="moments-progress">
          <span>{String(active + 1).padStart(2, "0")}</span>
          <i>
            <b style={{ width: `${Math.max(3, p * 100)}%` }} />
          </i>
          <span>{String(count).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------
   CORE COMMITTEE / PEOPLE SECTION
------------------------------------------------------- */

const CORE_COMMITTEE = [
  {
    id: "01",
    role: "President",
    name: "Sandeep Ayre",
  },
  {
    id: "02",
    role: "Vice President",
    name: "Pranav Nikumbh",
  },
  {
    id: "03",
    role: "Secretary",
    name: "Swapnil Patil",
  },
  {
    id: "04",
    role: "Deputy Secretary",
    name: "Rupesh Raut",
  },
  {
    id: "05",
    role: "Treasurer",
    name: "Milind Gaonkar",
  },
  {
    id: "06",
    role: "Deputy Treasurer",
    name: "Sanil Pednekar",
  },
];

function People() {
  return (
    <section className="people-section" id="people">
      <div className="people-header">
        <div>
          <div className="eyebrow dark reveal-up" data-reveal>
            <span />
            THE PEOPLE BEHIND THE CELEBRATION
          </div>
          <h2 className="people-title reveal-up" data-reveal>
            THE HEART
            <br />
            <em>BEHIND IT ALL</em>
          </h2>
        </div>

        <div className="people-intro-wrap reveal-up" data-reveal>
          <div className="people-badge">CORE COMMITTEE</div>
          <p className="people-intro">
            The dedicated leaders and core committee steering the tradition,
            community service, and vibrant spirit of Shrikant Sports Club year after year.
          </p>
        </div>
      </div>

      <div className="people-grid">
        {CORE_COMMITTEE.map((member) => (
          <article
            className="person-card"
            data-reveal
            key={member.name}
          >
            <div className="person-card-top">
              <span className="person-card-index">{member.id}</span>
              <span className="person-card-tag">Core Committee</span>
            </div>

            <div className="person-card-main">
              <div className="person-card-role">
                <span className="person-role-en">{member.role}</span>
              </div>
              <h3 className="person-card-name">{member.name}</h3>
            </div>

            <div className="person-card-footer">
              <span className="person-card-club">Shrikant Sports Club</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------
   GANESH UTSAV HIGHLIGHT
------------------------------------------------------- */

function GaneshUtsav() {
  const ref = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      video.loop = true;
      video.play().catch(() => { });
    }
  }, []);

  const handleVideoEnded = (e) => {
    const video = e.currentTarget;
    video.currentTime = 0;
    video.play().catch(() => { });
  };

  return (
    <section ref={ref} className="hero-section utsav-section" id="ganesh-utsav">
      <div className="utsav-media">
        <video
          ref={videoRef}
          src={utsavVideo}
          poster={utsavPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onEnded={handleVideoEnded}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
            transform: "scale(1.06)",
            transformOrigin: "center center",
          }}
        />
      </div>

      <div className="utsav-shade" />
      <div className="hero-grain" />

      <div className="utsav-content">
        <div className="eyebrow reveal-up" data-reveal>
          THE NEXT CHAPTER
        </div>

        <h2>
          GANESHOTSAV <em>2026</em>
        </h2>

        <div className="hero-actions" data-reveal>
          <Button to="/ganeshotsav2026" variant="primary" size="lg">
            Explore 2026 Festival Schedule →
          </Button>
        </div>
      </div>

      <div className="hero-scroll">
        <span>CONTINUE JOURNEY</span>
        <i />
      </div>
    </section>
  );
}

/* -------------------------------------------------------
   HOME PAGE COMPONENT
------------------------------------------------------- */

export default function Home() {
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    images: [],
    index: 0,
  });

  const handleOpenLightbox = (images, index = 0) => {
    setLightboxState({
      isOpen: true,
      images,
      index,
    });
  };

  const handleCloseLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleIndexChange = (newIndex) => {
    setLightboxState((prev) => ({ ...prev, index: newIndex }));
  };

  return (
    <>
      <Hero />
      <LivingPhotograph onOpenLightbox={handleOpenLightbox} />
      <GaneshUtsav />
      <MoreThanGanpati onOpenLightbox={handleOpenLightbox} />
      <Moments onOpenLightbox={handleOpenLightbox} />
      <People onOpenLightbox={handleOpenLightbox} />
      <GanpatiScrollReveal />

      {/* Global Lightbox Popup */}
      <Lightbox
        isOpen={lightboxState.isOpen}
        onClose={handleCloseLightbox}
        images={lightboxState.images}
        currentIndex={lightboxState.index}
        onIndexChange={handleIndexChange}
      />
    </>
  );
}
