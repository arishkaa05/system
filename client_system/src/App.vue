<script setup lang="ts">
  import Navbar from './components/Navbar.vue';
</script>

<template>
  <div>
    <div class="light">
    <Navbar></Navbar>
      <div class="min-h-screen bg-neutral-100 flex flex-col">
        <div class="container  max-w-screen-lg flex-grow mx-auto py-20 px-5">
          <router-view ></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
