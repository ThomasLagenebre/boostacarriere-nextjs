export async function fetchCoachingById(id: number) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`;
    
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        return null;
    }

    const data = await response.json();
    return data.data;
}