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