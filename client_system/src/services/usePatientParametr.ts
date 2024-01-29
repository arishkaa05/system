import { $host } from '../api';

export interface PatientParametrs {
  parametrs: {
    fathername: string;
    lastname: string;
    name: string;
    parametrs: Parametr[];

  }
}
interface Parametr {
  id: number;
  name_parametr: string;
  patient_parametr: {
    createdAt: string;
    exactly_parametr: number;
    value_parametr: number;
  };
}

export const getPatientParametr = async (id: number) => {
  try {
    const response = await $host.get(`/patient_parametr/get_parametrs_by_id/${id}`);
    return response.data;
  } catch (e) {
    return e;
  }
}

export const createPatientParametr= async (unionData: any) => {
  try {
    const response = await $host.post(`/patient_parametr/create`, unionData);
    return response;
  } catch (e) {
    return e;
  }
}

export default {
  getPatientParametr,
  createPatientParametr
}