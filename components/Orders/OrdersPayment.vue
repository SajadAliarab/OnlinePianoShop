<template >
    <div>
        <div class="flex flex-col items-center">
            <h1 class="font-bold text-primary-100">Payment<br> Amount:
                <ThePriceFormmater :price="totalPriceOrder" />
            </h1>
            <div class="mt-4">
                <div id="payment" class="font-bold text-primary-100">
                </div>
            </div>
            <div class="mt-4">
                <UButton color="primary" @click=createPayment()>Pay</UButton>
            </div>
        </div>
    </div>

</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { loadStripe } from '@stripe/stripe-js';
import { showProductById } from '~/services/ProductService';
import { confirmPayment, createPaymentIntent } from '~/services/PaymentService';

const router = useRouter();
const config = useRuntimeConfig();
const stripe: any = ref(null);
const loading = ref(false);
const elements: any = ref(null);
const totalPriceOrder = ref(0);
let paymentIntent: any = null;
const appearance = {
    theme: 'night',
    labels: 'floating'
};

const getOrder = async () => {
    loading.value = true;
    const data = localStorage.getItem('cart');
    if (data) {
        const dataInfo = JSON.parse(data);
        dataInfo.forEach(async (item: any) => {
            const productData: any = await showProductById(item.product);
            const productColorData = productData.colors.find((color: any) => color.name === item.color);
            const productColor = "http://localhost:8000/uploads/" + productColorData.image;
            const productImage = "http://localhost:8000/uploads/" + productData.data.image;
            const productPrice = (productData.data.price - productData.data.discount);
            const quantity = item.quantity;
            const totalPrice = (productData.data.price - productData.data.discount) * quantity;
            totalPriceOrder.value += totalPrice;
        });
  
    }
    loading.value = false;

};


const getPayment = async (total:number) => {
    stripe.value = await loadStripe(config.public.STRIPE_PUBLIC_KEY);
    paymentIntent= await createPaymentIntent(total);
    const clientSecret = paymentIntent.client_secret;
    elements.value = stripe.value.elements({clientSecret:clientSecret,appearance});
    const paymentElement = elements.value.create('payment');
    paymentElement.mount('#payment');

}


const createPayment = async () => {
    try {
        const result:any = await confirmPayment(paymentIntent.paymentId);
        if(result.payment.status === 'succeeded'){
        


        }else{
            console.log('Payment failed');
        }
    } catch (error: any) {
        console.error('Error creating payment intent:', error.message);
    }
};
watch(totalPriceOrder, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    getPayment(newValue);
  }
});
getOrder();



</script>