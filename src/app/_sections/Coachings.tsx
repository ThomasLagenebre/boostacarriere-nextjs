"use client";
import React, { useEffect, useState } from 'react'
import CoachingsCard from '../_components/CoachingsCard'
import { fetchAllCoachings } from '../_data/fetchAllCoachings';
import { ICoaching } from '@/interface/ICoaching';


export default function Coachings() {
  const [allCoachings, setAllCoachings] = useState([]); // État pour les coachings
  const [loading, setLoading] = useState(true);         // État pour le chargement
  const [error, setError] = useState(null);             // État pour les erreurs

  useEffect(() => {
    const loadCoachings = async () => {
      try {
        setLoading(true);
        const data = await fetchAllCoachings(); // Appel de l'API
        setAllCoachings(data.data); // Mise à jour de l'état avec les données
      } catch (err) {
        console.error(err); // Log de l'erreur pour le debug
      } finally {
        setLoading(false);
      }
    };

    loadCoachings();
  }, []);

  if (loading) {
    return <p>Chargement des coachings...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  
  return (
    <section className="grid grid-cols-1 gap-10 my-32 lg:grid-cols-2 xl:grid-cols-3 max-xl:px-4">
      {allCoachings.map((coaching: ICoaching) => (
        <CoachingsCard
          key={coaching.id}
          title={coaching.title}
          icon={coaching.picture}
          category={coaching.category.name}
          description={coaching.description}
          slug={coaching.slug}
        />
      ))}
    </section>
  )}