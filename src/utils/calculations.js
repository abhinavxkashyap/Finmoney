// Compound interest for lump sum
export function compoundInterest(principal, ratePercent, years) {
  const rate = ratePercent / 100;
  return principal * Math.pow(1 + rate, years);
}

// SIP (Systematic Investment Plan) future value
export function sipFutureValue(monthlyAmount, annualRatePercent, years) {
  const monthlyRate = annualRatePercent / 12 / 100;
  const months = years * 12;
  if (monthlyRate === 0) return monthlyAmount * months;
  return monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
}

// FD maturity calculation (quarterly compounding)
export function fdMaturity(principal, annualRatePercent, years) {
  const rate = annualRatePercent / 4 / 100;
  const periods = years * 4;
  return principal * Math.pow(1 + rate, periods);
}

// Daily spending to monthly
export function dailyToMonthly(dailyAmount) {
  return dailyAmount * 30;
}

// Calculate total invested in SIP
export function sipTotalInvested(monthlyAmount, years) {
  return monthlyAmount * years * 12;
}

// Generate yearly projection data for charts
export function generateProjection(monthlyAmount, annualRatePercent, maxYears) {
  const data = [];
  for (let year = 0; year <= maxYears; year++) {
    const invested = sipTotalInvested(monthlyAmount, year);
    const value = year === 0 ? 0 : sipFutureValue(monthlyAmount, annualRatePercent, year);
    const returns = value - invested;
    data.push({
      year,
      invested: Math.round(invested),
      value: Math.round(value),
      returns: Math.round(returns),
    });
  }
  return data;
}

// Detect spending patterns and flag unhealthy ones
export function analyzeSpending(expenses) {
  const categoryTotals = {};
  expenses.forEach((exp) => {
    categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
  });

  const insights = [];
  const thresholds = {
    "Food Delivery": { limit: 3000, message: "Too many food delivery orders" },
    Shopping: { limit: 5000, message: "Excessive online shopping" },
    Transport: { limit: 2000, message: "Frequent cab rides instead of public transport" },
    Subscriptions: { limit: 1500, message: "Possible unused subscriptions" },
    Entertainment: { limit: 3000, message: "High entertainment spending" },
  };

  Object.entries(categoryTotals).forEach(([category, total]) => {
    if (thresholds[category] && total > thresholds[category].limit) {
      const excess = total - thresholds[category].limit;
      const sipValue5 = sipFutureValue(excess, 12, 5);
      const sipValue10 = sipFutureValue(excess, 12, 10);
      insights.push({
        category,
        amount: total,
        excess,
        message: thresholds[category].message,
        impact5yr: Math.round(sipValue5),
        impact10yr: Math.round(sipValue10),
        severity: excess > 3000 ? "high" : excess > 1500 ? "medium" : "low",
      });
    }
  });

  return insights;
}
