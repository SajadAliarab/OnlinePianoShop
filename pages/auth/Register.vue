<template>
    <div class="relative h-screen w-full bg-cover bg-gray-800">
    <form class="max-w-sm mx-auto pt-20" @submit.prevent="submitForm">
        <UIcon name="i-heroicons-user-circle"  class=" max-w-sm w-full text-2xl"/>
        <h1 class="w-ful text-center text-2xl font-bold">Create an account</h1>
        <div class=" p-2 border rounded-lg bg-gray-900 shadow-3xl">
        <UFormGroup label="Your Email" required>
        <UInput color="primary" type="email" id="email" class=" w-full p-2.5 " placeholder="Enter Your Email Address" v-model="userData.email" />
        <p v-if="!isValidEmail&&userData.email" class="mb-5 text-red-700">Please Enter valid Email!</p>
      </UFormGroup>
      <div class="mb-5">
        <UFormGroup label="Password" required>
        <UInput color="primary" type="password" id="password" class="w-full p-2.5" placeholder="Please Enter aleast 8 digit" v-model="userData.password"/>
        <p v-if="!isValidPassword&&userData.password" class="mb-5 text-red-700">Password should be at least 8 characters long!</p>
    </UFormGroup>
      </div>
      <div class="mb-5">
        <UFormGroup label="Confirm Password" required>
        <UInput color="primary" type="password" id="confirmPassword" class="w-full p-2.5" placeholder="Please Enter your Password Again" v-model="userData.confirmPassword"/>
        <p v-if="!isEqualPassword&&userData.confirmPassword" class="mb-5 text-red-700"> Password is not equal!</p>
    </UFormGroup>
      </div>
      <div class="flex items-start mb-5">
        <div class="flex items-center ">
          <UCheckbox name="accept" label="I accept all policy and terms" v-model="selected"/>
        </div>
        </div>
      <UButton color="primary" type="submit" class=" font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 justify-center mb-5" :disabled="!(isValidEmail&&isValidPassword&&isEqualPassword&&selected)">Submit</UButton>
      <div v-if="warning[1]" :class="{'text-green-700':warning[0],'text-red-700':!warning[0]}">
        <h5 v-text="warning[1]"></h5>
      </div>
      <p class=" text-gray-400 p-2 mb-5">have an account? <NuxtLink to="/auth/Login" class="text-primary font-medium">LogIn</NuxtLink></p>
    </div>
    </form>
  </div>
</template>
<script setup lang="ts" >
const userData = reactive({
  email:'',
  password:'',
  confirmPassword:''
})
const selected =ref<boolean>(false);
const warning =ref<[boolean,string]>([false,'']);
const isValidEmail = computed(() => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(userData.email);
});
const isValidPassword = computed(()=>{
  if(userData.password.length>=8){
    return true;
  }
});
const isEqualPassword = computed(()=>{
  if(userData.password==userData.confirmPassword){
    return true;
  }
});

const submitForm = async ()=>{
  if(isValidEmail.value&&isValidPassword.value&&isEqualPassword.value&&selected.value){
    try{
     await $fetch('https://piano-shop-default-rtdb.europe-west1.firebasedatabase.app/users.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    });
    warning.value=[true,"Congras! Your make your Account sucessfully "];
  } catch (error) {
    warning.value=[false,"Can not access to database , please try again later"]
  }
    userData.email='';
    userData.password='';
    userData.confirmPassword='';
    selected.value=false;
}
}
</script>