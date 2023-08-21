import axios from "axios";
import { ref } from "vue";

export default async function usePostParametrByPatient(newParamList) {
  console.log(newParamList);
  const isPostsLoading = ref(true);
  try {
    console.log(newParamList)
    axios.post('http://localhost:8081/insertParametrByPatient', {
      newParamList: newParamList,
    })
    .then(response => {
        console.log(response);
      })
    .catch(error => {
      console.log(error);
    });


  } catch (e) {
    alert('Error')
  } finally {
    isPostsLoading.value = false;
  }
  return {
    isPostsLoading
  };
}