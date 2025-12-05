export async function updateFormation(id: number, request: {
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
    chapters: { 
        id?: number;
        title: string; 
        position: number;
        lessons: {
            id?: number;
            title: string;
            content: string;
            videoUrl: string;
            position: number;
        }[];
    }[];
}) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: request.title,
            slogan: request.slogan,
            picture: request.picture,
            description: request.description,
            short_description: request.shortDescription,
            product_category_id: 3, // ID pour les formations
            price: request.price,
            promotion: request.promotion || 0,
            promotion_time: request.promotionTime || null,
            current_problems: request.currentProblems,
            gains: request.gains,
            content: request.content,
            chapters: request.chapters.map(chapter => ({
                id: chapter.id,
                title: chapter.title,
                position: chapter.position,
                lessons: chapter.lessons.map(lesson => ({
                    id: lesson.id,
                    title: lesson.title,
                    content: lesson.content,
                    video: lesson.videoUrl,
                    position: lesson.position
                }))
            })),
            is_active: true
        })
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(JSON.stringify(data));
    }

    return data;
} 