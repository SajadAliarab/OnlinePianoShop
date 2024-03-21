<script setup lang="ts">
import ProductShow from '~/components/Products/ProductShow.vue';
definePageMeta({
  middleware: 'admin-auth'
})

</script>
<template>
    <div class="relative h-auto w-full bg-cover bg-gray-800 pb-10">
    <ProductShow/>
    </div>
</template>