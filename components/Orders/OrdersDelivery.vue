<template>
    <div>
        <h1>Orders Delivery</h1>
<div class="flex flex-col items-center">
    <span v-if="userData.phone">Phone:{{ userData.phone }}
        <p class=" text-center text-red-800 m-5" @click=editPhone>
        Change Phone Number
    </p></span>
    <span v-else>
        <UFormGroup label="Phone:" name="phone">
                    <UInput color="primary" type="text" id="phone" class=" w-full p-2.5 " placeholder="Enter Your Phone without code"
                        v-model="userData.phone" />
                </UFormGroup>
                </span>
    <span v-if="userData.address">Delivery Address: {{userData.address}},{{ userData.city }},{{ userData.country }}
    <p class=" text-center text-red-800 m-5" @click=editAddress>
        Change delivery address
    </p></span>
    <span v-else>
        <UFormGroup label="Country:" name="country">
                    <USelect color="primary" id="country" class=" w-full p-2.5 " placeholder="Select Your Country"
                        v-model="userData.country" :options="countries" />
                    <UFormGroup v-if="userData.country=='United Kingdom'" label="postCode:" name="postCode">
                        <UInput color="primary" type="text" id="name" class=" w-full p-2.5 "
                            placeholder="Enter Your postecode" v-model="userData.postCode" />
                        <UButton   variant="solid" icon="i-heroicons-magnifying-glass-circle"
                        size="sm" color="primary" class="ml-2" square 
                            @click="isOpen=true">Find Address</UButton>
                        <UModal v-model="isOpen">
                            <UCommandPalette v-model="selected" searchable
                                :groups="[{ key: 'addresse', commands: addresses }]" />
                        </UModal>
                        <UFormGroup label="Address:" name="address">
                            <UInput color="primary" type="text" id="city" class=" w-full p-2.5 " v-model="userData.city"
                                disabled />
                        <UTextarea color="primary" type="text" id="address" class=" w-full p-2.5 " v-model="userData.address"
                            disabled />
                            </UFormGroup>
                        </UFormGroup>
                    <UFormGroup v-else-if="userData.country!='United Kingdom'&& userData.country!=null" label="Address:" name="address">
                        <UInput color="primary" type="text" id="city" class=" w-full p-2.5 " placeholder="Enter Your City"
                            v-model="userData.city" />
                            <UTextarea color="primary" type="text" id="address" class=" w-full p-2.5 " placeholder="Enter Your Address"
                            v-model="userData.address" />
                            <UInput color="primary" type="text" id="postCode" class=" w-full p-2.5 " placeholder="Enter Your PostCode" v-model="userData.postCode"/>
                    </UFormGroup>
                    </UFormGroup>     
                </span>
                <
                <URadioGroup v-model="orderData.shipping_method" legend="Choose your prefer shipping:" :options="DeliveryMethod" />
                </div>

                <p v-if="orderData.delivery_date" class=" font-bold text-primary-100 m-5">Perefer Date for Delivery or click and Collect.( After {{format(new Date(orderData.delivery_date), 'd MMM, yyy')  }})</p>
                <UPopover v-if="orderData.delivery_date" >
    <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(new Date(orderData.delivery_date), 'd MMM, yyy')" />
    <template #panel="{ close }">
        <VCalendarDatePicker  v-model="orderData.delivery_date" />
    </template>
  </UPopover>

   

    {{ userData }}
    {{ orderData }}
    </div>
</template>
<script setup lang="ts">
import { getUserData, getUserToken } from '~/servies/AuthService';
import { getOrderListLast } from '~/servies/OrderService';
import { Country } from '~/enums/country.enum';
import { ref, watch } from 'vue';
import type { UsersModel } from '~/models/UsersModel';
import {  format } from 'date-fns';
import { DatePicker as VCalendarDatePicker } from 'v-calendar'


const userData: UsersModel = reactive({
    name: '',
    email: '',
    role: 0,
    phone: '',
    country: '',
    city: '',
    postCode: '',
    address: ''
});
const DeliveryMethod = [{
  value: '1',
  label: 'Deliver to address'
}, {
  value: '2',
  label: 'Click and Collect'
}];


const orderData:any= ref({});
const countries = Object.values(Country);
const selected: any = ref('');
const isOpen = ref(false);
const addresses = ref();
const loadingBtn = ref(false);

const getData = async () => {
const token:any = localStorage.getItem('auth-data');
const tokenData = JSON.parse(token);
const userByToken:any = await getUserToken(tokenData);
const user:any= await getUserData(userByToken.data.user);
userData.name = user.data.name;
userData.email = user.data.email;
userData.phone = user.data.phone;
userData.country = user.data.country;
userData.city = user.data.city;
userData.postCode = user.data.postCode;
const order:any= await getOrderListLast(user.data.id);
orderData.value = order.data;
};

const checkPostCode = async () => {
    try {
        if(userData.postCode) {
        const response = await fetch(`https://api.os.uk/search/places/v1/postcode?postcode=${userData.postCode}&key=0tPwwnxOupuvKZN3M9cHG9VFI5Xe3TUA`);
        const data = await response.json();
        const postcodeData = data.results;
        addresses.value = postcodeData.map((address: any) => ({
            id: address.DPA.UPRN,
            label: address.DPA.ADDRESS
        }));
    }
    } catch (error) {
        console.error('Error fetching addresses:', error);
    }
};

const editAddress = ()=>{
    userData.address="";
    userData.city="";
    userData.country="";
    userData.postCode="";
};

const editPhone =()=>{
    userData.phone="";
}


watch(() => userData.postCode, checkPostCode, { deep: true });
watch(selected, () => {
    const addressSelected = selected.value.label;
    const parts = addressSelected.split(","); 
   userData.city = parts[parts.length - 2].trim(); 
   const street = parts.slice(0, -2);
    userData.address = street.join(", ");
    isOpen.value = false;
}, { deep: true });
getData();

</script>