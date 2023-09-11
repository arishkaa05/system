<template>
  <div>
    <!-- <AddPatient />
    <AddPatientModal /> -->
    <AddPatientParams />
  </div>
</template>

<script>
// import AddPatient from '@/components/AddPatient.vue';
import AddPatientParams from '@/components/AddPatientParams.vue';
// import AddPatientModal from '@/components/AddPatientModal.vue';

export default {
  name: 'HelloWorld',
  data() {
    return {
    }
  },
  components: {
    // AddPatient,
    AddPatientParams,
    // AddPatientModal,
  },
  methods: {
  },
  props: {}
}
</script>