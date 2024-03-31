<script setup lang="ts">
import { showProductById } from '~/servies/ProductService';
import ThePriceFormaater from '../ThePriceFormmater.vue';
import { getUserToken } from '~/servies/AuthService';
import { createOrder } from '~/servies/OrderService';


const columns = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'title',
    label: 'Product Name'
  },
  {
    key: 'image',
    label: 'Image'
  },
  {
    key: 'color',
    label: 'Color'
  },
    {
        key: 'price',
        label: 'Price'
    },
    {
        key: 'quantity',
        label: 'Quantity'
    },
    {
        key: 'totalPrice',
        label: 'Total Price'
    },
  {
    key: 'actions',
    label: 'Actions'
  }
];

const orderData:any = ref([]);
const loading = ref(false);
const totalQuantity = ref(0);
const totalPriceOrder = ref(0);
const router = useRouter();

const getItem = async () => {
    loading.value = true;
  const data= localStorage.getItem('cart');
    if(data){
        const dataInfo= JSON.parse(data);
        dataInfo.forEach(async (item: any) => {
            const productData:any = await showProductById(item.product);
            const productColorData =  productData.colors.find((color: any) => color.name === item.color);
            const productColor = "http://localhost:8000/uploads/"+productColorData.image;
            const productImage = "http://localhost:8000/uploads/"+productData.data.image;
            const productPrice = (productData.data.price-productData.data.discount);
            const quantity = item.quantity;
            const totalPrice = (productData.data.price-productData.data.discount) * quantity;
            totalQuantity.value += quantity;
            totalPriceOrder.value += totalPrice;
            orderData.value.push({
                id: dataInfo.indexOf(item) + 1,
                productId: item.product,
                title: productData.data.title,
                image: productImage,
                colorName:item.color,
                color: productColor,
                price: productPrice,
                quantity: quantity,
                totalPrice: totalPrice
            });

        });

    }
    loading.value = false;
};

onMounted(getItem);


const deleteRow = (row: any,totalPrice:number,quantity:number) => {
      
        
    const index = orderData.value.findIndex((product: any) => product.id === row);
    
    if (index !== -1) {
        orderData.value.splice(index, 1);
        totalQuantity.value -= quantity;
        totalPriceOrder.value -= totalPrice;
        if(orderData.value.length === 0){
            localStorage.removeItem('cart');
        }else{
        const updatedData = orderData.value.map((item: any) => ({
            product: item.productId,
            quantity: item.quantity,
            color: item.colorName
        }));
        localStorage.setItem('cart', JSON.stringify(updatedData));
    }

    }
    

}
const checkOut = async() => {
    const data:any= localStorage.getItem('cart');
    const dataInfo= JSON.parse(data);
    const token:any = localStorage.getItem('auth-data');
    if(!token){
        router.push('/auth/login');
    }else{
    const userToken=JSON.parse(token);
    const userData:any = await getUserToken(userToken);
    const userId = userData.data.user;
    if(dataInfo){
        try{
        await createOrder(userId,dataInfo);
        localStorage.removeItem('cart');
        router.push('/cart/checkOut');
        }catch(e){
            console.log(e);
        }
    }else{
        alert('Please add some items to cart');}
 
}
    
}

</script>

<template>
   <div class="flex justify-center  h-auto">
    <UTable :loading="loading" :rows="orderData" :columns="columns" class="border rounded-lg bg-gray-900 w-3/4">
    <template #title-data="{ row }">
      <span class="text-primary-400">{{ row.title}}</span>
    </template>
    <template #color-data="{ row }">
      <img :src="row.color"  class="w-12 h-12 rounded-full bg-gray-200 mr-2" />
    </template>
    <template #image-data="{ row }">
      <img :src="row.image"  class="h-20 w-20" />
    </template>
    <template #price-data="{ row }">
      <span class="text-primary-500"> <ThePriceFormaater :price="row.price" /> </span>
    </template>
    <template #quantity-data="{ row }">
      <span class="text-primary-500">{{ row.quantity}}</span>
    </template>
    <template #totalPrice-data="{ row }">
      <span class="text-primary-500"> <ThePriceFormaater :price="row.totalPrice" /> </span>
    </template>
    <template #actions-data="{ row }">
      <UButton  icon="i-heroicons-trash" size="sm" color="primary" square variant="solid" @click=deleteRow(row.id,row.totalPrice,row.quantity) />
    </template>


  </UTable>
    </div>
<div class="flex justify-center my-5">
    <div class="flex justify-between w-1/2">
    <span class="text-primary-100 font-extrabold">Total Items: {{ totalQuantity }}</span>
    <span class="text-primary-100 font-extrabold">Total Price: <ThePriceFormaater :price="totalPriceOrder" /></span>
    <UButton  color="green" class="mx-4 font-medium text-sm px-4 py-2  text-center" @click=checkOut>Checkout</UButton>
    </div>
</div>
</template>

