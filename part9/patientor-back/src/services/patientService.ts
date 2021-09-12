import { v1 as uuid } from "uuid";
import patientData from "../../data/patients.json";
import { NonSensitivePatientData, Patient, NewPatient } from "../types";

const getEntries = (): Array<NonSensitivePatientData> => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };

  patientData.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  addPatient,
};
