<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { showSlide } from '~/services/SlideService';

const items:any = ref([]);
import { Carousel, Pagination, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'



const getItem = async () => {
  try {
    const data: any = await showSlide();
    data.data[0].forEach((item:any) => {
      items.value.push(item);
    });
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
//   const autoplayInterval = setInterval(() => {
//     if (!carouselRef.value) return

// if (carouselRef.value.page === carouselRef.value.pages) {
//   console.log(carouselRef.value);
//   return carouselRef.value.select(0)
// }

// carouselRef.value.next()
// }, 3000);

//   // Cleanup the interval on component unmount
//   onUnmounted(() => {
//     clearInterval(autoplayInterval);
//   });

  getItem();
});
</script>

<template>
  <Carousel :autoplay="2000" :wrap-around="true">
    <Slide v-for="slide in items" :key="slide">
      <div class="carousel__item">
        <img :src="slide.file" alt="slide" class="w-screen h-screen" @click=""/>
      </div>
    </Slide>

    <template #addons>
      <Pagination />
    </template>
  </Carousel>
</template>