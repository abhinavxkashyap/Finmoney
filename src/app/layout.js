import "./globals.css";

export const metadata = {
  title: "WealthHabit – AI Personal Finance & Investment Habit Tracker",
  description:
    "Track spending, detect unhealthy habits, and convert savings into long-term investments with AI-powered insights.",
  keywords: [
    "personal finance",
    "habit tracker",
    "investment",
    "AI finance",
    "spending tracker",
    "SIP calculator",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
