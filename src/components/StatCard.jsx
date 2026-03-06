"use client";

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  accentColor,
  delay = 0,
}) {
  return (
    <div
      className="animate-fade-in-up p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        animationDelay: `${delay}s`,
        opacity: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accentColor || "var(--color-accent)";
        e.currentTarget.style.boxShadow = `0 8px 30px ${accentColor || "var(--color-accent)"}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--color-border)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: `${accentColor || "var(--color-accent)"}15`,
          }}
        >
          {Icon && <Icon size={20} style={{ color: accentColor || "var(--color-accent)" }} />}
        </div>
        {trend && (
          <span
            className="badge text-xs"
            style={{
              background:
                trend === "up"
                  ? "var(--color-success-bg)"
                  : "var(--color-danger-bg)",
              color:
                trend === "up"
                  ? "var(--color-success)"
                  : "var(--color-danger)",
            }}
          >
            {trend === "up" ? "↑" : "↓"} {trendValue}
          </span>
        )}
      </div>
      <h3
        className="text-2xl font-bold mb-1"
        style={{ color: "var(--color-text-primary)" }}
      >
        {value}
      </h3>
      <p
        className="text-sm font-medium"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {title}
      </p>
      {subtitle && (
        <p
          className="text-xs mt-1"
          style={{ color: "var(--color-text-muted)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
