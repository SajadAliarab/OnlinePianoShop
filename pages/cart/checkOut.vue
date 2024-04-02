<script setup lang="ts">
const deliveryComplete = ref(false);
const items = [{
  label: 'Delivery',
  icon: 'i-heroicons-truck',
  slot: 'Delivery',
  defaultOpen:(deliveryComplete)? true : false
}, {
  label: 'Payment',
  icon: 'i-heroicons-credit-card',
  slot: 'Payment',
  defaultOpen:(!deliveryComplete)? true : false
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