import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";
import { isNumber } from "./util";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  if (!isNumber(req.query.height) || !isNumber(req.query.weight)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  return res.json({ weight, height, bmi: calculateBmi(height, weight) });
});

app.post("/exercises", (req, res) => {
  const body = req.body as Record<string, unknown>;

  if (!body.daily_exercises || !body.target) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (
    !(body.daily_exercises instanceof Array) ||
    body.daily_exercises.some(elem => !isNumber(elem)) ||
    !isNumber(body.target)
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const hours = body.daily_exercises.map(Number);
  const target = Number(body.target);
  return res.json(calculateExercises(hours, target));
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
