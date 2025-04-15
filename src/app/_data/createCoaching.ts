import { toast } from "react-toastify";

export async function createCoaching(request: {title: string, slogan: string, picture: string, description: string, shortDescription: string, price: number, promotion?: number }){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: request.title,
            slogan: request.slogan,
            picture: request.picture,
            description: request.description,
            short_description: request.shortDescription,
            product_category_id: 1,
            price: request.price,
            promotion: request.promotion ? request.promotion : 0,
            is_active: true
        })
    });


    const data = await res.json(); // Récupère toujours le JSON de la réponse

if (!res.ok) {
    throw new Error(JSON.stringify(data));
}

return data;
}