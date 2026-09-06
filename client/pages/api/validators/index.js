import { validators } from "../../../lib/data";

export default function handler(req, res) {
  const { status } = req.query;
  let result = validators;
  if (status && status !== "all") {
    result = result.filter(v => v.status === status);
  }
  res.status(200).json(result);
}
