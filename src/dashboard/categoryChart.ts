
import type { Expense } from "../types.js";

const categoryColors: Record<string, string> = {
  Food: "#10B981",
  Transport: "#3B82F6",
  Entertainment: "#F59E0B",
  Other: "#A78BFA",
  Bills: "#EF4444",
  Selfcare: "#EC4899",
  Health: "#06B6D4",
  Education: "#8B5CF6",
  Clothing: "#F97316",
};

function calculateCategoryTotals(
  filteredExpenses: Expense[]
): Record<string, number> {
  const categoryTotals: Record<string, number> = {};

  for (const expense of filteredExpenses) {
    categoryTotals[expense.category] =
      (categoryTotals[expense.category] ?? 0) + expense.amount;
  }

  return categoryTotals;
}

function calculateCategoryPercentages(
  categoryTotals: Record<string, number>,
  totalAmount: number
): Record<string, number> {
  const categoryPercentages: Record<string, number> = {};

  if (totalAmount === 0) {
    return categoryPercentages;
  }

  for (const [category, amount] of Object.entries(categoryTotals)) {
    categoryPercentages[category] = (amount / totalAmount) * 100;
  }

  return categoryPercentages;
}

export function updateCategoryChart(filteredExpenses: Expense[]): void {
  let totalAmount: number = 0;

  for (const expense of filteredExpenses) {
    totalAmount += expense.amount;
  }

  const categoryTotals = calculateCategoryTotals(filteredExpenses);

  const categoryPercentages = calculateCategoryPercentages(
    categoryTotals,
    totalAmount
  );

  let currentPercentage: number = 0;
  const gradientParts: string[] = [];

  for (const [category, percentage] of Object.entries(categoryPercentages)) {
    const startPercentage = currentPercentage;
    const endPercentage = startPercentage + percentage;

    const color = categoryColors[category] ?? "#808080";

    gradientParts.push(
      `${color} ${startPercentage}% ${endPercentage}%`
    );

    currentPercentage = endPercentage;
  }

  const gradient = `conic-gradient(${gradientParts.join(", ")})`;

  const categoryChart = document.getElementById("category-chart");

  if (categoryChart) {
    categoryChart.style.background =
      gradientParts.length > 0 ? gradient : "#E5E7EB";
  }

  const percentageElement = document.getElementById("category-legend");

  if (percentageElement) {
    let legendHtml: string = "";

    for (const [category, percentage] of Object.entries(categoryPercentages)) {
      const color = categoryColors[category] ?? "#808080";

      legendHtml += `
        <div class="legend-item">
          <span class="legend-dot" style="background-color: ${color};"></span>
          <span>${category}</span>
          <span>${percentage.toFixed(1)}%</span>
        </div>
      `;
    }

    percentageElement.innerHTML = legendHtml;
  }

  const categoryTotal = document.getElementById("category-total");

  if (categoryTotal) {
    categoryTotal.textContent = `₹${totalAmount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
}
