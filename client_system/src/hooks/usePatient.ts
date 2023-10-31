import { $host } from "../api";


export interface Patient {
  id?: number;
  uq_patient: string;
  name: string;
  lastname: string;
  fathername?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Patients {
  patients: Patient[];
}


export const getPatient = async () => {
  try {
    const response = await $host.get("/patient/all");
    return response.data;
  } catch (e) {
    return e;
  }
};

export const createPatient = async (newPatient: any) => {
  try {
    const response = await $host.post("/patient/create", newPatient);
    return response;
  } catch (e) {
    return e;
    throw e;
  }
};

export default {
  getPatient,
  createPatient,
};
