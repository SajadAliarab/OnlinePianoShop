<template>
    <UForm  class="max-w-sm mx-auto pt-20"  >
      <UIcon name="i-heroicons-plus-circle"  class=" max-w-sm w-full text-2xl"/>
            <h1 v-if="!editMode" class="w-ful text-center text-2xl font-bold">Add Category</h1>
            <h1 v-if="editMode" class="w-ful text-center text-2xl font-bold">Edit Category</h1>
            <div class=" p-2 border rounded-lg bg-gray-900 shadow-3xl">
        <UFormGroup label="Category Name" name="categoryName" required>
            <UInput color="primary" type="text" id="categoryName" class=" w-full p-2.5 " placeholder="Enter Category Name" v-model="categoryName" />
          </UFormGroup>
          <UButton v-if="!editMode" :loading="loadingBtn" color="primary" type="submit" class=" font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 justify-center mb-5" @click="submitForm">Submit</UButton>
          <UButton v-if="editMode" :loading="loadingBtn" color="primary" type="submit" class=" font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 justify-center mb-5" @click="editForm">Edit</UButton>
          <UButton color="red" type="reset" class=" font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 justify-center mb-5 ml-5" @click="resetForm">Reset</UButton>
          <div v-if="warning[1]" :class="{'text-green-700':warning[0],'text-red-700':!warning[0]}">
            <h5 v-text="warning[1]"></h5>
          </div>
          </div>
    </UForm>
    </template>
    <script setup lang="ts">
    import { createCategory, updateCategory } from '~/servies/CategoryService';
    const props = defineProps<{
      editMode: boolean;
      categoryData: any;
    }>()
    const  emit  = defineEmits(['categoryAdded']);

    watch(() => props.categoryData, (newValue) => {
      if (newValue) {
        categoryName.value = props.categoryData.name;
      
      } else {
        categoryName.value = '';
      }
    });
    const categoryName = ref('');
    const categoryData= ref();
    const loadingBtn=ref(false);
    const warning =ref<[boolean,string]>([false,'']);
 
    const submitForm=async()=>{
    try{
      loadingBtn.value=true;
    
        await createCategory(categoryName.value);
         warning.value=[true,"You have added a category! "];
         loadingBtn.value=false;
           categoryName.value='';
        emit('categoryAdded');
      } catch (err:any) {
        warning.value=[false,'Please fill all the fields'];
        loadingBtn.value=false;
      }
    }
    const editForm= async()=>{
    try{
      
        await updateCategory(props.categoryData.id,categoryName.value);
        warning.value=[true,"You have updated a category! "];
        loadingBtn.value=false;
        emit('categoryAdded');
        categoryName.value='';
    
    }catch{
      warning.value=[false,'Please fill all the fields'];
      loadingBtn.value=false;
    
    }
    }
    const resetForm=()=>{
      categoryName.value='';
      emit('categoryAdded');
    }
    </script>