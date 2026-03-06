"use client";

import Sidebar from "@/components/Sidebar";

export default function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main
        className="flex-1 ml-[240px] p-6 transition-all duration-300"
        style={{ background: "var(--color-bg-primary)" }}
      >
        <div className="max-w-[1400px] mx-auto">{children}</div>
      </main>
    </div>
  );
}
