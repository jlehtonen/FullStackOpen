import patientData from "../../data/patients.json";
import { NonSensitivePatientData } from "../types";

const getEntries = (): Array<NonSensitivePatientData> => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getEntries,
};
