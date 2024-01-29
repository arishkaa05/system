<template>
  <div>
    <div>
      <div
        class="card bg-base-100 lg:card-side shadow-xl"
        v-if="selectedPatientId === 'Выберете пациента'"
      >
        <div class="card-body">
          <h1 class="text-4xl font-medium tracking-tight text-gray-900 mb-7">
            Выберете пациента
          </h1>
          <div v-if="patientList">
            <select
              class="select select-bordered w-full max-w-xs"
              v-model="selectedPatientId"
            >
              <option disabled selected>Выберете пациента</option>
              <option
                v-for="patient in patientList.patients"
                :key="patient.id"
                :value="patient.id"
              >
                {{ patient.name }} {{ patient.lastname }}
                {{ patient.fathername }}
              </option>
              <option value="newPatient">Новый пациент</option>
            </select>
          </div>
          <div v-if="errorMSG">
            <div class="alert alert-error mt-3">
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
        </div>
      </div>
      <AddPatient
        v-if="selectedPatientId === 'newPatient'"
        @patientAdded="handlePatientAdded"
      ></AddPatient>
      <FillParametrList
        v-if="
          !(
            selectedPatientId === 'Выберете пациента' ||
            selectedPatientId === 'newPatient'
          )
        "
        :selectedPatientId="selectedPatientId"
      />
      <SetParametrList
        v-if="
          selectedPatientId !== 'Выберете пациента' &&
          selectedPatientId !== 'newPatient'
        "
        :selectedPatientId="selectedPatientId"
      />
      <ResultPatient
        v-if="
          selectedPatientId !== 'Выберете пациента' &&
          selectedPatientId !== 'newPatient'
        "
        :selectedPatientId="selectedPatientId"
      />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, reactive } from "vue";
import { getPatient, Patients } from "../services/usePatient";
import ResultPatient from "./ResultPatient.vue";
import FillParametrList from "./FillParametrList.vue";
import SetParametrList from "./SetParametrList.vue";
import AddPatient from "./AddPatient.vue";

let patientList = ref<Patients>({
  patients: [],
});
let selectedPatientId = ref("Выберете пациента");
const name = ref<String>("");
const name_area = ref<String>("");
const formula_area = ref<String>("");
const hash_area = ref<String>("");
let errorMSG = ref<String>("");

const fetchPatientData = async () => {
  const response = await getPatient();
  patientList.value = { ...response };
};

const handlePatientAdded = (patientId) => {
  selectedPatientId.value = patientId;
};
onMounted(() => {
  fetchPatientData();
});
</script>


<style>
  input[type="number"]::-webkit-inner-spin-button, 
  input[type="number"]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }

</style>
