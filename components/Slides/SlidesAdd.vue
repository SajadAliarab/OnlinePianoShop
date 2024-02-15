<template>
  <div class="relative h-auto w-full bg-cover bg-gray-800 pb-10">
<UForm :schema="schema" :state="state" class="max-w-sm mx-auto pt-20" @submit="submitImage" >
  <UIcon name="i-heroicons-plus-circle"  class=" max-w-sm w-full text-2xl"/>
        <h1 class="w-ful text-center text-2xl font-bold">Add Slide</h1>
        <div class=" p-2 border rounded-lg bg-gray-900 shadow-3xl">
    <UFormGroup label="Image Tiltle" name="imageTitle" required>
        <UInput color="primary" type="text" id="imageTitle" class=" w-full p-2.5 " placeholder="Enter Image Title" v-model="state.imageTitle" />
      </UFormGroup>
      <UFormGroup label="Image File" name="imageFile" required>
        <UInput color="primary" type="file" id="imageFile" class=" w-full p-2.5 " v-model="state.imageFile"  />
      </UFormGroup>
      <UFormGroup label="Image alt" name="imageAlt" required>
        <UInput color="primary" type="text" id="imageAlt" class=" w-full p-2.5 " v-model="state.imageAlt" placeholder="Enter image alt name" />
      </UFormGroup>
      <UFormGroup label="Link" name="imageLink">
        <UInput color="primary" type="text" id="imageLink" class=" w-full p-2.5 " v-model="state.imageLink" placeholder="Please put your link without site name" />
      </UFormGroup>
      <UButton color="primary" type="submit" class=" font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 justify-center mb-5">Submit</UButton>
      <div v-if="warning[1]" :class="{'text-green-700':warning[0],'text-red-700':!warning[0]}">
        <h5 v-text="warning[1]"></h5>
      </div>
      </div>
</UForm>
</div>
</template>
<script setup lang="ts">
import { object, string } from 'yup';

const schema = object({
  imageTitle:string().required('Required!'),
  imageAlt:string().required('Required'),

})
const state = reactive({
  imageTitle : '',
  imageFile : '',
  imageAlt:'',
  imageLink:'/'
})
const warning =ref<[boolean,string]>([false,'']);
const submitImage=async()=>{
try{
     await $fetch('https://piano-shop-default-rtdb.europe-west1.firebasedatabase.app/slideImage.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title:state.imageTitle,
        image:state.imageFile,
        link:state.imageLink,
        alt:state.imageAlt

     }),
    });
    warning.value=[true,"Congras! Your make your Account sucessfully "];
    state.imageAlt=''
    state.imageFile=''
    state.imageLink=''
    state.imageTitle=''
  } catch (err:any) {
    warning.value=[false,err.message]
  }
}
</script>