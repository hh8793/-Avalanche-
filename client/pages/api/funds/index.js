import { fundFlows } from "../../../lib/data";

export default function handler(req, res) {
  const { category } = req.query;
  let result = fundFlows;
  if (category && category !== "all") {
    result = result.filter(f => f.category === category);
  }
  res.status(200).json(result);
}
