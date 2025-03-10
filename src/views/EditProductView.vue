<script setup lang="ts">
import FormEditProduct from '@/components/FormEditProduct.vue';
import { useFetch } from '@/helpers/fetch';
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const { data, error, execute, isFinished } = useFetch('/products/' + route.params.id).get().json()

watch(
  () => route.params.id,
  () => execute()
)
</script>

<template>
  <main class="flex w-full justify-center">
    <div v-if="isFinished && error" class="error-message">
      {{ error?.message ?? 'Erro Desconhecido ao Consultar' }}
    </div>
    <FormEditProduct v-if="isFinished && data" :product="data" />
  </main>
</template>
