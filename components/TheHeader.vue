
import type { ULink } from '#build/components';
<template>
<nav class="bg-gray-900  w-full z-20 top-0 start-0 border-b border-gray-600 sticky">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Online-Piano-Shop">
      <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Piano Shop</span>
  </a>
  <div class="flex md:order-2">
    <TheSearch/>
  </div>
  <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <UButton color="primary" to="/auth/Login" class=" font-medium text-sm px-4 py-2 text-center">LogIn</UButton>
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
        to="/productTest"
        active-class="text-primary"
        inactive-class="text-gray-400 hover:text-gray-200">Test</ULink>
      </li>
        <li>
        <ULink 
        to="/addSlide"
        active-class="text-primary"
        inactive-class="text-gray-400 hover:text-gray-200">Add Slide</ULink>
      </li>
      <li>
        <ULink 
        to="/productAdd"
        active-class="text-primary"
        inactive-class="text-gray-400 hover:text-gray-200">Add Product</ULink>
      </li>
    </ul>
  </div>
  
  </div>
</nav>
</template>