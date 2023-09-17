// import axios from "axios";
// import { ref, onMounted } from "vue";

// export function useAreaList() {
//   let areaList = ref({});
//   const isPostsLoading = ref(true);
//   const fetching = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8081/getArea"
//       );
//       areaList.value = response.data;
//     } catch (e) {
//       console.log("Error");
//     } finally {
//       isPostsLoading.value = false;
//     }
//   };

//   onMounted(fetching);
//   return {
//     areaList
//   };
// }
