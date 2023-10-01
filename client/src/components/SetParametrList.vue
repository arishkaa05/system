<template>
  <div class="mt-3 mb-20 card bg-base-100 lg:card-side shadow-xl" v-if="paramsList.value && paramsList.value.length > 0">
    <div class="card-body">
      <h2 class="text-2xl text-center font-medium mb-4">Заполненные данные</h2>
      <h2 v-if="paramsList.value" class="font-bold text-lg">
        {{ paramsList.value[0].first_name_people }} {{ paramsList.value[0].last_name_people }}
        {{ paramsList.value[0].fathert_name_people }}
      </h2>
      <div v-if="paramsList.value">
        <div v-for="item in groupedDataArray" :key="item[0].date_parametr">
          <!-- {{ item }}22 -->
          <div class="flex justify-end">{{ formattedDate(item[0].date_parametr) }}</div>
          <div v-for="parametr in item" :key="parametr.id_parametr">
            <div class="flex mb-3">
              <span class="font-medium me-3 w-48">{{ parametr.name_parametr }}</span>
              <input
                type="text"
                class="me-3 input input-bordered input-sm w-24 max-w-xs text-base"
                v-model="parametr.value_parametr"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      <div class="card-actions justify-end">
        <button class="btn btn-primary" @click="sendData()">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref,computed, onMounted } from 'vue'
import { useParametrsByPatient } from '@/hooks/useParametrsByPatient'

export default {
  name: 'fill-parametr-list',
  props: {
    selectedPatientId: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const paramsList = reactive([])
    let groupedDataArray = ref(null)

    const groupObjectsByDate = (data) => {
      const groupedData = {}
      data.forEach((item) => {
        const date = item.date_parametr // Получаем дату из объекта
        if (!groupedData[date]) {
          groupedData[date] = []
        }
        groupedData[date].push(item)
      })
      const resultArray = Object.values(groupedData)
      return resultArray
    }
    const formattedDate = computed(() => (rawDate) => {
      const date = new Date(rawDate);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();

      return `${day}.${month}.${year}`;
    });

    const getData = async () => {
      paramsList.value = await useParametrsByPatient(props.selectedPatientId)
      console.log(paramsList.value)
      groupedDataArray.value = groupObjectsByDate(paramsList.value)
      console.log(groupedDataArray.value)
    }

    onMounted(() => {
      getData()
    })

    return {
      paramsList,
      groupedDataArray,
      formattedDate
    }
  }
}
</script>

<style>
</style>