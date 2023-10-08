<template>
  <div>
    <button class="text-gray-900 hover:text-violet-600 cursor-pointer" @click="isOpen = !isOpen">
      Добавить симптом
    </button>
    <dialog id="my_modal_4" class="modal" :open="isOpen"> 
      <form method="dialog" class="modal-box">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"  @click="isOpen = !isOpen">✕</button>
        <h2 class="text-2xl mb-3">Добавьте новый симптом</h2>
        <p class="text-base font-medium mb-2">Выберете параметр, к которому относится симптом</p>
        <div>
          <div style="display: flex">
            <input
              class="radio radio-xs radio-primary mt-1 mx-1"
              type="radio"
              :value="`${parametr.id_parametr}`"
              :id="parametr.id_parametr"
              :name="parametr.name_parametr"
              checked
              disabled
            />
            <label :for="parametr.id_parametr">{{ parametr.name_parametr }}</label>
          </div>
        </div>
        <div>
          <input
            type="text"
            placeholder="Введите название симптома"
            v-model="symptomName"
            class="input input-bordered w-full my-3 max-w-xs"
          />
        </div>
        <div class="join">
          <div>
            <div>
              <input
                class="input input-bordered join-item input-sm"
                v-model.number="symptomMin"
                type="number"
                min="0"
                @blur="handleParametrMinInput"
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
                v-model.number="symptomMax"
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
            :disabled="!(symptomName.length > 0 && symptomMax && symptomMin)"
          >
            Добавить
          </button>
          <button class="btn">Close</button>
        </div>
      </form>
      <form method="dialog" class="modal-backdrop">
        <button  @click="isOpen = !isOpen">close</button>
      </form>
    </dialog>
  </div>
</template>

<script>
import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
import { usePostSymptom } from '@/hooks/usePostSymptom'

export default {
  name: 'add-symptom-by-paramer-modal',
  props: {
    visible: {
      type: Boolean
    },
    parametr: {
      type: Object
    }
  },
  setup(props) {
    const parametrList = reactive([])
    const symptomName = ref('')
    const symptomMin = ref()
    let isOpen = ref(false)
    const symptomMax = ref()
    let errorMSG = ref('')
    const instance = getCurrentInstance()

    const saveChanges = async () => {
      if (symptomName.value.length > 0 && symptomMin.value && symptomMax.value) {
        const newSymptom = {
          name_symptom: symptomName.value,
          range_start_symptom: symptomMin.value,
          range_end_symptom: symptomMax.value,
          existance_symptom: true,
          id_parametr: props.parametr.id_parametr
        }
        const result = await usePostSymptom(newSymptom)

        if (result.success) {
          instance.emit('symptomAdded', props.parametr.id_parametr)
          const modal = document.getElementById('my_modal_4')
          modal.close()
        } else {
          ;(errorMSG.value = 'Ошибка отправки запроса:'), result.error
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
      if (symptomMin.value < 0) symptomMin.value = null
      if (symptomMin.value >= symptomMax.value) {
        symptomMin.value = symptomMax.value - 1
      }
    }

    const handleParametrMaxInput = () => {
      if (symptomMax.value < 0) symptomMax.value = null
      if (symptomMax.value <= symptomMin.value) {
        symptomMax.value = symptomMin.value + 1
      }
    }
    onMounted(() => {
    })
    return {
      symptomName,
      symptomMin,
      handleParametrMinInput,
      handleParametrMaxInput,
      symptomMax,
      errorMSG,
      parametrList,
      saveChanges,
      isOpen
    }
  }
}
</script>

<style></style>
