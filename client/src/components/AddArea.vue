<template>
 <div class="my-3 card bg-base-100 lg:card-side shadow-xl">
    <div class="card-body">
      <h1 class="text-4xl font-medium tracking-tight text-gray-900 mb-4">Добавьте новое направление</h1>
      <input type="text" placeholder="Введите название направления" v-model="name_area" class="input input-bordered w-full my-3 max-w-xs" />
      <SymptomCalculator :area="name_area"/>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import SymptomCalculator from './SymptomCalculator.vue';

export default {
  name: 'add-area',
  components: {
    SymptomCalculator
  },
  setup() {
    const isFormValid = ref(false);
    const name_area = ref('');
    const formula_area = ref('');
    const hash_area = ref('');

    const formattedNameArea = computed(() => {
      return name_area.value;
    });

    return {
      isFormValid,
      name_area,
      formula_area,
      hash_area,
      formattedNameArea
    };
  },
}
</script>
<style>

</style>