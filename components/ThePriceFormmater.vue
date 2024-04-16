<template>
    <span>{{ formattedPrice }}</span>
  </template>
  
  <script setup lang="ts">
const props = defineProps<{
      price: number;
    }>()
    const colorMode = useColorMode();
colorMode.value = 'dark';
const formattedPrice = computed(() => {
    if (isNaN(props.price)) return props.price;
      const formatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 2,
      });
      return formatter.format(props.price);
    });
  </script>
  