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

</script>

<template>

  <UAccordion   :items="items">

    <template v-if="!deliveryComplete"  #Delivery>
     <OrdersDelivery  @deliveryComplete="deliveryComplete=true" />
    </template>
    <template v-if="deliveryComplete" #Payment> 
      <OrdersPayment />
     </template>
  </UAccordion>

</template>