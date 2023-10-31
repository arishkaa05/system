<template>
  <div>
    <button class="btn m-3" onclick="my_modal_1.showModal()">
      Добавить параметр
    </button>
    <dialog id="my_modal_1" class="modal modal-top-sm">
      <form method="dialog" class="modal-box">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <h2 class="text-2xl mb-3">Добавьте параметр</h2>
        <input
          type="text"
          placeholder="Введите название параметра"
          v-model="parametrName"
          class="input input-bordered w-full my-3 max-w-xs"
        />
        <div class="join">
          <div>
            <div>
              <input
                class="input input-bordered join-item input-sm"
                type="number"
                min="0"
                @blur="handleParametrMinInput"
                v-model.number="parametrMin"
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
                v-model.number="parametrMax"
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
            :disabled="!(parametrName.length > 0 && parametrMax && parametrMin)"
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
import { ref, getCurrentInstance } from "vue";
import { createParametr, Parameter } from "../hooks/useParametr";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

let parametrName = ref<String>("");
let parametrMin = ref<number | null>();
let parametrMax = ref<number | null>();
const instance = getCurrentInstance();
const saveChanges = async () => {
  if (parametrName.value.length > 0 && parametrMin.value && parametrMax.value) {
    const newParam: Parameter = {
      name_parametr: parametrName.value as string,
      min_value_parametr: parametrMin.value as number,
      max_value_parametr: parametrMax.value as number,
      input_flag_parametr: true,
    };
    const result = await createParametr(newParam);

    if (result.status === 200) {
      toast.success(`Параметр успешно создан c ID: ${result.data.parametrId}`, {
        autoClose: 3000,
      }); 
      instance.emit("parametrAdded", parametrName.value);
      const modal = document.getElementById("my_modal_1");
      modal.close();
    } else {
      toast.error(`Не удалось создать параметр`, {
        autoClose: 3000,
      }); 
    }
  } 
      parametrMin.value = null;
      parametrMax.value = null;
      parametrName.value = "";
};

const handleParametrMinInput = () => {
  if (parametrMin.value < 0) parametrMin.value = null;
  if (parametrMin.value >= parametrMax.value) {
    parametrMin.value = parametrMax.value - 1;
  }
};

const handleParametrMaxInput = () => {
  if (parametrMax.value < 0) parametrMax.value = null;
  if (parametrMax.value <= parametrMin.value) {
    parametrMax.value = parametrMin.value + 1;
  }
};
</script>

<style></style>
