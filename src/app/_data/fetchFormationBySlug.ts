export async function fetchFormationBySlug(slug: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products-by-slug/${slug}`);
    if (!res.ok) {
        throw new Error('Erreur lors de la récupération de la formation');
    }
    const data = await res.json();
    return data.data;
} 