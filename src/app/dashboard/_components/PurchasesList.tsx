import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/_context/AuthContext';
import { fetchUserPurchases } from '@/app/_data/fetchUserPurchases';
import DashboardSection from './DashboardSection';
import SectionTitle from '@/app/(landing)/prestations/_components/SectionTitle';

interface Purchase {
  id: number;
  totalAmount: number;
  stripeCustomer: string | null;
  orderableType: string;
  orderableId: number;
  createdAt: string; // format "18/06/2025 16:48"
  products: { id: number; title?: string }[];
}

function formatDateFR(dateStr: string) {
  // "18/06/2025 16:48" => "2025-06-18T16:48"
  const [date, time] = dateStr.split(' ');
  const [day, month, year] = date.split('/');
  const iso = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${time}`;
  return new Date(iso).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function PurchasesList() {
  const { user, loading } = useAuth();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || loading) return;
    setIsLoading(true);
    setError(null);
    fetchUserPurchases(user.id)
      .then((data) => setPurchases(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [user, loading]);

  if (loading || isLoading) return <DashboardSection className='bg-white col-span-2 px-4 p-4'><SectionTitle title='Mes achats' />Chargement...</DashboardSection>;
  if (error) return <DashboardSection className='bg-white col-span-2 px-4 p-4'><SectionTitle title='Mes achats' /><div className='text-red-500'>{error}</div></DashboardSection>;
  if (!purchases.length) return <DashboardSection className='bg-white col-span-2 px-4 p-4'><SectionTitle title='Mes achats' />Aucun achat</DashboardSection>;

  return (
    <DashboardSection className='bg-white col-span-2 px-4'>
      <SectionTitle title='Mes derniers achats' />
      {purchases.slice(0, 2).map((purchase) => (
        <div key={purchase.id} className="border-b border-gray-200 p-4 flex flex-col gap-2">
          <div className="">
            <p className="font-bold">Achat #{purchase.id}</p>
            <span className="font-bold">Montant :</span> {purchase.totalAmount} €
            <p className="font-bold">Acheté le :</p> {formatDateFR(purchase.createdAt)}
          </div>
          {purchase.products && purchase.products.length > 0 && (
            <div className="ml-4">
              <span className="font-bold">Produits :</span>
              <ul className="list-disc ml-6">
                {purchase.products.map((prod) => (
                  <li key={prod.id}>{prod.title ? prod.title : `Produit #${prod.id}`}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
      {purchases.length > 2 && (
        <div className="text-center mt-4">
          <a href="/dashboard/achats" className="text-secondary hover:underline font-semibold">Voir tous les achats</a>
        </div>
      )}
    </DashboardSection>
  );
} 