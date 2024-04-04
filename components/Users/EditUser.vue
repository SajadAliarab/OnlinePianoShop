<template>
    <div class="relative h-auto w-full bg-cover bg-gray-800 pb-10">
        <UForm :schema="schemaUser" :state="userData" class="max-w-sm mx-auto pt-20" @submit="editUser">

            <h1 class="text-2xl text-white font-bold text-center">Compelete Your Profile</h1>
            <div class=" p-2 border rounded-lg bg-gray-900 shadow-3xl">
                <UFormGroup label="Name:" name="name" required>
                    <UInput color="primary" type="text" id="title" class=" w-full p-2.5 "
                        placeholder="Enter Product Title" v-model="userData.name" />
                </UFormGroup>
                <UFormGroup label="Email:" name="email">
                    <UInput color="primary" type="email" id="email" class=" w-full p-2.5 "
                        placeholder="Enter Your Email" v-model="userData.email" disabled />
                </UFormGroup>
                <UFormGroup label="Password:" name="password">
                    <UInput color="primary" type="password" id="password" class=" w-full p-2.5 "
                        placeholder="Enter Your Password" v-model="password" />
                        <p class=" ml-2 text-xs text-green-400">If you do not want change your password please leave it empty</p>
                </UFormGroup>
                <UFormGroup v-if="password!=''"label="Confirm Password" name="confirmPassword" required>
            <UInput color="primary" type="password" id="confirmPassword" class="w-full p-2.5"
              placeholder="Please Enter your Password Again" v-model="confirmPassword" />
          </UFormGroup>
                <UFormGroup label="Phone:" name="phone" required >
                    <UInput color="primary" type="text" id="phone" class=" w-full p-2.5 " placeholder="Enter Your Phone without code"
                        v-model="userData.phone" />
                </UFormGroup>
                <UFormGroup v-if="!addAddress" label="add Address">
                    <UButton icon="i-heroicons-plus-circle" size="sm" color="primary" class="ml-2" square variant="solid"
                        @click="addAddress = true" />
                </UFormGroup>
                <UFormGroup v-if="addAddress" label="Country:" name="country">
                    <USelect color="primary" id="country" class=" w-full p-2.5 " placeholder="Select Your Country"
                        v-model="userData.country" :options="countries" />
                    <UFormGroup v-if="userData.country=='United Kingdom'" label="postCode:" name="postCode">
                        <UInput color="primary" type="text" id="name" class=" w-full p-2.5 "
                            placeholder="Enter Your postecode" v-model="userData.postCode" />
                        <UButton   variant="solid" icon="i-heroicons-magnifying-glass-circle"
                        size="sm" color="primary" class="ml-2" square 
                            @click="isOpen = true">Find Address</UButton>
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
                <UButton  type="submit" :loading="loadingBtn"  variant="solid" color="primary" class=" font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 justify-center mt-5 mb-5">Complete</UButton>
                <div v-if="warning[1]" :class="{ 'text-green-700': warning[0], 'text-red-700': !warning[0] }">
                    <h5 v-text="warning[1]"></h5>
                </div>
            </div>
        </UForm>
    </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { object, string } from 'yup';
import type { UsersModel } from '~/models/UsersModel';
import { getUserData, getUserToken } from '~/services/AuthService';
import { Country } from '~/enums/country.enum';
import { updateUser, changePassword } from '~/services/UserService';

const countries = Object.values(Country);
const addresses = ref();
const selected: any = ref('');
const isOpen = ref(false);
const addAddress = ref(false);
const password = ref('');
const confirmPassword = ref('');
const loadingBtn = ref(false);
const warning = ref<[boolean, string]>([false, '']);
const phoneRegExp = /^[0-9\- ]{8,14}$/;

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
const schemaUser = object({
    name: string().required('Name is required'),
    phone: string().matches(phoneRegExp,"not valid phone no" ).required('Phone is required'),
          

})
const getUser = async () => {
    const token = localStorage.getItem('auth-data');
    if (token) {
        const userToken = JSON.parse(token);
        const userInfo:any = await getUserToken(userToken);
        const userId = userInfo.data;
        const id = userId.user;
        const userDb: any = await getUserData(id);
        userData.name = userDb.data.name;
        userData.email = userDb.data.email;
        userData.phone = userDb.data.phone;
        userData.country = userDb.data.country;
        userData.city = userDb.data.city;
        userData.postCode = userDb.data.postCode;
        userData.address = userDb.data.address;
        userData.role = userDb.data.role;

    }
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
const editUser = async () => {
    loadingBtn.value = true;
    const token = localStorage.getItem('auth-data');
    if (token) {
        const userToken = JSON.parse(token);
        const userInfo:any = await getUserToken(userToken);
        const userId = userInfo.data;
        const id = userId.user;
        if(password.value){
            if(password.value === confirmPassword.value){
                try {
              await changePassword(id, password.value);
              password.value = '';
            } catch (error) {
                console.error('Error changing password:', error);
            }
                try{
        await updateUser(id, userData);
        warning.value = [true, 'User updated successfully'];
         }catch(error){
              console.error('Error updating user:', error);
                warning.value = [false, 'Error updating user'];
         }
            }else{
                warning.value = [false, 'passwords do not match'];
            }
        }else{
            try{
        await updateUser(id, userData);
        warning.value = [true, 'User updated successfully'];
         }catch(error){
              console.error('Error updating user:', error);
                warning.value = [false, 'Error updating user'];
         }

    }
    loadingBtn.value = false;
}
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
getUser();
</script>