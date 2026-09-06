import { bridgeRequests, validators, fundFlows } from "../../lib/data";

export default function handler(req, res) {
  const completed = bridgeRequests.filter(r => r.status === "completed").length;
  const processing = bridgeRequests.filter(r => r.status === "processing").length;
  const pending = bridgeRequests.filter(r => r.status === "pending").length;
  const failed = bridgeRequests.filter(r => r.status === "failed").length;
  const activeValidators = validators.filter(v => v.status === "active").length;
  const totalStake = validators.reduce((sum, v) => sum + parseFloat(v.stakeAmount.replace(/,/g, "")), 0);
  const totalExpense = fundFlows.filter(f => f.type === "expense").reduce((sum, f) => sum + f.amount, 0);
  const totalIncome = fundFlows.filter(f => f.type === "income").reduce((sum, f) => sum + f.amount, 0);

  res.status(200).json({
    bridgeRequests: { total: bridgeRequests.length, completed, processing, pending, failed },
    validators: { total: validators.length, active: activeValidators, inactive: validators.length - activeValidators, totalStake: totalStake.toLocaleString() },
    funds: { totalIncome, totalExpense, remaining: totalIncome - totalExpense },
    avgUptime: (validators.reduce((sum, v) => sum + parseFloat(v.uptime), 0) / validators.length).toFixed(2)
  });
}
