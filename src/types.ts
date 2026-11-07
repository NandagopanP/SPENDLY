export type Category = "Food" | "Transport" | "Selfcare" | "Entertainment" | "Bills" | "Health" | "Education" | "Clothing" | "Other" ;

export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: Category;
  date: string;
}
