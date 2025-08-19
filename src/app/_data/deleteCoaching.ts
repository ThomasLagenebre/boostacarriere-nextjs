import Cookies from 'js-cookie';

export async function deleteCoaching(id: number) {
    const token = Cookies.get('auth_token');
    if (!token) {
        throw new Error('No authentication token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete coaching');
    }

    // Si la réponse est vide (statut 204 No Content), retourner un objet vide
    if (response.status === 204) {
        return {};
    }

    // Sinon, essayer de parser le JSON
    try {
        return await response.json();
    } catch (error) {
        // Si le parsing échoue mais que la réponse est OK, retourner un objet vide
        if (response.ok) {
            return {};
        }
        throw error;
    }
} 