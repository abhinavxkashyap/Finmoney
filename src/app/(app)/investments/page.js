"use client";

import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { TrendingUp, Landmark, Building2, BarChart3, ArrowRight } from "lucide-react";
import ChartCard from "@/components/ChartCard";
import { sipFutureValue, fdMaturity, compoundInterest, generateProjection, sipTotalInvested } from "@/utils/calculations";
import { formatCurrency } from "@/utils/formatters";

const investmentOptions = [
  {
    id: "stocks",
    name: "Stocks",
    icon: BarChart3,
    color: "#6c5ce7",
    description: "High growth potential with market-linked returns",
    expectedReturn: 15,
    risk: "High",
    examples: ["HDFC Bank (+22% YoY)", "Reliance (+18% YoY)", "Infosys (+15% YoY)"],
  },
  {
    id: "sip",
    name: "SIP (Mutual Funds)",
    icon: TrendingUp,
    color: "#00d2a0",
    description: "Systematic monthly investment with rupee cost averaging",
    expectedReturn: 12,
    risk: "Medium",
    examples: ["Axis Bluechip Fund", "Mirae Asset Large Cap", "Parag Parikh Flexi Cap"],
  },
  {
    id: "fd",
    name: "Fixed Deposits",
    icon: Landmark,
    color: "#ffa726",
    description: "Safe and guaranteed returns with fixed tenure",
    expectedReturn: 7,
    risk: "Low",
    examples: ["SBI FD (7.1%)", "HDFC FD (7.0%)", "ICICI FD (6.9%)"],
  },
  {
    id: "realestate",
    name: "Real Estate",
    icon: Building2,
    color: "#42a5f5",
    description: "Long-term appreciation through property investment",
    expectedReturn: 10,
    risk: "Medium-High",
    examples: ["REITs", "Fractional Ownership", "Property Accumulation"],
  },
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

export default function InvestmentsPage() {
  const [selectedOption, setSelectedOption] = useState(investmentOptions[1]);
  const [monthlyAmount, setMonthlyAmount] = useState(5000);
  const [duration, setDuration] = useState(10);

  const projectionData = generateProjection(monthlyAmount, selectedOption.expectedReturn, duration);
  const totalInvested = sipTotalInvested(monthlyAmount, duration);
  const finalValue =
    selectedOption.id === "fd"
      ? fdMaturity(monthlyAmount * 12 * duration, selectedOption.expectedReturn, duration)
      : selectedOption.id === "stocks"
      ? compoundInterest(monthlyAmount * 12, selectedOption.expectedReturn, duration)
      : sipFutureValue(monthlyAmount, selectedOption.expectedReturn, duration);
  const totalReturns = finalValue - totalInvested;

  const savingsToConvert = 8500; // from habits page savings

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "var(--color-text-primary)" }}>
          Habit-to-Investment Converter
        </h1>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Convert your saved spending into long-term wealth
        </p>
      </div>

      {/* Savings Banner */}
      <div
        className="p-5 rounded-2xl mb-6 flex items-center justify-between animate-fade-in-up"
        style={{
          background: "linear-gradient(135deg, rgba(0,210,160,0.1), rgba(108,92,231,0.08))",
          border: "1px solid rgba(0,210,160,0.2)",
          opacity: 0,
          animationDelay: "0.1s",
        }}
      >
        <div>
          <p className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
            💰 Available from reduced habits
          </p>
          <p className="text-2xl font-bold gradient-text-green mt-1">
            {formatCurrency(savingsToConvert)}/month
          </p>
        </div>
        <button className="btn-primary">
          <ArrowRight size={16} />
          Convert to Investment
        </button>
      </div>

      {/* Investment Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {investmentOptions.map((option) => {
          const isSelected = selectedOption.id === option.id;
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option)}
              className="p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer"
              style={{
                background: isSelected
                  ? `linear-gradient(135deg, ${option.color}18, ${option.color}08)`
                  : "var(--color-bg-card)",
                border: isSelected
                  ? `1px solid ${option.color}`
                  : "1px solid var(--color-border)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `${option.color}20` }}
              >
                <Icon size={20} style={{ color: option.color }} />
              </div>
              <h3 className="text-sm font-semibold mb-1" style={{ color: "var(--color-text-primary)" }}>
                {option.name}
              </h3>
              <p className="text-xs mb-3" style={{ color: "var(--color-text-muted)" }}>
                {option.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold" style={{ color: option.color }}>
                  ~{option.expectedReturn}% p.a.
                </span>
                <span
                  className="badge text-[10px]"
                  style={{
                    background:
                      option.risk === "Low"
                        ? "var(--color-success-bg)"
                        : option.risk === "Medium"
                        ? "var(--color-warning-bg)"
                        : "var(--color-danger-bg)",
                    color:
                      option.risk === "Low"
                        ? "var(--color-success)"
                        : option.risk === "Medium"
                        ? "var(--color-warning)"
                        : "var(--color-danger)",
                  }}
                >
                  {option.risk}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Simulator Controls */}
        <div
          className="p-5 rounded-2xl"
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
          }}
        >
          <h3 className="text-base font-semibold mb-4" style={{ color: "var(--color-text-primary)" }}>
            Investment Simulator
          </h3>

          <div className="mb-5">
            <label className="text-xs font-medium mb-2 block" style={{ color: "var(--color-text-secondary)" }}>
              Monthly Investment
            </label>
            <input
              type="range"
              min={500}
              max={50000}
              step={500}
              value={monthlyAmount}
              onChange={(e) => setMonthlyAmount(parseInt(e.target.value))}
              className="w-full accent-[#6c5ce7]"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>₹500</span>
              <span className="text-sm font-semibold" style={{ color: "var(--color-accent-light)" }}>
                {formatCurrency(monthlyAmount)}
              </span>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>₹50K</span>
            </div>
          </div>

          <div className="mb-5">
            <label className="text-xs font-medium mb-2 block" style={{ color: "var(--color-text-secondary)" }}>
              Duration
            </label>
            <input
              type="range"
              min={1}
              max={30}
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="w-full accent-[#6c5ce7]"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>1 yr</span>
              <span className="text-sm font-semibold" style={{ color: "var(--color-accent-light)" }}>
                {duration} years
              </span>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>30 yrs</span>
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col gap-3 mt-6">
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
              className="flex justify-between items-center p-3 rounded-xl"
              style={{
                background: "linear-gradient(135deg, rgba(108,92,231,0.15), rgba(0,210,160,0.1))",
                border: "1px solid var(--color-accent)",
              }}
            >
              <span className="text-xs font-semibold" style={{ color: "var(--color-text-secondary)" }}>Final Wealth</span>
              <span className="text-lg font-bold gradient-text">
                {formatCurrency(Math.round(finalValue), true)}
              </span>
            </div>
          </div>

          {/* Examples */}
          <div className="mt-5">
            <p className="text-xs font-medium mb-2" style={{ color: "var(--color-text-muted)" }}>
              Popular {selectedOption.name}
            </p>
            {selectedOption.examples.map((ex, i) => (
              <div
                key={i}
                className="flex items-center gap-2 py-1.5"
                style={{ color: "var(--color-text-secondary)" }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: selectedOption.color }} />
                <span className="text-xs">{ex}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Chart */}
        <ChartCard
          title={`${selectedOption.name} Growth Projection`}
          subtitle={`${formatCurrency(monthlyAmount)}/mo at ${selectedOption.expectedReturn}% for ${duration} years`}
          className="lg:col-span-2"
        >
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={projectionData}>
              <defs>
                <linearGradient id="gradInvested2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={selectedOption.color} stopOpacity={0.2} />
                  <stop offset="100%" stopColor={selectedOption.color} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradValue2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00d2a0" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#00d2a0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="year" stroke="var(--color-text-muted)" fontSize={11} label={{ value: "Years", position: "insideBottom", offset: -5, style: { fill: "var(--color-text-muted)", fontSize: 11 } }} />
              <YAxis stroke="var(--color-text-muted)" fontSize={11} tickFormatter={(v) => formatCurrency(v, true)} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="invested" stroke={selectedOption.color} strokeWidth={2} fill="url(#gradInvested2)" name="Invested" />
              <Area type="monotone" dataKey="value" stroke="#00d2a0" strokeWidth={2.5} fill="url(#gradValue2)" name="Total Value" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
