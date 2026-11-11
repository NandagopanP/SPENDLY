import { expenses, filterExpensesByDate } from "./expenses.js";
import { calculateCategoryTotals, calculateCategoryPercentages, } from "./expenses.js";
let date = document.getElementById("date-filter");
if (date) {
    updateDashboard(date.value);
    date.addEventListener("change", (event) => {
        const selectedDate = event.target.value;
        // console.log(selectedDate)
        updateDashboard(selectedDate);
    });
}
renderTransactions(expenses);
function updateDashboard(range) {
    const filteredExpenses = filterExpensesByDate(range);
    let totalAmount = 0;
    for (const expense of filteredExpenses) {
        totalAmount += expense.amount;
    }
    const categoryTotals = calculateCategoryTotals(filteredExpenses);
    const categoryPercentages = calculateCategoryPercentages(categoryTotals, totalAmount);
    let currentPercentage = 0;
    const gradientParts = [];
    const categoryColors = {
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
    for (const [category, percentage] of Object.entries(categoryPercentages)) {
        const startPercentage = currentPercentage;
        const endPercentage = startPercentage + percentage;
        console.log(category, startPercentage, endPercentage);
        currentPercentage = endPercentage;
        const color = categoryColors[category] ?? "#808080";
        gradientParts.push(`${color} ${startPercentage}% ${endPercentage}%`);
    }
    console.log(gradientParts.join(", "));
    let filteredAmount = document.getElementById("total-expenses");
    if (filteredAmount) {
        filteredAmount.textContent = `₹${totalAmount.toFixed(2)}`;
    }
    const gradient = `conic-gradient(${gradientParts.join(", ")})`;
    const categoryChart = document.getElementById("category-chart");
    if (categoryChart) {
        categoryChart.style.background =
            gradientParts.length > 0 ? gradient : "#E5E7EB";
    }
    let totalTransactions = document.getElementById("total-transactions");
    if (totalTransactions) {
        totalTransactions.textContent = `${filteredExpenses.length}`;
    }
    let avgExpense = filteredExpenses.length > 0 ? totalAmount / filteredExpenses.length : 0;
    let averageExpeseElement = document.getElementById("average-expense");
    if (averageExpeseElement) {
        averageExpeseElement.textContent = `₹${avgExpense.toFixed(2)}`;
    }
    const percentageElement = document.getElementById("category-legend");
    if (percentageElement) {
        let legendHtml = "";
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
        ;
    }
}
function renderTransactions(filteredExpenses) {
    let transactionList = document.getElementById("transactions-list");
    if (transactionList) {
        if (filteredExpenses.length === 0) {
            transactionList.innerHTML = "<p>No transactions found</p>";
        }
        else {
            let transactionHtml = `<table>
        <thead>
            <tr>
                <th>Description</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
            </tr>
        </thead>
        <tbody>
`;
            const recentExpenses = [...filteredExpenses]
                .sort((a, b) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            })
                .slice(0, 5);
            for (const expense of recentExpenses) {
                transactionHtml += `
        <tr>
        <td>${expense.description}</td>
        <td>${expense.category}</td>
        <td>${expense.date}</td>
        <td>₹${expense.amount.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}</td>
        </tr>
        `;
                console.log(expense.description, expense.date);
            }
            transactionHtml += `
       </tbody>
      </table>`;
            transactionList.innerHTML = transactionHtml;
        }
    }
}
