import axios from "axios";
import { ref } from "vue";

export async function useSympromsByParametrId(parametrId) {
  const symptomList = ref([]);
    try {
      const response = await axios.get(
        `http://localhost:8081/getSympromsByParametrId?parametrId=${parametrId}`
      );
      symptomList.value = response.data;
    } catch (e) {
      console.log("Error");
    } finally {
      console.log(symptomList.value)
    }


  return {
    symptomList
  };
}
