<template>
    <div class="relative h-auto w-full bg-cover bg-gray-800 pb-10">
        <UForm :schema="schemaProduct" :state="product" class="max-w-sm mx-auto pt-20" @submit="submitProduct">
            <UIcon name="i-heroicons-plus-circle" class=" max-w-sm w-full text-2xl" />
             <h1 v-if="!editMode" class="w-ful text-center text-2xl font-bold">Add Product</h1>
            <h1 v-if="editMode" class="w-ful text-center text-2xl font-bold">Edit Product</h1>
            <div class=" p-2 border rounded-lg bg-gray-900 shadow-3xl">
                <UFormGroup label="Product Title:" name="title" required>
                    <UInput color="primary" type="text" id="title" class=" w-full p-2.5 " placeholder="Enter Product Title"
                        v-model="product.title" />
                </UFormGroup>
                <UFormGroup label="Product Slug" name="slug" required>
                    <UInput color="primary" type="text" id="slug" class=" w-full p-2.5 " placeholder="Enter Product Slug"
                        v-model="product.slug" />
                </UFormGroup>
                <UFormGroup label="Product Price" name="price" required>
                    <UInput color="primary" type="number" id="price" class=" w-full p-2.5 " placeholder="Enter Product Price"
                        v-model="product.price" />
                </UFormGroup>
                <UFormGroup label="Product Stock" name="stock" required>
                    <UInput color="primary" type="number" id="stock" class=" w-full p-2.5 " placeholder="Enter Product Stock"
                        v-model="product.stock" />
                </UFormGroup>
                <UFormGroup label="Product Image" name="image">
                    <input color="primary" type="file" ref="fileInput" class=" w-full p-2.5 " @change="onFileChanged" />
                </UFormGroup>
                <UFormGroup label="Product Discount" name="discount" required>
                    <UInput color="primary" type="number" id="discount" class=" w-full p-2.5 "
                        placeholder="Enter Product Discount" v-model="product.discount" />
                </UFormGroup>

                <UFormGroup label="Product Status" name="status" required>
                    <USelectMenu class=" w-full p-2.5 " v-model="product.status" :options="['New', 'Used']"
                        placeholder="Select status" />
                </UFormGroup>
                <UFormGroup label="Product Brand" name="brand" required>
                    <USelectMenu class=" w-full p-2.5 " v-model="selectedBrand" :options="brandsName"
                        placeholder="Select brand" />
                </UFormGroup>
                <UFormGroup label="Product Category" name="category" required>
                    <USelectMenu class=" w-full p-2.5 " v-model="selectedCategory" :options="categoriesName"
                        placeholder="Select category" />
                </UFormGroup>
                <UFormGroup label="Product Color" name="color" required>
                    <USelectMenu  class=" w-full p-2.5 " v-model="selectedColorIds" :options="colorName" multiple placeholder="Select colors" />
                </UFormGroup>
                <UFormGroup label="Product Description" name="description" required>
                    <UTextarea  autoresize size="4xl" rows="20" color="primary"  class=" w-full p-2.5 " v-model="product.description"/>
                </UFormGroup>
                <UButton v-if="!editMode" :loading="loadingBtn" color="primary" type="submit" class=" font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 justify-center mb-5" @click="submitProduct">Submit</UButton>
          <UButton v-if="editMode" :loading="loadingBtn" color="primary" type="submit" class=" font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 justify-center mb-5" @click="editForm">Edit</UButton>
<UButton color="red" class="font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 justify-center mb-5 sm:ml-5" @click="resetForm">Reset</UButton>
                <div v-if="warning[1]" :class="{ 'text-green-700': warning[0], 'text-red-700': !warning[0] }">
                    <h5 v-text="warning[1]"></h5>
                </div>
            </div>
        </UForm>
    </div>
</template>
<script setup lang="ts">
import { number, object, string } from 'yup';
import type { ProductsModel } from '~/models/ProductsModel';
import { showBrand } from '~/services/BrandService';
import { showCategory } from '~/services/CategoryService';
import { showColor } from '~/services/ColorService';
import { createProduct , updateProduct } from '~/services/ProductService';
import { insertFile } from '~/services/UploadFileService';   
const props = defineProps<{
      editMode: boolean;
      productData: any;
    }>()
    const  emit  = defineEmits(['productAdded']);
const schemaProduct = object({
    title: string().required('Required!'),
    slug: string().required('Required!'),
    price: number().positive('Please enter price more than zero').required('Required!'),
    stock: number().required('Required!'),
    status: string().required('Required!'),
    brand: string().required('Required!'),
    category: string().required('Required!'),
})
watch(() => props.productData, (newValue) => {
    if (newValue) {
        product.title = props.productData.title;
        product.slug = props.productData.slug;
        product.price = props.productData.price;
        product.stock = props.productData.stock;
        product.image = props.productData.image.substring(props.productData.image.lastIndexOf('/') + 1);
        product.discount = props.productData.discount;
        product.description = props.productData.description;
        product.status = props.productData.status;
        const BrandSelect:any = brands.value.filter((item:any)=>item.id===props.productData.brand);
        brandValue.value = BrandSelect[0].name;
        product.brand = props.productData.brand;
        const CategorySelect:any = categories.value.filter((item:any)=>item.id===props.productData.category);
        categoryValue.value = CategorySelect[0].name;
        product.category = props.productData.category;
        const colorSelect:any = colorsArray.value.filter((item:any)=>props.productData.colors.includes(item.id));
        colorId.value = colorSelect.map((item:any)=>item.name);
        product.colors = props.productData.colors;
    } else {
        product.title = '';
        product.slug = '';
        product.price = undefined;
        product.stock = undefined;
        product.image = '';
        product.discount = 0;
        product.description = '';
        product.status = '';
        brandValue.value = '';
        categoryValue.value = '';
        colorId.value = [];
    }
});
const product:ProductsModel = reactive({
    title: '',
    slug: '',
    price: undefined,
    review:0,
    rating: 5,
    stock: undefined,
    image: '',
    discount: 0,
    description: '',
    status:'',
    brand:undefined,
    category:undefined,
    colors: []
})

const warning = ref<[boolean, string]>([false, '']);
const loadingBtn=ref(false);
const productImage = ref();
const fileInput = ref<HTMLInputElement | null>(null);
const onFileChanged = () => {
    productImage.value = fileInput.value?.files
    product.image = productImage.value[0].name;
}
const submitProduct = async () => {
    try {
        loadingBtn.value = true;
        await insertFile(productImage.value[0]);
        await createProduct(product);
        warning.value = [true, "You have added a product! "];
        loadingBtn.value = false;
        product.title = '';
        product.slug = '';
        product.price = undefined;
        product.stock = undefined;
        product.image = '';
        product.discount = 0;
        product.description = '';
        product.status = '';
        product.brand = undefined;
        product.category = undefined;
        product.colors = [];
        brandValue.value = '';  
        categoryValue.value = '';
        colorId.value = [];
        fileInput.value!.value = '';
        emit('productAdded');

    } catch (err: any) {
        warning.value = [false, err.message]
        loadingBtn.value = false;
    }
}

const selectedColorIds = computed({
    get: () => colorId.value,
    set: (value) => {
        colorId.value = value;
        const colorS =colorsArray.value.filter((item:any)=>colorId.value.includes(item.name));
        product.colors=colorS.map((item:any)=>item.id);
    }
});

const colorsArray = ref([]);
const colorName:any=ref([]);
const colorId:any=ref([]);
const getColors = async () => {
  try {
    const data: any = await showColor();
    colorsArray.value = data.data[0];
    colorName.value = colorsArray.value.map((item: any) => item.name);
  } catch (err:any) {
    warning.value = [false, err.message]
  }
};
const brands = ref([]);
const brandsName = ref('');
const brandValue = ref('');
const selectedBrand = computed({
    get: () => brandValue.value,
    set: (value) => {
        brandValue.value = value;
        const brandS:any =brands.value.filter((item:any)=>item.name===value);
        product.brand=brandS[0].id;
    }
});
const getBrands = async () => {
  try {
    const data: any = await showBrand();
    brands.value = data.data[0];
    brandsName.value = data.data[0].map((item: any) => item.name);
  } catch (err:any) {
    warning.value = [false, err.message]
  }
};
const categories = ref([]);
const categoriesName = ref('');
const categoryValue = ref('');
const selectedCategory = computed({
    get: () => categoryValue.value,
    set: (value) => {
        categoryValue.value = value;
        const categoryS:any =categories.value.filter((item:any)=>item.name===value);
        product.category=categoryS[0].id;
    }
});
const getCategories = async () => {
  try {
    const data: any = await showCategory();
    categories.value = data.data[0];
    categoriesName.value = data.data[0].map((item: any) => item.name);
  } catch (err:any) {
    warning.value = [false, err.message]
  }
};
const editForm = async () => {
    try {
        loadingBtn.value = true;
        if (productImage.value) {
            product.image = productImage.value[0].name;
            await insertFile(productImage.value[0]);
        }
        await updateProduct(props.productData.id, product);
        warning.value = [true, "You have updated a product! "];
        loadingBtn.value = false;
        emit('productAdded');
        product.title = '';
        product.slug = '';
        product.price = undefined;
        product.stock = undefined;
        product.image = '';
        product.discount = 0;
        product.description = '';
        product.status = '';
        product.brand = undefined;
        product.category = undefined;
        product.colors = [];
        brandValue.value = '';  
        categoryValue.value = '';
        colorId.value = [];
        fileInput.value!.value = '';
    } catch (err: any) {
        warning.value = [false, err.message]
        loadingBtn.value = false;
    }
}
const resetForm = () => {
    product.title = '';
    product.slug = '';
    product.price = undefined;
    product.stock = undefined;
    product.image = '';
    product.discount = 0;
    product.description = '';
    product.status = '';
    product.brand = undefined;
    product.category = undefined;
    product.colors = [];
    brandValue.value = '';  
    categoryValue.value = '';
    colorId.value = [];
    fileInput.value!.value = '';
    emit('productAdded');
}
getColors();
getBrands();
getCategories();


</script>