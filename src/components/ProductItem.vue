<script setup lang="ts">
  const emit = defineEmits(['refetch'])
  import { type Product } from '../types/product'
  import { useFetch } from '../helpers/fetch'
import { useRouter } from 'vue-router';
  const { product } = defineProps<{ product: Product }>()

  const router = useRouter()

  const { execute, abort, canAbort } = useFetch('/products/' + product.id, { immediate: false }).delete().json()

  function deleteProduct() {
    if (canAbort.value) {
      abort()
    }

    execute(true)
      .then(() => emit('refetch'))
      .catch((err) => console.error(err))
  }
</script>

<template>
  <td>{{ product.id }}</td>
  <td>{{ product.name }}</td>
  <td>{{ product.price }}</td>
  <td>{{ product.description }}</td>
  <td class="flex gap-3">
    <button class="btn-info" @click.prevent="router.push('/products/' +
      product.id)">Editar</button>
    <button class="btn-danger" @click="deleteProduct">Remover</button>
  </td>
</template>
