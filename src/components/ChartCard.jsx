"use client";

export default function ChartCard({ title, subtitle, children, className = "" }) {
  return (
    <div
      className={`chart-container animate-fade-in-up ${className}`}
      style={{ opacity: 0, animationDelay: "0.2s" }}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3
            className="text-base font-semibold"
            style={{ color: "var(--color-text-primary)" }}
          >
            {title}
          </h3>
          {subtitle && (
            <p
              className="text-xs mt-0.5"
              style={{ color: "var(--color-text-muted)" }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
