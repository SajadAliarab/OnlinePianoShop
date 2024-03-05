<script setup lang="ts">
import { deleteSlide, showSlide } from '~/servies/SlideService';
import { deleteFile } from '~/servies/UploadFileService';



const columns = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'title',
    label: 'Title'
  },
  {
    key: 'link',
    label: 'Link'
  },
  {
    key: 'alt',
    label: 'Alt'
  },
  {
    key: 'file',
    label: 'Image'
  },
  {
    key: 'actions'
  }
];

const slideData = ref([]);
const loading = ref(false);

const getItem = async () => {
  try {
    loading.value = true;
    const data: any = await showSlide();
    loading.value = false;
    let items = data.data[0];
    slideData.value = items;
  } catch (err) {
    console.log(err);
  }
};

onMounted(getItem);
const slideHandler = () => {
  getItem();
};


const items = (row: any) => [
  [
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => console.log('Edit', row.id)
    },
    {
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid',
      click: () => {
        deleteSlide(row.id);
        const file = row.file;
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
     <SlidesAdd @slideAdded="slideHandler"/>
     <hr class="border-t-2 border-white my-10"/>
  <div class="flex justify-center  h-auto">
    <UTable :loading="loading" :rows="slideData" :columns="columns" class="border rounded-lg bg-gray-900 w-3/4">
      getItems();
    <template #name-data="{ row }">
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

