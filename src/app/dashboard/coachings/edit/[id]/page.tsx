'use client';
import SectionTitle from '@/app/(landing)/prestations/_components/SectionTitle'
import React, { useState } from 'react'
import DashboardSection from '../../../_components/DashboardSection'
import { fetchCoachingById } from '@/app/_data/fetchCoachingById';
import GeneralModule from '@/app/dashboard/_modulesForm/GeneralModule';
import ImgModule from '@/app/dashboard/_modulesForm/ImgModule';
import PriceModule from '@/app/dashboard/_modulesForm/PriceModule';
import CurrentProblemsModule from '@/app/dashboard/_modulesForm/CurrentProblemsModule';
import GainsModule from '@/app/dashboard/_modulesForm/GainsModule';
import ContentModule from '@/app/dashboard/_modulesForm/ContentModule';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface Coaching {
  id: number;
  title: string;
  slogan: string;
  description: string;
  picture: string;
  price: string;
  promotion: number;
  currentProblems: any[];
  gains: any[];
  includes: any[];
}

export default function EditCoachingPage({ params }: { params: { id: number }}) {
  const router = useRouter();
  const [coaching, setCoaching] = useState<Coaching | null>(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const loadCoaching = async () => {
      try {
        const response = await fetchCoachingById(params.id);
        setCoaching(response);
      } catch (error) {
        console.error('Error loading coaching:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCoaching();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coaching) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('auth_token')}`
        },
        body: JSON.stringify(coaching)
      });

      if (response.ok) {
        router.push('/dashboard/coachings');
      } else {
        throw new Error('Failed to update coaching');
      }
    } catch (error) {
      console.error('Error updating coaching:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!coaching) return;
    const { name, value } = e.target;
    setCoaching(prev => prev ? { ...prev, [name]: value } : null);
  };

  if (loading) return <div>Loading...</div>;
  if (!coaching) return <div>Coaching not found</div>;

  return (
    <div className='max-lg:px-4'>
      <DashboardSection>
        <SectionTitle title={`TITRE : ${coaching.title}`} className='text-left'/>
      </DashboardSection>
      <form className='my-6' onSubmit={handleSubmit}>
        <GeneralModule 
          title={coaching.title} 
          slogan={coaching.slogan} 
          shortDescription={coaching.description} 
          description={coaching.description}
          handleChange={handleChange}
        />
        <ImgModule 
          imgURL={coaching.picture}
          handleChange={handleChange}
        />
        <PriceModule 
          price={coaching.price} 
          promotion={coaching.promotion} 
          promotionTime={20}
          handleChange={handleChange}
        />
        <CurrentProblemsModule 
          currentProblems={coaching.currentProblems}
          handleChange={handleChange}
        />
        <GainsModule 
          gains={coaching.gains}
          handleChange={handleChange}
        />    
        <ContentModule 
          contents={coaching.includes}
          handleChange={handleChange}
        />
        <button 
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
        >
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
}