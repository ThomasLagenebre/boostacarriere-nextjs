import Cookies from 'js-cookie';

interface ProblemObject {
    problem: string;
}

export async function updateCoaching(id: number, request: {
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
    includes: { title: string; description: string }[];
}) {
    const token = Cookies.get('auth_token');
    if (!token) {
        throw new Error('Connexion requise');
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
        method: "PUT",
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
            current_problems: request.currentProblems.map(problem => {
                if (typeof problem === 'object' && problem !== null) {
                    const problemObj = problem as ProblemObject;
                    return 'problem' in problemObj ? problemObj.problem : JSON.stringify(problem);
                }
                return problem;
            }),
            gains: request.gains,
            includes: request.includes,
            is_active: true
        })
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(JSON.stringify(data));
    }

    return data;
} 