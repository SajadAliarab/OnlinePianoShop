<template>
<section class="py-24 bg-gray-800">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="md:flex gap-x-24 clear-left md:mb-16 mb-10">
            <div class=" md:mb-0 mb-4">
                <h2 class="text-primary-300 font-manrope text-4xl font-semibold leading-10 mb-5 md:text-left text-center">Get In Touch</h2>
                <p class="text-primary-100 text-lg font-normal leading-7 mb-7 md:text-left text-center">Whether you have a concern or simply want to say hello, We are here to facilitate communication with you.</p>
                <div class="flex md:items-center md:justify-start justify-center">
                    <button class="w-36 h-12 rounded-full bg-indigo-600 transition-all duration-700 hover:bg-indigo-800 shadow text-white text-center text-base font-semibold leading-6">Contact Us</button>
                </div>
            </div>
            <div class="border-l-2 md:border-indigo-600 border-white px-10 py-6">
                <div class="mb-8">
                    <h6 class="text-primary-300 text-sm font-medium leading-5 pb-3 md:text-start text-center">Email Address</h6>
                    <h3 class="text-primary-100 text-xl font-semibold leading-8 md:text-start text-center">sajad.aliarab@gmail.com</h3>
                </div>
                <div>
                    <h6 class="text-primary-300 text-sm font-medium leading-5 pb-3 md:text-start text-center">Phone Number</h6>
                    <h3 class="text-primary-100 text-xl font-semibold leading-8 md:text-start text-center">+447936766999</h3>
                </div>
            </div>
        </div>


            <div class="h-96 relative flex justify-center">
                <div class="w-full h-full absolute bg-gradient-to-t from-gray-800/50 to-gray-600/50">
                    <img src="https://www.coachhousepianos.co.uk/wp-content/uploads/2020/11/CHP_Header-Image_Contact-optim-300x166.jpg" alt="Contact" class="w-full h-full object-cover">
                </div>
                </div>

                
      </div>
    </section>
</template>
<script setup lang="ts">
const colorMode = useColorMode();
colorMode.value = 'dark';
</script>