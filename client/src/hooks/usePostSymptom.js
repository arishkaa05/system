import axios from "axios";

export const usePostSymptom = async (newSymptom) => {
  try {
    const response = await axios.post('http://localhost:8081/insertSymptom', {
      newSymptom: newSymptom
    })
    return response.data;
  } catch (e) {
    return e
    throw e; 
  }
}