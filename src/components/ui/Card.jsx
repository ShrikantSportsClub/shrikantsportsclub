import React from "react";

export default function Card({
  children,
  interactive = false,
  padding = "md", // sm | md | lg | none
  className = "",
  as: Component = "div",
  ...props
}) {
  const paddingStyle =
    padding === "sm"
      ? { padding: "var(--space-4)" }
      : padding === "lg"
      ? { padding: "var(--space-8)" }
      : padding === "none"
      ? { padding: 0 }
      : { padding: "var(--space-6)" };

  const interactiveClass = interactive ? "luxury-card-interactive" : "";

  return (
    <Component
      className={`luxury-card ${interactiveClass} ${className}`.trim()}
      style={paddingStyle}
      {...props}
    >
      {children}
    </Component>
  );
}
