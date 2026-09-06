import { bridgeRequests } from "../../../lib/data";

let nextId = bridgeRequests.length + 1;

export default function handler(req, res) {
  const { status } = req.query;

  if (req.method === "POST") {
    const { sourceChain, targetChain, asset, amount, sender } = req.body;
    if (!sourceChain || !targetChain || !asset || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newRequest = {
      id: "BR-" + String(nextId++).padStart(3, "0"),
      sourceChain,
      targetChain,
      asset,
      amount,
      sender: sender || "0x0000...0000",
      status: "pending",
      txHash: null,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19)
    };
    bridgeRequests.push(newRequest);
    return res.status(201).json(newRequest);
  }

  let result = bridgeRequests;
  if (status && status !== "all") {
    result = result.filter(r => r.status === status);
  }
  res.status(200).json(result);
}
