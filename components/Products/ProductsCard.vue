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
                 <p class="text-gray-300 text-sm mt-2">{{truncatedDescription(product.description)}}<span v-if="showMore"> <RouterLink :to="'/product/' + product.slug" class="text-primary-500"> Read More</RouterLink></span></p>
                <div class="flex items-center justify-between mt-4">
                    <span v-if="product.discount==0" class="text-white font-bold text-lg"><ThePriceFormmater :price=product.price /></span>
                    <span v-if="product.discount>0" class="text-white font-bold text-lg line-through"><ThePriceFormmater :price=product.price /></span>
             
                    <UButton v-if="product.stock>0" color="primary" variants="solid" @click="isOpen = true">Add to Cart</UButton>
                    {{ isOpen }}
                  <!-- <TheModal v-model="isOpen">
                    <template #header>
                        <h2 class="text-2xl font-bold text-gray-800">Add to Cart</h2>
                    </template>
                    <template>
                        <div class="flex items-center justify-between">
                            <div class="flex items-start">
                                <img class="w-20 h-20 object-cover" :src="product.image" :alt="product.title">
                                <div class="ml-4">
                                    <h3 class="text-lg font-bold text-gray-800">{{product.title}}</h3>
                                    <span class="text-gray-500 text-sm">{{product.category.name}}</span>
                                </div>
                            </div>
                            <div class="flex items
                            -center">
                                <UButton color="gray" variants="solid" @click="isOpen = false">Close</UButton>
                                <UButton color="primary" variants="solid">Add to Cart</UButton>
                            </div>
                        </div>
                    </template>
                </TheModal> -->
                    <UButton v-if="product.stock==0" color="gray" variants="solid" disabled>Out of Stock</UButton>
                </div>
                <span v-if="product.discount>0" class="text-red-500 font-bold text-lg"><ThePriceFormmater :price=product.price-product.discount /></span>
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
const showMore = ref(false);
const isOpen = ref(false);
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
const truncatedDescription =(description:string) =>{
      if (description.length < 100){
        showMore.value = false;
        return description
      }else{
        showMore.value = true;
        return description.slice(0, 100) + '...';
    }
};

onMounted(getItem);

</script>