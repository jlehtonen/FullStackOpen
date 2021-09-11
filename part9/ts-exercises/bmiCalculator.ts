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

console.log(calculateBmi(180, 74));
