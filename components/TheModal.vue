<template>
    <div class=" overflow-y-auto overflow-x-hidden fix top-1/2 right-1/2 left-1/2 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full" v-if="modelValue">
      <div class="relative p-4 w-full max-w-2xl max-h-full">
        <div class="relative rounded-lg shadow bg-gray-700">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600" >
                <button type="button" @click="emit('update:modelValue',false)" class="text-gray-400 bg-transparent  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white">
                    <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <slot name="header"></slot>
            </div>
            <div class="p-4 md:p-5 space-y-4">
                <slot></slot>
            </div>
            <div class="flex items-center p-4 md:p-5 border-t  rounded-b border-gray-600">
                <slot name="footer"></slot>
            </div>
                
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
    defineProps({
        modelValue:{
            type:Boolean,
            default:false
        }
    })
    const colorMode = useColorMode();
colorMode.value = 'dark';
    const emit = defineEmits(['update:modelValue'])

  </script>
  