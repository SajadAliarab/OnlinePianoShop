<script setup lang="ts">
const deliveryComplete = ref(false);
const items = [{
  label: 'Delivery',
  icon: 'i-heroicons-truck',
  slot: 'Delivery',
  defaultOpen:true
}, {
  label: 'Payment',
  icon: 'i-heroicons-credit-card',
  slot: 'Payment',
  defaultOpen:true
}]
const colorMode = useColorMode();
colorMode.value = 'dark';

</script>

<template>
 <div class="relative h-auto w-full bg-cover bg-gray-800 pb-10">
  <UAccordion   :items="items">

    <template v-if="!deliveryComplete"  #Delivery>
     <OrdersDelivery  @deliveryComplete="deliveryComplete=true" />
    </template>
    <template v-if="deliveryComplete" #Payment> 
      <OrdersPayment />
     </template>
  </UAccordion>
</div>
</template>