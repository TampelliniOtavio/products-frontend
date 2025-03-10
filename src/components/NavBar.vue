<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink
      to="/"
    >Produtos</RouterLink>
  </nav>
</template>

<style>
  @reference "tailwindcss";

  .router-link-exact-active {
    @apply text-green-700;
  }

  nav {
    @apply w-full flex justify-around;
  }
</style>
