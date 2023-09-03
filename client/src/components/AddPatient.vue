<template>
  <div>
    <div>
      <h1 class="text-4xl font-medium tracking-tight text-gray-900 mb-7">Добавьте пациента</h1>
      <!-- <label class="label"><span class="label-text">ФИО</span></label> -->
      <input type="text" placeholder="Иванов Иван Иванович" v-model="name" class="input input-bordered w-full mb-3 max-w-xs" />
      <p v-if="isSubmit">Уникальный идентификатор: {{ uniqueId }}</p>
      <div class="flex justify-end">
        <button class="btn btn-primary" @click="saveChanges">Добавить</button>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import usePostPatient from "@/hooks/usePostPatient";

export default {

  name: 'add-patient',
  components: {

  },
  computed: {
    uniqueId() {
      const uuid = uuidv4(); // Генерация уникального идентификатора
      console.log(uuid)
      return uuid;
    },
  },
  data() {
  return {
      isSubmit: false,
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
      this.isSubmit = true;
      console.log(newPatient)
    },
  },

}
</script>

<style>

</style>