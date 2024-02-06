<template>
    <div class="bg-gray-800 py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row -mx-4">
            <div class="md:flex-1 px-4">
                <div class="h-[460px] rounded-lg bg-gray-700 mb-4">
                    <img class="w-full h-full object-cover" src="/assets/images/piano1.avif" alt="Product Image">
                </div>
                <div class="flex -mx-2 mb-4">
                    <div class="w-1/2 px-2">
                        <UButton color="primary" variant="solid"  block> Add To Cart </UButton>
                    </div>
                    <div class="w-1/2 px-2">
                        <UButton color="primary" variant="solid" block @click="isOpen=true" > Add to Wish </UButton>

  
                    </div>
                </div>
            </div>

            <div class="md:flex-1 px-4">
                <h2 class="text-2xl font-bold text-white mb-2">Product Name</h2>
                <p class="text-gray-300 text-sm mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                    ante justo. Integer euismod libero id mauris malesuada tincidunt.
                </p>
                <div class="flex mb-4">
                    <div class="mr-4">
                        <span class="font-bold text-gray-300">Price:</span>
                        <span class="text-gray-300">$29.99</span>
                    </div>
                    <div>
                        <span class="font-bold text-gray-300">Availability:</span>
                        <span class="text-gray-300">In Stock</span>
                    </div>
                </div>
                <div class="mb-4">
                    <span class="font-bold text-gray-300">Select Color:</span>
                    <div class="flex items-center mt-2">
                        <button class="w-6 h-6 rounded-full bg-gray-200 mr-2"></button>
                        <button class="w-6 h-6 rounded-full bg-red-700 mr-2"></button>
                        <button class="w-6 h-6 rounded-full bg-blue-700 mr-2"></button>
                        <button class="w-6 h-6 rounded-full bg-yellow-700 mr-2"></button>
                    </div>
                </div>

                <div>
                    <span class="font-bold text-gray-300">Product Description:</span>
                    <p class="text-gray-300 text-sm mt-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                        sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla ut
                        lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit. Quisque
                        ut erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum lacinia, non
                        sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt mi consectetur.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script setup lang="ts">
import type { _size } from '#tailwind-config/theme';
let isOpen = ref(false);

</script>