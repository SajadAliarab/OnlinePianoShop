
<template>
<nav class="bg-gray-900  w-full z-20 top-0 start-0 border-b border-gray-600 sticky">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="/Piano-shop.svg" class="h-10" alt="Online-Piano-Shop">
      <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Piano Shop</span>
  </a>

  <div class="flex md:order-2   rtl:space-x-reverse">
    <UChip v-if="cartItem!=0" :text="cartItem" size="2xl">
    <UButton icon="i-heroicons-shopping-cart" color="gray" to="/cart" class=" font-medium text-sm px-4 py-2 text-center"></UButton>
    </UChip>
    <UButton v-if="cartItem==0" icon="i-heroicons-shopping-cart" color="gray" to="/cart" class=" font-medium text-sm px-4 py-2 text-center"></UButton>
      <UButton v-if="!authenticated" color="primary" to="/auth/Login" class="mx-4 font-medium text-sm px-4 py-2  text-center">LogIn</UButton>     
      <UButton v-if="authenticated" color="primary" to="/profile/" class="mx-4 font-medium text-sm px-4 py-2  text-center">{{ user.name}}</UButton>
      <UButton v-if="authenticated" color="red" @click="logout" class="mx-4 font-medium text-sm px-4 py-2 text-center">Log Out</UButton>
  
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
        <ULink 
        to="/aboutUs"
        active-class="text-primary"
        inactive-class="text-gray-400 hover:text-gray-200">About Us</ULink>
      </li>
      <li>
        <ULink 
        to="/contact"
        active-class="text-primary"
        inactive-class="text-gray-400 hover:text-gray-200">Contact</ULink>
      </li>
      <li >
        <UDropdown v-if="user.role==1" class="bg-red-800" :items="items" mode="hover" :popper="{ placement: 'bottom-start' }">
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
          <template #users>
          <ULink
          to="/admin/users"
          active-class="text-primary"
          inactive-class="text-gray-400 hover:text-gray-200">Users</ULink>
          </template>
      
  </UDropdown>
            
             
          </li>
    </ul>
  </div>
  
  </div>
</nav>
</template>
<script setup lang="ts">
import type { ULink } from '#build/components';
import { getUserData, logOutUser, getUserToken } from '~/services/AuthService';

const router = useRouter();
 const authenticated = ref(false);
const user:any = ref('');
const userData:any=ref('');
const cartItem = ref(0);

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
    },{
      label: 'Users',
      slot:"users"}

  ]]
const checkAuthentication = async () => {
   userData.value = localStorage.getItem('auth-data');
  if (userData.value) {
    authenticated.value = true;
    const userToken = JSON.parse(userData.value);
    const userInfo:any = await getUserToken(userToken);
    const userId = userInfo.data;
    const userDb:any = await getUserData(userId.user) ;
    user.value = userDb.data;
  }else{
    authenticated.value =false;
  }
};
onMounted(()=>{checkAuthentication();});


// onBeforeRouteUpdate(() => {

//   checkAuthentication();
// });

router.beforeEach(async (to, from, next) => {
  await checkAuthentication();
  await cartData();
  next();
});

const logout = () => {
  const data:string|null = localStorage.getItem('auth-data');
  if (!data) return;
  const token = JSON.parse(data);
  logOutUser(token);
  localStorage.removeItem('auth-data');
  localStorage.removeItem('cart');
  authenticated.value = false;
  user.value = {};
  router.push('/auth/Login');
};

const cartData=()=>
{
  const data= localStorage.getItem('cart');
  if(data){
    const dataInfo= JSON.parse(data);
    cartItem.value=dataInfo.length;
  }
}
onMounted(()=>{cartData();});



</script>