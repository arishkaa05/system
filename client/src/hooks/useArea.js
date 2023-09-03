import axios from "axios";

export const useArea = async () => {
  try {
    const { data } = await axios.get("http://localhost:8081/getArea");
        return data.data;
  } catch (e) {
    console.log("Error");
  }
}