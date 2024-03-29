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
             
                    <UButton v-if="product.stock>0" color="primary" variants="solid" @click=openModal(product.id)>Add to Cart</UButton>
    
                  <UModal v-model="isOpen" prevent-close :overlay="false">
                    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">

                                    <template #header>
                                      <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Add to basket
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
          </div>
                                    </template>


                                    <div class="flex items-start">
                                        <div class="ml-4">
                                            <h3 class="text-lg font-bold text-gray-300">{{ selectedProductTitle}}</h3>
                                            <span class="text-gray-500 text-sm">{{ selectedProductCategory }}</span>
                                        </div>
                                        <div class="ml-7 flex items-center">
                                            <span class="text-lg font-bold text-gray-300 mr-5">Quantity:</span>
                                            <div class="flex items-center">
                                                <UButton icon="i-heroicons-plus" size="sm" color="primary" square
                                                    variant="ghost" @click="addQuantity" />
                                                <UInput type="text" size="sm"
                                                    class="w-10 text-sm font-bold text-gray-300" v-model="quantity" />
                                                <UButton icon="i-heroicons-minus" size="sm" color="primary" square
                                                    variant="ghost" @click="minusQuantity" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <div class="ml-4">
                                            <h3 class="text-lg font-bold text-gray-300">{{ selectedColor }}</h3>
                                        </div>
                                        <div class="ml-7 flex items-center">
                                            <span class="text-lg font-bold text-gray-300 mr-5">SelecColor:</span>
                                            <div class="flex items-center">
                                                <img v-for="color in selectedProductColor"
                                                    class="w-12 h-12 rounded-full bg-gray-200 mr-2"
                                                    :src="'http://localhost:8000/uploads/' + color.image"
                                                    :alt="color.name" :title="color.name"
                                                    @click="selectColor(color.name)"></img>
                                            </div>
                                        </div>
                                    </div>

                                       
                                    <template #footer>
                                        <div class="flex justify-between">
                                            <div>
                                                <UButton color="primary" variant="solid" @click=continueShop(product.id)>
                                                    Continue Shopping
                                                </UButton>
                                            </div>
                                            <div>
                                                <UButton color="green" variant="solid" @click=checkOut(product.id)>
                                                    Checkout
                                                </UButton>
                                            </div>
                                        </div>

                                    </template>
                                </UCard> 
                  </UModal>
         
                 
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
import { showBrandById } from '~/servies/BrandService';
import { showCategoryById } from '~/servies/CategoryService';
import { showProduct } from '~/servies/ProductService';
import { showColorById } from '~/servies/ColorService';
const productData:any = ref([]);
const selectedProductBrand = ref('');
const selectedProductCategory = ref('');
const selectedProductTitle = ref('');
const selectedProductColor:any = ref({});
const selectedColor = ref('');
const router = useRouter();
const quantity = ref(1);
const loading = ref(false);
const showMore = ref(false);
const isOpen = ref(false);
const getItem = async () => {
  try {
    loading.value = true;
    const data:any= await showProduct();
    loading.value = false;
    productData.value = data.data;
  } catch (err) {
    console.log(err);
  }
};
const truncatedDescription =(description:string) =>{
      if (description.length < 100){
         //showMore.value = false;
        return description
      }else{
        // showMore.value = true;
        return description.slice(0, 100) + '...';
    }
};
const openModal = async (id:any) => {
    isOpen.value = true;
    const selectedProduct:any = productData.value.find((product:any) => product.id === id);

        selectedProductTitle.value = selectedProduct.title;
        const brand: any = await showBrandById(selectedProduct.brand);
        selectedProductBrand.value = brand.data[0].name;
        const category: any = await showCategoryById(selectedProduct.category);
        selectedProductCategory.value = category.data[0].name;

        const colorPromises = selectedProduct.colors.map((colorId:any) => showColorById(colorId));
        const colorResults = await Promise.all(colorPromises);
        selectedProductColor.value = colorResults.map((color:any) => color.data[0]);
        
 
};
const addQuantity = () => {
    quantity.value++;
};
const minusQuantity = () => {
    if (quantity.value > 1) {
        quantity.value--;
    }
};
const selectColor = (color: string) => {
    selectedColor.value = color;
};
const continueShop = (productid:number) => {
    isOpen.value = false;

    let existingCart = JSON.parse(localStorage.getItem('cart') || '[]');

    const existingItemIndex = existingCart.findIndex((item: any) => {
        return item.product === productid && item.color === selectedColor.value;
    });

    if (existingItemIndex !== -1) {
        existingCart[existingItemIndex].quantity = quantity.value;
    } else {
        existingCart.unshift({
            product: productid,
            quantity: quantity.value,
            color: selectedColor.value
        });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
};
const checkOut = (productid:number) => {
    isOpen.value = false;
    let existingCart = JSON.parse(localStorage.getItem('cart') || '[]');

    const existingItemIndex = existingCart.findIndex((item: any) => {
        return item.product === productid && item.color === selectedColor.value;
    });

    if (existingItemIndex !== -1) {
        existingCart[existingItemIndex].quantity = quantity.value;
    } else {
        existingCart.unshift({
            product: productid,
            quantity: quantity.value,
            color: selectedColor.value
        });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    router.push('/cart');
};

onMounted(getItem);

</script>