<template>
<UForm :schema="schema" :state="state" class="max-w-sm mx-auto pt-20" @submit="submitImage" >
  <UIcon name="i-heroicons-plus-circle"  class=" max-w-sm w-full text-2xl"/>
        <h1 class="w-ful text-center text-2xl font-bold">Add Slide</h1>
        <div class=" p-2 border rounded-lg bg-gray-900 shadow-3xl">
    <UFormGroup label="Image Tiltle" name="title" required>
        <UInput color="primary" type="text" id="imageTitle" class=" w-full p-2.5 " placeholder="Enter Image Title" v-model="state.imageTitle" />
      </UFormGroup>
      <UFormGroup label="Image File" name="imageFile" required>
        <input color="primary" type="file" ref="fileInput" class=" w-full p-2.5 " @change="onFileChanged" capture />
      </UFormGroup>
      <UFormGroup label="Image alt" name="imageAlt" required>
        <UInput color="primary" type="text" id="imageAlt" class=" w-full p-2.5 " v-model="state.imageAlt" placeholder="Enter image alt name" />
      </UFormGroup>
      <UFormGroup label="Link" name="imageLink">
        <UInput color="primary" type="text" id="imageLink" class=" w-full p-2.5 " v-model="state.imageLink" placeholder="Please put your link without site name" />
      </UFormGroup>
      <UButton :loading="loadingBtn" color="primary" type="submit" class=" font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 justify-center mb-5">Submit</UButton>
      <div v-if="warning[1]" :class="{'text-green-700':warning[0],'text-red-700':!warning[0]}">
        <h5 v-text="warning[1]"></h5>
      </div>
      </div>
</UForm>
</template>
<script setup lang="ts">
import { object, string } from 'yup';
import { createSlide } from '~/servies/SlideService';
import type { SlidesModel } from "~/models/SlidesModel";
import { uploadFile} from '~/servies/UploadFileService';

const schema = object({
  imageTitle:string().required('Required!'),
  imageAlt:string().required('Required'),

})
const state:SlidesModel= reactive({
  imageTitle : '',
  imageLink:'/',
  imageFile : '',
  imageAlt:''
})
const imageData= ref();
const loadingBtn=ref(false);
const warning =ref<[boolean,string]>([false,'']);
const fileInput = ref<HTMLInputElement | null>(null);
function onFileChanged() {
                imageData.value = fileInput.value?.files
}
const submitImage=async()=>{
try{
  loadingBtn.value=true;
    await uploadFile(imageData.value[0]);
    state.imageFile=imageData.value[0].name;
    await createSlide(state);
     warning.value=[true,"You have added a slide! "];
     loadingBtn.value=false;
    state.imageAlt='';
    state.imageFile='';
    state.imageLink='';
    state.imageTitle='';
  } catch (err:any) {
    warning.value=[false,err.message];
    loadingBtn.value=false;
  }
}
</script>