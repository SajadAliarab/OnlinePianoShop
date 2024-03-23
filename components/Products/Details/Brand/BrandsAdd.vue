<template>
    <UForm :schema="schema" :state="state" class="max-w-sm mx-auto pt-20"  >
      <UIcon name="i-heroicons-plus-circle"  class=" max-w-sm w-full text-2xl"/>
            <h1 v-if="!editMode" class="w-ful text-center text-2xl font-bold">Add Brand</h1>
            <h1 v-if="editMode" class="w-ful text-center text-2xl font-bold">Edit Brand</h1>
            <div class=" p-2 border rounded-lg bg-gray-900 shadow-3xl">
        <UFormGroup label="Brand Name" name="brandName" required>
            <UInput color="primary" type="text" id="brandName" class=" w-full p-2.5 " placeholder="Enter Brand Name" v-model="state.brandName" />
          </UFormGroup>
          <UFormGroup label="Brand Image" name="brandImage" required>
            <UInput color="primary" type="file" ref="fileInput" class=" w-full p-2.5 " @change="onFileChanged"  capture />
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
    import { object, string } from 'yup';
    import { createBrand, updateBrand } from '~/servies/BrandService';
    import type { BrandsModel } from "~/models/BrandsModel";
    import { insertFile} from '~/servies/UploadFileService';
    const props = defineProps<{
      editMode: boolean;
      brandData: any;
    }>()
    const  emit  = defineEmits(['brandAdded']);
    const schema = object({
      brandName:string().required('Required!'),
      brandImage:string().required('Required'),
    
    })
    watch(() => props.brandData, (newValue) => {
      if (newValue) {
        state.brandName = props.brandData.name;
        state.brandImage = props.brandData.image.substring(props.brandData.image.lastIndexOf('/') + 1);
      } else {
        state.brandName = '';
        state.brandImage = '';
      }
    });
    const state:BrandsModel= reactive({
      brandName : '',
      brandImage : '',
    })
    const brandData= ref();
    const loadingBtn=ref(false);
    const warning =ref<[boolean,string]>([false,'']);
    const fileInput = ref<HTMLInputElement | null>(null);
    function onFileChanged() {
                    brandData.value = fileInput.value?.files
    }
    const submitForm=async()=>{
    try{
      loadingBtn.value=true;
        await insertFile(brandData.value[0]);
        state.brandImage=brandData.value[0].name;
        await createBrand(state);
         warning.value=[true,"You have added a brand! "];
         loadingBtn.value=false;
            state.brandName='';
            state.brandImage='';
            fileInput.value!.value='';
        emit('brandAdded');
      } catch (err:any) {
        warning.value=[false,'Please fill all the fields'];
        loadingBtn.value=false;
      }
    }
    const editForm= async()=>{
    try{
      loadingBtn.value=true;
      
      if(brandData.value){
        state.brandImage=brandData.value[0].name;
        await insertFile(brandData.value[0]);
      }
        await updateBrand(props.brandData.id,state);
        warning.value=[true,"You have updated a brand! "];
        loadingBtn.value=false;
        emit('brandAdded');
        state.brandName='';
        state.brandImage='';
        fileInput.value!.value='';
      
    }catch{
      warning.value=[false,'Please fill all the fields'];
      loadingBtn.value=false;
    
    }
    }
    const resetForm=()=>{
      state.brandName='';
      state.brandImage='';
      fileInput.value!.value='';
      emit('brandAdded');
    }
    </script>