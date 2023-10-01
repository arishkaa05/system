import axios from "axios";

export const useParametrsByPatient = async (patientId) => {
  try {
    const { data } = await axios.get(
      `http://localhost:8081/getParametrsByPatient?patientId=${patientId}`
    );
        return data.data;
  } catch (e) {
    return e
  }
}
