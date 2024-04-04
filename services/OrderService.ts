import type { OrdersModel } from "~/models/OrdersModel";

export function createOrder(userId:number,orderData:Array<any>) {
    return $fetch('http://localhost:8000/api/v1/order_create', {
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
    return $fetch(`http://localhost:8000/api/v1/order_last_user/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export function updateOrder(orderData:OrdersModel,orderId:number) {
    return $fetch(`http://localhost:8000/api/v1/order_update/${orderId}`, {
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