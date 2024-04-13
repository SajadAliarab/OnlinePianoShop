export function createPaymentIntent(amount: number) {
    return $fetch(`https://api.sajad.uk/api/v1/payment`, {
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
    return $fetch(`https://api.sajad.uk/api/v1/payment_confirm`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: {
            paymentIntentId,
        }
        
    });
}