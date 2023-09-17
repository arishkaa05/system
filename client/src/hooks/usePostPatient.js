import axios from "axios";

export const usePostPatient = async (newPatient) => {
  try {
    const response = await axios.post('http://localhost:8081/insertPatient', {
      newPatient: newPatient
    })
    return response.data;
  } catch (e) {
    console.error('Error:', e);
    throw e;
  }
}