export function updateSummary(filteredExpenses) {
    let totalAmount = 0;
    for (const expense of filteredExpenses) {
        totalAmount += expense.amount;
    }
    const filteredAmount = document.getElementById("total-expenses");
    if (filteredAmount) {
        filteredAmount.textContent = `₹${totalAmount.toFixed(2)}`;
    }
    const totalTransactions = document.getElementById("total-transactions");
    if (totalTransactions) {
        totalTransactions.textContent = `${filteredExpenses.length}`;
    }
    const avgExpense = filteredExpenses.length > 0
        ? totalAmount / filteredExpenses.length
        : 0;
    const averageExpenseElement = document.getElementById("average-expense");
    if (averageExpenseElement) {
        averageExpenseElement.textContent = `₹${avgExpense.toFixed(2)}`;
    }
}
