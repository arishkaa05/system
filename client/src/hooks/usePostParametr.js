import axios from 'axios';

export const usePostParametr = async (newParam) => {
  try {
    const response = await axios.post('http://localhost:8081/insertParametr', {
      newParam: newParam
    })
    return response.data;
  } catch (e) {
    return e;
    throw e;
  }
}