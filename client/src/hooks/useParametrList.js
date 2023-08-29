import axios from "axios";
import { ref, onMounted } from "vue";

export function useParametrList() {
  let parametrList =  ref({});
  const isPostsLoading = ref(true);
  const fetching = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/getParametrList"
      );
      parametrList.value = response.data;
      console.log(parametrList)
    } catch (e) {
      console.log("Error");
    } finally {
      isPostsLoading.value = false;
    }
  };

  onMounted(fetching);
  return {
    parametrList
  };
}
