export async function deleteEbook(id: number) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ebooks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete ebook');
        }

        return await response.json();
    } catch (error) {
        console.error('Error deleting ebook:', error);
        throw error;
    }
} 