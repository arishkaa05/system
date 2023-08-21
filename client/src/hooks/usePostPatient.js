import axios from "axios";
import { ref } from "vue";

export default async function usePostPatient(newPatient) {
  console.log(newPatient);
  const isPostsLoading = ref(true);
  try {
    console.log(newPatient)
    axios.post('http://localhost:8081/insertPatient', {
      newPatient: newPatient,
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