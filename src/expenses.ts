import { Expense, Category } from "./types";

export const expenses: Expense[] = [
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
    date: "2025-09-03",
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
    id: 6,
    description: "Travel",
    amount: 1000,
    category: "Transport",
    date: "2026-10-03",
  },
  {
    id: 7,
    description: "Noodles",
    amount: 1000,
    category: "Food",
    date: "2026-10-03",
  },
];

export function calculateTotalExpense(): number {
  let totalAmount: number = 0;
  for (const expense of expenses) {
    totalAmount += expense.amount;
  }
  return totalAmount;
}

function getExpensesByCategory(category: Category): Expense[] {
  let filteredExpenses: Expense[] = [];

  for (const expense of expenses) {
    if (expense.category === category) {
      filteredExpenses.push(expense);
    }
  }
  return filteredExpenses;
}

export function filterExpensesByDate(range: string): Expense[] {
  const today: Date = new Date();

  const currentMonth: number = today.getMonth();
  const currentYear: number = today.getFullYear();
  const previousMonth: number = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousYear: number =
    currentMonth === 0 ? currentYear - 1 : currentYear;

  let filteredExpenses: Expense[] = [];

  if (range === "this-month") {
    filteredExpenses = expenses.filter((expense) => {
      const expenseDate: Date = new Date(`${expense.date}T00:00:00`);

      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    });
  } else if (range === "last-month") {
    filteredExpenses = expenses.filter((expense) => {
      const expenseDate: Date = new Date(`${expense.date}T00:00:00`);

      return (
        expenseDate.getMonth() === previousMonth &&
        expenseDate.getFullYear() === previousYear
      );
    });
  } else if (range === "this-year") {
    filteredExpenses = expenses.filter((expense) => {
      const expenseDate: Date = new Date(`${expense.date}T00:00:00`);

      return expenseDate.getFullYear() === currentYear;
    });
  } else if (range === "last-year") {
    filteredExpenses = expenses.filter((expense) => {
      const expenseDate: Date = new Date(`${expense.date}T00:00:00`);

      return expenseDate.getFullYear() === currentYear - 1;
    });
  } else if (range === "all-time") {
    filteredExpenses = expenses;
  }

  return filteredExpenses;
}

export function calculateCategoryTotals(
  filteredExpenses: Expense[],
): Record<string, number> {
  const categoryTotals: Record<string, number> = {};

  for (const expense of filteredExpenses) {
    categoryTotals[expense.category] =
      (categoryTotals[expense.category] ?? 0) + expense.amount;
  }

  return categoryTotals;
}
