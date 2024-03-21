<script setup lang="ts">
definePageMeta({
  middleware: 'admin-auth'
})
</script>
<template>
    <div class="relative h-auto w-full bg-cover bg-gray-800 pb-10">
    <SlidesShow />
    </div>
</template>
