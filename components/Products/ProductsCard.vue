<template>
    
    <div class="bg-gray-800 py-16">
    <div class="container ml-72 mx-auto px-4">
        <h2 class="text-3xl font-bold text-white mb-8">Products</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div class="bg-gray-800 rounded-lg shadow-lg p-8">
                <div class="relative overflow-hidden">
                    <img class="object-cover w-full h-full" src="/assets/images/piano1.avif" alt="Product">
                    <div class="absolute inset-0 flex items-center justify-center">
                        <UButton color="primary" variant="outline">View Product</UButton>
                    </div>
                </div>
                <h3 class="text-xl font-bold text-white mt-4">Product Name</h3>
                <p class="text-gray-300 text-sm mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                    ante justo. Integer euismod libero id mauris malesuada tincidunt.</p>
                <div class="flex items-center justify-between mt-4">
                    <span class="text-white font-bold text-lg">$29.99</span>
                    <UButton color="primary" variants="solid">Add to Cart</UButton>
                </div>
            </div>

            <div class="bg-gray-800 rounded-lg shadow-lg p-8">
                <div class="relative overflow-hidden">
                    <img class="object-cover w-full h-full" src="/assets/images/piano1.avif" alt="Product">
                    <div class="absolute inset-0 flex items-center justify-center">
                        <UButton color="primary" variant="outline">View Product</UButton>
                    </div>
                </div>
                <h3 class="text-xl font-bold text-white mt-4">Product Name</h3>
                <p class="text-gray-300 text-sm mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                    ante justo. Integer euismod libero id mauris malesuada tincidunt.</p>
                <div class="flex items-center justify-between mt-4">
                    <span class="text-white font-bold text-lg">$29.99</span>
                    <UButton color="primary" variants="solid">Add to Cart</UButton>
                </div>
            </div>

            <div class="bg-gray-800 rounded-lg shadow-lg p-8">
                <div class="relative overflow-hidden">
                    <img class="object-cover w-full h-full" src="/assets/images/piano1.avif" alt="Product">
                    <div class="absolute inset-0 flex items-center justify-center">
                        <UButton color="primary" variant="outline">View Product</UButton>
                    </div>
                </div>
                <h3 class="text-xl font-bold text-white mt-4">Product Name</h3>
                <p class="text-gray-300 text-sm mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                    ante justo. Integer euismod libero id mauris malesuada tincidunt.</p>
                <div class="flex items-center justify-between mt-4">
                    <span class="text-white font-bold text-lg">$29.99</span>
                    <UButton color="primary" variants="solid">Add to Cart</UButton>
                </div>
            </div>
            


        </div>

    </div>
</div>

</template>
<script setup lang="ts">

import type { UButton } from '#build/components';
</script>