<template>
  <div
    class="mt-3 mb-20 card bg-base-100 lg:card-side shadow-xl"
    v-if="paramsList.parametrs"
  >
    <div class="card-body">
      <h2 class="text-2xl text-center font-medium mb-4">Заполненные данные</h2>
      <h2 v-if="paramsList.parametrs" class="font-bold text-lg">
        {{ paramsList.parametrs.name }}
        {{ paramsList.parametrs.lastname }}
        {{ paramsList.parametrs.fathername }}
      </h2> 
       <div v-if="groupedDataArray">
        <div v-for="item in groupedDataArray" :key="item.createdAt">
          <div class="flex justify-end">
            {{ item.createdAt }}
          </div>
          <div v-for="parametr in item.params" :key="parametr.id">
            <div class="flex mb-3">
              <span class="font-medium me-3 w-48">{{
                parametr.name_parametr
              }}</span>
              <input
                type="text"
                class="me-3 input input-bordered input-sm w-24 max-w-xs text-base"
                v-model="parametr.patient_parametr.value_parametr"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      <div class="card-actions justify-end">
        <button class="btn btn-primary" @click="sendData()">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref, computed, onMounted } from "vue";
import { getPatientParametr, PatientParametrs } from "../services/usePatientParametr";

const props = defineProps({
  selectedPatientId: {
    type: Number,
  },
});
let paramsList = ref<PatientParametrs>({
  parametrs: {
    fathername: "",
    lastname: "",
    name: "",
    parametrs: []
  }
});
let groupedDataArray = ref(null);

const groupObjectsByDate = (data: any[]) => {
  const result = [];
  for (const item of data) {
    const createdAt = item.patient_parametr.createdAt.split("T")[0];
    const existingItem = result.find((i) => i.createdAt === createdAt);
    if (existingItem) {
      existingItem.params.push(item);
    } else {
      const newItem = {
        createdAt: createdAt,
        params: [item],
      };
      result.push(newItem);
    }
  }
  return result.sort();
};
const formattedDate = computed(() => (rawDate) => {
  const date = new Date(rawDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
});

const getData = async () => {
  const response = await getPatientParametr(props.selectedPatientId);
  paramsList.value = { ...response }; 
  console.log(paramsList.value)
  groupedDataArray = groupObjectsByDate(paramsList.value.parametrs.parametrs);
  console.log(groupedDataArray);
};

onMounted(() => {
  getData();
});
</script>

<style>
</style>