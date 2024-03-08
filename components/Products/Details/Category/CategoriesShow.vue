<script setup lang="ts">
import { deleteCategory, showCategory } from '~/servies/CategoryService';
import CategoriesAdd from './CategoriesAdd.vue';



const columns = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'categoryName',
    label: 'name'
  },
  {
    key: 'actions'
  }
];
const categoryData = ref([]);
const loading = ref(false);
const editMode = ref(false);
const selectedCategoryData = ref({});
const getItem = async () => {
  try {
    loading.value = true;
    const data: any = await showCategory();
    loading.value = false;
    let items = data.data[0];
    categoryData.value = items;
  } catch (err) {
    console.log(err);
  }
};

onMounted(getItem);
const categoryHandler = () => {
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
        selectedCategoryData.value = { ...row };
      }
    },
    {
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid',
      click: () => {
        deleteCategory(row.id);
        getItem();
        getItem();
      }
    }
  ]
];

</script>

<template>
    <CategoriesAdd :categoryData="selectedCategoryData" :editMode="editMode" @categoryAdded="categoryHandler"/>
     <hr class="border-t-2 border-white my-10"/>
  <div class="flex justify-center  h-auto">
    <UTable :loading="loading" :rows="categoryData" :columns="columns" class="border rounded-lg bg-gray-900 w-3/4">
    <template #categoryName-data="{ row }">
      <span class="text-primary-400">{{ row.name }}</span>
    </template>
    <template #actions-data="{ row }">
      <UDropdown :items="items(row)">
        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
      </UDropdown>
    </template>
  </UTable>
  </div>
</template>

