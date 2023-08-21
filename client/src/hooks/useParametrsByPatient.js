import axios from "axios";
import { ref } from "vue";

export async function useParametrsByPatient(patientId) {
  console.log(patientId)
  const paramsList = ref([]);
    try {
      const response = await axios.get(
        `http://localhost:8081/getParametrsByPatient?patientId=${patientId}`
      );
      paramsList.value = response.data;
    } catch (e) {
      console.log("Error");
    } finally {
      console.log(paramsList.value)
    }


  return {
    paramsList
  };
}
