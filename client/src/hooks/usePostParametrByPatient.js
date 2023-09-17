import axios from "axios";

export const usePostParametrByPatient = async (newParamList) => {
  try {
    const response = await axios.post('http://localhost:8081/insertParametrByPatient', {
      newParamList: newParamList
    })
    console.log(response)
    return response.data; 
  } catch (e) {
    console.error('Error:', e);
    throw e;
  }
}