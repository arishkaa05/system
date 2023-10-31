<template>
  <div class="mt-3 mb-20 card bg-base-100 lg:card-side shadow-xl">
    <div class="card-body">
      <h2 class="text-2xl text-center font-medium mb-4">Результат</h2>
      <button class="btn btn-primary" @click="getResult()">
        Получить результат по пациенту
      </button>
      <div v-if="resultArea.areas">
        <h2 class="text-xl">{{ suitableAreas }}</h2>
        <button
          class="btn btn-primary mt-2"
          @click="moreInformation = !moreInformation"
        >
          Показать больше информации?
        </button>
        <div v-if="moreInformation" class="mt-2">
          <div v-for="area in resultArea.areas" :key="area.id">
            <div class="collapse collapse-arrow bg-base-200 mt-4">
              <input type="radio" name="my-accordion-1" checked="checked" />
              <div class="collapse-title text-xl font-medium">
                {{ area.answer }}
              </div>
              <div class="collapse-content">
                <p v-for="(item, index) in area.explanation" :key="index">
                  {{ item }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import result from "./../math";
import { computed, ref } from "vue";

const props = defineProps({
  selectedPatientId: {
    type: String,
  },
});
const selectOptions = [
  { value: "1", name: "точно" },
  { value: "2", name: "неточно" },
  { value: "3", name: "неизмеримо" },
];
const resultArea: any = ref({});
const moreInformation = ref(false);

const suitableAreas = computed(() => {
  let areas = resultArea._value.areas.filter((item) => item.status === "2");

  let name_area = areas
    .reduce(
      (acc: string, area: { name_area: string }) =>
        (acc += ` ${area.name_area}, `),
      ""
    )
    .trim();
  let explainArea =
    name_area !== "" ? `Области, которые подходят: ${name_area}` : "";
  areas = resultArea._value.areas.filter((item) => item.status === "6");
  name_area = areas
    .reduce(
      (acc: string, area: { name_area: string }) =>
        (acc += ` ${area.name_area}, `),
      ""
    )
    .trim();
  explainArea +=
    name_area !== ""
      ? `<br>Области, которые могут подходить, основываясь на опыте эксперта: ${name_area}`
      : "";
  return explainArea !== "" ? explainArea : "Ни одна из областей не подходит";
});

const getResult = async () => {
  moreInformation.value = false;
  const patientId = props.selectedPatientId;

  const response = await result(patientId);
  resultArea.value = { ...response };
};
</script>