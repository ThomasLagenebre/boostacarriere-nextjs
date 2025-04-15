export async function paymentIntend(appointment: string, duration: number, name: string, email: string, productId: number, termsAccepted: boolean){
    if (!name || name.trim() === '') {
        throw new Error('Merci de renseigner ton nom complet');
    }

    if (!email || email.trim() === '') {
        throw new Error('Merci de renseigner ton adresse mail');
    }

    if (!productId) {
        throw new Error('Un problème est survenu avec le produit');
    }

    if (termsAccepted !== true) {
        throw new Error('Veuillez accepter les conditions');
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment-intend`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            appointment: appointment || null,
            duration: duration || null,
            name: name.trim(),
            email: email.trim(),
            productId: Number(productId),
            termsAccepted: Boolean(termsAccepted)
        }),
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(JSON.stringify(data));
    }

    return data
}