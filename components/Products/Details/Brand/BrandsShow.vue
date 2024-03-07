<script setup lang="ts">
import { deleteBrand, showBrand } from '~/servies/BrandService';
import { deleteFile } from '~/servies/UploadFileService';
import BransAdd from './BransAdd.vue';



const columns = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'brandName',
    label: 'name'
  },
  {
    key: 'brandImage',
    label: 'Image'
  },
  {
    key: 'actions'
  }
];

const brandData = ref([]);
const loading = ref(false);
const editMode = ref(false);
const selectedBrandData = ref({});
const getItem = async () => {
  try {
    loading.value = true;
    const data: any = await showBrand();
    loading.value = false;
    let items = data.data[0];
    brandData.value = items;
  } catch (err) {
    console.log(err);
  }
};

onMounted(getItem);
const brandHandler = () => {
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
        selectedBrandData.value = { ...row };
      }
    },
    {
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid',
      click: () => {
        deleteBrand(row.id);
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
    <BransAdd :brandData="selectedBrandData" :editMode="editMode" @brandAdded="brandHandler"/>
     <hr class="border-t-2 border-white my-10"/>
  <div class="flex justify-center  h-auto">
    <UTable :loading="loading" :rows="brandData" :columns="columns" class="border rounded-lg bg-gray-900 w-3/4">
    <template #brandName-data="{ row }">
      <span class="text-primary-400">{{ row.name }}</span>
    </template>
    <template #brandImage-data="{ row }">
      <img :src="row.image"  class="h-20 w-20" />
    </template>
    <template #actions-data="{ row }">
      <UDropdown :items="items(row)">
        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
      </UDropdown>
    </template>
  </UTable>
  </div>
</template>

