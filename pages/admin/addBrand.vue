
<template>
    <div class="relative h-auto w-full bg-cover bg-gray-800 pb-10">
    <BrandsShow/>
    </div>
</template>
<script setup lang="ts">
import BrandsShow from '~/components/Products/Details/Brand/BrandsShow.vue';
definePageMeta({
  middleware: 'admin-auth'
})
</script>