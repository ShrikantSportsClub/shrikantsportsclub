import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import sscLogo from "../assets/logo/ssc-logo.svg";
import "./IntroLoader.css";

function IntroLoader({ onComplete }) {
  const rootRef = useRef(null);
  const logoRef = useRef(null);
  const wrapRef = useRef(null);
  const sweepRef = useRef(null);
  const finishedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useLayoutEffect(() => {
    const root = rootRef.current;
    const logo = logoRef.current;
    const wrap = wrapRef.current;
    const sweep = sweepRef.current;

    if (!root || !logo || !wrap || !sweep) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    document.documentElement.classList.add("is-intro-active");

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      document.documentElement.classList.remove("is-intro-active");
      root.style.pointerEvents = "none";
      onCompleteRef.current?.();
    };

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(logo, {
          opacity: 1,
          scale: 1,
          filter: "blur(0px) brightness(1)",
        });
        gsap.set(sweep, { opacity: 0 });
        gsap.to(root, {
          opacity: 0,
          duration: 0.4,
          ease: "power1.out",
          onComplete: finish,
        });
        return;
      }

      const look = {
        opacity: 0,
        scale: 1.06,
        blur: 28,
        brightness: 0,
      };

      const applyLook = () => {
        gsap.set(logo, {
          opacity: look.opacity,
          scale: look.scale,
          filter: `blur(${look.blur}px) brightness(${look.brightness})`,
        });
      };

      applyLook();
      gsap.set(sweep, { opacity: 0, xPercent: -130 });
      gsap.set(wrap, {
        filter: "drop-shadow(0 0 0 rgba(255, 248, 230, 0))",
      });

      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

      timeline.to(
        look,
        {
          opacity: 0.14,
          scale: 1.04,
          blur: 18,
          brightness: 0.32,
          duration: 0.3,
          ease: "power1.in",
          onUpdate: applyLook,
        },
        0
      );

      timeline.to(
        look,
        {
          opacity: 0.52,
          scale: 1.015,
          blur: 8,
          brightness: 0.78,
          duration: 0.3,
          onUpdate: applyLook,
        },
        0.3
      );

      timeline.to(
        look,
        {
          opacity: 1,
          scale: 1,
          blur: 0,
          brightness: 1,
          duration: 0.5,
          ease: "power3.out",
          onUpdate: applyLook,
        },
        0.6
      );

      timeline.to(
        wrap,
        {
          filter: "drop-shadow(0 0 22px rgba(255, 246, 224, 0.16))",
          duration: 0.2,
          ease: "power1.out",
        },
        1.1
      );

      timeline.fromTo(
        sweep,
        { opacity: 0, xPercent: -130 },
        {
          opacity: 1,
          xPercent: 130,
          duration: 0.5,
          ease: "power1.inOut",
        },
        1.1
      );

      timeline.to(
        wrap,
        {
          filter: "drop-shadow(0 0 10px rgba(255, 246, 224, 0.07))",
          duration: 0.3,
          ease: "power1.inOut",
        },
        1.3
      );

      timeline.to(sweep, { opacity: 0, duration: 0.2, ease: "power1.out" }, 1.4);

      timeline.to({}, { duration: 0.2 }, 1.4);

      timeline.to(
        wrap,
        {
          opacity: 0,
          scale: 0.96,
          duration: 0.45,
          ease: "power2.inOut",
        },
        1.8
      );

      timeline.call(finish, null, 2.0);

      timeline.to(
        root,
        {
          opacity: 0,
          duration: 0.55,
          ease: "power2.inOut",
        },
        1.8
      );
    }, root);

    return () => {
      document.documentElement.classList.remove("is-intro-active");
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="intro-loader" aria-hidden="true">
      <div ref={wrapRef} className="intro-loader__logo-wrap">
        <img
          ref={logoRef}
          className="intro-loader__logo"
          src={sscLogo}
          alt=""
        />
        <div ref={sweepRef} className="intro-loader__sweep" />
      </div>
    </div>
  );
}

export default IntroLoader;
