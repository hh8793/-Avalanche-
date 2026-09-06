import { bridgeRequests } from "../../../lib/data";

export default function handler(req, res) {
  const item = bridgeRequests.find(r => r.id === req.query.id);
  if (!item) return res.status(404).json({ error: "Bridge request not found" });

  if (req.method === "PATCH") {
    const { status, txHash } = req.body;
    if (status) item.status = status;
    if (txHash) item.txHash = txHash;
    return res.status(200).json(item);
  }

  res.status(200).json(item);
}
