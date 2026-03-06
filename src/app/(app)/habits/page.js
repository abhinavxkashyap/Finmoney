"use client";

import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { AlertTriangle, TrendingUp, IndianRupee, ArrowRight } from "lucide-react";
import ChartCard from "@/components/ChartCard";
import { sipFutureValue, sipTotalInvested, generateProjection } from "@/utils/calculations";
import { formatCurrency } from "@/utils/formatters";

const unhealthyHabits = [
  {
    id: 1,
    category: "Food Delivery",
    description: "Too many food delivery orders",
    monthlySpend: 4200,
    healthyLimit: 1500,
    frequency: "28 orders this month",
    severity: "high",
    suggestion: "Cook at home 4 days a week to save ₹2,700/month",
  },
  {
    id: 2,
    category: "Online Shopping",
    description: "Excessive online shopping",
    monthlySpend: 5800,
    healthyLimit: 2000,
    frequency: "12 purchases this month",
    severity: "high",
    suggestion: "Use a 48-hour rule before impulse purchases",
  },
  {
    id: 3,
    category: "Cab Rides",
    description: "Frequent cab rides instead of public transport",
    monthlySpend: 3200,
    healthyLimit: 1000,
    frequency: "22 rides this month",
    severity: "medium",
    suggestion: "Switch to metro for daily commute, save ₹2,200/month",
  },
  {
    id: 4,
    category: "Subscriptions",
    description: "Possibly unused subscriptions",
    monthlySpend: 1800,
    healthyLimit: 800,
    frequency: "6 active subscriptions",
    severity: "low",
    suggestion: "Cancel unused subscriptions — last used Netflix 3 weeks ago",
  },
  {
    id: 5,
    category: "Entertainment",
    description: "High entertainment spending",
    monthlySpend: 3500,
    healthyLimit: 1500,
    frequency: "8 activities this month",
    severity: "medium",
    suggestion: "Explore free weekend activities and limit cinema to 2x/month",
  },
];

const severityColors = {
  high: { color: "var(--color-danger)", bg: "var(--color-danger-bg)" },
  medium: { color: "var(--color-warning)", bg: "var(--color-warning-bg)" },
  low: { color: "var(--color-info)", bg: "var(--color-info-bg)" },
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "var(--color-bg-card)",
          border: "1px solid var(--color-border)",
          borderRadius: "12px",
          padding: "12px 16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        <p style={{ color: "var(--color-text-primary)", fontWeight: 600, fontSize: "13px" }}>
          Year {payload[0].payload.year}
        </p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color, fontSize: "12px", marginTop: "4px" }}>
            {p.name}: {formatCurrency(p.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function HabitsPage() {
  const [selectedHabit, setSelectedHabit] = useState(unhealthyHabits[0]);
  const [projectionYears, setProjectionYears] = useState(10);

  const excess = selectedHabit.monthlySpend - selectedHabit.healthyLimit;
  const value5yr = sipFutureValue(excess, 12, 5);
  const value10yr = sipFutureValue(excess, 12, 10);
  const value15yr = sipFutureValue(excess, 12, 15);
  const projectionData = generateProjection(excess, 12, projectionYears);

  const totalUnnecessary = unhealthyHabits.reduce(
    (sum, h) => sum + (h.monthlySpend - h.healthyLimit),
    0
  );
  const totalImpact10yr = sipFutureValue(totalUnnecessary, 12, 10);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "var(--color-text-primary)" }}>
          Unhealthy Spending Habits
        </h1>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          AI-detected patterns that are draining your wealth
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div
          className="p-5 rounded-2xl animate-fade-in-up"
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            opacity: 0,
            animationDelay: "0.1s",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={18} style={{ color: "var(--color-danger)" }} />
            <span className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
              Monthly Loss
            </span>
          </div>
          <p className="text-2xl font-bold" style={{ color: "var(--color-danger)" }}>
            {formatCurrency(totalUnnecessary)}
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
            from {unhealthyHabits.length} unhealthy habits
          </p>
        </div>
        <div
          className="p-5 rounded-2xl animate-fade-in-up"
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            opacity: 0,
            animationDelay: "0.2s",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={18} style={{ color: "var(--color-warning)" }} />
            <span className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
              5-Year Impact
            </span>
          </div>
          <p className="text-2xl font-bold" style={{ color: "var(--color-warning)" }}>
            {formatCurrency(sipFutureValue(totalUnnecessary, 12, 5), true)}
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
            if invested at 12% returns
          </p>
        </div>
        <div
          className="p-5 rounded-2xl animate-fade-in-up"
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            opacity: 0,
            animationDelay: "0.3s",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <IndianRupee size={18} style={{ color: "var(--color-success)" }} />
            <span className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
              10-Year Impact
            </span>
          </div>
          <p className="text-2xl font-bold gradient-text-green">
            {formatCurrency(totalImpact10yr, true)}
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
            potential wealth if saved & invested
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Habit List */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {unhealthyHabits.map((habit) => {
            const isSelected = selectedHabit.id === habit.id;
            const sev = severityColors[habit.severity];
            return (
              <button
                key={habit.id}
                onClick={() => setSelectedHabit(habit)}
                className="p-4 rounded-xl text-left transition-all duration-200 cursor-pointer w-full"
                style={{
                  background: isSelected
                    ? "linear-gradient(135deg, rgba(108,92,231,0.12), rgba(162,155,254,0.06))"
                    : "var(--color-bg-card)",
                  border: isSelected
                    ? "1px solid var(--color-accent)"
                    : "1px solid var(--color-border)",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                    {habit.category}
                  </span>
                  <span className="badge text-[10px]" style={{ background: sev.bg, color: sev.color }}>
                    {habit.severity}
                  </span>
                </div>
                <p className="text-xs mb-2" style={{ color: "var(--color-text-secondary)" }}>
                  {habit.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold" style={{ color: "var(--color-danger)" }}>
                    {formatCurrency(habit.monthlySpend)}
                    <span className="text-xs font-normal" style={{ color: "var(--color-text-muted)" }}>
                      /month
                    </span>
                  </span>
                  <span className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>
                    {habit.frequency}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-3 flex flex-col gap-5">
          {/* Insight Card */}
          <div
            className="p-5 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(108,92,231,0.1), rgba(0,210,160,0.05))",
              border: "1px solid var(--color-border)",
            }}
          >
            <h3 className="text-base font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
              💡 What if you invested instead?
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              You spent <strong style={{ color: "var(--color-danger)" }}>{formatCurrency(selectedHabit.monthlySpend)}</strong> this
              month on {selectedHabit.category.toLowerCase()}. The healthy limit
              is {formatCurrency(selectedHabit.healthyLimit)}.
            </p>
            <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              If the excess <strong style={{ color: "var(--color-accent-light)" }}>{formatCurrency(excess)}/month</strong> was
              invested in an SIP at 12% returns:
            </p>
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="text-center p-3 rounded-xl" style={{ background: "var(--color-bg-card)" }}>
                <p className="text-lg font-bold gradient-text">{formatCurrency(value5yr, true)}</p>
                <p className="text-[10px] mt-1" style={{ color: "var(--color-text-muted)" }}>in 5 years</p>
              </div>
              <div className="text-center p-3 rounded-xl" style={{ background: "var(--color-bg-card)" }}>
                <p className="text-lg font-bold gradient-text-green">{formatCurrency(value10yr, true)}</p>
                <p className="text-[10px] mt-1" style={{ color: "var(--color-text-muted)" }}>in 10 years</p>
              </div>
              <div className="text-center p-3 rounded-xl" style={{ background: "var(--color-bg-card)" }}>
                <p className="text-lg font-bold" style={{ color: "var(--color-success)" }}>{formatCurrency(value15yr, true)}</p>
                <p className="text-[10px] mt-1" style={{ color: "var(--color-text-muted)" }}>in 15 years</p>
              </div>
            </div>
          </div>

          {/* Suggestion */}
          <div
            className="p-4 rounded-xl flex items-start gap-3"
            style={{
              background: "var(--color-success-bg)",
              border: "1px solid rgba(0,210,160,0.2)",
            }}
          >
            <ArrowRight size={18} style={{ color: "var(--color-success)", flexShrink: 0, marginTop: 2 }} />
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--color-success)" }}>
                AI Suggestion
              </p>
              <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
                {selectedHabit.suggestion}
              </p>
            </div>
          </div>

          {/* Projection Chart */}
          <ChartCard
            title="Investment Projection"
            subtitle={`If ${formatCurrency(excess)}/mo invested at 12% for ${projectionYears} years`}
          >
            <div className="flex gap-2 mb-4">
              {[5, 10, 15, 20].map((yr) => (
                <button
                  key={yr}
                  onClick={() => setProjectionYears(yr)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                  style={{
                    background: projectionYears === yr ? "var(--color-accent)" : "var(--color-bg-input)",
                    color: projectionYears === yr ? "white" : "var(--color-text-secondary)",
                    border: "none",
                  }}
                >
                  {yr} years
                </button>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={projectionData}>
                <defs>
                  <linearGradient id="gradInvested" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6c5ce7" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#6c5ce7" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00d2a0" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#00d2a0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="year" stroke="var(--color-text-muted)" fontSize={11} />
                <YAxis stroke="var(--color-text-muted)" fontSize={11} tickFormatter={(v) => formatCurrency(v, true)} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="invested" stroke="#6c5ce7" strokeWidth={2} fill="url(#gradInvested)" name="Invested" />
                <Area type="monotone" dataKey="value" stroke="#00d2a0" strokeWidth={2} fill="url(#gradValue)" name="Value" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
