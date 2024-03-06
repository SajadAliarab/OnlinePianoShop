<template>
  <div class="carousel overflow-hidden">
    <div v-if="slideData.length > 0" class="w-full h-80 slide flex transition-transform duration-500 ease-in-out" :style="{ transform: 'translateX(' + (-currentIndex * 100) + '%)' }">
      <div v-for="(item, index) in slideData" :key="index" class="slide-item w-full flex-shrink-0">
        <img :src="item.file" :alt="item.alt" class="w-full h-auto" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showSlide } from '~/servies/SlideService';


const slideData:any = ref([]);
const currentIndex = ref(0);
let intervalId: NodeJS.Timeout | null = null;
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

const startAutoPlay = () => {
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % slideData.value.length;
  }, 4000); 
};

onMounted(() => {
  getItem();
  startAutoPlay();
});

onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>
