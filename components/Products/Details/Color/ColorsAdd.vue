<template>
    <UForm :schema="schema" :state="state" class="max-w-sm mx-auto pt-20"  >
      <UIcon name="i-heroicons-plus-circle"  class=" max-w-sm w-full text-2xl"/>
            <h1 v-if="!editMode" class="w-ful text-center text-2xl font-bold">Add Color</h1>
            <h1 v-if="editMode" class="w-ful text-center text-2xl font-bold">Edit Color</h1>
            <div class=" p-2 border rounded-lg bg-gray-900 shadow-3xl">
        <UFormGroup label="color Name" name="colorName" required>
            <UInput color="primary" type="text" id="colorName" class=" w-full p-2.5 " placeholder="Enter color Name" v-model="state.colorName" />
          </UFormGroup>
          <UFormGroup label="color Image" name="colorImage" required>
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
    import { createColor, updateColor } from '~/services/ColorService';
    import type { ColorsModel } from "~/models/ColorsModel";
    import { insertFile} from '~/services/UploadFileService';
    const props = defineProps<{
      editMode: boolean;
      colorData: any;
    }>()
    const  emit  = defineEmits(['colorAdded']);
    const schema = object({
      colorName:string().required('Required!'),
      colorImage:string().required('Required'),
    
    })
    watch(() => props.colorData, (newValue) => {
      if (newValue) {
        state.colorName = props.colorData.name;
        state.colorImage = props.colorData.image.substring(props.colorData.image.lastIndexOf('/') + 1);
      } else {
        state.colorName = '';
        state.colorImage = '';
      }
    });
    const state:ColorsModel= reactive({
      colorName : '',
      colorImage : '',
    })
    const colorData= ref();
    const loadingBtn=ref(false);
    const warning =ref<[boolean,string]>([false,'']);
    const fileInput = ref<HTMLInputElement | null>(null);
    function onFileChanged() {
                    colorData.value = fileInput.value?.files
    }
    const submitForm=async()=>{
    try{
      loadingBtn.value=true;
        await insertFile(colorData.value[0]);
        state.colorImage=colorData.value[0].name;
        await createColor(state);
         warning.value=[true,"You have added a color! "];
         loadingBtn.value=false;
            state.colorName='';
            state.colorImage='';
            fileInput.value!.value='';
        emit('colorAdded');
      } catch (err:any) {
        warning.value=[false,'Please fill all the fields'];
        loadingBtn.value=false;
      }
    }
    const editForm= async()=>{
    try{
      loadingBtn.value=true;
      
      if(colorData.value){
        state.colorImage=colorData.value[0].name;
        await insertFile(colorData.value[0]);
      }
        await updateColor(props.colorData.id,state);
        warning.value=[true,"You have updated a color! "];
        loadingBtn.value=false;
        emit('colorAdded');
        state.colorName='';
        state.colorImage='';
        fileInput.value!.value='';
      
    }catch{
      warning.value=[false,'Please fill all the fields'];
      loadingBtn.value=false;
    
    }
    }
    const resetForm=()=>{
      state.colorName='';
      state.colorImage='';
      fileInput.value!.value='';
      emit('colorAdded');
    }
    </script>