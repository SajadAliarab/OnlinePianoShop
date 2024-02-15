<template>
    <div class="relative h-auto w-full bg-cover bg-gray-800 pb-10">
        <UForm :schema="schemaProduct" :state="product" class="max-w-sm mx-auto pt-20" @submit="submitProduct">
            <UIcon name="i-heroicons-plus-circle" class=" max-w-sm w-full text-2xl" />
            <h1 class="w-ful text-center text-2xl font-bold">Add Product</h1>
            <div class=" p-2 border rounded-lg bg-gray-900 shadow-3xl">
                <UFormGroup label="Product Title:" name="title" required>
                    <UInput color="primary" type="text" id="title" class=" w-full p-2.5 " placeholder="Enter Product Title"
                        v-model="product.title" />
                </UFormGroup>
                <UFormGroup label="Product Price: £" name="price" required>
                    <UInput color="primary" type="input" id="price" class=" w-full p-2.5 " v-model="product.price"
                        placeholder="Enter Product Price" />
                </UFormGroup>
                <UFormGroup label="Product Quantity" name="quantity" required>
                    <UInput color="primary" type="text" id="quantity" class=" w-full p-2.5 " v-model="product.quantity"
                        placeholder="Enter quantity of product" />
                </UFormGroup>
                <UFormGroup label="Product Image" name="image" required>
                    <UInput color="primary" type="file" id="image" class=" w-full p-2.5 " v-model="product.image" />
                </UFormGroup>
                <UFormGroup label="Product Category" name="category" required>
                    <UInputMenu  class=" w-full p-2.5 " selected-icon="i-heroicons-hand-thumb-up-solid" 
                        placeholder="Select a Category"
                        :options="['Digital Piano', 'Digital Grand Piano', 'Accustic Piano', 'Accoustic Grand Piano', 'Custom Piano']"
                        v-model="product.category" />
                </UFormGroup>
                <UFormGroup label="Product Color" name="color" required>
                    <USelectMenu  class=" w-full p-2.5 " v-model="product.color" :options="['Black', 'White', 'Oak', 'Wood']" multiple placeholder="Select colors" />
                </UFormGroup>
                <UFormGroup label="Product Description" name="description" required>
                    <UTextarea class=" w-full p-2.5 " v-model="product.description"/>
                </UFormGroup>

                <UButton color="primary" type="submit"
                    class=" font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 justify-center mb-5">Submit
                </UButton>
                <div v-if="warning[1]" :class="{ 'text-green-700': warning[0], 'text-red-700': !warning[0] }">
                    <h5 v-text="warning[1]"></h5>
                </div>
            </div>
        </UForm>
    </div>
</template>
<script setup lang="ts">
import { number, object, string } from 'yup';

const schemaProduct = object({
    title: string().required('Required!'),
    price: number().positive('Please enter price more than zero').required('Required!'),
    quantity: number()
})
const product = reactive({
    title: '',
    price: '',
    quantity: '',
    image: '',
    category: '',
    color: [],
    description: ''
})
const warning = ref<[boolean, string]>([false, '']);
const submitProduct = async () => {
    try {
        await $fetch('https://piano-shop-default-rtdb.europe-west1.firebasedatabase.app/products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: product.title,
                price: product.price,
                quantity: product.quantity,
                imageUrl: product.image,
                category: product.category,
                color: product.color,
                description: product.description

            }),
        });
        warning.value = [true, "Product added successfully! "];
        product.title = ''
        product.price = ''
        product.quantity = ''
        product.image = ''
        product.category = ''
        product.color = []
        product.description = ''

    } catch (err: any) {
        warning.value = [false, err.message]
    }
}
</script>