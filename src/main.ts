
import { expenses, filterExpensesByDate } from "./expenses.js";
import { updateSummary } from "./dashboard/summary.js";
import { renderTransactions } from "./dashboard/recentTransactions.js";
import { updateCategoryChart } from "./dashboard/categoryChart.js";

function updateDashboard(range: string): void {
  const filteredExpenses = filterExpensesByDate(range);

  updateSummary(filteredExpenses);
  updateCategoryChart(filteredExpenses);
}

const dateFilter = document.getElementById("date-filter") as HTMLSelectElement | null;

if (dateFilter) {
  updateDashboard(dateFilter.value);

  dateFilter.addEventListener("change", () => {
    updateDashboard(dateFilter.value);
  });
}

renderTransactions(expenses);
