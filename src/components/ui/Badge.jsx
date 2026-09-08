import React from "react";

export default function Badge({
  children,
  variant = "default", // default | gold
  className = "",
  ...props
}) {
  const variantClass = variant === "gold" ? "badge-gold" : "";

  return (
    <span className={`badge ${variantClass} ${className}`.trim()} {...props}>
      {children}
    </span>
  );
}
