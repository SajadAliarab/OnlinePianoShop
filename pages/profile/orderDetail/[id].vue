<template>
    <div class="relative h-screen w-full bg-cover bg-gray-800 pb-10">
    <div class="flex flex-col items-center">
          <div class="w-screen">
          <UButton @click="router.push('/profile')" class="m-5">Back</UButton>
              <div class="flex justify-center ">
          <span class="text-bold ">Order Number:{{ orderId }}</span>
          </div>  
          </div>
      </div>
      <UTable :columns="columns" :rows="orderDetail" :loading="loading" class=" border rounded-lg bg-gray-900 w-auto m-5">
          <template #item-data="{ row }">
              <span>{{ index(row.id) + 1 }}</span>
          </template>
          <template #product_name-data="{ row }">
              <span>{{ getProduct(row.product) }}{{ productName }}</span>
          </template>
          <template #price-data="{ row }">
              <span> <ThePriceFormmater :price= row.price></ThePriceFormmater></span>
            </template>
          <template #order_status-data="{ row }">
              <span v-if="row.order_status == 'delivered'" class="text-green-700">{{ row.order_status }}</span>
              <span v-else-if="row.order_status == 'pending'" class="text-yellow-700">{{ row.order_status }}</span>
              <span v-else-if="row.order_status == 'shipped'" class="text-purple-700">{{ row.order_status }}</span>
              <span v-else class="text-red-700">{{ row.order_status }}</span>
          </template>
          <template #actions-data="{ row }">
            <UButton v-if="row.order_status == 'delivered'" @click="changeStatus(row.id,'returned')" size="2xs" icon="i-heroicons-arrows-left"> Returned</UButton>
            <UButton v-else-if="row.order_status == 'shipped'" @click="changeStatus(row.id, 'returned' )" size="2xs" icon="i-heroicons-arrow-left-circle"> Returned</UButton>
            <UButton v-else-if="row.order_status == 'pending'" @click="changeStatus(row.id, 'canceled' )" size="2xs" icon="i-heroicons-x-circle"> Cancel</UButton>
          
          </template>
  
      </UTable>
    </div>
  </template>
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { getOrderDetail, updateOrderStatus } from '~/services/OrderService';
  import { showProductById } from '~/services/ProductService';
  const colorMode = useColorMode();
  colorMode.value = 'dark';
  const router = useRouter();
  const orderDetail: any = ref([]);
  const productDetail: any = ref([]);
  const orderId: any = router.currentRoute.value.params.id;
  const loading = ref(false);
  const productName = ref('');
  const index = (row: number) => orderDetail.value.findIndex((order: any) => order.id === row);
  const columns = [
      {
          key: 'item',
          label: 'Item'
      }, {
          key: 'product',
          label: 'Product Id'
      }, {
          key: 'product_name',
          label: 'Product Name'
      }, {
          key: 'color',
          label: 'Product Color'
      }, {
          key: 'quantity',
          label: 'Quantity'
      }, {
          key: 'price',
          label: 'Product Price'
      }, {
          key: 'discount',
          label: 'Discount'
      }, {
          key: 'total_price',
          label: 'Total Price'
      }, {
          key: 'order_status',
          label: 'Status'
      }, {
          key: 'actions',
          label: 'Actions'
      }]
  const getItems = async () => {
      loading.value = true;
      const orderData: any = await getOrderDetail(orderId);
      orderDetail.value = orderData.data;
      orderDetail.value.map(async (item: any) => {
          const productData: any = await showProductById(item.product);
          productDetail.value.push(productData.data);
      });
  
      loading.value = false;
  }
  getItems();
  const getProduct = (id: any) => {
      const product = productDetail.value.map((item: any) => {
          if (item.id === id) {
              productName.value = item.title;
          }
      });
  }

  const changeStatus = async (id: any, status: any) => {
    try {

        await updateOrderStatus(id, status);
        getItems();
    } catch (error) {
        console.log(error);
    }
}
  
  
  
  
  
  </script>