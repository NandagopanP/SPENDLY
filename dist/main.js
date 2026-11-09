import { calculateTotalExpense } from "./expenses.js";
import { expenses } from "./expenses.js";
import { filterExpensesByDate } from "./expenses.js";
let total = calculateTotalExpense();
let totalElement = document.getElementById("total-expenses");
if (totalElement) {
    totalElement.textContent = `₹${total.toFixed(2)}`;
}
let totalTransactions = document.getElementById("total-transactions");
if (totalTransactions) {
    totalTransactions.textContent = `${expenses.length}`;
}
let avgExpense = total / expenses.length;
let averageExpeseElement = document.getElementById("average-expense");
if (averageExpeseElement) {
    averageExpeseElement.textContent = `₹${avgExpense.toFixed(2)}`;
}
let date = document.getElementById('date-filter');
if (date) {
    date.addEventListener('change', (event) => {
        const selectedDate = event.target.value;
        // console.log(selectedDate)
        let filteredExpenses = filterExpensesByDate(selectedDate);
        console.log(filteredExpenses);
        let totalAmount = 0;
        for (const expense of filteredExpenses) {
            totalAmount += expense.amount;
        }
        let filteredAmount = document.getElementById("total-expenses");
        if (filteredAmount) {
            filteredAmount.textContent = `₹${totalAmount.toFixed(2)}`;
        }
        console.log(totalAmount);
    });
}
