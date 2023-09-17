import axios from "axios";

export const usePatientList = async () => {
  try {
    const { data } = await axios.get("http://localhost:8081/getPatientList");
        return data.data;
  } catch (e) {
    console.log("Error");
  }
}