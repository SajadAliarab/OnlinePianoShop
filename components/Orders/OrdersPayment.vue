<template>
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
                <UButton :loading="loading" color="primary" @click=createPayment()>Pay</UButton>
            </div>
            <div class="mt-4">
                <p class="text-red-800" v-if="warning[0]">{{ warning[1] }}</p>
                <p class="text-primary-100 font-bold">For trying payment methode you can use this card:
                    <br>card number : 4242 4242 4242 4242
                    <br>exp date : a valid future date, such as 12/34
                    <br>cvc : any three-digit CVC 
                </p>
            </div>
        </div>
    </div>

</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { loadStripe } from '@stripe/stripe-js';
import { showProductById, updateProductStock } from '~/services/ProductService';
import { confirmPayment, createPaymentIntent } from '~/services/PaymentService';
import { getUserToken } from '~/services/AuthService';
import { getOrderListLast, updateOrder } from '~/services/OrderService';
const colorMode = useColorMode()
colorMode.value = 'dark'
const router = useRouter();
const config = useRuntimeConfig();
const stripe: any = ref(null);
const loading = ref(false);
const elements: any = ref(null);
const totalPriceOrder = ref(0);
const userId = ref(0);
const warning = ref<[boolean, string]>([false, '']);
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
            const quantity = item.quantity;
            const totalPrice = (productData.data.price - productData.data.discount) * quantity;
            totalPriceOrder.value += totalPrice;
        });

    }
    loading.value = false;

};


const getPayment = async (total: number) => {
    stripe.value = await loadStripe(config.public.STRIPE_PUBLIC_KEY);
    paymentIntent = await createPaymentIntent(total*100);
    const clientSecret = paymentIntent.client_secret;
    elements.value = stripe.value.elements({ clientSecret: clientSecret, appearance });
    const paymentElement = elements.value.create('payment');
    paymentElement.mount('#payment');

}


const createPayment = async () => {
    try {
        loading.value = true;
        const result: any = await confirmPayment(paymentIntent.paymentId);
        if (result.payment.status === 'succeeded') {
            const token: any = localStorage.getItem('auth-data');
            const tokenData = JSON.parse(token);
            const userByToken: any = await getUserToken(tokenData);
            if (userByToken.data.user) {
                userId.value = userByToken.data.user;
                const orderData: any = await getOrderListLast(userId.value);
                if (orderData.data) {
                    const order = orderData.data;
                    order.payment_status = 'paid';
                    order.transaction_id = result.payment.id;
                    const data = localStorage.getItem('cart');
                    if (data) {
                        const dataInfo = JSON.parse(data);
                        dataInfo.forEach(async (item: any) => {
                            const productData: any = await showProductById(item.product);
                            productData.data.stock -= item.quantity;
                            await updateProductStock(productData.data.id,productData.data.stock);
                        });
                    }
                            try {
                                await updateOrder(order, order.id);
                                localStorage.removeItem('cart');
                                loading.value = false;
                                router.push('/profile')
                            } catch (error: any) {
                                console.log(error);
                                warning.value = [true, error.message];
                                loading.value = false;
                            }

                        }else {
                            console.log('Order not found');
                            warning.value = [true, 'Order not found'];
                            loading.value = false;
                        }
            } else {
                        console.log('User not found');
                        warning.value = [true, 'User not found'];
                        loading.value = false;
                    }
                } else {
                    console.log('Payment failed');
                    warning.value = [true, 'Payment failed'];
                    localStorage.removeItem('cart');
                    loading.value = false;
                    router.push('/profile');
                }
            } catch (error: any) {
                console.error('Error creating payment intent:', error.message);
                warning.value = [true, error.message];
                loading.value = false;
            }
        };

        watch(totalPriceOrder, (newValue, oldValue) => {
            if (newValue !== oldValue) {
                getPayment(newValue);
            }
        });
        getOrder();



</script>