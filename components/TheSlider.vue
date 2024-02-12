<script setup >
import { _lg } from '#tailwind-config/theme/typography';

let slideData = ref([]);

const getItem=async()=>{
try{
     const data= await $fetch('https://piano-shop-default-rtdb.europe-west1.firebasedatabase.app/slideImage.json');
  let items= Object.entries(data).map(val=>{

    return{
      id:val[0],
      ...val[1]
    }
    
  });
  slideData.value = items;
}catch(err){
 console.log(err)
}   
}
getItem();
</script>

<template>
 <UCarousel v-slot="{ item }" :items="slideData"  class="w-auto h-3/4 overflow-hidden p-5 " indicators>

    <img :src="item.image" class=" w-screen rounded-lg" draggable="true">

  </UCarousel>

</template>