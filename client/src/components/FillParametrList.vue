<template>
  <div class="my-3 card bg-base-100 lg:card-side shadow-xl">
    <div class="card-body ">
      <h2 class="text-2xl text-center font-medium mb-4">Введите данные</h2>
      <div v-if="parametrList.value">
        <div
          v-for="(parametr, index) in formattedParametrData"
          :key="parametr.parametrs_id_parametr"
        >
          <div class="flex mb-3">
            <span class="font-medium me-3 w-28">{{ parametr.name_parametr }}</span>
            <input
              type="text"
              :placeholder="parametr.name_parametr"
              class="me-3 input input-bordered input-sm w-32 max-w-xs text-base"
              v-model="parametr.value_parametr"
              @blur="checkValue(parametr, index)"
            />
            <div class="flex" v-for="(radio, i) in selectOptions" :key="i">
              <input
                class="radio radio-xs radio-primary mt-1 mx-1"
                type="radio"
                :value="`${radio.value}`"
                :id="`id${radio.value}${parametr.parametrs_id_parametr}`"
                :name="`dataAccuracy${parametr.parametrs_id_parametr}`"
                v-model="parametr.exactly_parametr"
              />
              <label
                class="label-text font-medium"
                :for="`id${radio.value}${parametr.parametrs_id_parametr}`"
                >{{ radio.name }}</label
              >
            </div>
            <label>{{ parametrErrors[index] }}</label>
          </div>
        </div>
      </div>
      <div v-if="errorMSG">
        <div class="alert alert-error my-3">
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
      <div class="card-actions justify-end">
        <button class="btn btn-primary" @click="sendData()">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, onMounted, ref } from 'vue'
import { useParametrList } from '@/hooks/useParametrList'
import { usePostParametrByPatient } from '@/hooks/usePostParametrByPatient'

export default {
  name: 'fill-parametr-list',
  props: {
    selectedPatientId: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const parametrList = reactive([])
    const selectOptions = [
      { value: '1', name: 'точно' },
      { value: '2', name: 'неточно' },
      { value: '3', name: 'неизмеримо' }
    ]
    let errorMSG = ref('')
    const fetchParamData = async () => {
      parametrList.value = await useParametrList()
    }

    const formattedParametrData = computed(() => {
      return parametrList.value.map((parametr) => {
        return {
          people_id_people: props.selectedPatientId,
          parametrs_id_parametr: parametr.id_parametr,
          name_parametr: parametr.name_parametr,
          value_parametr: null,
          exactly_parametr: 1,
          max_value_parametr: parametr.max_value_parametr,
          min_value_parametr: parametr.min_value_parametr
          // error: '',
        }
      })
    })
    const parametrErrors = ref([])
    const checkValue = (parametr, index) => {
      const parsedValue = parseFloat(parametr.value_parametr)
      if (isNaN(parsedValue) && parametr.value_parametr) {
        parametrErrors.value[index] = 'Введите числовое значение.'
      } else if (
        parsedValue < parametr.min_value_parametr ||
        parsedValue > parametr.max_value_parametr
      ) {
        parametrErrors.value[
          index
        ] = `Значение должно быть между ${parametr.min_value_parametr} и ${parametr.max_value_parametr}.`
      } else {
        parametrErrors.value[index] = ''
      }
    }

    const sendData = async () => {
      const filteredData = formattedParametrData.value.filter(
        (item) => item.value_parametr !== null
      )
      if (filteredData.length > 0) {
        const result = await usePostParametrByPatient(filteredData)

        if (result.success) {
          console.log('Запрос успешно отправлен:', result.data)
        } else {
          (errorMSG.value = 'Ошибка отправки запроса:'), result.error
          setTimeout(() => {
            errorMSG.value = ''
          }, 10000)
        }
      }
    }
    onMounted(() => {
      fetchParamData()
    })
    return {
      selectOptions,
      formattedParametrData,
      sendData,
      fetchParamData,
      parametrList,
      checkValue,
      parametrErrors,
      errorMSG
    }
  }
}
</script>

<style></style>
