<template>
  <div class="relative h-auto w-full bg-cover bg-gray-800 pb-10">
    <UForm :schema="schemaUser" :state="userData" @submit="logIn" class="max-w-sm mx-auto pt-20">
      <UIcon name="i-heroicons-lock-closed" class=" max-w-sm w-full text-2xl" />
      <h1 class="w-ful text-center text-2xl font-bold">Login</h1>
      <div class=" p-2 border rounded-lg bg-gray-900 shadow-3xl">
        <p class=" text-gray-400 p-2">Enter your credentials to access your account.</p>
        <p class=" text-gray-400 p-2 mb-5">Don't have an account? <NuxtLink to="/auth/register"
            class="text-primary font-medium">Sign Up</NuxtLink>
        </p>
        <UFormGroup label="Email" name="email">
          <UInput color="primary" type="email" id="email" class=" w-full p-2.5 " placeholder="Enter Your Email Address"
            v-model="userData.email" />
        </UFormGroup>
        <div class="mb-5">
          <UFormGroup label="Password" name="password">
            <UInput color="primary" type="password" id="password" class="w-full p-2.5"
              placeholder="Please Enter your Password" v-model="userData.password" />
          </UFormGroup>
        </div>
        <!-- <div class="flex items-start mb-5">
          <div class="flex items-center ">
            <UCheckbox name="remember" label="Remeber me" />
          </div>
        </div> -->
        <UButton :loading="loadingBtn" color="primary" type="submit"
          class=" font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 justify-center mb-5">Log In</UButton>
        <p class="font-medium text-red-800" v-text="warning"></p>
      </div>
    </UForm>
  </div>
</template>
<script setup lang="ts">
import { object, string, } from 'yup';
import { LoginUser } from '~/servies/AuthService';

const router = useRouter();
const schemaUser = object({
  email: string().email('Invalid email').required('Required!'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Required!')
})


const userData = reactive({
  email: '',
  password: ''
})
const warning = ref('');
const loadingBtn=ref(false)
const logIn = async () => {
  try {
  loadingBtn.value=true;
  const result:any=await LoginUser(userData.email,userData.password);
 
 localStorage.setItem('auth-data',JSON.stringify(result.data));
 router.push('/').then(() => {
 // window.location.reload();
});
  } catch (err: any) {
    warning.value = "Your Email or Password is not Authorization";

  }
userData.password="";
loadingBtn.value=false;


}


</script>