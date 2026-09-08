import React from "react";
import { Link } from "react-router-dom";

export default function Button({
  children,
  variant = "primary", // primary | secondary | ghost
  size = "md", // sm | md | lg
  to,
  href,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  icon,
  iconPosition = "right",
  ...props
}) {
  const variantClass =
    variant === "secondary"
      ? "btn-secondary"
      : variant === "ghost"
      ? "btn-ghost"
      : "btn-primary";

  const sizeClass =
    size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "";

  const combinedClass = `btn ${variantClass} ${sizeClass} ${className}`.trim();

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="btn-icon">{icon}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClass} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClass} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={combinedClass}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
}
