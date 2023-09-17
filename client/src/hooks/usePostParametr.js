import axios from 'axios';

export const usePostParametr = async (newParam) => {
  try {
    const response = await axios.post('http://localhost:8081/insertParametr', {
      newParam: newParam
    })
    return response.data;
  } catch (e) {
    console.error('Error:', e); // Вывести ошибку в консоль
    throw e;
  }
}