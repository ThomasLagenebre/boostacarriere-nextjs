import React from 'react'
import { fetchFormationBySlug } from '@/app/_data/fetchFormationBySlug'
import { notFound } from 'next/navigation'
import Plan from '../../_sections/Plan';
import ScrollUp from '../../_components/ScrollUp';
import Hero from '../../_sections/Hero';
import Reviews from '../../_sections/Reviews';
import { fetchFormationById } from '@/app/_data/fetchFormationById';
import { cookies } from 'next/headers';
import FormationContent from './_components/FormationContent';

export default async function Page({ params }: { params: { id: number } }) {
  const { id } = params;

  // Vérifier si l'utilisateur est connecté côté serveur
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token');
  const isConnected = !!token;

  try {
    const currentProduct = await fetchFormationById(id);
    
    if (!currentProduct) {
      return (
        <main className="mx-auto max-w-screen-xl max-xl:px-2">
          <p>Produit non trouvé.</p>
        </main>
      );
    }

    return (
      <main className="mx-auto max-w-screen-xl max-xl:px-2">
        <Hero
          id={currentProduct.id}
          title={currentProduct.title}
          category={currentProduct.category}
          description={currentProduct.description}
          rate={currentProduct.rate}
          img={currentProduct.picture}
          price={parseInt(currentProduct.price)}
          promotion={currentProduct.promotion}
          limitPromotion={currentProduct.limitPromotion}
          includes={currentProduct.includes}
          reviews={currentProduct.reviews}
          isConnected={isConnected}
        />
        
        {/* Afficher le plan de formation pour tous les utilisateurs */}
        <div className="xl:max-w-[800px]">
          <Plan chapters={currentProduct.chapters} />
        </div>

        {/* Composant client qui gère l'authentification et l'affichage du contenu */}
        <FormationContent formation={currentProduct} isConnected={isConnected} />

        <div className="xl:max-w-[800px]">
          <Reviews categoryName={currentProduct.category.name} />
        </div>
        <ScrollUp />
      </main>
    );
  } catch (error) {
    console.error(error);
    return notFound();
  }
}