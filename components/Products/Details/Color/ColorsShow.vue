<script setup lang="ts">
import { deleteColor, showColor } from '~/services/ColorService';
import { deleteFile } from '~/services/UploadFileService';
import ColorsAdd from './ColorsAdd.vue';



const columns = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'colorName',
    label: 'name'
  },
  {
    key: 'colorImage',
    label: 'Image'
  },
  {
    key: 'actions'
  }
];

const colorData = ref([]);
const loading = ref(false);
const editMode = ref(false);
const selectedColorData = ref({});
const getItem = async () => {
  try {
    loading.value = true;
    const data: any = await showColor();
    loading.value = false;
    let items = data.data[0];
    colorData.value = items;
  } catch (err) {
    console.log(err);
  }
};

onMounted(getItem);
const colorHandler = () => {
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
        selectedColorData.value = { ...row };
      }
    },
    {
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid',
      click: () => {
        deleteColor(row.id);
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
    <ColorsAdd :colorData="selectedColorData" :editMode="editMode" @colorAdded="colorHandler"/>
     <hr class="border-t-2 border-white my-10"/>
  <div class="flex justify-center  h-auto">
    <UTable :loading="loading" :rows="colorData" :columns="columns" class="border rounded-lg bg-gray-900 w-3/4">
    <template #colorName-data="{ row }">
      <span class="text-primary-400">{{ row.name }}</span>
    </template>
    <template #colorImage-data="{ row }">
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

