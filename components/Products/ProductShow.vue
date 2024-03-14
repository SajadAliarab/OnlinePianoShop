<script setup lang="ts">
import { deleteProduct, showProduct } from '~/servies/ProductService';
import { deleteFile } from '~/servies/UploadFileService';
import ProductsAdd from './ProductsAdd.vue';



const columns = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'title',
    label: 'title'
  },
  {
    key: 'slug',
    label: 'slug'
  },
    {
        key: 'price',
        label: 'price'
    },
    {
        key: 'stock',
        label: 'stock'
    },
    {
        key: 'image',
        label: 'image'
    },
    {
        key: 'discount',
        label: 'discount'
    },
    {
        key: 'status',
        label: 'status'
    },
    
  {
    key: 'actions',
    label: 'Actions'
  }
];

const productData = ref([]);
const loading = ref(false);
const editMode = ref(false);
const selectedProductData = ref({});
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
const productHandler = () => {
  getItem();
  editMode.value = false;
};

const items = (row: any) => [
  [
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => {
        editMode.value = true;
        selectedProductData.value = { ...row };
      }
    },
    {
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid',
      click: () => {
        deleteProduct(row.id);
        const file = row.image;
        const fileName = file.substring(file.lastIndexOf('/') + 1);
        deleteFile(fileName);
        getItem();
        getItem();
      }
    }
  ]
];

</script>

<template>
    <ProductsAdd :productData="selectedProductData" :editMode="editMode" @productAdded="productHandler"/>
     <hr class="border-t-2 border-white my-10"/>
  <div class="flex justify-center  h-auto">
   
    <UTable :loading="loading" :rows="productData" :columns="columns" class="border rounded-lg bg-gray-900 w-3/4">
    <template #title-data="{ row }">
      <span class="text-primary-400">{{ row.title}}</span>
    </template>
    <template #stock-data="{ row }">
      <span :class="{'text-green-500':row.stock>0,'text-red-500':row.stock==0}">{{ row.stock}}</span>
    </template>
    <template #image-data="{ row }">
      <img :src="row.image"  class="h-20 w-20" />
    </template>
    <template #status-data="{ row }">
      <span :class="{'text-green-500':row.status=='New','text-red-500':row.status=='Used'}">{{ row.status}}</span>
    </template>
    <template #actions-data="{ row }">
      <UDropdown :items="items(row)">
        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
      </UDropdown>
    </template>
  </UTable>
  </div>
</template>

