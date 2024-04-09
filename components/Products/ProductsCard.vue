<template>
          <UProgress v-if="loading" animation="carousel" />
     <USkeleton v-if="loading" class="h-[460px] w-screen" />
    <div v-if="!loading" class="bg-gray-800 py-16 w-screen h-auto">
    <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-white mb-8">Products</h2>
        <div class="flex items-center justify-between mb-8">
            <div class="flex items-center">
                <USelectMenu v-model="selectedCategory" :options="categories" placeholder="Select Category" />
                <USelectMenu v-model="selectedBrand" :options="brands" placeholder="Select Brand" />
            </div>
            </div>
            <div v-if="rows.length==0" class="text-white text-center text-2xl">No products found</div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div v-for="product in rows" class="bg-gray-800 rounded-lg shadow-lg p-8">
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
    
                  <UModal v-model="isOpen"  :overlay="false">
                    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">

                                    <template #header>
                                      <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Add to basket
            </h3>
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
                                                    variant="ghost" @click="addQuantity(selectedProductStock)" />
                                                <span class="text-lg font-bold text-gray-300">{{ quantity }}</span>
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
                                    <div v-if="warning" class="flex items-center mt-4">
                                        <span class="text-gray-300 font-bold text-lg">warning:</span>
                                        <span class="text-red-500 font-bold text-lg">{{ warning }}</span>
                                    </div>

                                       
                                    <template #footer>
                                        <div class="flex justify-between">
                                            <div>
                                                <UButton color="primary" variant="solid" @click=continueShop(selectedProductId,selectedProductStock)>
                                                    Continue Shopping
                                                </UButton>
                                            </div>
                                            <div>
                                                <UButton color="green" variant="solid" @click=checkOut(selectedProductId,selectedProductStock)>
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
        <div class="w-full mt-5">
      <div class="flex justify-center px-3 py-3.5 border-t  border-gray-700">
      <UPagination v-model="page" :page-count="pageCount" :total="productData.length" />
        <USelectMenu v-model="pageCount" :options="[6, 12, 24, 50]" />

    </div>
    </div>
    </div>
</div>

</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { showBrand, showBrandById } from '~/services/BrandService';
import { showCategory, showCategoryById } from '~/services/CategoryService';
import { showProduct } from '~/services/ProductService';
import { showColorById } from '~/services/ColorService';
const categories:any = ref([]);
const brands:any = ref([]);
const selectedCategory= ref({id:0});
const selectedBrand= ref({id:0});
const page = ref(1);
const pageCount = ref(6);
const productData:any = ref([]);
const selectedProductBrand = ref('');
const selectedProductCategory = ref('');
const selectedProductTitle = ref('');
const selectedProductColor:any = ref({});
const selectedProductId = ref(0);
const selectedColor = ref('');
const selectedProductStock = ref(0);
const warning = ref('');
const router = useRouter();
const quantity = ref(1);
const loading = ref(false);
const showMore = ref(false);
const isOpen = ref(false);
const getItem = async () => {
  try {
    loading.value = true;
    const data:any= await showProduct();
    productData.value = data.data;
    const category:any= await showCategory();
    const categoriesData = category.data[0];
    categoriesData.forEach((category:any) => {
        categories.value.push({ label: category.name, id: category.id });
    });
    categories.value.unshift({ label: 'All Categories', id: 0 });
    const brand:any= await showBrand();
    const brandsData = brand.data[0];
    brandsData.forEach((brand:any) => {
        brands.value.push({ label: brand.name, id: brand.id });
    });
    brands.value.unshift({ label: 'All Brands', id: 0 });
    loading.value = false;
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
    quantity.value = 1;
    selectedColor.value = '';
    selectedProductId.value=id;
    const selectedProduct:any = productData.value.find((product:any) => product.id === id);

        selectedProductTitle.value = selectedProduct.title;
        const brand: any = await showBrandById(selectedProduct.brand);
        selectedProductBrand.value = brand.data[0].name;
        const category: any = await showCategoryById(selectedProduct.category);
        selectedProductCategory.value = category.data[0].name;

        const colorPromises = selectedProduct.colors.map((colorId:any) => showColorById(colorId));
        const colorResults = await Promise.all(colorPromises);
        selectedProductColor.value = colorResults.map((color:any) => color.data[0]);

        selectedProductStock.value = selectedProduct.stock;
    
        
 
};
const addQuantity = (productStock:number) => {
    isOpen.value = true;
    if(quantity.value < productStock){
    quantity.value++;
    }
};
const minusQuantity = () => {
    isOpen.value = true;
    if (quantity.value > 1) {
        quantity.value--;
    }
};
const selectColor = (color: string) => {
    selectedColor.value = color;
    isOpen.value = true;
    warning.value = '';
};
const continueShop = (productid:number,productStock:number) => {
    if(selectedColor.value === '') {
        warning.value = 'Please select a color ';
        isOpen.value = true;
        return;
    }else if(quantity.value > productStock){
        warning.value = 'The quantity you selected is more than the available stock';
        isOpen.value = true;    
        return;
    }else{
        warning.value = '';

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
}
};
const checkOut = (productid:number,productStock:number) => {
    if(selectedColor.value === '') {
        warning.value = 'Please select a color ';
        isOpen.value = true;
        return;
    }else if(quantity.value > productStock){
        warning.value = 'The quantity you selected is more than the available stock';
        isOpen.value = true;
        return;
    }else{
    isOpen.value = false;
    warning.value = '';
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
    router.push('/cart/');
}
};
const rows = computed(() => {
    if(selectedCategory.value.id === 0 && selectedBrand.value.id === 0){
        return productData.value.slice((page.value - 1) * pageCount.value, (page.value) * pageCount.value)
    }else if(selectedCategory.value.id !== 0 && selectedBrand.value.id === 0){
        return productData.value.filter((product:any) => product.category == selectedCategory.value.id).slice((page.value - 1) * pageCount.value, (page.value) * pageCount.value)
    }else if(selectedCategory.value.id === 0 && selectedBrand.value.id !== 0){
        return productData.value.filter((product:any) => product.brand === selectedBrand.value.id).slice((page.value - 1) * pageCount.value, (page.value) * pageCount.value)
    }else{
        return productData.value.filter((product:any) => product.category === selectedCategory.value.id && product.brand === selectedBrand.value.id).slice((page.value - 1) * pageCount.value, (page.value) * pageCount.value)
    }
})

onMounted(getItem);

</script>