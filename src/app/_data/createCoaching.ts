import Cookies from 'js-cookie';

export async function createCoaching(request: {
    title: string;
    slogan: string;
    picture: string;
    description: string;
    shortDescription: string;
    price: number;
    promotion?: number;
    promotionTime?: number;
    currentProblems: string[];
    gains: { gain: string }[];
    content: { title: string; description: string }[];
}) {
    const token = Cookies.get('auth_token');
    if (!token) {
        throw new Error('Connexion requise');
    }

    console.log(token);
    console.log(request);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {    
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            title: request.title,
            slogan: request.slogan,
            picture: request.picture,
            description: request.description,
            short_description: request.shortDescription,
            product_category_id: 1,
            price: request.price,
            promotion: request.promotion || 0,
            promotion_time: request.promotionTime || null,
            current_problems: request.currentProblems,
            gains: request.gains,
            includes: request.content,
            is_active: true
        })
    });

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    return res;
}