export async function fetchCoachingById(id: number, options = {}){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {cache: 'no-store'});
    if (!res.ok) {
        throw new Error('Erreur lors de la récupération des coachings');
    }
    const currentCoaching = await res.json();

    return currentCoaching.data
}