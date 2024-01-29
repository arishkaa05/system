import { $host } from "../api";
import { Symptom } from './useSymptom';


export interface Parameter {
  id?: number;
  name_parametr: string;
  max_value_parametr: number;
  min_value_parametr: number;
  input_flag_parametr: boolean;
  createdAt?: string;
  updatedAt?: string;
  symptomList?: Symptom[];
  active?: boolean;
}

export interface Parameters {
  parametrs: Parameter[];
}

export const getParametr = async () => {
  try {
    const response = await $host.get("/parametr/all");
    return response.data;
  } catch (e) {
    return e;
  }
};

export const createParametr = async (newParametr: any) => {
  try {
    const response = await $host.post("/parametr/create", newParametr);
    return response;
  } catch (e) {
    return e;
    throw e;
  }
};

export default {
  getParametr,
  createParametr
};
