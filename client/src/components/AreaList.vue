<template>
  <div>
    <div>
      <h1 class="text-4xl font-medium tracking-tight text-gray-900 mb-7">Выберете направление</h1>
      <div v-if="areaList">
        <select class="select select-bordered w-full max-w-xs" v-model="selectedArea">
          <option disabled selected>Выберете направление</option>
          <option v-for="area in areaList.data" :key="area.id_area" :value="area.formula_area">
            {{ area.name_area }}
          </option>
        </select>
        <h2 v-if="selectedArea !== 'Выберете направление'" >{{ transformedFormula }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { useAreaList } from "@/hooks/useAreaList";
import { useSymptomList } from '@/hooks/useSymptomList';


export default {

  name: 'area-list',
  components: {
  },
  computed: {
    transformedFormula() {
      let transformedFormula = this.selectedArea;
      for (const symptom of this.symptomList.data) {
        const regex = new RegExp(`s${symptom.id_symptom}\\b`, 'g');
        transformedFormula = transformedFormula.replace(regex, symptom.name_symptom);
      }
      return transformedFormula
        .replace(/&/g, " И ")
        .replace(/\+/g, " ИЛИ ")
        .replace(/!/g, " НЕ ");
    }
  },
  data() {
  return {
      selectedArea: 'Выберете направление',
    };
  },
  methods: {  },
  setup() {
    const { areaList } = useAreaList();
    const { symptomList } = useSymptomList();

    return {
      areaList,
      symptomList
    };
  },
}
</script>

<style>

</style>