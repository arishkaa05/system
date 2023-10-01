<template>
  <div>
    <button class="btn m-3" onclick="my_modal_1.showModal()">Добавить параметр</button>
    <dialog id="my_modal_1" class="modal modal-top-sm">
      <form method="dialog" class="modal-box">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        <h2 class="text-2xl mb-3">Добавьте параметр</h2>
        <input
          type="text"
          placeholder="Введите название параметра"
          v-model="parametrName"
          class="input input-bordered w-full my-3 max-w-xs"
        />
        <div class="join">
          <div>
            <div>
              <input
                class="input input-bordered join-item input-sm"
                type="number"
                min="0"
                @blur="handleParametrMinInput"
                v-model.number="parametrMin"
                placeholder="минимум"
              />
            </div>
          </div>
          <div>
            <div>
              <input
                class="input input-bordered join-item input-sm"
                type="number"
                min="0"
                @blur="handleParametrMaxInput"
                v-model.number="parametrMax"
                placeholder="максимум"
              />
            </div>
          </div>
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
        <div class="modal-action">
          <button
            type="button"
            class="btn btn-primary"
            @click="saveChanges"
            :disabled="!(parametrName.length > 0 && parametrMax && parametrMin)"
          >
            Добавить
          </button>
          <button class="btn">Close</button>
        </div>
      </form>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'
import { usePostParametr } from '/src/hooks/usePostParametr.js?t=1694956296169'
export default {
  name: 'add-parametr-modal',
  props: {
    visible: {
      type: Boolean
    }
  },
  setup() {
    const parametrName = ref('')
    const parametrMin = ref()
    const parametrMax = ref()
    let errorMSG = ref('')
    const instance = getCurrentInstance()
    const saveChanges = async () => {
      if (parametrName.value.length > 0 && parametrMin.value && parametrMax.value) {
        const newParam = {
          parametrName: parametrName.value,
          parametrMin: parametrMin.value,
          parametrMax: parametrMax.value
        }
        console.log(newParam)
        const result = await usePostParametr(newParam)
        console.log(result)

        if (result.success) {
          console.log('Запрос успешно отправлен:', result.data)
          instance.emit('parametrAdded', parametrName.value)

          const modal = document.getElementById('my_modal_1')
          modal.close()
        } else {
          (errorMSG.value = 'Ошибка отправки запроса:'), result.error
          setTimeout(() => {
            errorMSG.value = ''
          }, 10000)
        }
      } else {
        errorMSG.value = 'Ошибка! Заполните все поля!'
        setTimeout(() => {
          errorMSG.value = ''
        }, 10000)
      }
    }

    const handleParametrMinInput = () => {
      if (parametrMin.value < 0) parametrMin.value = null
      if (parametrMin.value >= parametrMax.value) {
        parametrMin.value = parametrMax.value - 1
      }
    }

    const handleParametrMaxInput = () => {
      if (parametrMax.value < 0) parametrMax.value = null
      if (parametrMax.value <= parametrMin.value) {
        parametrMax.value = parametrMin.value + 1
      }
    }

    return {
      parametrName,
      parametrMin,
      parametrMax,
      errorMSG,
      handleParametrMinInput,
      handleParametrMaxInput,
      saveChanges
    }
  }
}
</script>

<style></style>
