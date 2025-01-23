export async function fetchAllCoachings(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/products?category=coachings`);
    if (!res.ok) {
        throw new Error('Erreur lors de la récupération des coachings');
    }
    const allCoachings = await res.json();

    return allCoachings
}