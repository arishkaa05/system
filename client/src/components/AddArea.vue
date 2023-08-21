<template>
  <div>
    <div>
      <h1 class="text-4xl font-medium tracking-tight text-gray-900 mb-4">Добавьте новое направление</h1>
      <input type="text" placeholder="Введите название направления" v-model="name_area" class="input input-bordered w-full my-3 max-w-xs" />
      <SymptomCalculator @formulacnf="handleFormulaCNF" @formuladb="handleFormulaDB" />
      <div class="flex justify-end">
        <button class="btn btn-primary" @click="saveChanges">Добавить</button>
      </div>
    </div>
  </div>
</template>

<script>
import usePostArea from '@/hooks/usePostArea';
import SymptomCalculator from './SymptomCalculator.vue';

export default {
  name: 'add-area',
  props: {
    visible: {
      type: Boolean
    }
  },
  components: {
    SymptomCalculator
  },
  data() {
  return {
      name_area: '',
      formula_area: '',
      hash_area: '',
    };
  },
  methods: {
    async saveChanges() {
      const newArea = {
        name_area: this.name_area,
        formula_area: this.formula_area,
        hash_area: this.hash_area
      };
      console.log(newArea);
      usePostArea(newArea)
    },
    handleFormulaCNF(formulaCNF) {
      this.hash_area = formulaCNF;
      console.log(formulaCNF);
    },
    handleFormulaDB(formulaDB) {
      console.log(formulaDB);
      this.formula_area = formulaDB;
    },
  },

}
</script>

<style>

</style>