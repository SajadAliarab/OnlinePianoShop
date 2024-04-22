
<template>
<nav class="bg-gray-900  w-full z-20 top-0 start-0 border-b border-gray-600 sticky">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="/Piano-shop.svg" class="h-10" alt="Online-Piano-Shop">
      <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Piano Shop</span>
  </a>

  <div class="flex md:order-2   rtl:space-x-reverse">
    <UChip v-if="cartItem!=0" :text="cartItem" size="2xl" >
    <UButton icon="i-heroicons-shopping-cart" color="gray" to="/cart" class=" font-medium text-sm px-4 py-2 text-center"></UButton>
    </UChip>
    <UButton v-if="cartItem==0" icon="i-heroicons-shopping-cart" color="gray" to="/cart" class=" font-medium text-sm px-4 py-2 text-center"></UButton>
      <UButton v-if="!authenticated" color="primary" to="/auth/Login" class="mx-4 font-medium text-sm px-4 py-2  text-center">LogIn</UButton>     
      <UButton v-if="authenticated" color="primary" to="/profile/" class="mx-4 font-medium text-sm px-4 py-2  text-center">{{ user.name}}</UButton>
      <UButton v-if="authenticated" color="red" @click="logout" class="mx-4 font-medium text-sm px-4 py-2 text-center">Log Out</UButton>
  
  </div>
  <button @click="toggleMobileMenu" class="md:hidden block text-gray-400 focus:outline-none">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
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
      <li class="bg-primary-800">
        <UDropdown v-if="user.role==1"  :items="items" mode="hover" :popper="{ placement: 'bottom-start' }">
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
          <template #orders>
          <ULink
          to="/admin/orders"
          active-class="text-primary"
          inactive-class="text-gray-400 hover:text-gray-200">Orders</ULink>
          </template>
      
  </UDropdown>    
             
</li>
<li>
      <ULink 
        to="https://api.sajad.uk/api/docs"
        active-class="text-primary"
        inactive-class="text-gray-400 hover:text-gray-200"
        target="_blanck">API Document</ULink>
    </li>
    </ul>
  </div>
     <!-- Mobile Menu -->
  <div :class="{ 'block': isMobileMenuOpen, 'hidden': !isMobileMenuOpen }" class="md:hidden">
  <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
    <li>
      <ULink 
        to="/"
        active-class="text-primary"
        inactive-class="text-gray-400 hover:text-gray-200"
        @click="closeMobileMenu">Home</ULink>
    </li>
    <li>
      <ULink 
        to="/products"
        active-class="text-primary"
        inactive-class="text-gray-400 hover:text-gray-200"
        @click="closeMobileMenu">Products</ULink>
    </li>
    <li>
      <ULink 
        to="/aboutUs"
        active-class="text-primary"
        inactive-class="text-gray-400 hover:text-gray-200"
        @click="closeMobileMenu">About Us</ULink>
    </li>
    <li>
      <ULink 
        to="/contact"
        active-class="text-primary"
        inactive-class="text-gray-400 hover:text-gray-200"
        @click="closeMobileMenu">Contact</ULink>
    </li>
    <!-- Admin dropdown Mobile -->
    <li>
      <button v-if="user.role==1" @click="toggleAdminMenu" class="focus:outline-none text-gray-400 hover:text-gray-200">
        <span>Admin</span>
        <svg v-if="isMobileAdminMenuOpen" class="w-4 h-4 inline-block ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
        <svg v-else class="w-4 h-4 inline-block ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.707 13.707a1 1 0 011.414 0L10 15.414l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L10 15.414l-1.293-1.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
      <ul v-if="isMobileAdminMenuOpen" class="ml-4 mt-2">
        <li>
          <ULink to="/admin/addProduct" active-class="text-primary" inactive-class="text-gray-400 hover:text-gray-200" @click="closeMobileMenu">Products</ULink>
        </li>
        <li>
          <ULink to="/admin/addBrand" active-class="text-primary" inactive-class="text-gray-400 hover:text-gray-200" @click="closeMobileMenu">Brands</ULink>
        </li>
        <li>
          <ULink to="/admin/addCategory" active-class="text-primary" inactive-class="text-gray-400 hover:text-gray-200" @click="closeMobileMenu">Categories</ULink>
        </li>
        <li>
          <ULink to="/admin/addColor" active-class="text-primary" inactive-class="text-gray-400 hover:text-gray-200" @click="closeMobileMenu">Colors</ULink>
        </li>
        <li>
          <ULink to="/admin/addSlide" active-class="text-primary" inactive-class="text-gray-400 hover:text-gray-200" @click="closeMobileMenu">Slides</ULink>
        </li>
        <li>
          <ULink to="/admin/users" active-class="text-primary" inactive-class="text-gray-400 hover:text-gray-200" @click="closeMobileMenu">Users</ULink>
        </li>
        <li>
          <ULink to="/admin/orders" active-class="text-primary" inactive-class="text-gray-400 hover:text-gray-200" @click="closeMobileMenu">Orders</ULink>
        </li>
      </ul>
    </li>
    <li>
      <ULink 
        to="https://api.sajad.uk/api/docs"
        active-class="text-primary"
        inactive-class="text-gray-400 hover:text-gray-200"
        @click="closeMobileMenu"
        target="_blanck">API Document</ULink>
    </li>
  </ul>
</div>
  </div>
</nav>
</template>
<script setup lang="ts">
import type { ULink } from '#build/components';
import { getUserData, logOutUser, getUserToken } from '~/services/AuthService';
const colorMode = useColorMode();
colorMode.value = 'dark';
const router = useRouter();
 const authenticated = ref(false);
const user:any = ref('');
const userData:any=ref('');
const cartItem = ref(0);
const isMobileMenuOpen = ref(false);
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
      slot:"users"
    },{
      label: 'Orders',
      slot:"orders"
    }

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
onMounted(()=>{checkAuthentication();
});



// onBeforeRouteUpdate(() => {

//   checkAuthentication();
// });
const cartData=()=>
{
  const data= localStorage.getItem('cart');
  if(data){
    const dataInfo= JSON.parse(data);
    cartItem.value=dataInfo.length;
  }else{
    cartItem.value=0;
  }
}
onMounted(()=>{cartData();});
router.beforeEach(async (to, from, next) => {
  await checkAuthentication();
  cartData();
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

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const isMobileAdminMenuOpen = ref(false);

const toggleAdminMenu = () => {
  isMobileAdminMenuOpen.value = !isMobileAdminMenuOpen.value;
};
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};


</script>