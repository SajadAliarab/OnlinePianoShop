export function createPaymentIntent(amount: number) {
    return $fetch(`http://localhost:8000/api/v1/payment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: {
            amount,
        }
    });
}

export function confirmPayment(paymentIntentId: string) {
    return $fetch(`http://localhost:8000/api/v1/payment_confirm`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: {
            paymentIntentId,
        }
        
    });
}