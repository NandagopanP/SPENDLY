
import type { Expense } from "../types.js";

export function renderTransactions(expenses: Expense[]): void {
  const transactionList = document.getElementById("transactions-list");

  if (!transactionList) {
    return;
  }

  if (expenses.length === 0) {
    transactionList.innerHTML = "<p>No transactions found</p>";
    return;
  }

  let transactionHtml = `
    <table>
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

  const recentExpenses: Expense[] = [...expenses]
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
  }

  transactionHtml += `
      </tbody>
    </table>
  `;

  transactionList.innerHTML = transactionHtml;
}
