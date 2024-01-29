import { $host } from "../api";

export interface Symptom {
  id?: number;
  name_symptom: string;
  range_start_symptom: number;
  range_end_symptom: number;
  existance_symptom: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Symptoms {
  symptoms: Symptom[];
}

export const getSymptom = async () => {
  try {
    const response = await $host.get("/symptom/all");
    return response.data;
  } catch (e) {
    return e;
  }
};

export const createSymptom = async (newSymptom: any) => {
  try {
    const response = await $host.post("/symptom/create", newSymptom);
    return response;
  } catch (e) {
    return e;
    throw e;
  }
};

export default {
  getSymptom,
  createSymptom,
};
