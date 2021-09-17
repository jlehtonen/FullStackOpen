import {
  NewPatient,
  Gender,
  EntryWithoutId,
  NewBaseEntry,
  HealthCheckRating,
  Discharge,
  SickLeave,
} from "./types";

type Fields = {
  name: unknown;
  ssn: unknown;
  dateOfBirth: unknown;
  occupation: unknown;
  gender: unknown;
};

interface BaseEntryFields {
  type: unknown;
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes: unknown;
}

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

const isStringArray = (value: unknown): value is string[] => {
  return Array.isArray(value) && value.every(isString);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (value: any): value is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(value);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (value: any): value is Discharge => {
  return (
    Object.keys(value).length === 2 &&
    !!value.date &&
    isString(value.date) &&
    isDate(value.date) &&
    !!value.criteria &&
    isString(value.criteria)
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (value: any): value is SickLeave => {
  return (
    !!value.startDate &&
    isString(value.startDate) &&
    isDate(value.startDate) &&
    !!value.endDate &&
    isString(value.endDate) &&
    isDate(value.endDate)
  );
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

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date");
  }

  return date;
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
    dateOfBirth: parseDate(dateOfBirth),
    occupation: parseOccupation(occupation),
    gender: parseGender(gender),
    entries: [],
  };

  return newEntry;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): string[] | undefined => {
  if (!diagnosisCodes) {
    return undefined;
  }

  if (!isStringArray(diagnosisCodes)) {
    throw new Error("Invalid diagnosisCodes");
  }

  return diagnosisCodes;
};

const parseBaseEntry = ({
  type,
  description,
  date,
  specialist,
  diagnosisCodes,
}: BaseEntryFields): NewBaseEntry => {
  const requiredFields = {
    type: parseString("type")(type),
    description: parseString("description")(description),
    date: parseDate(date),
    specialist: parseString("specialist")(specialist),
  };
  const parsedCodes = parseDiagnosisCodes(diagnosisCodes);
  if (parsedCodes) {
    return { ...requiredFields, diagnosisCodes: parsedCodes };
  }

  return requiredFields;
};

const parseHealthCheckFields = ({
  healthCheckRating,
}: {
  healthCheckRating: unknown;
}): { healthCheckRating: HealthCheckRating } => {
  if (!isHealthCheckRating(healthCheckRating)) {
    throw new Error("Invalid healthCheckRating");
  }

  return { healthCheckRating };
};

const parseHospitalFields = ({
  discharge,
}: {
  discharge: unknown;
}): { discharge: Discharge } => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error("Incorrect or missing discharge");
  }

  return { discharge };
};

const parseOccupationalHealthcareFields = ({
  employerName,
  sickLeave,
}: {
  employerName: unknown;
  sickLeave: unknown;
}) => {
  const fields: { employerName: string; sickLeave?: SickLeave } = {
    employerName: parseString("employerName")(employerName),
  };
  if (sickLeave) {
    if (!isSickLeave(sickLeave)) {
      throw new Error("Incorrect sickLeave");
    }
    fields.sickLeave = sickLeave;
  }

  return fields;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (body: any): EntryWithoutId => {
  const baseEntry = parseBaseEntry(body);

  switch (baseEntry.type) {
    case "HealthCheck":
      return { ...baseEntry, type: "HealthCheck", ...parseHealthCheckFields(body) };
    case "Hospital":
      return { ...baseEntry, type: "Hospital", ...parseHospitalFields(body) };
    case "OccupationalHealthcare":
      return {
        ...baseEntry,
        type: "OccupationalHealthcare",
        ...parseOccupationalHealthcareFields(body),
      };
    default:
      throw new Error("Invalid entry type");
  }
};
