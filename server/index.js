const express = require("express");
const cors = require("cors");
const { bridgeRequests, validators, fundFlows } = require("./data");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// ==================== Stats ====================
app.get("/api/stats", (req, res) => {
  const completed = bridgeRequests.filter(r => r.status === "completed").length;
  const processing = bridgeRequests.filter(r => r.status === "processing").length;
  const pending = bridgeRequests.filter(r => r.status === "pending").length;
  const failed = bridgeRequests.filter(r => r.status === "failed").length;
  const activeValidators = validators.filter(v => v.status === "active").length;
  const totalStake = validators.reduce((sum, v) => sum + parseFloat(v.stakeAmount.replace(/,/g, "")), 0);
  const totalExpense = fundFlows.filter(f => f.type === "expense").reduce((sum, f) => sum + f.amount, 0);
  const totalIncome = fundFlows.filter(f => f.type === "income").reduce((sum, f) => sum + f.amount, 0);

  res.json({
    bridgeRequests: { total: bridgeRequests.length, completed, processing, pending, failed },
    validators: { total: validators.length, active: activeValidators, inactive: validators.length - activeValidators, totalStake: totalStake.toLocaleString() },
    funds: { totalIncome, totalExpense, remaining: totalIncome - totalExpense },
    avgUptime: (validators.reduce((sum, v) => sum + parseFloat(v.uptime), 0) / validators.length).toFixed(2)
  });
});

// ==================== Bridge Requests ====================
app.get("/api/bridge-requests", (req, res) => {
  const { status } = req.query;
  let result = bridgeRequests;
  if (status && status !== "all") {
    result = result.filter(r => r.status === status);
  }
  res.json(result);
});

app.get("/api/bridge-requests/:id", (req, res) => {
  const item = bridgeRequests.find(r => r.id === req.params.id);
  if (!item) return res.status(404).json({ error: "Bridge request not found" });
  res.json(item);
});

app.post("/api/bridge-requests", (req, res) => {
  const { sourceChain, targetChain, asset, amount, sender } = req.body;
  if (!sourceChain || !targetChain || !asset || !amount || !sender) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const id = "BR-" + String(bridgeRequests.length + 1).padStart(3, "0");
  const now = new Date();
  const timestamp = now.getFullYear() + "-" +
    String(now.getMonth() + 1).padStart(2, "0") + "-" +
    String(now.getDate()).padStart(2, "0") + " " +
    String(now.getHours()).padStart(2, "0") + ":" +
    String(now.getMinutes()).padStart(2, "0") + ":" +
    String(now.getSeconds()).padStart(2, "0");
  const newRequest = {
    id, sourceChain, targetChain, asset, amount, sender,
    status: "pending", txHash: null, timestamp
  };
  bridgeRequests.unshift(newRequest);
  res.status(201).json(newRequest);
});

app.patch("/api/bridge-requests/:id", (req, res) => {
  const item = bridgeRequests.find(r => r.id === req.params.id);
  if (!item) return res.status(404).json({ error: "Bridge request not found" });
  const { status, txHash } = req.body;
  if (status) item.status = status;
  if (txHash) item.txHash = txHash;
  res.json(item);
});

// ==================== Validators ====================
app.get("/api/validators", (req, res) => {
  const { status } = req.query;
  let result = validators;
  if (status && status !== "all") {
    result = result.filter(v => v.status === status);
  }
  res.json(result);
});

app.get("/api/validators/:id", (req, res) => {
  const item = validators.find(v => v.id === req.params.id);
  if (!item) return res.status(404).json({ error: "Validator not found" });
  res.json(item);
});

app.patch("/api/validators/:id", (req, res) => {
  const item = validators.find(v => v.id === req.params.id);
  if (!item) return res.status(404).json({ error: "Validator not found" });
  const { status, stakeAmount } = req.body;
  if (status) item.status = status;
  if (stakeAmount) item.stakeAmount = stakeAmount;
  res.json(item);
});

// ==================== Fund Flows ====================
app.get("/api/funds", (req, res) => {
  const { category } = req.query;
  let result = fundFlows;
  if (category && category !== "all") {
    result = result.filter(f => f.category === category);
  }
  res.json(result);
});

app.get("/api/funds/summary", (req, res) => {
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
  res.json({ categories, totalExpense, totalIncome, remaining: totalIncome - totalExpense });
});

// ==================== Health ====================
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Avalanche Bridge API", uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log("[Server] Avalanche Bridge API running on http://localhost:" + PORT);
});
