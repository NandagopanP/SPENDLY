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
}

function renderTransactions(filteredExpenses: Expense[]): void {
  let transactionList = document.getElementById("transactions-list");

  if (transactionList) {
    if (filteredExpenses.length === 0) {
      transactionList.innerHTML = "<p>No transactions found</p>";
    } else {
      let transactionHtml = "";
      for (const expense of filteredExpenses) {
        transactionHtml += `<p>${expense.description}</p>`;
        transactionList.innerHTML = transactionHtml;
        console.log(expense.description);
      }
    }
  }
}

renderTransactions(expenses);
