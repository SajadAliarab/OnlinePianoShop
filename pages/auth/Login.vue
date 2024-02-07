<template>
 <div class="relative h-screen w-full bg-cover bg-gray-800">
    <form class="max-w-sm mx-auto pt-20">
        <UIcon name="i-heroicons-lock-closed"  class=" max-w-sm w-full text-2xl"/>
        <h1 class="w-ful text-center text-2xl font-bold">Login</h1>
        <div class=" p-2 border rounded-lg bg-gray-900 shadow-3xl">
        <p class=" text-gray-400 p-2">Enter your credentials to access your account.</p>
        <p class=" text-gray-400 p-2">Don't have an account? <NuxtLink to="/auth/register" class="text-primary font-medium">Sign Up</NuxtLink></p>
        <UFormGroup label="Email" required>
        <UInput color="primary" type="email" id="email" class=" w-full p-2.5" placeholder="Enter Your Email Address" />
      </UFormGroup>
      <div class="mb-5">
        <UFormGroup label="Password" required>
        <UInput color="primary" type="password" id="password" class="w-full p-2.5" placeholder="Please Enter your Password"/>
    </UFormGroup>
      </div>
      <div class="flex items-start mb-5">
        <div class="flex items-center ">
          <UCheckbox name="remember" label="Remeber me"/>
        </div>
        </div>
      <UButton color="primary" type="submit" class=" font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</UButton>
    </div>
    </form>
  </div>
    
    </template>
    <script setup lang="ts">
    
    </script>