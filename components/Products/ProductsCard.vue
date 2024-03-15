<template>
            <UProgress v-if="loading" animation="carousel" />
     <USkeleton v-if="loading" class="h-[460px] w-screen" />
    <div v-if="!loading" class="bg-gray-800 py-16">
    <div class="container ml-72 mx-auto px-4">
        <h2 class="text-3xl font-bold text-white mb-8">Products</h2>
        <div  class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div v-for="product in productData" class="bg-gray-800 rounded-lg shadow-lg p-8">
                <div class="relative overflow-hidden">
                    <img class="object-cover w-full h-80" :src="product.image" :alt="product.title">
                    <div class="absolute inset-0 flex items-center justify-center">
                    <RouterLink :to="'/product/' + product.slug">
                        <UButton color="primary" variant="outline">View Product</UButton> 
                    </RouterLink>
                    </div>
                </div>
                <h3 class="text-xl font-bold text-white mt-4">{{product.title}}</h3>
                <p class="text-gray-300 text-sm mt-2">{{product.description}}</p>
                <div class="flex items-center justify-between mt-4">
                    <span class="text-white font-bold text-lg">£{{product.price}}</span>
                    <UButton v-if="product.stock>0" color="primary" variants="solid">Add to Cart</UButton>
                    <UButton v-else color="gray" variants="solid">Out of Stock</UButton>
                </div>
            </div>


            


        </div>

    </div>
</div>

</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { showProduct } from '~/servies/ProductService';
const productData:any = ref([]);
const loading = ref(false);
const getItem = async () => {
  try {
    loading.value = true;
    const data: any = await showProduct();
    loading.value = false;
    productData.value = data.data;
  } catch (err) {
    console.log(err);
  }
};

onMounted(getItem);

</script>