import Cookies from 'js-cookie';

export interface Purchase {
  id: number;
  totalAmount: number;
  stripeCustomer: string | null;
  orderableType: string;
  orderableId: number;
  createdAt: string; // format "18/06/2025 16:48"
  products: { id: number; name?: string }[];
}

export const fetchUserPurchases = async (userId: number): Promise<Purchase[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/user/${userId}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Aucun achat trouvé');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching user purchases:', error);
    throw error;
  }
}; 