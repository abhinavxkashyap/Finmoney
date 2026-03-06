"use client";

import { useState } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
} from "recharts";
import {
  Wallet, TrendingDown, PiggyBank, TrendingUp,
  Target, Shield, Plane, Laptop,
} from "lucide-react";
import StatCard from "@/components/StatCard";
import ChartCard from "@/components/ChartCard";
import NudgeCard from "@/components/NudgeCard";
import { monthlySpending, financialGoals } from "@/data/expenseData";
import { formatCurrency } from "@/utils/formatters";
import { categoryColors } from "@/utils/formatters";

const currentMonth = monthlySpending[monthlySpending.length - 1];

const pieData = [
  { name: "Food", value: currentMonth.food, color: categoryColors.Food },
  { name: "Food Delivery", value: currentMonth.foodDelivery, color: categoryColors["Food Delivery"] },
  { name: "Transport", value: currentMonth.transport, color: categoryColors.Transport },
  { name: "Shopping", value: currentMonth.shopping, color: categoryColors.Shopping },
  { name: "Entertainment", value: currentMonth.entertainment, color: categoryColors.Entertainment },
  { name: "Subscriptions", value: currentMonth.subscriptions, color: categoryColors.Subscriptions },
  { name: "Rent", value: currentMonth.rent, color: categoryColors.Rent },
  { name: "Utilities", value: currentMonth.utilities, color: categoryColors.Utilities },
];

const unnecessarySpending =
  currentMonth.foodDelivery +
  currentMonth.entertainment +
  currentMonth.shopping * 0.4;

const potentialSavings = Math.round(unnecessarySpending * 0.6);

const goalIcons = { Shield, Plane, Laptop, TrendingUp };

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
          {payload[0].name || payload[0].payload?.month}
        </p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color || "var(--color-text-secondary)", fontSize: "12px", marginTop: "4px" }}>
            {p.name}: {formatCurrency(p.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const [selectedGoal, setSelectedGoal] = useState(null);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-2xl font-bold mb-1"
          style={{ color: "var(--color-text-primary)" }}
        >
          Good evening, Abhinav 👋
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>
          Here&apos;s your financial overview for March 2026
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Spending"
          value={formatCurrency(currentMonth.total)}
          subtitle="This month"
          icon={Wallet}
          trend="up"
          trendValue="8.2%"
          accentColor="var(--color-info)"
          delay={0.1}
        />
        <StatCard
          title="Unnecessary Spending"
          value={formatCurrency(Math.round(unnecessarySpending))}
          subtitle="Could be optimized"
          icon={TrendingDown}
          trend="up"
          trendValue="12.5%"
          accentColor="var(--color-danger)"
          delay={0.2}
        />
        <StatCard
          title="Potential Savings"
          value={formatCurrency(potentialSavings)}
          subtitle="If habits improved"
          icon={PiggyBank}
          accentColor="var(--color-success)"
          delay={0.3}
        />
        <StatCard
          title="Investment Growth"
          value={formatCurrency(125000, true)}
          subtitle="Portfolio value"
          icon={TrendingUp}
          trend="up"
          trendValue="15.3%"
          accentColor="var(--color-accent)"
          delay={0.4}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Spending Trend */}
        <ChartCard
          title="Monthly Spending Trend"
          subtitle="Last 6 months"
          className="lg:col-span-2"
        >
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlySpending}>
              <defs>
                <linearGradient id="gradientSpending" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6c5ce7" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#6c5ce7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey="month"
                stroke="var(--color-text-muted)"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="var(--color-text-muted)"
                fontSize={12}
                tickLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#6c5ce7"
                strokeWidth={2.5}
                fill="url(#gradientSpending)"
                name="Total"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Category Pie Chart */}
        <ChartCard title="Spending by Category" subtitle="This month">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-2">
            {pieData.slice(0, 6).map((entry) => (
              <div key={entry.name} className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: entry.color }}
                />
                <span style={{ color: "var(--color-text-muted)", fontSize: "10px" }}>
                  {entry.name}
                </span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Financial Goals & Nudges Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Financial Goals */}
        <ChartCard title="Financial Goals" subtitle="Track your progress">
          <div className="flex flex-col gap-4">
            {financialGoals.map((goal) => {
              const progress = (goal.current / goal.target) * 100;
              const GoalIcon = goalIcons[goal.icon] || Target;
              return (
                <div
                  key={goal.id}
                  className="flex items-center gap-4 p-3 rounded-xl transition-all cursor-pointer"
                  style={{
                    background:
                      selectedGoal === goal.id
                        ? "var(--color-bg-card-hover)"
                        : "transparent",
                  }}
                  onClick={() =>
                    setSelectedGoal(
                      selectedGoal === goal.id ? null : goal.id
                    )
                  }
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--color-accent)15" }}
                  >
                    <GoalIcon
                      size={18}
                      style={{ color: "var(--color-accent-light)" }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1.5">
                      <span
                        className="text-sm font-medium"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        {goal.name}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {formatCurrency(goal.current, true)} /{" "}
                        {formatCurrency(goal.target, true)}
                      </span>
                    </div>
                    <div
                      className="h-2 rounded-full overflow-hidden"
                      style={{ background: "var(--color-bg-input)" }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${progress}%`,
                          background:
                            progress >= 70
                              ? "linear-gradient(90deg, var(--color-success), var(--color-gradient-green-end))"
                              : "linear-gradient(90deg, var(--color-gradient-start), var(--color-gradient-end))",
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ChartCard>

        {/* Smart Nudges */}
        <ChartCard title="Smart Nudges" subtitle="AI-powered recommendations">
          <div className="flex flex-col gap-3">
            <NudgeCard
              type="warning"
              title="High Food Delivery Spending"
              message="You've spent ₹2,360 on food delivery this month — 56% more than last month."
              actionLabel="See savings potential"
            />
            <NudgeCard
              type="tip"
              title="Investment Opportunity"
              message="Invest ₹1,500 today to stay on track for your ₹10L investment goal."
              actionLabel="Start SIP"
            />
            <NudgeCard
              type="insight"
              title="Subscription Review"
              message="You have 3 active subscriptions totaling ₹618/mo. Consider reviewing unused ones."
              actionLabel="Review subscriptions"
            />
            <NudgeCard
              type="alert"
              title="Budget Alert"
              message="You've exceeded your entertainment budget by ₹199 this month."
              actionLabel="Adjust budget"
            />
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
