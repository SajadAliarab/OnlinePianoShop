<script setup lang="ts">
import type { ULink } from '#build/components';
import { getUserData } from '~/servies/AuthService';

const router = useRouter();
 const authenticated = ref(false);
const user:any = ref('');
const items = [[
    {
      label: 'Products',
      slot:"products"
    },
    {
      label: 'Brands',
      slot:"brands"
    },
    {
      label: 'Categories',
      slot:"categories"
    },
    {
      label: 'Colors',
      slot:"colors"
    },
    {
      label: 'Slides',
      slot:"slides"
    }

  ]]
const checkAuthentication = async () => {
  const userData = localStorage.getItem('auth-data');
  if (userData) {
    authenticated.value = true;
    const userInfo = JSON.parse(userData);
    const userDb:any = await getUserData(userInfo.user) ;
    user.value = userDb.data;
  }else{
    authenticated.value =false;
  }
};
onMounted(()=>{checkAuthentication();});


// onBeforeRouteUpdate(() => {

//   checkAuthentication();
// });


const logout = () => {

  localStorage.removeItem('auth-data');
  authenticated.value = false;
  user.value = {};
  router.push('/auth/Login');
};
// const authStore=useAuthStore();
// if(authStore&&authStore.isLogin){
//   const loginData=authStore.loginResult;
//   console.log(loginData);
//   authenticated.value==true;

// }
</script>
<template>
<nav class="bg-gray-900  w-full z-20 top-0 start-0 border-b border-gray-600 sticky">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="/Piano-shop.svg" class="h-10" alt="Online-Piano-Shop">
      <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Piano Shop</span>
  </a>
  <div class="flex md:order-2">
    <TheSearch/>
  </div>
  <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <UButton v-if="!authenticated" color="primary" to="/auth/Login" class=" font-medium text-sm px-4 py-2 text-center">LogIn</UButton>     
      <UButton v-if="authenticated" color="primary" to="/profile/" class="mx-4 font-medium text-sm px-4 py-2 text-center">{{ user.name}}</UButton>
      <UButton v-if="authenticated" color="red" @click="logout" class=" font-medium text-sm px-4 py-2 text-center">Log Out</UButton>
  </div>
  <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
      <li>
        <ULink 
        to="/"
        active-class="text-primary"
        inactive-class="text-gray-400 hover:text-gray-200">Home</ULink>
      </li>
      <li>
        <ULink 
        to="/products"
        active-class="text-primary"
        inactive-class="text-gray-400 hover:text-gray-200">Products</ULink>
      </li>
      <li>
        <UDropdown v-if="user.role==1" :items="items" mode="hover" :popper="{ placement: 'bottom-start' }">
          <ULink 
        active-class="text-primary"
        inactive-class="text-gray-400 hover:text-gray-200">Admin</ULink>
        <template #products>
          <ULink
          to="/admin/addProduct"
          active-class="text-primary"
          inactive-class="text-gray-400 hover:text-gray-200">Products</ULink>
          </template>
          <template #brands>
          <ULink
          to="/admin/addBrand"
          active-class="text-primary"
          inactive-class="text-gray-400 hover:text-gray-200">Brands</ULink>
          </template>
          <template #categories>
          <ULink
          to="/admin/addCategory"
          active-class="text-primary"
          inactive-class="text-gray-400 hover:text-gray-200">Categories</ULink>
          </template>
          <template #colors>
          <ULink
          to="/admin/addColor"
          active-class="text-primary"
          inactive-class="text-gray-400 hover:text-gray-200">Colors</ULink>
          </template>
          <template #slides>
          <ULink
          to="/admin/addSlide"
          active-class="text-primary"
          inactive-class="text-gray-400 hover:text-gray-200">Slides</ULink>
          </template>
      
  </UDropdown>
            
             
          </li>
    </ul>
  </div>
  
  </div>
</nav>
</template>