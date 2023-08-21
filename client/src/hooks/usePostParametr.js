import axios from "axios";
import { ref } from "vue";

export default async function usePostParametr(newParam) {
  console.log(newParam);
  const isPostsLoading = ref(true);
  try {
    console.log(newParam)
    axios.post('http://localhost:8081/insertParametr', {
      newParam: newParam,
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