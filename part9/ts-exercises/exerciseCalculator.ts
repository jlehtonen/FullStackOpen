import { isNumber } from "./util";

type Rating = 1 | 2 | 3;

type RatingDescription = "bad" | "not too bad but could be better" | "perfect";

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: RatingDescription;
  target: number;
  average: number;
}

const calculateExercises = (hours: Array<number>, target: number): ExerciseResult => {
  const average = hours.reduce((sum, h) => sum + h, 0) / hours.length;
  let rating: Rating;
  let ratingDescription: RatingDescription;

  if (average >= target) {
    rating = 3;
    ratingDescription = "perfect";
  } else if (average >= 0.75 * target) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "bad";
  }

  return {
    periodLength: hours.length,
    trainingDays: hours.filter(h => h > 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

interface ExerciseCalculatorInput {
  target: number;
  hours: Array<number>;
}

const parseArguments = (args: Array<string>): ExerciseCalculatorInput => {
  if (args.length < 4) {
    throw new Error(`At least 4 arguments required; found ${args.length}`);
  }

  if (args.slice(2).every(isNumber)) {
    return {
      target: Number(args[2]),
      hours: args.slice(3).map(Number),
    };
  } else {
    throw new Error("Provided values were not numbers");
  }
};

try {
  const { target, hours } = parseArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (e) {
  console.log(`Error, something bad happened, message: ${e.message}`);
}
