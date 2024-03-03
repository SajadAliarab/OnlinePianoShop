<script setup >
import { _lg } from '#tailwind-config/theme/typography';
import { showSlide } from '~/servies/SlideService';

const slideData = ref([]);

const getItem=async()=>{
try{
     const data= await showSlide();
      
  let items= data.data[0];
  slideData.value =items;
}catch(err){
 console.log(err)
}   
}
getItem();
</script>

<template>
 <UCarousel v-slot="{ item }" :items="slideData"  class="w-screen h-auto overflow-hidden p-5 " indicators arrows>

    <img :src="item.file" class=" w-screen h-screen" draggable="true" :alt="item.alt">

  </UCarousel>

</template>