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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
