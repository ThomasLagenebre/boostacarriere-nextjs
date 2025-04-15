export async function fetchAllFormations(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?category=formations`);
    if (!res.ok) {
        throw new Error('Erreur lors de la récupération des formations');
    }
    const allFormations = await res.json();

    return allFormations
}