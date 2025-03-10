<script setup lang="ts">
import { fetchBackEnd, isApiError } from '@/helpers/fetch';
import type { Product } from '@/types/product';
import { ref, toValue } from 'vue';
import { useRouter } from 'vue-router';

const { product } = defineProps<{ product: Product }>()

const router = useRouter()

const name = ref(product.name)
const price = ref(product.price)
const description = ref(product.description)
const apiError = ref<string | string[] | null>(null)

function updateProduct() {
  apiError.value = null
  const descriptionVal = toValue(description)
  fetchBackEnd.put<Product>(
    '/products/' + product.id,
    {
      name: toValue(name),
      price: Number(toValue(price)),
      description: descriptionVal === '' ? null : descriptionVal,
    }
  ).then((resp) => {
    if (isApiError(resp)) {
      apiError.value = resp.message
      console.error(resp)
      return
    }

    router.push('/products')
  })
}

</script>

<template>
  <form v-on:submit.prevent="updateProduct" class="form-product">
    <div class="form-control">
      <label for="name">Nome do Produto</label>
      <input type="text" id="name" v-model="name" required>
    </div>
    <div class="form-control">
      <label for="price">Preço</label>
      <input type="text" id="price" v-model="price" required>
    </div>
    <div class="form-control">
      <label for="description">Descrição</label>
      <textarea type="text" id="description" v-model="description" rows="3">
      </textarea>
    </div>
    <div v-if="apiError !== null && Array.isArray(apiError)" class="error-message grid gap-4 mt-4
      w-full">
      <p v-for="(error, index) in apiError" :key="index">{{ error }}</p>
    </div>
    <p v-else-if="apiError !== null" class="error-message my-3">
      {{ apiError }}
    </p>
    <div class="btn-group">
      <button type="submit" class="btn-success">Atualizar</button>
      <button type="button" class="btn-danger" @click="router.push('/products')">Cancelar</button>
    </div>
  </form>
</template>
