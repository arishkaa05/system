import axios from "axios";

export const useSympromsByParametrId = async (parametrId) => {
  try {
    const { data } = await axios.get(`http://localhost:8081/getSympromsByParametrId?parametrId=${parametrId}`);
        return data.data;
  } catch (e) {
    return e
  }
}