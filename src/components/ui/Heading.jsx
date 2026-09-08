import React from "react";

export default function Heading({
  level = 2,
  children,
  variant, // hero | editorial | h1 | h2 | h3 | h4 | h5 | h6
  gold = false,
  italic = false,
  className = "",
  ...props
}) {
  const Component = `h${Math.min(6, Math.max(1, level))}`;

  const variantClass = variant
    ? variant === "hero"
      ? "display-hero"
      : variant === "editorial"
      ? "display-editorial"
      : `h${variant}`
    : `h${level}`;

  const goldClass = gold ? "gold-text" : "";
  const italicClass = italic ? "serif-italic" : "";

  return (
    <Component
      className={`${variantClass} ${goldClass} ${italicClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}
