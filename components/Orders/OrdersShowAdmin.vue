<template>
    <div class="flex flex-col items-center">
        <div class="w-screen my-5">
            <div class="flex justify-center px-3 py-3.5 border-gray-700">
                <UInput v-model="search" placeholder="Filter orders..." />
            </div>
        </div>
        <div class=" justify-center w-screen">
            <UTable  :loading="loading" :rows="(search) ? filteredRows : rows" :columns="columns"
                class=" border rounded-lg bg-gray-900 w-screen">
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
                    <span v-if="row.shipping_method == 0">Delivery</span>
                    <span v-if="row.shipping_method == 1">Click and Collect</span>
                </template>
                <template #user_id-data="{ row }">
                    <span>{{getuserName(row.user_id) }}</span>
                </template>
                <template #address-data="{ row }">
                    <span>{{ getuserAddress(row.user_id) }}</span>
                </template>
                <template #country-data="{ row }">
                    <span>{{ getuserCountry(row.user_id) }}</span>
                </template>
                <template #city-data="{ row }">
                    <span>{{ getuserCity(row.user_id) }}</span>
                </template>
                <template #postCode-data="{ row }">
                    <span>{{ getuserPostCode(row.user_id) }}</span>
                </template>
                <template #phone-data="{ row }">
                    <span>{{ getuserPhone(row.user_id) }}</span>
                </template>
                <template #delivery_date-data="{ row }">
                    <span>{{ format(new Date(row.delivery_date), 'dd MMM, yyy') }}</span>
                </template>

     <template #actions-data="{ row }">
        <RouterLink :to="'/admin/orderDetail/' + row.id">
            <UButton size="2xs" icon="i-heroicons-queue-list"> Details </UButton>
        </RouterLink>
     </template>
            </UTable>
        </div>
        <div class="w-full mt-5">
            <div class="flex justify-end px-3 py-3.5 border-t  border-gray-700">
                <UPagination v-model="page" :page-count="pageCount" :total="orders.length" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { getOrdeList } from '~/services/OrderService';
import { format } from 'date-fns';
import { getUsers } from '~/services/UserService';
import { RouterLink } from 'vue-router';

const columns = [
    {
        key: 'id',
        label: 'ID'
    }, {
        key: 'order_date',
        label: 'Order Date'
    }, {
        key: 'total_price',
        label: 'Total Price'
    }, {
        key: 'delivery_code',
        label: 'Delivery Code'
    }, {
        key: 'payment_status',
        label: 'Payment Status'
    }, {
        key: 'shipping_method',
        label: 'Shipping Method'
    }, {
        key: 'user_id',
        label: 'Customer Name'
    }, {
        key: 'address',
        label: 'Customer Address'
    }, {
        key: 'country',
        label: 'Customer Country'
    }, {
        key: 'city',
        label: 'Customer City'
    }, {
        key: 'postCode',
        label: 'Customer Post Code'
    }, {
        key: 'phone',
        label: 'Customer Phone'
    },{
        key: 'delivery_date',
        label: 'Delivery Date'
    }, {
        key: 'actions',
        label: 'Actions'
    }]

const orders: any = ref([]);

const search = ref('');
const page = ref(1);
const pageCount = 10;
const loading = ref(false);
const users: any = ref([]);

const getItems = async () => {
    try {
        loading.value = true;
        const data: any = await getOrdeList();
        orders.value = data.data;
        orders.value.sort((a:any, b:any) => b.id - a.id);
    } catch (err) {
        console.log(err);
    }
    loading.value = false;
}
getItems();
const getUsersData=async()=>{
    try{
        const user:any=await getUsers();
        users.value=user.data;
    }catch(err){
        console.log(err);
    }

    }
getUsersData();

const getuserName=(id:any)=>{
    const user=users.value.find((user:any)=>user.id==id);
    return user.name;
}
const getuserAddress=(id:any)=>{
    const user=users.value.find((user:any)=>user.id==id);
    return user.address;
}
const getuserCountry=(id:any)=>{
    const user=users.value.find((user:any)=>user.id==id);
    return user.country;
}
const getuserCity=(id:any)=>{
    const user=users.value.find((user:any)=>user.id==id);
    return user.city;
}
const getuserPostCode=(id:any)=>{
    const user=users.value.find((user:any)=>user.id==id);
    return user.postCode;
}
const getuserPhone=(id:any)=>{
    const user=users.value.find((user:any)=>user.id==id);
    return user.phone;
}

const rows = computed(() => {
    return orders.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

const filteredRows = computed(() => {
    if (!search.value) {
        return orders
    }

    return orders.value.filter((user: any) => {
        return Object.values(user).some((value) => {
            return String(value).toLowerCase().includes(search.value.toLowerCase())
        })
    })
})


</script>