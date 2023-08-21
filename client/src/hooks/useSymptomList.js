import axios from "axios";
import { ref, onMounted } from "vue";

export function useSymptomList() {
  const symptomList = ref([]);
  const isPostsLoading = ref(true);
  const fetching = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/getSymptomList"
      );
      symptomList.value = response.data;
      console.log(symptomList)
    } catch (e) {
      console.log("Error");
    } finally {
      isPostsLoading.value = false;
    }
  };

  onMounted(fetching);
  return {
    symptomList
  };
}
