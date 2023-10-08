<script>
import Navbar from '@/components/Navbar.vue'
export default {
  components: {
    Navbar
  }
}
</script>

<template>
  <div class="app">
    <Navbar></Navbar>
    <div class="">
      <div class="min-h-screen bg-neutral-100 flex flex-col">
        <div class="container max-w-screen-lg flex-grow mx-auto py-20 px-5">
          <router-view ></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
