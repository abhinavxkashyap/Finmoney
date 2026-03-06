"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Receipt,
  AlertTriangle,
  TrendingUp,
  Calculator,
  Bot,
  Settings,
  ChevronLeft,
  ChevronRight,
  Wallet,
  Sun,
  Moon,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/expenses", label: "Expenses", icon: Receipt },
  { href: "/habits", label: "Habits", icon: AlertTriangle },
  { href: "/investments", label: "Investments", icon: TrendingUp },
  { href: "/calculator", label: "Calculator", icon: Calculator },
  { href: "/coach", label: "AI Coach", icon: Bot },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (isDark) {
      html.setAttribute("data-theme", "light");
    } else {
      html.setAttribute("data-theme", "dark");
    }
    setIsDark(!isDark);
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen z-50 flex flex-col transition-all duration-300 ease-in-out ${
        collapsed ? "w-[72px]" : "w-[240px]"
      }`}
      style={{
        background: "var(--color-bg-secondary)",
        borderRight: "1px solid var(--color-border)",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-5 py-5"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <div
          className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0"
          style={{
            background:
              "linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end))",
          }}
        >
          <Wallet size={20} color="white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1
              className="text-base font-bold whitespace-nowrap"
              style={{ color: "var(--color-text-primary)" }}
            >
              WealthHabit
            </h1>
            <p
              className="text-[10px] font-medium"
              style={{ color: "var(--color-text-muted)" }}
            >
              AI Finance Tracker
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                collapsed ? "justify-center" : ""
              }`}
              style={{
                background: isActive
                  ? "linear-gradient(135deg, rgba(108,92,231,0.15), rgba(162,155,254,0.08))"
                  : "transparent",
                color: isActive
                  ? "var(--color-accent-light)"
                  : "var(--color-text-secondary)",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background =
                    "var(--color-bg-card-hover)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {isActive && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                  style={{
                    background:
                      "linear-gradient(180deg, var(--color-gradient-start), var(--color-gradient-end))",
                  }}
                />
              )}
              <Icon size={20} className="flex-shrink-0" />
              {!collapsed && (
                <span className="text-sm font-medium whitespace-nowrap">
                  {item.label}
                </span>
              )}
              {collapsed && (
                <div
                  className="absolute left-full ml-2 px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-[100]"
                  style={{
                    background: "var(--color-bg-card)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div
        className="px-3 py-4 flex flex-col gap-2"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
            collapsed ? "justify-center" : ""
          }`}
          style={{
            background: "transparent",
            color: "var(--color-text-secondary)",
            border: "none",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--color-bg-card-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
          {!collapsed && (
            <span className="text-sm font-medium">
              {isDark ? "Light Mode" : "Dark Mode"}
            </span>
          )}
        </button>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
            collapsed ? "justify-center" : ""
          }`}
          style={{
            background: "transparent",
            color: "var(--color-text-secondary)",
            border: "none",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--color-bg-card-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          {!collapsed && (
            <span className="text-sm font-medium">Collapse</span>
          )}
        </button>
      </div>
    </aside>
  );
}
