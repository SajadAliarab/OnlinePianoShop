<template>
    
    <div class="bg-gray-900 w-full z-20 bottom-0 end-0 border-b border-gray-600">
        <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div class="md:flex md:justify-between">
                <div class="mb-6 md:mb-0">
                    <a href="/" class="flex items-center">
                        <img src="/Piano-shop.svg" class="h-10 me-3" alt="Online Piano Shop" />
                        <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Piano Shop</span>
                    </a>
                </div>
                <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                    <div>
                        <h2 class="mb-6 text-sm font-semibold uppercase text-white">Resources</h2>
                        <ul class="text-gray-400 font-medium">
                            <li class="mb-4">
                                <ULink  to="https://nuxt.com" target="_blank">
                                    Nuxt JS
                                </ULink>
                            </li>
                            <li>
                                <ULink  to="https://tailwindcss.com" target="_blank" >
                                    Tailwind
                                </ULink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 class="mb-6 text-sm font-semibold uppercase text-white">Follow us</h2>
                        <ul class="text-gray-400 font-medium">
                            <li class="mb-4">
                                <ULink  to="https://github.com/SajadAliarab/" target="_blank">
                                    GitHub
                                </ULink>
                            </li>
                            <li>
                                <ULink  to="https://www.linkedin.com/in/sajad-aliarab-9631607b//SajadAliarab" target="_blank">
                                    LinkedIn
                                </ULink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 class="mb-6 text-sm font-semibold uppercase text-white">Legal</h2>
                        <ul class="text-gray-400 font-medium">
                            <li class="mb-4">
                                <ULink  to="#">
                                    Privacy Policy
                                </ULink>
                            </li>
                            <li>
                                <ULink to="#" >Terms Conditions</ULink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr class="my-6  sm:mx-auto border-gray-700 lg:my-8" />
            <div class="sm:flex sm:items-center sm:justify-between">
                <span class="text-sm  sm:text-center text-gray-400">© 2024 <a href="#" class="hover:underline">Piano
                        Shop™</a>. All Rights Reserved.
                </span>
                <div class="flex justify-center mt-4 sm:justify-center sm:mt-0">
    <a href="https://www.linkedin.com/in/sajad-aliarab-9631607b//SajadAliarab" class="text-gray-500 hover:text-white" target="_blank">
        <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21.75 0H2.25A2.25 2.25 0 0 0 0 2.25v19.5A2.25 2.25 0 0 0 2.25 24h19.5A2.25 2.25 0 0 0 24 21.75V2.25A2.25 2.25 0 0 0 21.75 0zM7.44 21.75h-4.5v-12h4.5zm-2.25-13.875a2.625 2.625 0 1 1 2.625-2.625 2.624 2.624 0 0 1-2.625 2.625zm15 13.875h-4.5v-6.375c0-1.687-.375-3.75-2.625-3.75-2.625 0-3 2.25-3 3.625v6.5h-4.5v-12h4.5v2.125h.063c.625-1.187 2.125-2.438 4.438-2.438 4.75 0 5.625 3.125 5.625 7.25v8.063z"/>
        </svg>
        <span class="sr-only">LinkedIn</span>
    </a>
    <a href="https://github.com/SajadAliarab/OnlinePianoShop" class="text-gray-500 hover:text-white ms-5" target="_blank">
        <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.304 3.438 9.8 8.205 11.387.6.11.82-.258.82-.575 0-.284-.012-1.034-.012-1.856-3.002.548-3.633-1.358-3.633-1.358-.492-1.243-1.203-1.573-1.203-1.573-.98-.669.075-.656.075-.656 1.08.075 1.647 1.107 1.647 1.107.958 1.64 2.517 1.165 3.134.889.097-.698.378-1.166.687-1.434-2.407-.274-4.935-1.203-4.935-5.357 0-1.185.423-2.155 1.107-2.914-.111-.275-.48-1.384.105-2.874 0 0 .91-.292 2.98 1.113.865-.241 1.79-.36 2.71-.364.917.004 1.845.124 2.713.364 2.068-1.405 2.977-1.113 2.977-1.113.586 1.49.216 2.599.105 2.874.687.76 1.104 1.729 1.104 2.914 0 4.162-2.532 5.08-4.947 5.35.387.337.733 1.001.733 2.021 0 1.459-.013 2.638-.013 2.997 0 .32.217.692.83.574C20.566 21.795 24 17.304 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
        <span class="sr-only">GitHub</span>
    </a>
</div>



        </div>
    </div>
</div>
</template>
<script setup lang="ts">
const colorMode = useColorMode();
colorMode.value = 'dark';
</script>