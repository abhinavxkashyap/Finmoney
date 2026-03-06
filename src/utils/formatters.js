// Format currency in Indian Rupees with lakhs/crores
export function formatCurrency(amount, compact = false) {
  if (compact) {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}K`;
    }
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format percentage
export function formatPercent(value) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
}

// Format date
export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Short month name
export function shortMonth(dateString) {
  return new Date(dateString).toLocaleDateString("en-IN", { month: "short" });
}

// Category colors
export const categoryColors = {
  Food: "#ff6b6b",
  "Food Delivery": "#ff8787",
  Transport: "#ffa726",
  Shopping: "#ab47bc",
  Entertainment: "#42a5f5",
  Subscriptions: "#66bb6a",
  Miscellaneous: "#78909c",
  Rent: "#5c6bc0",
  Utilities: "#26c6da",
  Health: "#ef5350",
};

// Category icons mapping (Lucide icon names)
export const categoryIcons = {
  Food: "UtensilsCrossed",
  "Food Delivery": "Truck",
  Transport: "Car",
  Shopping: "ShoppingBag",
  Entertainment: "Gamepad2",
  Subscriptions: "CreditCard",
  Miscellaneous: "MoreHorizontal",
  Rent: "Home",
  Utilities: "Zap",
  Health: "Heart",
};
