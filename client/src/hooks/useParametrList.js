import axios from "axios";

export const useParametrList = async () => {
  try {
    const { data } = await axios.get("http://localhost:8081/getParametrList");
        return data.data;
  } catch (e) {
    return e
  }
}