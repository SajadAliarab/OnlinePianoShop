<script setup lang="ts">
import { showSlide } from '~/servies/SlideService';
const columns = [{
  key: 'id',
  label: 'ID'
}, {
  key: 'title',
  label: 'Title'
}, {
  key: 'link',
  label: 'Link'
}, {
  key: 'alt',
  label: 'Alt'
}, {
  key: 'file',
  label: 'Image'
},{
  key: 'actions'
}]

const slideData = ref([]);
const getItem=async()=>{
try{
    const data:any= await showSlide();
      
  let items= data.data[0];
  slideData.value =items;
}catch(err){
 console.log(err)
}   
}
getItem();

const items = (row:any) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row.id)
  }, {
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: () => console.log('Delete', row.id)
  }]
]

</script>

<template>
  <UTable  :rows="slideData" :columns="columns">
    <template #name-data="{ row }">
      <span class="text-primary-400">{{ row.name }}</span>
    </template>

    <template #actions-data="{ row }">
      <UDropdown :items="items(row)">
        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
      </UDropdown>
    </template>
  </UTable>
</template>
