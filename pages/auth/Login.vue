<template>
 <div class="relative h-screen w-full bg-cover bg-gray-800">
    <form class="max-w-sm mx-auto">
      <div class="mb-5 pt-20">
        <UFormGroup label="Email" required>
        <UInput color="primary" type="email" id="email" class=" w-full p-2.5" placeholder="Enter Your Email Address" />
      </UFormGroup>
    </div>
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
    </form>
  </div>
    
    </template>
    <script setup lang="ts">
    
    </script>