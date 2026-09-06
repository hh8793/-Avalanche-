import { validators } from "../../../lib/data";

export default function handler(req, res) {
  const item = validators.find(v => v.id === req.query.id);
  if (!item) return res.status(404).json({ error: "Validator not found" });

  if (req.method === "PATCH") {
    const { status, stakeAmount } = req.body;
    if (status) item.status = status;
    if (stakeAmount) item.stakeAmount = stakeAmount;
    return res.status(200).json(item);
  }

  res.status(200).json(item);
}
