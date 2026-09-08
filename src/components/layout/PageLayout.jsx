import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import Footer from "./Footer";

const PAGE_TITLES = {
  "/": "Home | Shrikant Sports Club",
  "/about": "About Us | Shrikant Sports Club",
  "/ganeshotsav2026": "Ganesh Utsav 2026 | Shrikant Sports Club",
  "/gallery": "Gallery | Shrikant Sports Club",
  "/members": "Members | Shrikant Sports Club",
  "/contact": "Contact Us | Shrikant Sports Club",
};

export default function PageLayout({ children }) {
  const { pathname } = useLocation();

  // Scroll to top and update page title on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = PAGE_TITLES[pathname] || "Shrikant Sports Club";
  }, [pathname]);

  // Reveal observer with safety fallback and dynamic element support
  useEffect(() => {
    document.documentElement.classList.add("js-animated");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "50px 0px 50px 0px",
      }
    );

    const observeUnseen = () => {
      const elements = document.querySelectorAll("[data-reveal]:not(.is-visible)");
      elements.forEach((el) => observer.observe(el));
    };

    observeUnseen();

    const mutationObserver = new MutationObserver(() => {
      observeUnseen();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    const fallbackTimer = setTimeout(() => {
      document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
    }, 400);

    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return (
    <>
      <SiteHeader />
      <main id="main-content" style={{ width: "100%", minHeight: "100vh" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
