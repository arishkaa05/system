import axios from "axios";

export const usePostArea = async (newArea) => {
  try {
    const response = await axios.post('http://localhost:8081/insertArea', {
      newArea: newArea
    })
    console.log(response)
    return response.data;
  } catch (e) {
    console.error('Error:', e);
    throw e;
  }
}