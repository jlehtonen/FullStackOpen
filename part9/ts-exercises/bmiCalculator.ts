import { isNumber } from "./util";

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);
  if (bmi < 16) {
    return "Underweight: severe thinness (unhealthy weight)";
  }

  if (bmi < 17) {
    return "Underweight: moderate thinness (unhealthy weight)";
  }

  if (bmi < 18.5) {
    return "Underweight: mild thinness (unhealthy weight)";
  }

  if (bmi < 25) {
    return "Normal (healthy weight)";
  }

  if (bmi < 30) {
    return "Overweight: pre-obese (unhealthy weight)";
  }

  if (bmi < 35) {
    return "Obese: class I (unhealthy weight)";
  }

  if (bmi < 40) {
    return "Obese: class II (unhealthy weight)";
  }

  return "Obese: class III (unhealthy weight)";
};

interface BmiCalculatorInput {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): BmiCalculatorInput => {
  if (args.length !== 4) {
    throw new Error(`Exactly 4 arguments required; found ${args.length}`);
  }

  if (isNumber(args[2]) && isNumber(args[3])) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers");
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  if (e instanceof Error) {
    console.log(`Error, something bad happened, message: ${e.message}`);
  }
}

export default calculateBmi;
