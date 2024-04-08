<template>
     <UProgress v-if="loading" animation="carousel" />
     <USkeleton v-if="loading" class="h-[460px] w-screen"/> 
 <div v-if="!loading">    
<div class="flex flex-col items-center">
    <h1 class="font-bold text-primary-100">Orders Delivery</h1>
    <span  class="text-center mt-3" v-if="phone">Phone:{{ userData.phone }}
        <p class=" text-center text-red-800 m-5" @click=editPhone>
        Change Phone Number
    </p></span>
    <span v-else>
        <UFormGroup label="Phone:" name="phone" required>
                    <UInput color="primary" type="text" id="phone" class=" w-full p-2.5 " placeholder="Enter Your Phone without code"
                        v-model="userData.phone" />
                </UFormGroup>
                </span>
    <span v-if="userAddress">Delivery Address: {{userData.address}},{{ userData.city }},{{ userData.country }}
    <p class=" text-center text-red-800 m-5" @click=editAddress>
        Change delivery address
    </p></span>
    <span v-else>
        <UFormGroup label="Country:" name="country" required>
                    <USelect color="primary" id="country" class=" w-full p-2.5 " placeholder="Select Your Country"
                        v-model="userData.country" :options="countries" />
                    <UFormGroup v-if="userData.country=='United Kingdom'" label="postCode:" name="postCode" required>
                        <UInput color="primary" type="text" id="name" class=" w-full p-2.5 "
                            placeholder="Enter Your postecode" v-model="userData.postCode" />
                        <UButton   variant="solid" icon="i-heroicons-magnifying-glass-circle"
                        size="sm" color="primary" class="ml-2" square 
                            @click="isOpen=true">Find Address</UButton>
                        <UModal v-model="isOpen">
                            <UCommandPalette v-model="selected" searchable
                                :groups="[{ key: 'addresse', commands: addresses }]" />
                        </UModal>
                        <UFormGroup label="Address:" name="address" required>
                            <UInput color="primary" type="text" id="city" class=" w-full p-2.5 " v-model="userData.city"
                                disabled />
                        <UTextarea color="primary" type="text" id="address" class=" w-full p-2.5 " v-model="userData.address"
                            disabled />
                            </UFormGroup>
                        </UFormGroup>
                    <UFormGroup v-else-if="userData.country!='United Kingdom'&& userData.country!=null" label="Address:" name="address" required>
                        <UInput color="primary" type="text" id="city" class=" w-full p-2.5 " placeholder="Enter Your City"
                            v-model="userData.city" />
                            <UTextarea color="primary" type="text" id="address" class=" w-full p-2.5 " placeholder="Enter Your Address"
                            v-model="userData.address" />
                            <UInput color="primary" type="text" id="postCode" class=" w-full p-2.5 " placeholder="Enter Your PostCode" v-model="userData.postCode"/>
                    </UFormGroup>
                    </UFormGroup>     
                </span>
                <URadioGroup v-model="orderData.shipping_method" legend="Choose your prefer shipping:" :options="DeliveryMethod" />
                

                <p v-if="orderData.delivery_date"  class=" font-bold text-primary-100 m-5">Perefer Date for Delivery or click and Collect.(After {{ format(new Date(orderData.delivery_date),'d MMM, yyy') }})</p>
                <UPopover v-if="orderData.delivery_date" >
    <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(new Date(date), 'd MMM, yyy')" />
    <template #panel="{ close }">
        <VCalendarDatePicker :is-dark="true" v-model.string="date" :masks="masks" :disabled-dates="disabledDates" />
    </template>
  </UPopover>

                <UButton  variant="solid" icon="i-heroicons-check-circle" size="lg" color="primary" class="mt-5" square @click="orderUpdate" :loading="loadingBtn">Complete Order</UButton>

                <p v-if="warning[0]" class="text-red-800 m-5">{{ warning[1] }}</p>
                <p v-else-if="!warning[0]" class="text-green-800 m-5">{{ warning[1] }}</p>
</div>    
</div>  
</template>
<script setup lang="ts">
import { getUserData, getUserToken } from '~/services/AuthService';
import { getOrderListLast, updateOrder } from '~/services/OrderService';
import { Country } from '~/enums/country.enum';
import { ref, watch } from 'vue';
import type { UsersModel } from '~/models/UsersModel';
import { DatePicker as VCalendarDatePicker } from 'v-calendar'
import 'v-calendar/style.css';
import { addDays, format } from 'date-fns';
import { updateUser } from '~/services/UserService';




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

const userId = ref(0);
const orderData:any= ref({});
const countries = Object.values(Country);
const selected: any = ref('');
const isOpen = ref(false);
const addresses = ref();
const phone = ref('');
const userAddress = ref('');
const loadingBtn = ref(false);
const date= ref('');
const warning = ref<[boolean, string]>([false, '']);
const loading = ref(false);
const  emit  = defineEmits(['deliveryComplete']);
const masks = ref({
  modelValue: 'YYYY-MM-DD',
});
const disabledDates = ref([
  { start: addDays(new Date(), 30), end: null }
]);

const getData = async () => {
loading.value = true;
const token:any = localStorage.getItem('auth-data');
const tokenData = JSON.parse(token);
const userByToken:any = await getUserToken(tokenData);
userId.value = userByToken.data.user;
const user:any= await getUserData(userId.value);
userData.role = user.data.role;
userData.name = user.data.name;
userData.email = user.data.email;
userData.phone = user.data.phone;
userData.country = user.data.country;
userData.city = user.data.city;
userData.postCode = user.data.postCode;
userData.address = user.data.address;
const order:any= await getOrderListLast(user.data.id);
orderData.value = order.data;
date.value = order.data.delivery_date;
phone.value = user.data.phone;
userAddress.value = user.data.address;
loading.value = false;
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

    userAddress.value = "";
    userData.country = "";
    userData.city = "";
    userData.postCode = "";
    userData.address = "";
};

const editPhone =()=>{
    phone.value="";
}
const orderUpdate = async () => {
    loadingBtn.value = true;
    if(phone && userData.address && userData.city && userData.country && userData.postCode && orderData.value.shipping_method!=0) {
        if(orderData.value.delivery_date <= date.value){
            try{
                orderData.value.delivery_date = date.value;
                await updateOrder(orderData.value , orderData.value.id)
                await updateUser(userId.value,userData)
                emit('deliveryComplete');
            warning.value = [false, 'Order delivery completed successfully'];
            }catch(error){
                console.error('Error updating order:', error);
            }
        }else{
            warning.value = [true, 'Please select a date after the delivery date'];
        }
    }else{
        warning.value = [true, 'Please fill all fields'];
    }
    
    loadingBtn.value = false;
};


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