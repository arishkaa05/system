import { $host } from "../api";

export interface Area {
  id?: number;
  name_area: string;
  formula_area: string;
  hash_area: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface Areas {
  areas: Area[];
}

export const getArea = async () => {
  try {
    const response = await $host.get("/area/all");
    return response.data;
  } catch (e) {
    return e;
  }
};

export const createArea = async (newArea: any) => {
  try {
    const response = await $host.post("/area/create", newArea);
    return response;
  } catch (e) {
      return e;
    throw e;
  }
};

export default {
  getArea,
  createArea,
};
