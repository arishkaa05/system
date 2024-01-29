<template>
  <div>
    <button
      class="text-gray-900 hover:text-violet-600 cursor-pointer"
      @click="isOpen = !isOpen"
    >
      Добавить симптом
    </button>
    <dialog id="my_modal_4" class="modal" :open="isOpen">
      <form method="dialog" class="modal-box">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          @click="isOpen = !isOpen"
        >
          ✕
        </button>
        <h2 class="text-2xl mb-3">Добавьте новый симптом</h2>
        <p class="text-base font-medium mb-2">
          Выберете параметр, к которому относится симптом
        </p>
        <div>
          <div style="display: flex">
            <input
              class="radio radio-xs radio-primary mt-1 mx-1"
              type="radio"
              :value="`${props.parametr.id}`"
              :id="props.parametr.id"
              :name="parametr.name_parametr"
              checked
              disabled
            />
            <label :for="props.parametr.id">{{ parametr.name_parametr }}</label>
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
        <div v-if="errorMSG">
          <div class="alert alert-error mt-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ errorMSG }}{{ errorMSG.value }}</span>
          </div>
        </div>
        <div class="modal-action">
          <button
            type="button"
            class="btn btn-primary"
            @click="saveChanges"
            :disabled="!(symptomName.length > 0 && symptomMax && symptomMin)"
          >
            Добавить
          </button>
          <button class="btn">Close</button>
        </div>
      </form>
      <form method="dialog" class="modal-backdrop">
        <button @click="isOpen = !isOpen">close</button>
      </form>
    </dialog>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import { createParametrSymprom } from "../services/useParametrSymptom";
import { createSymptom, Symptom } from "../services/useSymptom";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const symptomName = ref<String>("");
const symptomMin = ref<number | null>();
let isOpen = ref<Boolean>(false);
const symptomMax = ref<number | null>();
let errorMSG = ref<String>("");
const instance = getCurrentInstance();

const props = defineProps({
  parametr: {
    type: Object,
  },
});

const saveChanges = async () => {
  if (symptomName.value.length > 0 && symptomMin.value && symptomMax.value) {
    const newSymptom: Symptom = {
      name_symptom: symptomName.value as string,
      range_start_symptom: symptomMin.value,
      range_end_symptom: symptomMax.value,
      existance_symptom: true,
    };
    const result = await createSymptom(newSymptom);

    if (result.status === 200) {
      const resultParam = await createParametrSymprom({
        symptomId: result.data.symptomId,
        parametrId: props.parametr.id,
      });
      if (resultParam.status === 200) {
        isOpen.value = false;
        instance.emit("symptomAdded", props.parametr.id);
      } else
        (errorMSG.value = "Не удалось связать симптом с параметром"),
          result.data.message;

      const modal = document.getElementById("my_modal_4");
      modal.close();
    } else {
      (errorMSG.value = "Ошибка отправки запроса:"), result.data.message;
      setTimeout(() => {
        errorMSG.value = "";
      }, 10000);
    }
  } else {
    errorMSG.value = "Ошибка! Заполните все поля!";
    setTimeout(() => {
      errorMSG.value = "";
    }, 10000);
  }

  symptomName.value = "";
  symptomMin.value = null;
  symptomMax.value = null;
};
const handleParametrMinInput = () => {
  if (symptomMin.value < 0) symptomMin.value = null;
  if (symptomMin.value >= symptomMax.value) {
    symptomMin.value = symptomMax.value - 1;
  }
  if (symptomMin.value < props.parametr.min_value_parametr) {
    symptomMin.value = props.parametr.parametram.min_value_parametr
  }
};

const handleParametrMaxInput = () => {
  if (symptomMax.value < 0) symptomMax.value = null;
  if (symptomMax.value <= symptomMin.value) {
    symptomMax.value = symptomMin.value + 1;
  }
  if (symptomMax.value > props.parametr.max_value_parametr) {
    symptomMax.value = props.parametr.max_value_parametr
  }
};
</script>

<style>
  input[type="number"]::-webkit-inner-spin-button, 
  input[type="number"]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }

</style>

