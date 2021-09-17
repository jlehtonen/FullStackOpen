import express from "express";
import patientService from "../services/patientService";
import { toNewPatientEntry, toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientService.getEntries());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const newPatient = patientService.addPatient(newPatientEntry);
    res.json(newPatient);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient = patientService.getById(id);
  if (!patient) {
    return res.status(404).end();
  }

  return res.json(patient);
});

router.post("/:id/entries", (req, res) => {
  const id = req.params.id;
  if (!patientService.getById(id)) {
    return res.status(404).end();
  }

  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(id, newEntry);
    return res.json(addedEntry);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
});

export default router;
