import React from "react";

export default function Container({
  children,
  size = "standard", // standard | narrow | wide
  className = "",
  as: Component = "div",
  ...props
}) {
  const sizeClass =
    size === "narrow"
      ? "site-container-narrow"
      : size === "wide"
      ? "site-container-wide"
      : "site-container";

  return (
    <Component className={`${sizeClass} ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}
