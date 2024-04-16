
<template>
   <div class="relative h-screen w-screen bg-cover bg-gray-800 pb-10">
      <SlidesSlider/>
   </div>
</template>
<script setup lang="ts">

const colorMode = useColorMode();
colorMode.value = 'dark';
</script>