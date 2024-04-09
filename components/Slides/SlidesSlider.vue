<script setup lang="ts">

import { showSlide } from '~/services/SlideService';


const items:any =ref([]);
const getItem=async()=>{
try{
    const data:any= await showSlide();
     data.data[0].forEach((item:any)=>{
        items.value.push(item)
     })

}catch(err){
    console.log(err)
    }   
    }
   
const carouselRef = ref()

onMounted(() => {
  setInterval(() => {
    if (!carouselRef.value) return

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0)
    }

    carouselRef.value.next()
  }, 1000)
})
getItem();
</script>

<template>
   <UCarousel
    ref="carouselRef"
    v-slot="{ item }"
    :items="items"
    :ui="{ item: 'basis-full' }"
    class="rounded-lg overflow-hidden h-screen w-full relative"
    indicators
    arrows
  >
  <ULink :to="item.link" class="w-full h-screen">
    <img :src="item.file"  class="w-full h-screen" draggable="true">
    </ULink>
  </UCarousel>
</template>