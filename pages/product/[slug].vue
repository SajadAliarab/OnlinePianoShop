<template>
    <UProgress v-if="loading" animation="carousel" />
    <USkeleton v-if="loading" class="h-[460px] w-screen" />


    <div v-if="!loading" class="bg-gray-800 py-8">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row -mx-4">

                <div class="w-1/2 md:flex-1 px-4">
                    <div class="h-[460px] rounded-lg bg-gray-700 mb-4">

                        <img class="w-full h-full object-cover"
                            :src="'http://localhost:8000/uploads/' + productData.image" alt="Product Image">
                    </div>
                    <div class="flex -mx-2 mb-4">
                        <div class="w-full px-2">
                            <UButton v-if="productData.stock > 0" color="primary" variant="solid" block
                                @click="isOpen = true"> Add To Cart
                            </UButton>
                            <UModal v-model="isOpen">
                                <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                                    <template #header>
                                        <Placeholder class="h-8" />
                                        <h2 class="text-2xl font-bold text-gray-300">Add to Cart</h2>

                                    </template>

                                    <Placeholder class="h-32" />
                                    <div class="flex items-start">
                                        <div class="ml-4">
                                            <h3 class="text-lg font-bold text-gray-300">{{ productData.title }}</h3>
                                            <span class="text-gray-500 text-sm">{{ productCategory }}</span>
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
                                                <img v-for="color in productColor" class="w-12 h-12 rounded-full bg-gray-200 mr-2"
                                :src="'http://localhost:8000/uploads/' + color.image" :alt="color.name"
                                :title="color.name" @click="selectColor(color.name)"></img>
                                            </div>
                                        </div>
                                        </div>



                                    <template #footer>
                                        <Placeholder class="h-8" />
                                        <div class="flex justify-between">
                                            <div>
                                                <UButton color="primary" variant="solid" @click=continueShop>
                                                    Continue Shopping
                                                </UButton>
                                            </div>
                                            <div>
                                                <UButton color="green" variant="solid" @click="isOpen = false">
                                                    Checkout
                                                </UButton>
                                            </div>
                                        </div>

                                    </template>
                                </UCard>
                            </UModal>
                            <UButton v-if="productData.stock==0" color="gray" variants="solid" disabled>Out of Stock</UButton>
                        </div>
                    </div>
                </div>

                <div class="w-1/2 md:flex-1 px-4">
                    <h2 class="text-2xl font-bold text-white mb-2">{{ productData.title }}</h2>
                    <div class="mb-4">
                        <span class=" text-2xl font-bold text-gray-300">{{ productCategory }}</span>
                    </div>
                    <div class="mb-4">
                        <span class=" text-2xl font-bold text-gray-300">{{ convertToStars(productData.rating) }}</span>
                    </div>

                    <div class="flex mb-4">
                        <div class="mr-4">
                            <span class="text-lg font-bold text-gray-300">Price:</span>
                            <span v-if="productData.discount == 0" class="font-bold text-gray-300">
                                <ThePriceFormmater :price=productData.price />
                            </span>
                            <span v-if="productData.discount > 0" class="font-bold text-gray-300 line-through">
                                <ThePriceFormmater :price=productData.price />
                            </span>
                            <br>
                            <span v-if="productData.discount > 0" class="text-lg font-bold text-red-700">Offer
                                Price:</span>
                            <span v-if="productData.discount > 0" class="font-bold text-red-700">
                                <ThePriceFormmater :price=productData.price-productData.discount />
                            </span>
                        </div>
                        <div>
                            <span class="font-bold text-lg text-gray-300">Availability:</span>
                            <span v-if="productData.stock > 0" class="font-bold text-gray-300">In Stock</span>
                            <span v-if="productData.stock == 0" class="font-bold text-red-700">Out of Stock</span>
                        </div>
                        <div class="ml-4">
                            <span class="font-bold text-lg text-gray-300">Status:</span>
                            <span v-if="productData.status == 'New'" class="font-bold text-green-700">New</span>
                            <span v-if="productData.status == 'Used'" class="font-bold text-red-700">Used</span>
                        </div>
                    </div>
                    <div class="mb-4">
                        <span class="text-lg font-bold text-gray-300">Brand:</span>
                        <div class="flex items-center mt-2">
                            <img class="w-1/2 h-1/2  mr-2" :src="'http://localhost:8000/uploads/' + productBrandImage"
                                :title="productBrand" :alt="productBrand"></img>

                        </div>
                    </div>

                    <div class="mb-4">
                        <span class="text-lg font-bold text-gray-300">Color:</span>
                        <div class="flex items-center mt-2">
                            <img v-for="color in productColor" class="w-12 h-12 rounded-full bg-gray-200 mr-2"
                                :src="'http://localhost:8000/uploads/' + color.image" :alt="color.name"
                                :title="color.name"></img>

                        </div>
                    </div>

                    <div>
                        <span class="font-bold text-gray-300">Product Description:</span>
                        <div class="flex items-center mt-2">
                            <p class="text-gray-300 text-sm mt-2">
                                {{ productData.description }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup lang="ts">
import { showBrandById } from '~/servies/BrandService';
import { showCategoryById } from '~/servies/CategoryService';
import { showProductBySlug } from '~/servies/ProductService';

const router: any = useRoute();
const productData: any = ref({});
const productColor: any = ref({});
const productBrand: any = ref({});
const productCategory: any = ref('');
const productBrandImage: any = ref('');
const loading = ref(false);
const isOpen = ref(false);
const quantity = ref(1);
const selectedColor = ref('');
const getItem = async () => {
    try {
        loading.value = true;
        const data: any = await showProductBySlug(router.params.slug);
        productData.value = data.data;
        productColor.value = data.colors;
        if (data.colors.length == 1) {
            selectedColor.value = data.colors[0].name;
        }
        const brand: any = await showBrandById(data.data.brand_id);
        productBrand.value = brand.data[0].name;
        productBrandImage.value = brand.data[0].image;
        const category: any = await showCategoryById(data.data.category_id);
        productCategory.value = category.data[0].name;
        loading.value = false;

    } catch (err) {
        console.log(err);
    }
};
const convertToStars = (rating: number) => {
    const roundedRating = Math.round(rating);
    return '★'.repeat(roundedRating) + '☆'.repeat(5 - roundedRating);
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
const continueShop = () => {
    isOpen.value = false;
    
    localStorage.setItem('cart', JSON.stringify({
        product: productData.value.id,
        quantity: quantity.value,
        color: selectedColor.value
    }));
};

getItem();
</script>
