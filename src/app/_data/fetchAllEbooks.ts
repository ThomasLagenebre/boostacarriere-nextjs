

export async function fetchAllEbooks() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?category=ebooks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des ebooks');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching ebooks:', error);
        throw error;
    }
} 