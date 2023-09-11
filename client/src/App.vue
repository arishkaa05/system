<script>
import Navbar from '@/components/Navbar.vue';
export default {
components: {
  Navbar
}
}
</script>

<template>
  <div class="app">
    <Navbar></Navbar>
    <div class="bg-base-200">
      <div class="container max-w-screen-lg mx-auto bg-base-300 py-20 px-5">
        <router-view ></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
