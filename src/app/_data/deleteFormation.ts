import Cookies from 'js-cookie';

export const deleteFormation = async (id: number): Promise<void> => {
    const token = Cookies.get('auth_token');
    if (!token) {
        throw new Error('No authentication token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/formations/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete formation');
    }
}; 