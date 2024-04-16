<template>
    <div class="flex flex-col items-center">
      <div class="w-full my-5"></div>
      <div class="justify-center w-full">
        <UTable :loading="loading" :rows="rows" :columns="columns" class="border rounded-lg bg-gray-900 w-full">
          <template #order_date-data="{ row }">
            <span>{{ format(new Date(row.order_date), 'dd MMM, yyy') }}</span>
          </template>
          <template #total_price-data="{ row }">
            <span>
              <ThePriceFormmater :price="row.total_price" />
            </span>
          </template>
          <template #payment_status-data="{ row }">
            <span v-if="row.payment_status == 'paid'" class="text-green-700">{{row.payment_status}}</span>
            <span v-else class="text-red-700">{{row.payment_status}}</span>
          </template>
          <template #shipping_method-data="{ row }">
            <span v-if="row.shipping_method == 1">Delivery</span>
            <span v-else-if="row.shipping_method == 2">Click and Collect</span>
            <span v-else> Not Choosen</span>
          </template>
          <template #delivery_date-data="{ row }">
            <span v-if="row.delivery_date">{{ format(new Date(row.delivery_date), 'dd MMM, yyy') }}</span>
            <span v-else>Not Choosen</span>
          </template>
          <template #actions-data="{ row }">
            <RouterLink :to="'/profile/orderDetail/' + row.id">
              <UButton size="2xs" icon="i-heroicons-queue-list"> Details </UButton>
            </RouterLink>
          </template>
        </UTable>
      </div>
      <div class="w-full mt-5">
        <div class="flex justify-end px-3 py-3.5 border-t border-gray-700">
          <UPagination v-model="page" :page-count="pageCount" :total="orders.length" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { showOrderByUser } from '~/services/OrderService';
  import { format } from 'date-fns';
  import { RouterLink } from 'vue-router';
  import { getUserToken } from '~/services/AuthService';
  import { ref, computed } from 'vue';
  const colorMode = useColorMode()
colorMode.value = 'dark'
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'order_date', label: 'Order Date' },
    { key: 'total_price', label: 'Total Price' },
    { key: 'delivery_code', label: 'Delivery Code' },
    { key: 'payment_status', label: 'Payment Status' },
    { key: 'shipping_method', label: 'Shipping Method' },
    { key: 'delivery_date', label: 'Delivery Date' },
    { key: 'actions', label: 'Actions' }
  ];
  
  const orders = ref([]);
  const page = ref(1);
  const pageCount = 10;
  const loading = ref(false);
  
  const getItems = async () => {
    try {
      loading.value = true;
      const token: any = localStorage.getItem('auth-data');
      const tokenData = JSON.parse(token);
      const userByToken: any = await getUserToken(tokenData);
      if (userByToken.data.user) {
        const userId = userByToken.data.user;
        const orderData: any = await showOrderByUser(userId);
        orders.value = orderData.data;
        orders.value.sort((a: any, b: any) => b.id - a.id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  };
  getItems();
  
  const rows = computed(() => {
    return orders.value.slice((page.value - 1) * pageCount, page.value * pageCount);
  });
  </script>
  