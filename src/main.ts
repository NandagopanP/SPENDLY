import { expenses, filterExpensesByDate } from "./expenses.js";
import { Expense } from "./types.js";

let date = document.getElementById("date-filter");
if (date) {
  updateDashboard((date as HTMLSelectElement).value);
  date.addEventListener("change", (event) => {
    const selectedDate = (event.target as HTMLSelectElement).value;
    // console.log(selectedDate)

    updateDashboard(selectedDate);
  });
}

function updateDashboard(range: string): void {
  const filteredExpenses: Expense[] = filterExpensesByDate(range);

  let totalAmount: number = 0;
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

  let avgExpense: number =
    filteredExpenses.length > 0 ? totalAmount / filteredExpenses.length : 0;
  let averageExpeseElement = document.getElementById("average-expense");
  if (averageExpeseElement) {
    averageExpeseElement.textContent = `₹${avgExpense.toFixed(2)}`;
  }

  renderTransactions(filteredExpenses);
}

function renderTransactions(filteredExpenses: Expense[]): void {

  let transactionList = document.getElementById("transactions-list");

  if (transactionList) {
    if (filteredExpenses.length === 0) {
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

    const recentExpenses: Expense[] = [...filteredExpenses]
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
        <td>₹${expense.amount.toFixed(2)}</td>
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


