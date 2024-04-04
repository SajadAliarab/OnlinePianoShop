<template>
   <div class="flex flex-col items-center">
    <div class="w-screen my-5">
    <div class="flex justify-center px-3 py-3.5 border-gray-700">
      <UInput v-model="search" placeholder="Filter users..." />
    </div>
    </div>
    <div class=" justify-center w-screen">
    <UTable :loading="loading" :rows="(search)?filteredRows : rows" :columns="columns" class=" border rounded-lg bg-gray-900 w-screen">
      <template #role-data="{row}">
      <span>{{(row.role==1)?'Admin':'Client'}}</span>
    </template>
    <template #created_at-data="{row}">
      <span>{{format(new Date(row.created_at), 'd MMM, yyy')}}</span>
    </template>
    <template #actions-data="{ row }">
      <UDropdown :items="items(row)">
        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
      </UDropdown>
    </template>
    </UTable>
    </div>
    <div class="w-full mt-5">
      <div class="flex justify-end px-3 py-3.5 border-t  border-gray-700">
      <UPagination v-model="page" :page-count="pageCount" :total="users.length" />
    </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getUsers,updateUser,deleteUser } from '~/services/UserService';
import { format } from 'date-fns';


const columns = [
  {
    key: 'actions',
    label: 'Actions'
},{
  key: 'id',
  label: 'ID'
}, {
  key: 'name',
  label: 'Name'
}, {
  key: 'email',
  label: 'Email'
}, {
  key: 'role',
  label: 'Role'
},{
    key: 'created_at',
    label: 'Joined At'  
},{
    key: 'phone',
    label: 'Phone Number'  
},{
    key: 'address',
    label: 'Address'
},{
    key: 'country',
    label: 'Country'
},{
    key: 'city',
    label: 'City'
},{
    key: 'postCode',
    label: 'Post Code'
}]

const users:any = ref([]);
 
const search = ref('');
const page = ref(1);
const pageCount = 5;
const loading = ref(false);
const getItems=async()=>{
  try{
    loading.value=true;
    const data:any=await getUsers();
    users.value=data.data;
  }catch(err){
    console.log(err);
  }
  loading.value=false;
}
getItems();

const items = (row: any) => [
  [
    {
      label: 'Change Role',
      icon: 'i-heroicons-user-circle-20-solid',
      click:async () => {
        if(row.role=='1'){
          row.role='0';
          const test = {...row};
          await updateUser(row.id,test);
          getItems();
      }else{
          row.role='1';
          const test = {...row};
          await updateUser(row.id,test);
          getItems();
      }
      }
    },
    {
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid',
      click:async() => {
        await deleteUser(row.id);
        getItems();
      }
    }
  ]
];

const rows = computed(() => {
  return users.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

const filteredRows = computed(() => {
  if (!search.value) {
    return users
  }

  return users.value.filter((user:any) => {
    return Object.values(user).some((value) => {
      return String(value).toLowerCase().includes(search.value.toLowerCase())
    })
  })
})


</script>