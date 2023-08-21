<template>
  <div class="my-3 card bg-base-100 lg:card-side shadow-xl">
    <div class="card-body ">
      <h2 class="text-2xl text-center font-medium mb-4">Введите данные</h2>
      <div v-if="parametrList.data">
        <div v-for="parametr in formattedParametrData" :key="parametr.parametrs_id_parametr">
          <div class="flex mb-3 ">
            <span class='font-medium me-3 w-48'>{{ parametr.name_parametr }}</span>
            <input type="text" :placeholder="parametr.name_parametr" class="me-3 input input-bordered input-sm w-24 max-w-xs text-base" v-model="parametr.value_parametr"/>
            <div class="flex" v-for="(radio, i) in selectOptions" :key="i">
              <input class="radio radio-xs radio-primary mt-1 mx-1" type="radio" :value="`${radio.value}`" :id="`id${radio.value}${parametr.parametrs_id_parametr}`" :name="`dataAccuracy${parametr.parametrs_id_parametr}`" v-model="parametr.exactly_parametr"/>
              <label class="label-text font-medium" :for="`id${radio.value}${parametr.parametrs_id_parametr}`">{{radio.name}}</label>
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
import { useParametrList } from "@/hooks/useParametrList";
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
    selectOptions: [
        {value: '1', name: 'точно'},
        {value: '2', name: 'неточно'},
        {value: '3', name: 'неизмеримо'},
      ]
    };
  },
  computed: {
    formattedParametrData() {
      return this.parametrList.data.map(parametr => {
        return {
          people_id_people: this.selectedPatientId,
          parametrs_id_parametr: parametr.id_parametr,
          name_parametr: parametr.name_parametr,
          value_parametr: 0,
          exactly_parametr: 0
        };
      });
    }
  },
  methods: {
    sendData() {
      console.log(this.formattedParametrData)
      usePostParametrByPatient(this.formattedParametrData);
    },
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