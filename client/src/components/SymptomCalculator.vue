<template>
  <div class="my-3 card bg-base-100 lg:card-side shadow-xl">
    <div class="card-body ">
      <h2 class="text-2xl text-center font-medium mb-4">Введите формулу</h2>
      <div>
        <textarea class="textarea textarea-bordered w-full h-full mb-4" placeholder="Формула" v-model="formulaString"></textarea>
      </div>
      <div class="grid grid-cols-3 gap-x-3 mb-5">
        <div class="col-span-2 content-between min-h-0">
          <div v-if="isParametrList" class="mb-7">
            <div v-for="(item, index) in parametrList.data" :key="item.id_parametr" class="collapse bg-base-200 mb-3">
              <input
                class="min-h-0 p-0"
                type="radio"
                :name="'my-accordion-' + index"
                :checked="index === activeIndex"
                @click="toggleCollapse(index)"
              />
              <div class="collapse-title text-xl tabular-nums font-medium tracking-tight text-gray-900 cursor-pointer min-h-0 py-2 px-5" @click="toggleCollapse(index)">
              {{item.name_parametr}}
              </div>
              <div class="collapse-content min-h-0" v-if="item.symptomList.length > 0" v-show="index === activeIndex">
                <a class="text-gray-900 hover:text-violet-600 cursor-pointer" v-for="symptom in item.symptomList" :key="symptom.id_symptom" @click="updateFormula(symptom)">
                  <span>{{ symptom.name_symptom }}</span>
                </a>
              </div>
              <div class="collapse-content" v-else v-show="index === activeIndex">
                <a class="text-gray-900 hover:text-violet-600 cursor-pointer" onclick="my_modal_2.showModal()">
                  <span> Добавьте симптом</span>
                </a>
              </div>
            </div>
          </div>
          <!-- <div>
            <button class="btn btn-primary" @click="getSymptoms()">Получить список параметров</button>
          </div> -->
        </div>
        <div class="flex flex-col items-center">
          <div class="w-2/3 flex flex-wrap justify-center">
            <kbd v-for="operatop in operatorList" :key="operatop" class="kbd cursor-pointer hover:bg-violet-600 m-2" @click="updateFormula(operatop)">{{operatop.operatorName}}</kbd>
          </div>
          <div class="flex my-2">
            <kbd class="kbd cursor-pointer hover:bg-violet-600 mx-2" @click="cancel">ОТМЕНИТЬ</kbd>
            <kbd class="kbd cursor-pointer hover:bg-violet-600" @click="clear">СТЕРЕТЬ</kbd>
          </div>
          <div class="flex">
            <AddParametrModal />
            <AddSymptomModal />
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
// import { useSymptomList } from "@/hooks/useSymptomList";
import { useParametrList } from "@/hooks/useParametrList";
import { useSympromsByParametrId } from "@/hooks/useSympromsByParametrId";
import AddParametrModal from './AddParametrModal.vue';
import AddSymptomModal from './AddSymptomModal.vue';
import { cnf } from "./../logic/cnf";

export default {
  name: 'SymptomCalculator',
  components: {
    AddParametrModal,
    AddSymptomModal,
  },
  data() {
    return {
      formula: [],
      isParametrList: false,
      openCollapse: null,
      formulaDB: [],
      activeIndex: null,
      operatorList: [
        {operator: '&', operatorName: ' И '},
        {operator: '+', operatorName: ' ИЛИ '},
        {operator: '!', operatorName: 'НЕ '},
        {operator: '(', operatorName: ' ('},
        {operator: ')', operatorName: ') '},
      ]
    }
  },
  computed: {
    formulaString() {
      return this.formula.join("");
    },
  },
  methods: {
    getSymptoms() {
      console.log('getSymptoms')
      this.parametrList.data.forEach(async element => {
        let symptoms = await useSympromsByParametrId(element.id_parametr);
        console.log(symptoms.symptomList._rawValue.data);
        element.symptomList = symptoms.symptomList._rawValue.data;
        element.active = false;
      });
      this.isParametrList = true;
    },
    toggleCollapse(index) {
      console.log(index)
      this.activeIndex = index;
    },
    updateFormula(value) {
      if (value.operator) {
        this.formula.push(value.operatorName)
        this.formulaDB.push(value.operator)
      }
      else {
        this.formula.push(value.name_symptom)
        this.formulaDB.push('s'+value.id_symptom)
      }
    },
    cancel() {
      this.formula.pop();
      this.formulaDB.pop();
    },
    clear() {
      this.formula = [];
      this.formulaDB = [];
    },
    sendData() {
      this.formulaCNF = cnf(this.formulaDB.join(""));
      console.log(this.formulaCNF)
      console.log(this.formulaDB.join(""))
      this.$emit('formulacnf', this.formulaCNF);
      this.$emit('formuladb', this.formulaDB.join(""));
      this.formula = [];
      this.formulaDB = []; //сначала в бд
    }
  },
  watch: {
    parametrList: {
      handler() {
        this.getSymptoms();
      },
    },
  },
  setup() {
    const { parametrList } = useParametrList();

    return {
      parametrList
    };
  },
}
</script>
