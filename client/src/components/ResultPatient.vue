<template>
  <div class="mt-3 mb-20 card bg-base-100 lg:card-side shadow-xl">
    <div class="card-body">
      <h2 class="text-2xl text-center font-medium mb-4">Результат</h2>
      <button class="btn btn-primary" @click="getResult()">Получить результат по пациенту</button>
      <div v-if="resultArea.length > 0">
        <h2 class="text-xl">{{ suitableAreas }}</h2>
        <h2 class="text-xl">{{ maybeSuitableAreas }}</h2>
        <button class="btn btn-primary mt-2" @click="moreInformation = !moreInformation">Показать больше информации?</button>
        <div v-if="moreInformation" class="mt-2">
          <div v-for="area in resultArea" :key="area.id_area">
            <div class="collapse collapse-arrow bg-base-200 mt-4">
              <input type="radio" name="my-accordion-1" checked="checked" /> 
              <div class="collapse-title text-xl font-medium">
                {{ area.answer }}
              </div>
              <div class="collapse-content"> 
                <p>Скоро здесь будет объяснение на основе симптомов почему именно не подходит областьи {{ area.name_area }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import result from "./../math";

export default {
  name: 'result-patient',
  props: {
    selectedPatientId: {
      type: String,
      default: ''
    }
  },
  data() {
  return {
    paramsList: [],
    selectOptions: [
        {value: '1', name: 'точно'},
        {value: '2', name: 'неточно'},
        {value: '3', name: 'неизмеримо'},
      ],
    resultArea: [],
    moreInformation: false,
    };
  },
  computed: {
    suitableAreas() {
      const areas = this.resultArea.filter(item => item.solve === "2");
      const name_area = areas.reduce((acc, area) => acc += ` ${area.name_area}, `, "").trim();
      return name_area !== "" ? `Области, которые подходят: ${name_area}` : "";
    },
    maybeSuitableAreas() {
      const areas = this.resultArea.filter(item => item.solve === "6");
      const name_area = areas.reduce((acc, area) => acc += ` ${area.name_area}, `, "").trim();
      return name_area !== "" ? `Области, которые могут подходить, основываясь на опыте эксперта: ${name_area}` : "";
    },
  },
  methods: {
    async getResult() {
      const patientId = this.selectedPatientId;
      this.resultArea = await result(patientId);
      console.log(this.resultArea);
    }
  },
}
</script>

<style>

</style>