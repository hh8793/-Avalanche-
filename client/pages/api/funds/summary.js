import { fundFlows } from "../../../lib/data";

export default function handler(req, res) {
  const categories = {};
  fundFlows.filter(f => f.type === "expense").forEach(f => {
    if (!categories[f.category]) {
      categories[f.category] = { label: f.categoryLabel, amount: 0, items: 0 };
    }
    categories[f.category].amount += f.amount;
    categories[f.category].items += 1;
  });
  const totalExpense = fundFlows.filter(f => f.type === "expense").reduce((sum, f) => sum + f.amount, 0);
  const totalIncome = fundFlows.filter(f => f.type === "income").reduce((sum, f) => sum + f.amount, 0);
  res.status(200).json({ categories, totalExpense, totalIncome, remaining: totalIncome - totalExpense });
}
