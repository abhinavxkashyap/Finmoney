// Mock expense data for the last 6 months
const now = new Date();
const month = (offset) => {
  const d = new Date(now);
  d.setMonth(d.getMonth() - offset);
  return d;
};

const randomDate = (monthOffset) => {
  const d = month(monthOffset);
  d.setDate(Math.floor(Math.random() * 28) + 1);
  return d.toISOString().split("T")[0];
};

export const categories = [
  "Food",
  "Food Delivery",
  "Transport",
  "Shopping",
  "Entertainment",
  "Subscriptions",
  "Miscellaneous",
  "Rent",
  "Utilities",
  "Health",
];

export const sampleExpenses = [
  // Current month
  { id: 1, description: "Swiggy Order", amount: 450, category: "Food Delivery", date: randomDate(0) },
  { id: 2, description: "Uber Ride", amount: 320, category: "Transport", date: randomDate(0) },
  { id: 3, description: "Amazon Shopping", amount: 2800, category: "Shopping", date: randomDate(0) },
  { id: 4, description: "Netflix Subscription", amount: 649, category: "Subscriptions", date: randomDate(0) },
  { id: 5, description: "Movie Tickets", amount: 700, category: "Entertainment", date: randomDate(0) },
  { id: 6, description: "Grocery Store", amount: 3200, category: "Food", date: randomDate(0) },
  { id: 7, description: "Zomato Order", amount: 380, category: "Food Delivery", date: randomDate(0) },
  { id: 8, description: "Ola Ride", amount: 280, category: "Transport", date: randomDate(0) },
  { id: 9, description: "Spotify Premium", amount: 119, category: "Subscriptions", date: randomDate(0) },
  { id: 10, description: "Pharmacy", amount: 450, category: "Health", date: randomDate(0) },
  { id: 11, description: "Swiggy Order", amount: 520, category: "Food Delivery", date: randomDate(0) },
  { id: 12, description: "Myntra Purchase", amount: 1800, category: "Shopping", date: randomDate(0) },
  { id: 13, description: "Electric Bill", amount: 1200, category: "Utilities", date: randomDate(0) },
  { id: 14, description: "Rent Payment", amount: 15000, category: "Rent", date: randomDate(0) },
  { id: 15, description: "Cab to Office", amount: 200, category: "Transport", date: randomDate(0) },
  { id: 16, description: "Swiggy Order", amount: 600, category: "Food Delivery", date: randomDate(0) },
  { id: 17, description: "Coffee Shop", amount: 350, category: "Food", date: randomDate(0) },
  { id: 18, description: "Gaming Subscription", amount: 499, category: "Entertainment", date: randomDate(0) },
  { id: 19, description: "Zomato Order", amount: 410, category: "Food Delivery", date: randomDate(0) },
  { id: 20, description: "Uber Ride", amount: 450, category: "Transport", date: randomDate(0) },

  // 1 month ago
  { id: 21, description: "Swiggy Order", amount: 380, category: "Food Delivery", date: randomDate(1) },
  { id: 22, description: "Amazon Shopping", amount: 4500, category: "Shopping", date: randomDate(1) },
  { id: 23, description: "Uber Ride", amount: 350, category: "Transport", date: randomDate(1) },
  { id: 24, description: "Netflix", amount: 649, category: "Subscriptions", date: randomDate(1) },
  { id: 25, description: "Grocery", amount: 2800, category: "Food", date: randomDate(1) },
  { id: 26, description: "Swiggy Order", amount: 550, category: "Food Delivery", date: randomDate(1) },
  { id: 27, description: "Rent", amount: 15000, category: "Rent", date: randomDate(1) },
  { id: 28, description: "Movie Night", amount: 850, category: "Entertainment", date: randomDate(1) },
  { id: 29, description: "Ola Ride", amount: 190, category: "Transport", date: randomDate(1) },
  { id: 30, description: "Zomato", amount: 420, category: "Food Delivery", date: randomDate(1) },
  { id: 31, description: "Electric Bill", amount: 1100, category: "Utilities", date: randomDate(1) },
  { id: 32, description: "Flipkart", amount: 3200, category: "Shopping", date: randomDate(1) },
  { id: 33, description: "Spotify", amount: 119, category: "Subscriptions", date: randomDate(1) },
  { id: 34, description: "Medicine", amount: 600, category: "Health", date: randomDate(1) },
  { id: 35, description: "Swiggy", amount: 480, category: "Food Delivery", date: randomDate(1) },

  // 2 months ago
  { id: 36, description: "Grocery", amount: 3100, category: "Food", date: randomDate(2) },
  { id: 37, description: "Uber", amount: 400, category: "Transport", date: randomDate(2) },
  { id: 38, description: "Swiggy", amount: 350, category: "Food Delivery", date: randomDate(2) },
  { id: 39, description: "Amazon", amount: 2200, category: "Shopping", date: randomDate(2) },
  { id: 40, description: "Netflix", amount: 649, category: "Subscriptions", date: randomDate(2) },
  { id: 41, description: "Rent", amount: 15000, category: "Rent", date: randomDate(2) },
  { id: 42, description: "Concert Tickets", amount: 2500, category: "Entertainment", date: randomDate(2) },
  { id: 43, description: "Zomato", amount: 390, category: "Food Delivery", date: randomDate(2) },
  { id: 44, description: "Cab", amount: 280, category: "Transport", date: randomDate(2) },
  { id: 45, description: "Electric Bill", amount: 950, category: "Utilities", date: randomDate(2) },

  // 3 months ago
  { id: 46, description: "Grocery", amount: 2900, category: "Food", date: randomDate(3) },
  { id: 47, description: "Swiggy", amount: 600, category: "Food Delivery", date: randomDate(3) },
  { id: 48, description: "Uber", amount: 350, category: "Transport", date: randomDate(3) },
  { id: 49, description: "Rent", amount: 15000, category: "Rent", date: randomDate(3) },
  { id: 50, description: "Shopping", amount: 3800, category: "Shopping", date: randomDate(3) },
  { id: 51, description: "Netflix", amount: 649, category: "Subscriptions", date: randomDate(3) },
  { id: 52, description: "Zomato", amount: 450, category: "Food Delivery", date: randomDate(3) },
  { id: 53, description: "Electric Bill", amount: 1050, category: "Utilities", date: randomDate(3) },

  // 4 months ago
  { id: 54, description: "Grocery", amount: 3300, category: "Food", date: randomDate(4) },
  { id: 55, description: "Rent", amount: 15000, category: "Rent", date: randomDate(4) },
  { id: 56, description: "Swiggy", amount: 520, category: "Food Delivery", date: randomDate(4) },
  { id: 57, description: "Amazon", amount: 5200, category: "Shopping", date: randomDate(4) },
  { id: 58, description: "Uber", amount: 600, category: "Transport", date: randomDate(4) },
  { id: 59, description: "Netflix", amount: 649, category: "Subscriptions", date: randomDate(4) },
  { id: 60, description: "Electric Bill", amount: 1150, category: "Utilities", date: randomDate(4) },

  // 5 months ago
  { id: 61, description: "Grocery", amount: 2700, category: "Food", date: randomDate(5) },
  { id: 62, description: "Rent", amount: 15000, category: "Rent", date: randomDate(5) },
  { id: 63, description: "Swiggy", amount: 380, category: "Food Delivery", date: randomDate(5) },
  { id: 64, description: "Shopping", amount: 1500, category: "Shopping", date: randomDate(5) },
  { id: 65, description: "Uber", amount: 250, category: "Transport", date: randomDate(5) },
  { id: 66, description: "Netflix", amount: 649, category: "Subscriptions", date: randomDate(5) },
  { id: 67, description: "Electric Bill", amount: 900, category: "Utilities", date: randomDate(5) },
];

// Monthly spending summary data for charts
export const monthlySpending = [
  { month: "Oct", total: 36379, food: 2700, transport: 250, shopping: 1500, entertainment: 800, subscriptions: 649, rent: 15000, utilities: 900, foodDelivery: 380, health: 200 },
  { month: "Nov", total: 41619, food: 3300, transport: 600, shopping: 5200, entertainment: 1200, subscriptions: 649, rent: 15000, utilities: 1150, foodDelivery: 520, health: 300 },
  { month: "Dec", total: 39949, food: 2900, transport: 350, shopping: 3800, entertainment: 1500, subscriptions: 649, rent: 15000, utilities: 1050, foodDelivery: 1050, health: 400 },
  { month: "Jan", total: 40319, food: 3100, transport: 680, shopping: 2200, entertainment: 2500, subscriptions: 649, rent: 15000, utilities: 950, foodDelivery: 740, health: 350 },
  { month: "Feb", total: 44889, food: 2800, transport: 540, shopping: 7700, entertainment: 850, subscriptions: 768, rent: 15000, utilities: 1100, foodDelivery: 1830, health: 600 },
  { month: "Mar", total: 45377, food: 3550, transport: 1250, shopping: 4600, entertainment: 1199, subscriptions: 618, rent: 15000, utilities: 1200, foodDelivery: 2360, health: 450 },
];

// Financial goals
export const financialGoals = [
  { id: 1, name: "Emergency Fund", target: 300000, current: 185000, icon: "Shield" },
  { id: 2, name: "Vacation Fund", target: 100000, current: 42000, icon: "Plane" },
  { id: 3, name: "New Laptop", target: 80000, current: 55000, icon: "Laptop" },
  { id: 4, name: "Investment Portfolio", target: 500000, current: 125000, icon: "TrendingUp" },
];
