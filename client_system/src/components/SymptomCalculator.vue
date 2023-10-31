<template>
  <div class="my-3">
    <div>
      <h2 class="text-2xl text-center font-medium mb-4">Введите формулу</h2>
      <div>
        <textarea
          class="textarea textarea-bordered w-full h-full mb-4"
          placeholder="Формула"
          v-model="formulaString"
        ></textarea>
      </div>
      <div class="grid grid-cols-3 gap-x-3 mb-5">
        <div class="col-span-2 content-between min-h-0">
          <div v-if="isParametrList" class="mb-7">
            <div
              v-for="(item, index) in parametrList.parametrs"
              :key="item.id_parametr"
              class="collapse bg-base-200 mb-3"
            >
              <input
                class="min-h-0 p-0"
                type="radio"
                :name="'my-accordion-' + index"
                :checked="index === activeIndex"
                @click="toggleCollapse(index)"
              />
              <div
                class="collapse-title text-xl tabular-nums font-medium tracking-tight text-gray-900 cursor-pointer min-h-0 py-2 px-5"
                @click="toggleCollapse(index)"
              >
                {{ item.name_parametr }}
              </div>
              <div
                class="collapse-content min-h-0"
                v-if="item.symptomList && item.symptomList.length > 0"
                v-show="index === activeIndex"
              >
                <ul class="list-disc ms-4">
                  <li v-for="symptom in item.symptomList" :key="symptom.id">
                    <a
                      class="text-gray-900 hover:text-violet-600 cursor-pointer"
                      @click="updateFormula(symptom)"
                    >
                      {{ symptom.name_symptom }}
                    </a>
                  </li>
                </ul>
              </div>
              <div
                class="collapse-content"
                v-if="item.symptomList && item.symptomList.length === 0"
                v-show="index === activeIndex"
              >
                <AddSymptomModalByParametr
                  @symptomAdded="handleSymptomAdded"
                  :parametr="item"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center">
          <div class="w-2/3 flex flex-wrap justify-center">
            <kbd
              v-for="operatop in operatorList"
              :key="operatop"
              class="kbd cursor-pointer hover:bg-violet-600 m-2"
              @click="updateFormula(operatop)"
              >{{ operatop.operatorName }}</kbd
            >
          </div>
          <div class="flex my-2">
            <kbd
              class="kbd cursor-pointer hover:bg-violet-600 mx-2"
              @click="cancel"
              >ОТМЕНИТЬ</kbd
            >
            <kbd class="kbd cursor-pointer hover:bg-violet-600" @click="clear"
              >СТЕРЕТЬ</kbd
            >
          </div>
          <div class="flex">
            <AddParametrModal @parametrAdded="handleParametrAdded" />
            <AddSymptomModal @symptomAdded="handleSymptomAdded" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts' >
import { computed, ref, reactive, onMounted, watch } from "vue";
import { Area, createArea } from "../hooks/useArea";
import { getParametr, Parameters } from "../hooks/useParametr";
import { getParametrSymprom } from "../hooks/useParametrSymptom";
import AddParametrModal from "./AddParametrModal.vue";
import AddSymptomModal from "./AddSymptomModal.vue";
import AddSymptomModalByParametr from "./AddSymptomModalByParametr.vue";
import { cnf } from "./../logic/cnf";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const props = defineProps({
  area: {
    type: String,
  },
});
const area = ref(props.area);
const formula = ref<string[]>([]);
const isParametrList = ref<Boolean>(false);
const formulaDB = ref([]);
const activeIndex = ref<number | null>(null);

const operatorList = ref([
  { operator: "&", operatorName: " И " },
  { operator: "+", operatorName: " ИЛИ " },
  { operator: "!", operatorName: "НЕ " },
  { operator: "(", operatorName: " (" },
  { operator: ")", operatorName: ") " },
]);

let parametrList = ref<Parameters>({
  parametrs: []
});

const fetchParamData = async () => {
  const response = await getParametr();
  parametrList.value = { ...response };
  if (!response.parametrs) {
      toast.error(`Не удалось получить список параметров`, {
        autoClose: 3000,
      });
    }
  else {
  getSymptoms();}
};

onMounted(() => {
  fetchParamData();
});

const formulaString = computed(() => formula.value.join(""));

const getSymptoms = () => {
  parametrList.value.parametrs.forEach(async (element: any) => {
    let symptoms = await getParametrSymprom(element.id);
    if (!symptoms.symptoms) {
      toast.error(`Не удалось получить симптомов`, {
        autoClose: 3000,
      });
    }
    element.symptomList = symptoms.symptoms;
    element.active = false;
  });
  isParametrList.value = true;
};

const toggleCollapse = (index: number) => {
  activeIndex.value = index;
};

const updateFormula = (value: {
  operator: string;
  operatorName: string;
  name_symptom: string;
  id: number;
}) => {
  if (value.operator) {
    formula.value.push(value.operatorName);
    formulaDB.value.push(value.operator);
  } else {
    formula.value.push(value.name_symptom);
    formulaDB.value.push("s" + value.id);
  }
};

const cancel = () => {
  formula.value.pop();
  formulaDB.value.pop();
};

const clear = () => {
  formula.value = [];
  formulaDB.value = [];
};

const handleParametrAdded = (parametr: number) => {
  fetchParamData();
};
const handleSymptomAdded = async (symptomId: number) => {
  let symptoms = await getParametrSymprom(symptomId);
  const index = parametrList.value.parametrs.findIndex(
    (item) => item.id === symptomId
  );
  parametrList.value.parametrs[index].symptomList = symptoms.symptoms;
  parametrList.value.parametrs[index].active = false;
  isParametrList.value = true;
};

const sendData = async () => {
  if (
    (formulaDB.value.join("").match(/\)/g) || []).length ===
      (formulaDB.value.join("").match(/\(/g) || []).length &&
    formulaDB.value.join("").length !== 0
  ) {
    const formulaCNF = cnf(formulaDB.value.join(""));
    const newArea: Area = {
      name_area: area.value,
      formula_area: formulaDB.value.join(""),
      hash_area: formulaCNF,
    };
    const result = await createArea(newArea);
    if (result.status === 200) {
      toast.success(`Направление успешно создано c ID: ${result.data.areaId}`, {
        autoClose: 3000,
      }); 
    } else {
      toast.error(`${result.response.data.message}`, {
        autoClose: 3000,
      }); 
    }
    area.value = "";
    formula.value = [];
    formulaDB.value = [];
  } else {
    toast.error("Ошибка! Проверьте скобки!", {
        autoClose: 3000,
      }); 
  }
};
  
</script>
