<template>
  <div>
    <button class="btn m-3" @click="openModal">Добавить симптом</button>
    <dialog id="my_modal_2" class="modal">
      <form method="dialog" class="modal-box">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <h2 class="text-2xl mb-3">Добавьте новый симптом</h2>
        <p class="text-base font-medium mb-2">
          Выберете параметр, к которому относится симптом
        </p>
        <div v-if="parametrList" class="h-48 overflow-auto">
          <div
            style="display: flex"
            v-for="parametr in parametrList.parametrs"
            :key="parametr.id"
          >
            <input
              class="radio radio-xs radio-primary mt-1 mx-1"
              type="radio"
              :value="`${parametr.id}`"
              :id="parametr.id_parametr"
              :name="parametr.name_parametr"
              v-model="selectParametr"
            />
            <label :for="parametr.id_parametr">{{
              parametr.name_parametr
            }}</label>
          </div>
        </div>
        <div>
          <input
            type="text"
            placeholder="Введите название симптома"
            v-model="symptomName"
            class="input input-bordered w-full my-3 max-w-xs"
          />
        </div>
        <div class="join">
          <div>
            <div>
              <input
                class="input input-bordered join-item input-sm"
                v-model.number="symptomMin"
                type="number"
                min="0"
                @blur="handleParametrMinInput"
                placeholder="минимум"
              />
            </div>
          </div>
          <div>
            <div>
              <input
                class="input input-bordered join-item input-sm"
                type="number"
                min="0"
                @blur="handleParametrMaxInput"
                v-model.number="symptomMax"
                placeholder="максимум"
              />
            </div>
          </div>
        </div>
        <div class="modal-action">
          <button
            type="button"
            class="btn btn-primary"
            @click="saveChanges"
            :disabled="
              !(
                symptomName.length > 0 &&
                symptomMax &&
                symptomMin &&
                selectParametr !== -1
              )
            "
          >
            Добавить
          </button>
          <button class="btn">Close</button>
        </div>
      </form>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, onUnmounted, getCurrentInstance } from "vue";
import { createSymptom } from "../hooks/useSymptom";
import { getParametr, Parameters } from "../hooks/useParametr";
import { createParametrSymprom } from "../hooks/useParametrSymptom";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

let parametrList = ref<Parameters>({
  parametrs: []
});
const selectParametr = ref<number>(-1);
const symptomName = ref<String>("");
const symptomMin = ref<number | null>();
const symptomMax = ref<number | null>();
const instance = getCurrentInstance();

const fetchParamData = async () => {
  const response = await getParametr();
  parametrList.value = { ...response };
};
const saveChanges = async () => {
  if (
    symptomName.value.length > 0 &&
    symptomMin.value &&
    symptomMax.value &&
    selectParametr.value >= 0
  ) {
    const newSymptom = {
      name_symptom: symptomName.value,
      range_start_symptom: symptomMin.value,
      range_end_symptom: symptomMax.value,
      existance_symptom: true,
    };
    const result = await createSymptom(newSymptom);
    if (result.status === 200) {
      const resultParam = await createParametrSymprom({
        symptomId: result.data.symptomId,
        parametrId: selectParametr.value,
      });
      if (resultParam.status === 200) {
        instance.emit("symptomAdded", selectParametr.value);
      } else

        toast.error(`Не удалось создать связь с параметром`, {
          autoClose: 3000,
        }); 

      const modal = document.getElementById("my_modal_2");
      modal.close();
    } else {

      toast.error(`Не удалось создать симптом`, {
          autoClose: 3000,
        }); 
    }
  }

  selectParametr.value = -1;
  symptomName.value = "";
  symptomMin.value = null;
  symptomMax.value = null;
};
const handleParametrMinInput = () => {
  if (symptomMin.value < 0) symptomMin.value = null;
  if (symptomMin.value >= symptomMax.value) {
    symptomMin.value = symptomMax.value - 1;
  }
};

const handleParametrMaxInput = () => {
  if (symptomMax.value < 0) symptomMax.value = null;
  if (symptomMax.value <= symptomMin.value) {
    symptomMax.value = symptomMin.value + 1;
  }
};

const openModal = async () => {
  const modal = document.getElementById("my_modal_2");
  modal.showModal();
  // Инициализация данных при открытии модального окна
  const response = await getParametr();
  parametrList.value = { ...response };
};

onMounted(() => {
  fetchParamData();
});
</script>

<style></style>
