<template>
  <div>
    <div>
      <h1 class="text-4xl font-medium tracking-tight text-gray-900 mb-7">Выберете пациента</h1>
      <div v-if="patientList">
        <select class="select select-bordered w-full max-w-xs" v-model="selectedPatientId">
          <option disabled selected>Выберете пациента</option>
          <option
            v-for="patient in patientList.value"
            :key="patient.id_people"
            :value="patient.id_people"
          >
            {{ patient.first_name_people }} {{ patient.last_name_people }}
            {{ patient.father_name_people }}
          </option>
          <option value="newPatient">Новый пациент</option>
        </select>
      </div>
      <AddPatient
        v-if="selectedPatientId === 'newPatient'"
        @patientAdded="handlePatientAdded"
      ></AddPatient>
      <FillParametrList
        v-if="!(selectedPatientId === 'Выберете пациента' || selectedPatientId === 'newPatient')"
        :selectedPatientId="selectedPatientId"
      />
      <SetParametrList
        v-if="selectedPatientId !== 'Выберете пациента'"
        :selectedPatientId="selectedPatientId"
      />
      <ResultPatient
        v-if="selectedPatientId !== 'Выберете пациента'"
        :selectedPatientId="selectedPatientId"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue'
import { usePostPatient } from '@/hooks/usePostPatient'
import { usePatientList } from '@/hooks/usePatientList'
import FillParametrList from './FillParametrList.vue'
import SetParametrList from './SetParametrList.vue';
import ResultPatient from "./ResultPatient.vue";
import AddPatient from '@/components/AddPatient.vue'

export default {
  name: 'add-patient-params',
  components: {
    FillParametrList,
    SetParametrList,
    ResultPatient,
    AddPatient
  },
  setup() {
    const patientList = reactive([])
    let selectedPatientId = ref('Выберете пациента')
    const name = ref('')
    const name_area = ref('')
    const formula_area = ref('')
    const hash_area = ref('')

    const fetchPatientData = async () => {
      patientList.value = await usePatientList()
    }

    // Methods
    const saveChanges = async () => {
      const newPatient = {
        uq_people: this.uniqueId, // Необходимо уточнить, откуда берется uniqueId
        first_name_people: name.value.split(' ')[0],
        last_name_people: name.value.split(' ')[1],
        fathert_name_people: name.value.split(' ')[2]
      }
      usePostPatient(newPatient)
    }

    // Watchers
    const selectedPatientIdWatcher = (newValue) => {
      console.log(newValue)
      console.log(selectedPatientId.value)
    }

    const handlePatientAdded = (patientId) => {
      console.log(patientId)
      selectedPatientId.value = patientId
    }
    onMounted(() => {
      fetchPatientData()
    })
    return {
      selectedPatientId,
      name,
      name_area,
      formula_area,
      hash_area,
      saveChanges,
      selectedPatientIdWatcher,
      patientList,
      fetchPatientData,
      handlePatientAdded
    }
  }
}
</script>
<style></style>
