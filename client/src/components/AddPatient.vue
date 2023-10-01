<template>
  <div>
    <div>
      <h1 class="text-4xl font-medium tracking-tight text-gray-900 my-7">Добавьте пациента</h1>
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
        <button class="btn btn-primary" @click="saveChanges" :disabled="name.length === 0">
          Добавить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref,getCurrentInstance } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { usePostPatient } from '@/hooks/usePostPatient'

export default {
  name: 'add-patient',
  components: {},
  setup() {
    const isSubmit = ref(false);
    const name = ref('');
    const name_area = ref('');
    const formula_area = ref('');
    const hash_area = ref('');
    let errorMSG = ref('');

    const instance = getCurrentInstance();
    const uniqueId = () => {
      const uuid = uuidv4()
      return uuid
    }

    const saveChanges = async () => {
      if (uniqueId && name.value.length > 0) {
        const newPatient = {
          uq_people: uniqueId(),
          first_name_people: name.value.split(' ')[0],
          last_name_people: name.value.split(' ')[1],
          fathert_name_people: name.value.split(' ')[2]
        }
        const result = await usePostPatient(newPatient)
        if (result.success) {
          console.log('Запрос успешно отправлен:', result.data)
          instance.emit('patientAdded', result.data)
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

    return {
      isSubmit,
      name,
      name_area,
      formula_area,
      hash_area,
      errorMSG,
      uniqueId,
      saveChanges
    }
  }
}
</script>

<style></style>
