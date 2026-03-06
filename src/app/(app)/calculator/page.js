"use client";

import { useState, useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Calculator, Coffee, Truck, ShoppingBag, Tv, ArrowRight } from "lucide-react";
import ChartCard from "@/components/ChartCard";
import { sipFutureValue, sipTotalInvested, generateProjection } from "@/utils/calculations";
import { formatCurrency } from "@/utils/formatters";

const presets = [
  { id: "coffee", label: "Daily Coffee", icon: Coffee, dailyAmount: 200, color: "#ffa726" },
  { id: "food", label: "Food Delivery", icon: Truck, dailyAmount: 300, color: "#ff6b6b" },
  { id: "shopping", label: "Impulse Shopping", icon: ShoppingBag, dailyAmount: 400, color: "#ab47bc" },
  { id: "streaming", label: "Subscriptions", icon: Tv, dailyAmount: 100, color: "#42a5f5" },
];

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

export default function CalculatorPage() {
  const [dailyAmount, setDailyAmount] = useState(200);
  const [years, setYears] = useState(15);
  const [returnRate, setReturnRate] = useState(12);
  const [selectedPreset, setSelectedPreset] = useState("coffee");
  const [customLabel, setCustomLabel] = useState("");

  const monthlyAmount = dailyAmount * 30;
  const totalInvested = sipTotalInvested(monthlyAmount, years);
  const finalValue = sipFutureValue(monthlyAmount, returnRate, years);
  const totalReturns = finalValue - totalInvested;
  const wealthMultiplier = (finalValue / totalInvested).toFixed(1);

  const projectionData = useMemo(
    () => generateProjection(monthlyAmount, returnRate, years),
    [monthlyAmount, returnRate, years]
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "var(--color-text-primary)" }}>
          Smart Investment Calculator
        </h1>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          See how small daily savings can build massive wealth
        </p>
      </div>

      {/* Scenario Builder */}
      <div
        className="p-6 rounded-2xl mb-6 animate-fade-in-up"
        style={{
          background: "linear-gradient(135deg, rgba(108,92,231,0.08), rgba(0,210,160,0.04))",
          border: "1px solid var(--color-border)",
          opacity: 0,
          animationDelay: "0.1s",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Calculator size={20} style={{ color: "var(--color-accent-light)" }} />
          <h2 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>
            Scenario Builder
          </h2>
        </div>
        <p className="text-base leading-relaxed mb-4" style={{ color: "var(--color-text-secondary)" }}>
          &ldquo;If I stop spending{" "}
          <span className="font-bold" style={{ color: "var(--color-accent-light)" }}>
            {formatCurrency(dailyAmount)}
          </span>{" "}
          per day on {customLabel || presets.find((p) => p.id === selectedPreset)?.label.toLowerCase() || "coffee"} and invest it monthly for{" "}
          <span className="font-bold" style={{ color: "var(--color-success)" }}>
            {years} years
          </span>{" "}
          at{" "}
          <span className="font-bold" style={{ color: "var(--color-warning)" }}>
            {returnRate}% returns
          </span>
          ...&rdquo;
        </p>

        {/* Preset buttons */}
        <div className="flex flex-wrap gap-2 mb-5">
          {presets.map((preset) => {
            const Icon = preset.icon;
            const isActive = selectedPreset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => {
                  setSelectedPreset(preset.id);
                  setDailyAmount(preset.dailyAmount);
                  setCustomLabel("");
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer"
                style={{
                  background: isActive ? `${preset.color}20` : "var(--color-bg-card)",
                  border: isActive ? `1px solid ${preset.color}` : "1px solid var(--color-border)",
                  color: isActive ? preset.color : "var(--color-text-secondary)",
                }}
              >
                <Icon size={16} />
                {preset.label} (₹{preset.dailyAmount}/day)
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div
          className="p-5 rounded-2xl"
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
          }}
        >
          <h3 className="text-base font-semibold mb-5" style={{ color: "var(--color-text-primary)" }}>
            Adjust Parameters
          </h3>

          {/* Daily Amount */}
          <div className="mb-5">
            <label className="text-xs font-medium mb-2 block" style={{ color: "var(--color-text-secondary)" }}>
              Daily Spending to Stop
            </label>
            <input
              type="range"
              min={50}
              max={2000}
              step={50}
              value={dailyAmount}
              onChange={(e) => setDailyAmount(parseInt(e.target.value))}
              className="w-full accent-[#6c5ce7]"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>₹50</span>
              <span className="text-sm font-semibold" style={{ color: "var(--color-accent-light)" }}>
                {formatCurrency(dailyAmount)}/day = {formatCurrency(monthlyAmount)}/mo
              </span>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>₹2K</span>
            </div>
          </div>

          {/* Duration */}
          <div className="mb-5">
            <label className="text-xs font-medium mb-2 block" style={{ color: "var(--color-text-secondary)" }}>
              Investment Duration
            </label>
            <input
              type="range"
              min={1}
              max={30}
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value))}
              className="w-full accent-[#00d2a0]"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>1 yr</span>
              <span className="text-sm font-semibold" style={{ color: "var(--color-success)" }}>
                {years} years
              </span>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>30 yrs</span>
            </div>
          </div>

          {/* Return Rate */}
          <div className="mb-6">
            <label className="text-xs font-medium mb-2 block" style={{ color: "var(--color-text-secondary)" }}>
              Expected Annual Return
            </label>
            <input
              type="range"
              min={4}
              max={20}
              step={0.5}
              value={returnRate}
              onChange={(e) => setReturnRate(parseFloat(e.target.value))}
              className="w-full accent-[#ffa726]"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>4%</span>
              <span className="text-sm font-semibold" style={{ color: "var(--color-warning)" }}>
                {returnRate}% p.a.
              </span>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>20%</span>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center p-3 rounded-xl" style={{ background: "var(--color-bg-input)" }}>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Total Invested</span>
              <span className="text-sm font-bold" style={{ color: "var(--color-text-primary)" }}>
                {formatCurrency(totalInvested, true)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl" style={{ background: "var(--color-bg-input)" }}>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Expected Returns</span>
              <span className="text-sm font-bold" style={{ color: "var(--color-success)" }}>
                {formatCurrency(Math.round(totalReturns), true)}
              </span>
            </div>
            <div
              className="p-4 rounded-xl text-center"
              style={{
                background: "linear-gradient(135deg, rgba(108,92,231,0.15), rgba(0,210,160,0.1))",
                border: "1px solid var(--color-accent)",
              }}
            >
              <p className="text-xs mb-1" style={{ color: "var(--color-text-muted)" }}>
                Final Wealth Value
              </p>
              <p className="text-2xl font-bold gradient-text">
                {formatCurrency(Math.round(finalValue), true)}
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--color-success)" }}>
                {wealthMultiplier}x your investment
              </p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <ChartCard
          title="Wealth Growth Curve"
          subtitle={`${formatCurrency(dailyAmount)}/day → ${formatCurrency(monthlyAmount)}/mo for ${years} years`}
          className="lg:col-span-2"
        >
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={projectionData}>
              <defs>
                <linearGradient id="gradCalcInvested" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6c5ce7" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#6c5ce7" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradCalcValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00d2a0" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#00d2a0" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradCalcReturns" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffa726" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#ffa726" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey="year"
                stroke="var(--color-text-muted)"
                fontSize={11}
                label={{ value: "Years", position: "insideBottom", offset: -5, style: { fill: "var(--color-text-muted)", fontSize: 11 }}}
              />
              <YAxis
                stroke="var(--color-text-muted)"
                fontSize={11}
                tickFormatter={(v) => formatCurrency(v, true)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="invested" stroke="#6c5ce7" strokeWidth={2} fill="url(#gradCalcInvested)" name="Invested" />
              <Area type="monotone" dataKey="returns" stroke="#ffa726" strokeWidth={2} fill="url(#gradCalcReturns)" name="Returns" />
              <Area type="monotone" dataKey="value" stroke="#00d2a0" strokeWidth={2.5} fill="url(#gradCalcValue)" name="Total Value" />
            </AreaChart>
          </ResponsiveContainer>

          {/* Quick comparison */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: "#6c5ce7" }} />
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Invested</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: "#ffa726" }} />
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: "#00d2a0" }} />
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Total Value</span>
            </div>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
