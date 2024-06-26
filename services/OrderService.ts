import type { OrdersModel } from "~/models/OrdersModel";

export function createOrder(userId:number,orderData:Array<any>) {
    return $fetch('https://api.sajad.uk/api/v1/order_create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: {
            userId: userId,
            items: orderData
}
    });
}

export function getOrderListLast(userId:number) {
    return $fetch(`https://api.sajad.uk/api/v1/order_last_user/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export function updateOrder(orderData:OrdersModel,orderId:number) {
    return $fetch(`https://api.sajad.uk/api/v1/order_update/${orderId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: {
            totalPrice:orderData.totalPrice,
            payment_status:orderData.payment_status,
            transaction_id:orderData.transaction_id,
            shipping_method:orderData.shipping_method,
            delivery_date:orderData.delivery_date
        }
}
   );
}

export function getOrdeList(){
    return $fetch('https://api.sajad.uk/api/v1/order_show', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export function getOrderDetail(orderId:number){
    return $fetch(`https://api.sajad.uk/api/v1/order_details/${orderId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export function updateOrderStatus(orderId:number,status:string){
    return $fetch(`https://api.sajad.uk/api/v1/order_detail_update/${orderId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: {
            order_status:status
        }
    });
}

export function showOrderByUser(userId:number){
    return $fetch(`https://api.sajad.uk/api/v1/order_user/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}