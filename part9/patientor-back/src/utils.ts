import { NewPatient, Gender } from "./types";

type Fields = {
  name: unknown;
  ssn: unknown;
  dateOfBirth: unknown;
  occupation: unknown;
  gender: unknown;
};

const isString = (value: unknown): value is string => {
  return typeof value === "string" || value instanceof String;
};

const isDate = (value: string): boolean => {
  return Boolean(Date.parse(value));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (value: any): value is Gender => {
  return Object.values(Gender).includes(value);
};

const parseString =
  (valueName: string) =>
  (value: unknown): string => {
    if (!value || !isString(value)) {
      throw new Error(`Incorrect or missing ${valueName}`);
    }

    return value;
  };

const parseName = parseString("name");
const parseSsn = parseString("ssn");
const parseOccupation = parseString("occupation");

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect or missing date of birth");
  }

  return dateOfBirth;
};

const parseGender = (gender: unknown): string => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }

  return gender;
};

export const toNewPatientEntry = ({
  name,
  ssn,
  dateOfBirth,
  occupation,
  gender,
}: Fields): NewPatient => {
  const newEntry = {
    name: parseName(name),
    ssn: parseSsn(ssn),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    occupation: parseOccupation(occupation),
    gender: parseGender(gender),
  };

  return newEntry;
};
