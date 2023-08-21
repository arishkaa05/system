import axios from "axios";
import { ref } from "vue";

export default async function usePostArea(newArea) {
  console.log(newArea);
  const isPostsLoading = ref(true);
  try {
    console.log(newArea)
    axios.post('http://localhost:8081/insertArea', {
      newArea: newArea,
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