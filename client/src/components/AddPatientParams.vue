<template>
  <div>
    <div>
      <h1 class="text-4xl font-medium tracking-tight text-gray-900 mb-7">Выберете пациента</h1>
      <div v-if="patientList">
        <select class="select select-bordered w-full max-w-xs" v-model="selectedPatientId">
          <option disabled selected>Выберете пациента</option>
          <option v-for="patient in patientList.data" :key="patient.id_people" :value="patient.id_people">
            {{ patient.first_name_people }} {{ patient.last_name_people }} {{ patient.father_name_people }}
          </option>
          <option value="newPatient">Новый пациент</option>
        </select>
      </div>
      <AddPatient v-if="selectedPatientId === 'newPatient'"></AddPatient>
      <FillParametrList v-if="selectedPatientId !== 'Выберете пациента'" :selectedPatientId="selectedPatientId" />
      <SetParametrList v-if="selectedPatientId !== 'Выберете пациента'" :selectedPatientId="selectedPatientId"  />
      <ResultPatient v-if="selectedPatientId !== 'Выберете пациента'" :selectedPatientId="selectedPatientId"  />
    </div>
  </div>
</template>

<script>
import usePostPatient from "@/hooks/usePostPatient";
import { usePatientList } from "@/hooks/usePatientList";
import FillParametrList from './FillParametrList.vue';
import SetParametrList from './SetParametrList.vue';
import ResultPatient from "./ResultPatient.vue";
import AddPatient from '@/components/AddPatient.vue';

export default {

  name: 'add-patient-params',
  components: {
    FillParametrList,
    SetParametrList,
    ResultPatient,
    AddPatient
  },
  computed: {
   },
  data() {
  return {
      selectedPatientId: 'Выберете пациента',
      name: '',
      name_area: '',
      formula_area: '',
      hash_area: '',
    };
  },
  methods: {
    async saveChanges() {
      let newPatient = {
        uq_people: this.uniqueId,
        first_name_people: this.name.split(' ')[0],
        last_name_people: this.name.split(' ')[1],
        fathert_name_people: this.name.split(' ')[2],
      }
      usePostPatient(newPatient)
      console.log(newPatient)
    },
  },
  watch: {
    selectedPatientId(newValue) {

      // Do something with the selected value
      console.log(newValue);
      console.log(this.selectedPatientId)
    },
  },
  setup() {
    const { patientList} = usePatientList();
    console.log(patientList)
    return {
      patientList
    };
  },
}
</script>

<style>

</style>