import axios from "axios";

export const usePostParametrByPatient = async (newParamList) => {
  try {
    const response = await axios.post('http://localhost:8081/insertParametrByPatient', {
      newParamList: newParamList
    })
    return response.data; 
  } catch (e) {
    return e
    throw e;
  }
}