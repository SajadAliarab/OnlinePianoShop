<template>
<UForm :state="state" class="max-w-sm mx-auto pt-20" @submit="submitImage" >
    <UFormGroup label="Image Tiltle" name="imageTitle">
        <UInput color="primary" type="text" id="imageTitle" class=" w-full p-2.5 " placeholder="Enter Image Title" v-model="state.imageTitle" />
      </UFormGroup>
      <UButton color="primary" type="submit" class=" font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 justify-center mb-5">Submit</UButton>
      <div v-if="warning[1]" :class="{'text-green-700':warning[0],'text-red-700':!warning[0]}">
        <h5 v-text="warning[1]"></h5>
      </div>
</UForm>
</template>
<script setup lang="ts">
const state = reactive({
  imageTitle : ''
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
        image:state.imageTitle+'.jpg',
        link:'127.0.0.1:3000/products/'+ state.imageTitle,
        alt:state.imageTitle

     }),
    });
    warning.value=[true,"Congras! Your make your Account sucessfully "];
  } catch (err:any) {
    warning.value=[false,err.message]
  }
}
</script>