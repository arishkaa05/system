import { $host } from '../api';

export const getParametrSymprom = async (id: number) => {
  try {
    const response = await $host.get(`/parametr_symptop/get_symptoms_by_id/${id}`);
    return response.data;
  } catch (e) {
    return e;
  }
}

export const createParametrSymprom = async (unionId: any) => {
  try {
    const response = await $host.post(`/parametr_symptop/create`, unionId);
    return response;
  } catch (e) {
    return e;
    return e;
  }
}

export default {
  getParametrSymprom,
  createParametrSymprom
}