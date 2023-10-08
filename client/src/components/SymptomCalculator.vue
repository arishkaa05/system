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
              v-for="(item, index) in parametrList.value"
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
                <a
                  class="text-gray-900 hover:text-violet-600 cursor-pointer"
                  v-for="symptom in item.symptomList"
                  :key="symptom.id_symptom"
                  @click="updateFormula(symptom)"
                >
                  <ul><li>{{ symptom.name_symptom }}</li></ul> </a
                >
              </div>
              <div
                class="collapse-content"
                v-if="item.symptomList && item.symptomList.length === 0"
                v-show="index === activeIndex"
              >
                <AddSymptomModalByParametr :parametr="item" />
                <!-- <a
                  class="text-gray-900 hover:text-violet-600 cursor-pointer"
                  onclick="my_modal_.showModal()"
                >
                  <span> Добавьте симптом</span>
                </a> -->
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
            <kbd class="kbd cursor-pointer hover:bg-violet-600 mx-2" @click="cancel">ОТМЕНИТЬ</kbd>
            <kbd class="kbd cursor-pointer hover:bg-violet-600" @click="clear">СТЕРЕТЬ</kbd>
          </div>
          <div class="flex">
            <AddParametrModal @parametrAdded="handleParametrAdded" />
            <AddSymptomModal @symptomAdded="handleSymptomAdded" />
          </div>
        </div>
      </div>
      <div class="card-actions justify-between">
        <div>
          <div class="alert alert-error" v-if="errorMSG.length !== 0">
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
            <span>{{ errorMSG }}</span>
          </div>
        </div>
        <button
          class="btn btn-primary"
          @click="sendData()"
          :disabled="!(area.length > 3 && formula.length > 0)"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, reactive, onMounted, watch } from 'vue'
import { usePostArea } from '@/hooks/usePostArea'
import { useParametrList } from '@/hooks/useParametrList'
import { useSympromsByParametrId } from '@/hooks/useSympromsByParametrId'
import AddParametrModal from './AddParametrModal.vue'
import AddSymptomModal from './AddSymptomModal.vue'
import AddSymptomModalByParametr from './AddSymptomModalByParametr.vue'
import { cnf } from './../logic/cnf'

export default {
  name: 'SymptomCalculator',
  components: {
    AddParametrModal,
    AddSymptomModal,
    AddSymptomModalByParametr
  },
  props: {
    area: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const area = ref(props.area)
    const formula = ref([])
    const isParametrList = ref(false)
    const openCollapse = ref(null)
    const formulaDB = ref([])
    const activeIndex = ref(null)
    const errorMSG = ref('')
    const operatorList = ref([
      { operator: '&', operatorName: ' И ' },
      { operator: '+', operatorName: ' ИЛИ ' },
      { operator: '!', operatorName: 'НЕ ' },
      { operator: '(', operatorName: ' (' },
      { operator: ')', operatorName: ') ' }
    ])

    const parametrList = reactive([])

    const fetchParamData = async () => {
      parametrList.value = await useParametrList()
      getSymptoms()
    }

    onMounted(() => {
      fetchParamData()
    })

    const formulaString = computed(() => formula.value.join(''))

    const getSymptoms = () => {
      parametrList.value.forEach(async (element) => {
        let symptoms = await useSympromsByParametrId(element.id_parametr)
        element.symptomList = symptoms
        element.active = false
      })
      isParametrList.value = true
    }

    const toggleCollapse = (index) => {
      activeIndex.value = index
    }

    const updateFormula = (value) => {
      if (value.operator) {
        formula.value.push(value.operatorName)
        formulaDB.value.push(value.operator)
      } else {
        formula.value.push(value.name_symptom)
        formulaDB.value.push('s' + value.id_symptom)
      }
    }

    const cancel = () => {
      formula.value.pop()
      formulaDB.value.pop()
    }

    const clear = () => {
      formula.value = []
      formulaDB.value = []
    }

    const handleParametrAdded = (parametr) => {
      console.log('Добавлен параметр:', parametr)

      fetchParamData()
    }
    const handleSymptomAdded = async (symptomId) => {
      let symptoms = await useSympromsByParametrId(symptomId)
      const index = parametrList.value.findIndex((item) => item.id_parametr === parseInt(symptomId))
      parametrList.value[index].symptomList = symptoms
      parametrList.value[index].active = false
      isParametrList.value = true
    }

    const sendData = async () => {
      if (
        (formulaDB.value.join('').match(/\)/g) || []).length ===
          (formulaDB.value.join('').match(/\(/g) || []).length &&
        formulaDB.value.join('').length !== 0
      ) {
        const formulaCNF = cnf(formulaDB.value.join(''))
        const newArea = {
          name_area: area.value,
          formula_area: formulaDB.value.join(''),
          hash_area: formulaCNF
        }
        const result = await usePostArea(newArea)
        if (result.success) {
          console.log('Запрос успешно отправлен:', result.data)
        } else {
          ;(errorMSG.value = 'Ошибка отправки запроса:'), result.error
          setTimeout(() => {
            errorMSG.value = ''
          }, 10000)
          console.log('Ошибка отправки запроса:', result.error)
        }
        formula.value = []
        formulaDB.value = []
      } else if (formulaDB.value.join('').length === 0) {
        errorMSG.value = 'Ошибка! Введите формулу!'
        setTimeout(() => {
          errorMSG.value = ''
        }, 10000)
      } else {
        errorMSG.value = 'Ошибка! Проверьте скобки!'
        setTimeout(() => {
          errorMSG.value = ''
        }, 10000)
      }
    }

    watch(
      () => props.area,
      (newArea) => {
        area.value = newArea
      }
    )

    return {
      formula,
      isParametrList,
      openCollapse,
      formulaDB,
      activeIndex,
      errorMSG,
      operatorList,
      formulaString,
      getSymptoms,
      toggleCollapse,
      updateFormula,
      cancel,
      clear,
      sendData,
      parametrList,
      fetchParamData,
      handleParametrAdded,
      handleSymptomAdded
    }
  }
}
</script>
