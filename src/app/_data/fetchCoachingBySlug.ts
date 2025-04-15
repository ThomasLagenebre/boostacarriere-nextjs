export async function fetchCoachingBySlug(slug: string){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products-by-slug/${slug}`);
    if (!res.ok) {
        throw new Error('Erreur lors de la récupération des coachings');
    }
    const currentCoaching = await res.json();

    return currentCoaching.data
}