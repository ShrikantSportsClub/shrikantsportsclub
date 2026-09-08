import React, { forwardRef } from "react";

export const Input = forwardRef(function Input(
  {
    label,
    error,
    id,
    type = "text",
    className = "",
    required = false,
    ...props
  },
  ref
) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label} {required && <span className="gold-text">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        type={type}
        required={required}
        className={`form-control ${className}`.trim()}
        {...props}
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  );
});

export const Textarea = forwardRef(function Textarea(
  {
    label,
    error,
    id,
    rows = 4,
    className = "",
    required = false,
    ...props
  },
  ref
) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label} {required && <span className="gold-text">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={inputId}
        rows={rows}
        required={required}
        className={`form-control ${className}`.trim()}
        {...props}
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  );
});

export const Select = forwardRef(function Select(
  {
    label,
    error,
    id,
    options = [],
    className = "",
    required = false,
    placeholder = "Select an option",
    ...props
  },
  ref
) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label} {required && <span className="gold-text">*</span>}
        </label>
      )}
      <select
        ref={ref}
        id={inputId}
        required={required}
        className={`form-control ${className}`.trim()}
        style={{ cursor: "pointer" }}
        {...props}
      >
        {placeholder && <option value="" disabled style={{ background: "#14110F" }}>{placeholder}</option>}
        {options.map((opt) => {
          const val = typeof opt === "string" ? opt : opt.value;
          const lbl = typeof opt === "string" ? opt : opt.label;
          return (
            <option key={val} value={val} style={{ background: "#14110F", color: "#EFE7D9" }}>
              {lbl}
            </option>
          );
        })}
      </select>
      {error && <span className="form-error">{error}</span>}
    </div>
  );
});

export default Input;
