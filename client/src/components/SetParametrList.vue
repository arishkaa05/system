<template>
  <div class="mt-3 mb-20 card bg-base-100 lg:card-side shadow-xl">
    <div class="card-body ">
      <h2 class="text-2xl text-center font-medium mb-4"> Заполненные данные</h2>
      <h2  v-if="paramsList.value" class="font-bold text-lg">{{ paramsList.value[0].first_name_people }} {{ paramsList.value[0].last_name_people }} {{ paramsList.value[0].fathert_name_people }}</h2>
      <div v-if="paramsList.value">
        <div v-for="parametr in paramsList.value" :key="parametr.uq_people">
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
import { reactive, onMounted } from 'vue';
import { useParametrsByPatient } from "@/hooks/useParametrsByPatient";

export default {
  name: 'fill-parametr-list',
  props: {
    selectedPatientId: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const paramsList = reactive([]);
    const selectOptions = [
      { value: '1', name: 'точно' },
      { value: '2', name: 'неточно' },
      { value: '3', name: 'неизмеримо' },
    ];

    const getData = async () => {
      paramsList.value = await useParametrsByPatient(props.selectedPatientId);
    };
    onMounted(() => {
      getData();
    });

    return {
      paramsList,
      selectOptions,
    };
  },
};
</script>

<style>

</style>