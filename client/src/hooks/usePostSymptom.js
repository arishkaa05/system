import axios from "axios";
import { ref } from "vue";

export default async function usePostSymptom(newSymptom) {
  console.log(newSymptom);
  try {
    console.log(newSymptom)
    axios.post('http://localhost:8081/insertSymptom', {
      newSymptom: newSymptom,
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
  }
  return {
  };
}