import { bridgeRequests } from "../../../lib/data";

export default function handler(req, res) {
  const { status } = req.query;
  let result = bridgeRequests;
  if (status && status !== "all") {
    result = result.filter(r => r.status === status);
  }
  res.status(200).json(result);
}
