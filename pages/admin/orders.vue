<template>
    <div class="relative h-auto w-full bg-cover bg-gray-800 pb-10">
        <OrdersShowAdmin />
    </div>
</template>
<script setup lang="ts">
const colorMode = useColorMode();
colorMode.value = 'dark';
</script>