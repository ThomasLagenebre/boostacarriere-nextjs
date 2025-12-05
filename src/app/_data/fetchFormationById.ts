export async function fetchFormationById(id: number) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`;
    
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        return null;
    }

    const data = await res.json();
    return data.data;
} 