<template>
  <div class="mt-8">
    <div>
      <div class="card bg-base-100 lg:card-side shadow-xl">
        <div class="card-body">
          <h1 class="text-4xl font-medium tracking-tight text-gray-900 my-7">Добавьте пациента </h1>
          <input
            type="text"
            placeholder="Иванов Иван Иванович"
            v-model="name"
            class="input input-bordered w-full mb-3 max-w-xs"
          />
          <p v-if="isSubmit">Уникальный идентификатор: {{ uniqueId }}</p>
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
          <div class="flex justify-end">
            <button class="btn btn-primary" @click="saveChanges" :disabled=" name.length === 0">
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
  import { ref, getCurrentInstance } from 'vue'
  import { v4 as uuidv4 } from 'uuid'
  import { createPatient, Patient } from '../hooks/usePatient';

  const isSubmit = ref<Boolean>(false)
  const name = ref<String>('')
  const name_area = ref<String>('')
  const formula_area = ref<String>('')
  const hash_area = ref<String>('')
  let errorMSG = ref<String>('')

  const instance = getCurrentInstance()
  const uniqueId = () => {
    const uuid = uuidv4()
    return uuid
  }

  const saveChanges = async () => {
    if (uniqueId && name.value.length > 0) {
      const newPatient: Patient = {
        uq_patient: uniqueId(),
        name: name.value.split(' ')[0],
        lastname: name.value.split(' ')[1],
        fathername: name.value.split(' ')[2]
      }
      const result = await createPatient(newPatient)
      if (result.status) {
        console.log('Запрос успешно отправлен:', result.data.patientId)
        instance.emit('patientAdded', result.data.patientId)
      } else {
        errorMSG.value = 'Ошибка отправки запроса'
        setTimeout(() => {
          errorMSG.value = ''
        }, 10000)
      }
    } else {
      errorMSG.value = 'Ошибка! Заполните поля!'
      setTimeout(() => {
        errorMSG.value = ''
      }, 10000)
    }
  }

</script>

<style></style>
