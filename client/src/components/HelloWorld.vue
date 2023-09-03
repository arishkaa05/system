<template>
  <div>
    <AddPatient />
    <AddPatientModal />
    <AddPatientParams />
    <area-list />
    <AddArea />
  </div>
</template>

<script>
import AddArea from './AddArea.vue';
import AddPatient from './AddPatient.vue';
import AddPatientParams from './AddPatientParams.vue';
import AddPatientModal from './AddPatientModal.vue';
import AreaList from './AreaList.vue';

export default {
  name: 'HelloWorld',
  data() {
    return {
    }
  },
  components: {
    AddArea,
    AddPatient,
    AddPatientParams,
    AddPatientModal,
    AreaList
  },
  methods: {
  },
  props: {}
}
</script>