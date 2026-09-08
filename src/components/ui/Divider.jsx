import React from "react";

export default function Divider({
  variant = "subtle", // subtle | gold
  spacing = "md", // sm | md | lg | none
  className = "",
  ...props
}) {
  const variantClass = variant === "gold" ? "divider-gold" : "divider-subtle";

  const marginMap = {
    none: "0",
    sm: "var(--space-4) 0",
    md: "var(--space-8) 0",
    lg: "var(--space-11) 0",
  };

  return (
    <hr
      className={`${variantClass} ${className}`.trim()}
      style={{ margin: marginMap[spacing] || marginMap.md }}
      {...props}
    />
  );
}
