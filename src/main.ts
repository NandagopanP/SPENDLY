import { calculateTotalExpense } from "./expenses.js";
import { expenses } from "./expenses.js";

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
