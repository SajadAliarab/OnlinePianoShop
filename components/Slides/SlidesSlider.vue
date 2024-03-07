<template>
  <div class="carousel overflow-hidden"
  @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @mousemove="handleMouseMove"
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave">
    <div v-if="slideData.length > 0" class="w-full h-80 slide flex transition-transform duration-500 ease-in-out" :style="{ transform: 'translateX(' + (-currentIndex * 100) + '%)' }">
      <div v-for="(item, index) in slideData" :key="index" class="slide-item w-full flex-shrink-0">
        <img :src="item.file" :alt="item.alt" class="w-full h-auto object-contain" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showSlide } from '~/servies/SlideService';


const slideData:any = ref([]);
const currentIndex = ref(0);
const isDragging = ref(false);

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
    if (!isDragging.value) {
    currentIndex.value = (currentIndex.value + 1) % slideData.value.length;
    }
  }, 4000); 
};

onMounted(() => {
  getItem();
  startAutoPlay();
});
const handleMouseUp = () => {
  isDragging.value = false;
};

const handleMouseDown = () => {
  isDragging.value = true;
};
const handleMouseMove = (event: MouseEvent) => {
  if (isDragging.value) {
    const movementX = event.movementX;
    const threshold = 70; 
    if (movementX > threshold) {
      currentIndex.value = Math.max(currentIndex.value - 1, 0);
    } else if (movementX < -threshold) {
      currentIndex.value = Math.min(currentIndex.value + 1, slideData.value.length - 1);
    }
  }
};
const handleMouseOver = () => {
  if (intervalId) {
    clearInterval(intervalId);
  }
};
const handleMouseLeave = () => {
   startAutoPlay();
};
onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>
