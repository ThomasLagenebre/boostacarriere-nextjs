export async function fetchCoachingById(id: number, options = {}){
    const res = await fetch(`${process.env.API_URL_ONLINE}/products/${id}`, {cache: 'no-store'});
    if (!res.ok) {
        throw new Error('Erreur lors de la récupération des coachings');
    }
    const currentCoaching = await res.json();

    return currentCoaching.data
}