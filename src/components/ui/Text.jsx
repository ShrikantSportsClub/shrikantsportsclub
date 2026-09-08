import React from "react";

export default function Text({
  children,
  variant = "base", // large | base | small | caption | eyebrow
  color = "secondary", // primary | secondary | muted | gold
  as: Component = "p",
  className = "",
  ...props
}) {
  const variantClass =
    variant === "large"
      ? "body-lg"
      : variant === "small"
      ? "body-sm"
      : variant === "caption"
      ? "caption"
      : variant === "eyebrow"
      ? "eyebrow"
      : "body";

  const colorClass =
    color === "primary"
      ? "text-primary"
      : color === "muted"
      ? "text-muted"
      : color === "gold"
      ? "gold-text"
      : "text-secondary";

  return (
    <Component
      className={`${variantClass} ${colorClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}
