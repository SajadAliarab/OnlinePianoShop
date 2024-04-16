<template>
  <div class="relative h-auto w-full bg-cover bg-gray-800 pb-10">
    <UForm class="max-w-sm mx-auto pt-20" @submit="submitForm" :schema="userSchema" :state="userData">
      <icon name="i-heroicons-user-circle" class=" max-w-sm w-full text-6xl text-white" />
      <h1 class="w-ful text-center text-2xl font-bold">Create an account</h1>
      <div class=" p-2 border rounded-lg bg-gray-900 shadow-3xl">
        <UFormGroup label="Your Name" name="name" required>
          <UInput color="primary"  type="text" id="name" class=" w-full p-2.5 " placeholder="Enter Your Full Name"
            v-model="userData.name" />
        </UFormGroup>
        <UFormGroup label="Your Email" name="email" required>
          <UInput color="primary"  type="email" id="email" class=" w-full p-2.5 " placeholder="Enter Your Email Address"
            v-model="userData.email" />
        </UFormGroup>
        <div class="mb-5">
          <UFormGroup label="Password" name="password" required>
            <UInput color="primary"  type="password" id="password" class="w-full p-2.5"
              placeholder="Please Enter aleast 8 digit" v-model="userData.password" />
          </UFormGroup>
        </div>
        <div class="mb-5">
          <UFormGroup label="Confirm Password" name="confirmPassword" required>
            <UInput color="primary"  type="password" id="confirmPassword" class="w-full p-2.5"
              placeholder="Please Enter your Password Again" v-model="userData.confirmPassword" />
          </UFormGroup>
        </div>
        <div class="flex items-start mb-5">
          <div class="flex items-center ">
            <UFormGroup name="selected" label="I accept all policy and terms">
              <UToggle id="selected"  v-model="userData.selected" />
            </UFormGroup>
          </div>
        </div>
        <UButton  :loading="loadingBtn"  color="primary" type="submit"
          class=" font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 justify-center mb-5">Submit</UButton>
        <div v-if="warning[1]" :class="{ 'text-green-700': warning[0], 'text-red-700': !warning[0] }">
          <h5 v-text="warning[1]"></h5>
        </div>
        <p class=" text-gray-400 p-2 mb-5">have an account? <NuxtLink to="/auth/Login" class="text-primary font-medium">
            LogIn</NuxtLink>
        </p>
      </div>
    </UForm>
  </div>
</template>
<script setup lang="ts" >
import * as yup from 'yup';
import { RegisterUser } from '~/services/AuthService';
const colorMode = useColorMode();
colorMode.value = 'dark';
const router = useRouter();
const userSchema = yup.object({
  name: yup.string().required('Required!'),
  email: yup.string().email('Please enter valid email!').required('Reqiured!'),
  password: yup.string().min(8, 'Please enter atleast 8 character').required('Required!'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), undefined], 'Passwords must match').required('Required!'),
  selected: yup.boolean().oneOf([true], 'Please accept our terms and condition')
})
const userData = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  selected: false
})
const warning = ref<[boolean, string]>([false, '']);
const loadingBtn=ref(false);
const submitForm = async () => {
  try {
    loadingBtn.value=true;
    await RegisterUser(userData); 
    warning.value = [true, "Congrats! You make your Account sucessfully, please wait a moment."];
   setTimeout(()=>router.push('/auth/login'),3000);
  } catch (error) {
    warning.value = [false, "Can not access to database , please try again later"];
  }
  

  userData.name = '';
  userData.email = '';
  userData.password = '';
  userData.confirmPassword = '';
  userData.selected = false;
  loadingBtn.value=false;
}
</script>