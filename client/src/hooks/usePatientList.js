import axios from "axios";
import { ref, onMounted } from "vue";

export function usePatientList() {
  console.log(11)
  const patientList = ref([]);
  const isPostsLoading = ref(true);
  const fetching = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/getPatientList"
      );
      patientList.value = response.data;
      console.log(patientList)
    } catch (e) {
      console.log("Error");
    } finally {
      isPostsLoading.value = false;
    }
  };

  onMounted(fetching);
  return {
    patientList
  };
}
