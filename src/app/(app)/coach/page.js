"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, User, Sparkles, TrendingUp, PiggyBank, AlertTriangle, BookOpen } from "lucide-react";

const initialMessages = [
  {
    role: "assistant",
    content:
      "Hi Abhinav! 👋 I'm your AI Financial Coach. I've analyzed your spending patterns and have some personalized insights. What would you like to know?",
    timestamp: "Just now",
  },
];

const quickActions = [
  { label: "Analyze my spending", icon: Sparkles, color: "#6c5ce7" },
  { label: "Saving strategies", icon: PiggyBank, color: "#00d2a0" },
  { label: "Investment advice", icon: TrendingUp, color: "#ffa726" },
  { label: "Fix spending habits", icon: AlertTriangle, color: "#ff6b6b" },
  { label: "Financial education", icon: BookOpen, color: "#42a5f5" },
];

const responses = {
  "Analyze my spending": {
    content: `📊 **Spending Analysis for March 2026:**

• **Total Spending:** ₹45,377 (up 8% from Feb)
• **Largest Category:** Rent (₹15,000 — 33%)
• **Fastest Growing:** Food Delivery (+56% from last month)
• **Unnecessary Spending:** ~₹8,500 (19%)

**Key Concern:** Your food delivery spending has surged to ₹2,360 this month. That's 28 orders! Combined with cab rides (₹1,250), these two habits alone cost ₹3,610.

**If invested monthly in a SIP at 12%, this could become ₹8.4 lakh in 10 years.** 💰

Would you like me to suggest specific strategies to reduce these?`,
  },
  "Saving strategies": {
    content: `Here are **personalized saving strategies** based on your spending:

1. **🍽️ Meal Prep Sundays** — Cook 4 meals/week at home  
   → Save ₹1,800/month from food delivery

2. **🚇 Metro Commute** — Switch 3 cab rides/week to metro  
   → Save ₹1,400/month on transport

3. **📺 Subscription Audit** — You have 6 subscriptions  
   → Cancel 2 unused ones, save ₹500/month

4. **🛍️ 48-Hour Rule** — Wait 48 hours before any non-essential purchase  
   → Estimated savings: ₹2,000/month

5. **💳 Cash Envelope** — Set weekly cash limits for discretionary spending  
   → Prevents overspending by 20-30%

**Total Potential Savings: ₹5,700/month**  
If invested via SIP at 12%: **₹13.2 lakh in 10 years!** 🚀`,
  },
  "Investment advice": {
    content: `Based on your profile, here's my **recommended investment allocation:**

📦 **Conservative (30%):** Fixed Deposits  
→ ₹2,500/month in FD at 7% — safety net

📈 **Growth (50%):** SIP in Mutual Funds  
→ ₹4,000/month in index funds at 12%

🚀 **Aggressive (20%):** Direct Stocks  
→ ₹1,500/month in blue-chip stocks

**Why this split?**
• You're young with stable income — more growth exposure
• FD provides liquidity for emergencies
• SIP gives rupee-cost averaging benefits
• Stocks offer higher long-term returns

**Projected Portfolio in 10 years:**
• FDs: ₹4.3 lakh
• SIPs: ₹9.2 lakh  
• Stocks: ₹4.1 lakh
• **Total: ~₹17.6 lakh** 🎯

Start small, stay consistent. Would you like help setting up a SIP?`,
  },
  "Fix spending habits": {
    content: `🔍 **Your Top 3 Wealth-Draining Habits:**

**1. Food Delivery Addiction** 🍕
• 28 orders this month (₹4,200)
• That's ₹140/day on delivery alone
• **Fix:** Cook 4x/week → Save ₹2,700/month

**2. Impulse Shopping** 🛒
• 12 purchases this month (₹5,800)  
• 6 of them were under ₹500 (impulse buys)
• **Fix:** Apply 48-hour rule + uninstall shopping apps → Save ₹3,000/month

**3. Cab Over Metro** 🚕
• 22 cab rides (₹3,200)
• Metro would cost ~₹1,000 for same routes
• **Fix:** Metro for daily commute → Save ₹2,200/month

**Combined Impact:**
• Monthly savings: ₹7,900
• 5-year wealth (at 12%): **₹6.5 lakh**
• 10-year wealth: **₹18.3 lakh**

Small changes → Massive wealth! 💪`,
  },
  "Financial education": {
    content: `📚 **Quick Finance Lessons:**

**1. The Power of Compounding** 
₹5,000/month at 12% becomes:
• 5 years: ₹4.1 lakh
• 10 years: ₹11.6 lakh  
• 20 years: ₹49.5 lakh
Einstein called it the "8th wonder of the world"! 

**2. Rule of 72**  
Divide 72 by your return rate to know doubling time.  
At 12% → Money doubles every 6 years!

**3. 50/30/20 Rule**
• 50% → Needs (rent, food, utilities)  
• 30% → Wants (entertainment, shopping)
• 20% → Savings & investments
Your current ratio: 55/30/15 — aim to hit 20% savings!

**4. Emergency Fund**
Keep 6 months of expenses liquid.  
For you: ~₹2.7 lakh (you have ₹1.85 lakh — 68% there!)

**5. SIP vs Lump Sum**
SIP wins in volatile markets due to rupee-cost averaging.  
Start with SIP, add lump sums when market dips.

Want to dive deeper into any topic? 🎓`,
  },
};

export default function CoachPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text) => {
    const userMessage = text || input;
    if (!userMessage.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage, timestamp: "Just now" },
    ]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = responses[userMessage] || {
        content: `Great question! Based on your financial profile, I'd suggest focusing on reducing unnecessary expenses first. Your food delivery and impulse shopping habits alone account for ₹10,000/month in potential savings.\n\nWould you like me to create a personalized plan to redirect these funds into investments? I can show you exactly how much wealth you'd build over 5, 10, and 15 years.`,
      };

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.content, timestamp: "Just now" },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const formatMessage = (content) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />');
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "var(--color-text-primary)" }}>
          AI Financial Coach
        </h1>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Get personalized financial advice powered by AI analysis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Quick Actions Sidebar */}
        <div className="lg:col-span-1">
          <div
            className="p-4 rounded-2xl"
            style={{
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
            }}
          >
            <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
              Quick Actions
            </h3>
            <div className="flex flex-col gap-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.label}
                    onClick={() => handleSend(action.label)}
                    className="flex items-center gap-2.5 p-3 rounded-xl text-left transition-all cursor-pointer w-full"
                    style={{
                      background: "transparent",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text-secondary)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${action.color}12`;
                      e.currentTarget.style.borderColor = action.color;
                      e.currentTarget.style.color = action.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "var(--color-border)";
                      e.currentTarget.style.color = "var(--color-text-secondary)";
                    }}
                  >
                    <Icon size={16} />
                    <span className="text-sm font-medium">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Coach Stats */}
          <div
            className="p-4 rounded-2xl mt-4"
            style={{
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
            }}
          >
            <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>
              Your Finance Score
            </h3>
            <div className="flex items-center justify-center mb-3">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{
                  background: "conic-gradient(var(--color-success) 0% 68%, var(--color-border) 68% 100%)",
                }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: "var(--color-bg-card)" }}
                >
                  <span className="text-xl font-bold" style={{ color: "var(--color-success)" }}>
                    68
                  </span>
                </div>
              </div>
            </div>
            <p className="text-center text-xs" style={{ color: "var(--color-text-muted)" }}>
              Good — Room for improvement
            </p>
            <div className="flex flex-col gap-2 mt-3">
              <div className="flex justify-between text-xs">
                <span style={{ color: "var(--color-text-secondary)" }}>Savings Rate</span>
                <span style={{ color: "var(--color-warning)" }}>15%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span style={{ color: "var(--color-text-secondary)" }}>Habit Score</span>
                <span style={{ color: "var(--color-danger)" }}>54/100</span>
              </div>
              <div className="flex justify-between text-xs">
                <span style={{ color: "var(--color-text-secondary)" }}>Investment Progress</span>
                <span style={{ color: "var(--color-success)" }}>72%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3">
          <div
            className="rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              height: "600px",
            }}
          >
            {/* Chat Header */}
            <div
              className="flex items-center gap-3 px-5 py-4"
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end))",
                }}
              >
                <Bot size={18} color="white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                  WealthHabit AI Coach
                </h3>
                <p className="text-[11px]" style={{ color: "var(--color-success)" }}>
                  ● Online — analyzing your finances
                </p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2.5`}
                >
                  {msg.role === "assistant" && (
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
                      style={{
                        background: "linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end))",
                      }}
                    >
                      <Bot size={14} color="white" />
                    </div>
                  )}
                  <div
                    className="max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed"
                    style={{
                      background:
                        msg.role === "user"
                          ? "linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end))"
                          : "var(--color-bg-input)",
                      color: msg.role === "user" ? "white" : "var(--color-text-secondary)",
                      borderTopRightRadius: msg.role === "user" ? "4px" : "16px",
                      borderTopLeftRadius: msg.role === "user" ? "16px" : "4px",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(msg.content),
                    }}
                  />
                  {msg.role === "user" && (
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
                      style={{ background: "var(--color-bg-input)" }}
                    >
                      <User size={14} style={{ color: "var(--color-text-secondary)" }} />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2.5">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end))",
                    }}
                  >
                    <Bot size={14} color="white" />
                  </div>
                  <div
                    className="px-4 py-3 rounded-2xl"
                    style={{ background: "var(--color-bg-input)", borderTopLeftRadius: "4px" }}
                  >
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: "var(--color-text-muted)", animationDelay: "0ms" }} />
                      <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: "var(--color-text-muted)", animationDelay: "150ms" }} />
                      <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: "var(--color-text-muted)", animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div
              className="px-5 py-4 flex gap-3"
              style={{ borderTop: "1px solid var(--color-border)" }}
            >
              <input
                className="input-field flex-1"
                placeholder="Ask me anything about your finances..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={() => handleSend()}
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer flex-shrink-0"
                style={{
                  background: input.trim()
                    ? "linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end))"
                    : "var(--color-bg-input)",
                  border: "none",
                }}
              >
                <Send
                  size={18}
                  style={{
                    color: input.trim() ? "white" : "var(--color-text-muted)",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
