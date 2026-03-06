"use client";

import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import {
  Plus, Upload, Search, Filter, ArrowUpDown,
  UtensilsCrossed, Car, ShoppingBag, Gamepad2, CreditCard, MoreHorizontal, Home, Zap, Heart, Truck,
} from "lucide-react";
import ChartCard from "@/components/ChartCard";
import { sampleExpenses, categories } from "@/data/expenseData";
import { formatCurrency, formatDate, categoryColors } from "@/utils/formatters";

const iconMap = {
  Food: UtensilsCrossed,
  "Food Delivery": Truck,
  Transport: Car,
  Shopping: ShoppingBag,
  Entertainment: Gamepad2,
  Subscriptions: CreditCard,
  Miscellaneous: MoreHorizontal,
  Rent: Home,
  Utilities: Zap,
  Health: Heart,
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
          {payload[0].payload.category}
        </p>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "12px", marginTop: "4px" }}>
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState(sampleExpenses);
  const [showForm, setShowForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
  });

  const filteredExpenses = useMemo(() => {
    let result = [...expenses];
    if (filterCategory !== "All") {
      result = result.filter((e) => e.category === filterCategory);
    }
    if (searchQuery) {
      result = result.filter((e) =>
        e.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    result.sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "desc"
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date);
      }
      return sortOrder === "desc" ? b.amount - a.amount : a.amount - b.amount;
    });
    return result;
  }, [expenses, filterCategory, searchQuery, sortBy, sortOrder]);

  const categoryBreakdown = useMemo(() => {
    const totals = {};
    expenses.forEach((e) => {
      totals[e.category] = (totals[e.category] || 0) + e.amount;
    });
    return Object.entries(totals)
      .map(([category, total]) => ({ category, total }))
      .sort((a, b) => b.total - a.total);
  }, [expenses]);

  const handleAddExpense = () => {
    if (!newExpense.description || !newExpense.amount) return;
    const expense = {
      id: Date.now(),
      ...newExpense,
      amount: parseFloat(newExpense.amount),
    };
    setExpenses([expense, ...expenses]);
    setNewExpense({ description: "", amount: "", category: "Food", date: new Date().toISOString().split("T")[0] });
    setShowForm(false);
  };

  const handleCSVImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split("\n").slice(1);
      const imported = lines
        .filter((l) => l.trim())
        .map((line, i) => {
          const [description, amount, category, date] = line.split(",").map((s) => s.trim());
          return {
            id: Date.now() + i,
            description: description || "Imported",
            amount: parseFloat(amount) || 0,
            category: categories.includes(category) ? category : "Miscellaneous",
            date: date || new Date().toISOString().split("T")[0],
          };
        });
      setExpenses([...imported, ...expenses]);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--color-text-primary)" }}>
            Expense Tracker
          </h1>
          <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
            Log, categorize and analyze your spending
          </p>
        </div>
        <div className="flex gap-3">
          <label className="btn-secondary cursor-pointer">
            <Upload size={16} />
            Import CSV
            <input type="file" accept=".csv" onChange={handleCSVImport} className="hidden" />
          </label>
          <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
            <Plus size={16} />
            Add Expense
          </button>
        </div>
      </div>

      {/* Add Expense Form */}
      {showForm && (
        <div
          className="p-5 rounded-2xl mb-6 animate-fade-in-up"
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
          }}
        >
          <h3 className="text-base font-semibold mb-4" style={{ color: "var(--color-text-primary)" }}>
            New Expense
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              className="input-field"
              placeholder="Description"
              value={newExpense.description}
              onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
            />
            <input
              className="input-field"
              type="number"
              placeholder="Amount (₹)"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            />
            <select
              className="input-field"
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <input
              className="input-field"
              type="date"
              value={newExpense.date}
              onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
            <button className="btn-primary" onClick={handleAddExpense}>Add Expense</button>
          </div>
        </div>
      )}

      {/* Category Breakdown Chart */}
      <ChartCard title="Category Breakdown" subtitle="All time" className="mb-6">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={categoryBreakdown} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
            <XAxis type="number" stroke="var(--color-text-muted)" fontSize={11} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
            <YAxis type="category" dataKey="category" stroke="var(--color-text-muted)" fontSize={11} width={100} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="total" radius={[0, 8, 8, 0]} barSize={18}>
              {categoryBreakdown.map((entry) => (
                <Cell key={entry.category} fill={categoryColors[entry.category] || "#6c5ce7"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px] max-w-[320px]">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: "var(--color-text-muted)" }}
          />
          <input
            className="input-field pl-10"
            placeholder="Search expenses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} style={{ color: "var(--color-text-muted)" }} />
          <select
            className="input-field w-auto"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <button
          className="btn-secondary"
          onClick={() => {
            setSortBy(sortBy === "date" ? "amount" : "date");
          }}
        >
          <ArrowUpDown size={14} />
          Sort by {sortBy === "date" ? "Amount" : "Date"}
        </button>
      </div>

      {/* Expense List */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "var(--color-bg-card)",
          border: "1px solid var(--color-border)",
        }}
      >
        <div
          className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-5 py-3 text-xs font-semibold"
          style={{
            color: "var(--color-text-muted)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <span className="w-8" />
          <span>Description</span>
          <span>Category</span>
          <span>Date</span>
          <span className="text-right">Amount</span>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {filteredExpenses.slice(0, 30).map((expense) => {
            const Icon = iconMap[expense.category] || MoreHorizontal;
            return (
              <div
                key={expense.id}
                className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-5 py-3 items-center transition-colors"
                style={{ borderBottom: "1px solid var(--color-border)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-bg-card-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: `${categoryColors[expense.category] || "#6c5ce7"}20`,
                  }}
                >
                  <Icon
                    size={14}
                    style={{ color: categoryColors[expense.category] || "#6c5ce7" }}
                  />
                </div>
                <span className="text-sm font-medium truncate" style={{ color: "var(--color-text-primary)" }}>
                  {expense.description}
                </span>
                <span
                  className="badge text-[11px]"
                  style={{ background: `${categoryColors[expense.category]}20`, color: categoryColors[expense.category] }}
                >
                  {expense.category}
                </span>
                <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                  {formatDate(expense.date)}
                </span>
                <span className="text-sm font-semibold text-right" style={{ color: "var(--color-text-primary)" }}>
                  {formatCurrency(expense.amount)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
