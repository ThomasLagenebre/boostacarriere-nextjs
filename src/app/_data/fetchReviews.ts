export interface ProductReview {
  id: number;
  comment: string;
  rate: string;
  user_id: number;
  created_at: string;
  user: {
    id: number;
    firstname: string;
    lastname: string;
  };
  product: {
    id: number;
    title: string;
  };
}

export type Review =  ProductReview;

export async function fetchReviews(productId?: number): Promise<Review[]> {
  const url = productId 
    ? `${process.env.NEXT_PUBLIC_API_URL}/reviews?product_id=${productId}`
    : `${process.env.NEXT_PUBLIC_API_URL}/reviews`;
    
  const res = await fetch(url, {
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Erreur lors du chargement des avis');
  }
  const data = await res.json();
  console.log('fetchReviews: Données reçues:', data);
  return data || [];
} 