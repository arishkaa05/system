import axios from "axios";

export const useSymptomList = async () => {
  try {
    const { data } = await axios.get("http://localhost:8081/getSymptomList");
        return data.data;
  } catch (e) {
    return e
  }
}