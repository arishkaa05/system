import axios from "axios";

export const usePostArea = async (newArea) => {
  try {
    const response = await axios.post('http://localhost:8081/insertArea', {
      newArea: newArea
    })
    return response.data;
  } catch (e) {
    return e
    throw e;
  }
}