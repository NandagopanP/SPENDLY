import { expenses, filterExpensesByDate } from "./expenses.js";

let date = document.getElementById("date-filter");
if (date) {
  updateDashboard(date.value);
  date.addEventListener("change", (event) => {
    const selectedDate = event.target.value;
    // console.log(selectedDate)
    updateDashboard(selectedDate);
  });
}
function updateDashboard(range) {
  const filteredExpenses = filterExpensesByDate(range);
  let totalAmount = 0;
  for (const expense of filteredExpenses) {
    totalAmount += expense.amount;
  }
  let filteredAmount = document.getElementById("total-expenses");
  if (filteredAmount) {
    filteredAmount.textContent = `₹${totalAmount.toFixed(2)}`;
  }
  let totalTransactions = document.getElementById("total-transactions");
  if (totalTransactions) {
    totalTransactions.textContent = `${filteredExpenses.length}`;
  }
  let avgExpense =
    filteredExpenses.length > 0 ? totalAmount / filteredExpenses.length : 0;
  let averageExpeseElement = document.getElementById("average-expense");
  if (averageExpeseElement) {
    averageExpeseElement.textContent = `₹${avgExpense.toFixed(2)}`;
  }
  renderTransactions(expenses);
}
function renderTransactions(expensesToShow) {
  let transactionList = document.getElementById("transactions-list");
  if (transactionList) {
    if (expensesToShow.length === 0) {
      transactionList.innerHTML = "<p>No transactions found</p>";
    } else {
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
      const recentExpenses = [...expensesToShow]
        .sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        })
        .slice(0, 4);
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
