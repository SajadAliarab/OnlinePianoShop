<template>
    <div class="relative h-screen w-full bg-cover bg-gray-800">
    <form class="max-w-sm mx-auto pt-20">
        <UIcon name="i-heroicons-user-circle"  class=" max-w-sm w-full text-2xl"/>
        <h1 class="w-ful text-center text-2xl font-bold">Create an account</h1>
        <div class=" p-2 border rounded-lg bg-gray-900 shadow-3xl">
        <UFormGroup label="Your Email" required>
        <UInput color="primary" type="email" id="email" class=" w-full p-2.5 mb-5" placeholder="Enter Your Email Address" />
      </UFormGroup>
      <div class="mb-5">
        <UFormGroup label="Password" required>
        <UInput color="primary" type="password" id="password" class="w-full p-2.5" placeholder="Please Enter your Password"/>
    </UFormGroup>
      </div>
      <div class="mb-5">
        <UFormGroup label="Confirm Password" required>
        <UInput color="primary" type="password" id="confirm-password" class="w-full p-2.5" placeholder="Please Enter your Password Again"/>
    </UFormGroup>
      </div>
      <div class="flex items-start mb-5">
        <div class="flex items-center ">
          <UCheckbox name="accept" label="I accept all policy and terms"/>
        </div>
        </div>
      <UButton color="primary" type="submit" class=" font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mb-5">Submit</UButton>
      
      <p class=" text-gray-400 p-2 mb-5">have an account? <NuxtLink to="/auth/Login" class="text-primary font-medium">LogIn</NuxtLink></p>
    </div>
    </form>
  </div>
</template>