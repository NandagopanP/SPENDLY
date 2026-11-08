import {Expense, Category} from './types';

export const expenses: Expense[] = [
  {
    id: 1,
    description: "Groceries",
    amount: 50,
    category: "Food",
    date: "2023-09-01"
  },
  {
    id: 2,
    description: "Bus Ticket",
    amount: 2.5,
    category: "Transport",
    date: "2023-09-02"
  },
  {
    id: 3,
    description: "Movie Night",
    amount: 15,
    category: "Entertainment",
    date: "2023-09-03"
  }
];

export function calculateTotalExpense(): number{
  let totalAmount:number = 0;
  for(const expense of expenses){
    totalAmount += expense.amount;
  }
  return totalAmount;
}

function getExpensesByCategory(category:Category):Expense[]{
  let filteredExpenses:Expense[] = [];

  for(const expense of expenses){
    if(expense.category === category){
      filteredExpenses.push(expense);
    }
  }
  return filteredExpenses;
}

console.log(calculateTotalExpense());
console.log(getExpensesByCategory("Food"));
console.log(getExpensesByCategory("Transport"));