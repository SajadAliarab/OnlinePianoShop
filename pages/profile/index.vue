<template>
    <div class="relative h-auto w-full bg-cover bg-gray-800 pb-10">
      <div class="container mx-auto py-10">
        <h1 class="text-3xl font-bold text-white mb-5">Profile Page</h1>
        <div class="flex justify-start space-x-4 mb-5">
          <NuxtLink to="/profile/edit">
            <UButton color="primary">Complete Profile</UButton>
          </NuxtLink>
          <UButton color="red" @click="DeleteUser">Delete Your Account</UButton>
        </div>
        <div class="flex justify-center text-3xl font-bold">
          Your orders
        </div>
        <OrdersShowUser />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { getUserToken } from '~/services/AuthService';
  import { deleteUser } from '~/services/UserService';
  import { useRouter } from 'vue-router';
  const colorMode = useColorMode();
  colorMode.value = 'dark';
  const router = useRouter();
  const DeleteUser = async () => {
    const token = localStorage.getItem('auth-data');
    if (token) {
      const userToken = JSON.parse(token);
      const userInfo: any = await getUserToken(userToken);
      const userId = userInfo.data;
      const id = userId.user;
      try {
        await deleteUser(id);
        localStorage.removeItem('auth-data');
        router.push('/auth/login');
      } catch (error) {
        console.log(error);
      }
    }
  }
  </script>
  