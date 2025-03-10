<script setup lang="ts">
  import ProductItem from './ProductItem.vue';
  import { useFetch } from '../helpers/fetch';

  const { data, error, isFetching, execute } = useFetch("/products").get().json();

  const isError = !isFetching && error.value !== null;
</script>

<template>
  <h2 class="title">Listagem de Produtos</h2>
  <p class="error-message" v-if="isError">

  </p>
  <table v-if="!isError && !isFetching" class="table-product">
    <thead>
      <tr>
        <th>ID</th>
        <th>Produto</th>
        <th>Preço</th>
        <th>Descrição</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in data" :key="product.id">
        <ProductItem :product @refetch="execute()" />
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
  @references "tailwindcss";

  table {
    @apply w-full text-center;
  }

  table tr th, table tr td {
    @apply w-1/5;
  }
</style>
