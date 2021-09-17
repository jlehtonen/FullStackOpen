import { v1 as uuid } from "uuid";
import patientData from "../../data/patients";
import {
  NonSensitivePatientData,
  Patient,
  NewPatient,
  Entry,
  EntryWithoutId,
} from "../types";

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

const getById = (id: string): Patient | undefined => {
  const patient = patientData.find(patient => patient.id === id);
  return patient;
};

const addEntry = (id: string, entry: EntryWithoutId): Entry => {
  const patient = getById(id);
  if (!patient) {
    throw new Error("Patient doesn't exist");
  }

  const newEntry = {
    id: uuid(),
    ...entry,
  };

  patient.entries.push(newEntry);
  patientData.map(p => (p.id !== id ? p : patient));
  return newEntry;
};

export default {
  getEntries,
  addPatient,
  getById,
  addEntry,
};
