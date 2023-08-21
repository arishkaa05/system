<template>
  <div>
    <button class="btn m-3" onclick="my_modal_2.showModal()">Добавить симптом</button>
    <dialog id="my_modal_2" class="modal">
      <form method="dialog" class="modal-box">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        <h2 class="text-2xl mb-3">Добавьте новый симптом</h2>
        <p>Выберете параметр, к которому относится симптом</p>
        <div style="display: flex;" v-for="parametr in parametrList.data" :key="parametr.id_parametr">
          <input type="radio" :value="`${parametr.id_parametr}`" :id="parametr.id_parametr" :name="parametr.name_parametr" v-model="selectParametr" />
          <label :for="parametr.id_parametr">{{ parametr.name_parametr }}</label>
        </div>
        <div><input type="text" placeholder="Введите название симптома" v-model="symptomName" class="input input-bordered w-full my-3 max-w-xs" /></div>
        <div class="join mx-5">
          <div>
            <div>
              <input class="input input-bordered join-item w-20 input-sm" v-model="symptomMin" placeholder="min"/>
            </div>
          </div>
          <div>
            <div>
              <input class="input input-bordered join-item input-sm w-20" v-model="symptomMax" placeholder="max"/>
            </div>
          </div>
        </div>
        <div class="modal-action">
          <button type="button" class="btn btn-primary" @click="saveChanges">Добавить</button>
          <button class="btn">Close</button>
        </div>
      </form>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>

<script>
import usePostSymptom from '@/hooks/usePostSymptom';
import { useParametrList } from "@/hooks/useParametrList";

export default {
  name: 'add-parmetr-modal',
  props: {
    visible: {
      type: Boolean
    }
  },
  data() {
  return {
    selectParametr: -1,

    };
  },
  methods: {
    async saveChanges() {
      const newSymptom = {
        name_symptom: this.symptomName,
        range_start_symptom: this.symptomMin,
        range_end_symptom: this.symptomMax,
        existance_symptom: true,
        id_parametr: this.selectParametr
      };
      console.log(newSymptom);
      usePostSymptom(newSymptom)
    }
  },
  setup() {
    const { parametrList} = useParametrList();

    return {
      parametrList
    };
  },

}
</script>

<style>

</style>