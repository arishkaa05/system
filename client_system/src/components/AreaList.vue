<template>
  <div>
    <div>
      <div
        class="card bg-base-100 lg:card-side shadow-xl"
        v-if="selectedArea !== 'newArea'"
      >
        <div class="card-body">
          <h1 class="text-4xl font-medium tracking-tight text-gray-900 mb-7">
            Выберите направление
          </h1>
          <div v-if="areaList">
            <select
              class="select select-bordered w-full max-w-xs"
              v-model="selectedArea"
            >
              <option disabled selected>Выберите направление</option>
              <option
                v-for="area in areaList.areas"
                :key="area.id"
                :value="area"
              >
                {{ area.name_area }}
              </option>
              <option value="newArea">Новое направление</option>
            </select>
            <div class="h-11 my-3">
              <h2
                v-if="
                  selectedArea !== 'Выберете направление' &&
                  selectedArea !== 'newArea'
                "
              >
                Для направления "{{ selectedArea.name_area }}" характерны:
                <span class="text-lg">{{ transformedFormula }}</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <AddArea v-if="selectedArea === 'newArea'" />
    </div>
  </div>
</template>


<script lang='ts' setup>
import { computed, reactive, ref, onMounted } from "vue";
import AddArea from "./AddArea.vue";
import { getArea, Areas, Area } from "../hooks/useArea";
import { getSymptom, Symptoms } from "../hooks/useSymptom";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

let areaList = ref<Areas>({ areas: [] });
let symptomList = ref<Symptoms>({ symptoms: [] });
let selectedArea = ref<Area | string>("Выберете направление");
const transformedFormula = computed(() => {
  let formula: string;
  if (typeof selectedArea.value !== "string")
    formula = selectedArea.value.formula_area;
  let newFormula = formula;
  for (const symptom of symptomList.value.symptoms) {
    const regex = new RegExp(`s${symptom.id}\\b`, "g");
    newFormula = newFormula.replace(regex, symptom.name_symptom);
  }
  return newFormula
    .replace(/&/g, " И ")
    .replace(/\+/g, " ИЛИ ")
    .replace(/!/g, " НЕ ");
});
const fetchAreaData = async () => {
  const response = await getArea();
  areaList.value = { ...response };
  if (!response.areas) {
    toast.error(`Не удалось получить список направлений`, {
      autoClose: 3000,
    });
  } else {
    filterAreas();
    const response2 = await getSymptom();
    symptomList.value = { ...response2 };
    if (!response2.symptoms) {
      toast.error(`Не удалось получить список симптомов`, {
        autoClose: 3000,
      });
    }
  }
};
const filterAreas = () => {
  const areaMap = new Map();
  areaList.value.areas.forEach((area) => {
    if (
      !areaMap.has(area.name_area) ||
      area.id > areaMap.get(area.name_area).id
    ) {
      areaMap.set(area.name_area, area);
    }
  });
  areaList.value.areas = Array.from(areaMap.values());
};

onMounted(() => {
  fetchAreaData();
});
</script>

<style></style>
