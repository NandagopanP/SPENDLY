export const expenses = [
    {
        id: 1,
        description: "Groceries",
        amount: 50,
        category: "Food",
        date: "2023-09-01",
    },
    {
        id: 2,
        description: "Bus Ticket",
        amount: 2.5,
        category: "Transport",
        date: "2023-09-02",
    },
    {
        id: 3,
        description: "Movie Night",
        amount: 15,
        category: "Entertainment",
        date: "2023-09-03",
    },
    {
        id: 4,
        description: "Dinner Out",
        amount: 190,
        category: "Food",
        date: "2026-11-07",
    },
    {
        id: 5,
        description: "Concert Ticket",
        amount: 1000,
        category: "Entertainment",
        date: "2026-11-03",
    },
    {
        id: 5,
        description: "Travel",
        amount: 1000,
        category: "Transport",
        date: "2026-10-03",
    },
    {
        id: 5,
        description: "Noodles",
        amount: 1000,
        category: "Food",
        date: "2026-10-03",
    }
];
export function calculateTotalExpense() {
    let totalAmount = 0;
    for (const expense of expenses) {
        totalAmount += expense.amount;
    }
    return totalAmount;
}
function getExpensesByCategory(category) {
    let filteredExpenses = [];
    for (const expense of expenses) {
        if (expense.category === category) {
            filteredExpenses.push(expense);
        }
    }
    return filteredExpenses;
}
export function filterExpensesByDate(range) {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    let filteredExpenses = [];
    if (range === "this-month") {
        filteredExpenses = expenses.filter((expense) => {
            const expenseDate = new Date(`${expense.date}T00:00:00`);
            return (expenseDate.getMonth() === currentMonth &&
                expenseDate.getFullYear() === currentYear);
        });
    }
    else if (range === "last-month") {
        filteredExpenses = expenses.filter((expense) => {
            const expenseDate = new Date(`${expense.date}T00:00:00`);
            return (expenseDate.getMonth() === previousMonth &&
                expenseDate.getFullYear() === previousYear);
        });
    }
    return filteredExpenses;
}
console.log(filterExpensesByDate("this-month"));
console.log(filterExpensesByDate("last-month"));
