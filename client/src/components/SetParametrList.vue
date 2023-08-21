<template>
  <div class="mt-3 mb-20 card bg-base-100 lg:card-side shadow-xl">
    <div class="card-body ">
      <h2 class="text-2xl text-center font-medium mb-4"> Заполненные данные</h2>
      <button class="btn m-3 w-24" @click="getData()">Выбрать</button>
      <h2  v-if="paramsList.data" class="font-bold text-lg">{{ paramsList.data[0].first_name_people }} {{ paramsList.data[0].last_name_people }} {{ paramsList.data[0].fathert_name_people }}</h2>
      <div v-if="paramsList.data">
        <div v-for="parametr in paramsList.data" :key="parametr.uq_people">
          <div class="flex mb-3 ">
            <span class='font-medium me-3 w-48'>{{ parametr.name_parametr }}</span>
            <input type="text" class="me-3 input input-bordered input-sm w-24 max-w-xs text-base" v-model="parametr.value_parametr"/>
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
import { useParametrsByPatient } from "@/hooks/useParametrsByPatient";
import usePostParametrByPatient  from '@/hooks/usePostParametrByPatient';

export default {
  name: 'fill-parametr-list',
  props: {
    selectedPatientId: {
      type: String,
      default: ''
    }
  },
  data() {
  return {
    paramsList: [],
    selectOptions: [
        {value: '1', name: 'точно'},
        {value: '2', name: 'неточно'},
        {value: '3', name: 'неизмеримо'},
      ]
    };
  },
  methods: {
    getData() {
      useParametrsByPatient(this.selectedPatientId)
      .then((result) => {
        this.paramsList = result.paramsList._rawValue;
        console.log(this.paramsList);
      })
      .catch((error) => {
        console.error(error);
      });
    },
    sendData() {
      console.log(this.formattedParametrData)
      usePostParametrByPatient(this.formattedParametrData);
    },
  },
  // setup() {
  //   const { paramsList} = useParametrsByPatient(this.selectedPatientId);

  //   return {
  //     paramsList
  //   };
  // },
}
</script>

<style>

</style>