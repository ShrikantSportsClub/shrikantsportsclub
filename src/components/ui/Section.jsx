import React from "react";
import Container from "./Container";

export default function Section({
  id,
  children,
  spacing = "lg", // sm | md | lg | xl | hero
  containerSize = "standard", // standard | narrow | wide | none
  eyebrow,
  heading,
  description,
  headerAlign = "left", // left | center | split
  headerAction,
  className = "",
  containerClassName = "",
  as: Component = "section",
  ...props
}) {
  const spacingClass =
    spacing === "sm"
      ? "site-section-sm"
      : spacing === "md"
      ? "site-section-md"
      : spacing === "xl"
      ? "site-section-xl"
      : spacing === "hero"
      ? "site-section-hero"
      : "site-section-lg";

  const hasHeader = Boolean(eyebrow || heading || description || headerAction);

  const headerClass =
    headerAlign === "center"
      ? "section-header section-header-center"
      : headerAlign === "split"
      ? "section-header section-header-split"
      : "section-header";

  const content = (
    <>
      {hasHeader && (
        <div className={headerClass} data-reveal="fade">
          <div className="section-header-main">
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            {heading && (
              typeof heading === "string" ? (
                <h2 className="h2" style={{ marginTop: "12px" }}>
                  {heading}
                </h2>
              ) : (
                <div style={{ marginTop: "12px" }}>{heading}</div>
              )
            )}
            {description && (
              <p className="body-lg" style={{ marginTop: "16px", maxWidth: "680px" }}>
                {description}
              </p>
            )}
          </div>
          {headerAction && <div className="section-header-action">{headerAction}</div>}
        </div>
      )}
      {children}
    </>
  );

  return (
    <Component
      id={id}
      className={`site-section ${spacingClass} ${className}`.trim()}
      {...props}
    >
      {containerSize === "none" ? (
        content
      ) : (
        <Container size={containerSize} className={containerClassName}>
          {content}
        </Container>
      )}
    </Component>
  );
}
