"use client";

import { AlertTriangle, TrendingUp, Lightbulb, Bell } from "lucide-react";

const typeConfig = {
  warning: { icon: AlertTriangle, color: "var(--color-warning)", bg: "var(--color-warning-bg)" },
  insight: { icon: Lightbulb, color: "var(--color-info)", bg: "var(--color-info-bg)" },
  tip: { icon: TrendingUp, color: "var(--color-success)", bg: "var(--color-success-bg)" },
  alert: { icon: Bell, color: "var(--color-danger)", bg: "var(--color-danger-bg)" },
};

export default function NudgeCard({ type = "insight", title, message, actionLabel, onAction }) {
  const config = typeConfig[type] || typeConfig.insight;
  const Icon = config.icon;

  return (
    <div
      className="flex items-start gap-3 p-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
      style={{
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
      }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: config.bg }}
      >
        <Icon size={18} style={{ color: config.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <h4
          className="text-sm font-semibold mb-0.5"
          style={{ color: "var(--color-text-primary)" }}
        >
          {title}
        </h4>
        <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
          {message}
        </p>
        {actionLabel && (
          <button
            onClick={onAction}
            className="mt-2 text-xs font-semibold cursor-pointer transition-colors"
            style={{
              color: config.color,
              background: "none",
              border: "none",
              padding: 0,
            }}
          >
            {actionLabel} →
          </button>
        )}
      </div>
    </div>
  );
}
