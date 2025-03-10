<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <header>
    <NavBar />
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style>
@reference "tailwindcss";

header {
  @apply max-w-screen px-4 py-8;
}

main {
  @apply w-screen overflow-auto;
}

</style>
