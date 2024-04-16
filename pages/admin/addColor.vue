<script setup lang="ts">
import ColorsShow from '~/components/Products/Details/Color/ColorsShow.vue';
const colorMode = useColorMode();
colorMode.value = 'dark';
</script>
<template>
    <div class="relative h-auto w-full bg-cover bg-gray-800 pb-10">
    <ColorsShow/>
    </div>
</template>