<template>
    <div class="relative h-auto w-full bg-cover bg-gray-800 pb-10">
    <h1>
        Profile Page
    </h1>
    <NuxtLink to="/profile/edit"><UButton color="primary">Complete Profile</UButton></NuxtLink>
    <br>
    <UButton color="primary" class="mt-5" @click="DeleteUser">Delete Your Account</UButton>
    </div>
</template>
<script setup lang="ts">
import { getUserToken } from '~/servies/AuthService';
import { deleteUser } from '~/servies/UserService';

const router = useRouter();
const DeleteUser = async () => {
    const token = localStorage.getItem('auth-data');
    if (token) {
        const userToken = JSON.parse(token);
        const userInfo:any = await getUserToken(userToken);
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