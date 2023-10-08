<template>
  <div>
    <div>
      <div class="card  bg-base-100 lg:card-side shadow-xl" v-if="selectedArea !== 'newArea'">
        <div class="card-body">
          <h1 class="text-4xl font-medium tracking-tight text-gray-900 mb-7">
            Выберете направление
          </h1>
          <div v-if="areaList">
            <select class="select select-bordered w-full max-w-xs" v-model="selectedArea">
              <option disabled selected>Выберете направление</option>
              <option v-for="area in areaList.value" :key="area.id_area" :value="area">
                {{ area.name_area }}
              </option>
              <option value="newArea">Новое направление</option>
            </select>
            <div class="h-11 my-3">
              <h2 v-if="selectedArea !== 'Выберете направление' && selectedArea !== 'newArea'">
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


<script>
import { computed, reactive, ref, onMounted } from 'vue'
import { useSymptomList } from '@/hooks/useSymptomList'
import AddArea from '@/components/AddArea.vue'
import { useArea } from '@/hooks/useArea'

export default {
  name: 'area-list',
  components: { AddArea },
  setup() {
    const areaList = reactive([])
    const symptomList = reactive([])
    let selectedArea = ref('Выберете направление')
    const transformedFormula = computed(() => {
      let formula = selectedArea.value.formula_area
      for (const symptom of symptomList.value) {
        const regex = new RegExp(`s${symptom.id_symptom}\\b`, 'g')
        formula = formula.replace(regex, symptom.name_symptom)
      }
      return formula.replace(/&/g, ' И ').replace(/\+/g, ' ИЛИ ').replace(/!/g, ' НЕ ')
    })
    const fetchAreaData = async () => {
      areaList.value = await useArea()
      filterAreas()
      symptomList.value = await useSymptomList()
    }
    const filterAreas = () => {
      const areaMap = new Map()
      areaList.value.forEach((area) => {
        if (!areaMap.has(area.name_area) || area.id_area > areaMap.get(area.name_area).id_area) {
          areaMap.set(area.name_area, area)
        }
      })
      areaList.value = Array.from(areaMap.values())
    }

    onMounted(() => {
      fetchAreaData()
    })

    return {
      areaList,
      symptomList,
      selectedArea,
      transformedFormula,
      fetchAreaData,
      filterAreas
    }
  }
}
</script>

<style></style>
