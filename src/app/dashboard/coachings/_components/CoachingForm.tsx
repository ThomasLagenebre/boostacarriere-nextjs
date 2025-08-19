"use client";
import { createCoaching } from '@/app/_data/createCoaching';
import React, { useState } from 'react';
import GeneralModule from '../../_modulesForm/GeneralModule';
import ImgModule from '../../_modulesForm/ImgModule';
import PriceModule from '../../_modulesForm/PriceModule';
import CurrentProblemsModule from '../../_modulesForm/CurrentProblemsModule';
import GainsModule from '../../_modulesForm/GainsModule';
import ContentModule from '../../_modulesForm/ContentModule';
import DashboardSection from '../../_components/DashboardSection';
import Input from '../../_components/Input';
import { toast, ToastContainer } from 'react-toastify';
import { log } from 'console';
import { useRouter } from 'next/navigation';
import Button from '@/app/_global_components/Button';

function CoachingForm() {
    const router = useRouter();
    const [request, setRequest] = useState({
        title: '',
        slogan: '',
        picture: '',
        description: '',
        shortDescription: '',
        price: 0,
        promotion: 0,
        promotionTime: 0,
        currentProblems: [] as {problem: string}[],
        gains: [] as {gain: string}[],
        content: [] as { title: string; description: string }[],
    });


    const handleImgModuleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target) {
            setRequest(prev => ({
                ...prev,
                picture: e.target.value
            }));    
        }
    };

    const handlePriceModuleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target) {
            setRequest(prev => ({
                ...prev,
                price: Number(e.target.value)
            }));
        }
    };

    const handlePromotionModuleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target) {
            setRequest(prev => ({
                ...prev,
                promotion: Number(e.target.value)
            }));
        }
    };

    const handlePromotionTimeModuleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target) {
            setRequest(prev => ({
                ...prev,
                promotionTime: Number(e.target.value)
            }));
        }
    };

    const handleCurrentProblemsModuleChange = (problems: {problem: string}[]) => {
        setRequest(prev => ({
            ...prev,
            currentProblems: problems
        }));
    }; 

    const handleGainsModuleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target) {
            try {
                const parsedGains = JSON.parse(e.target.value);
                setRequest(prev => ({
                    ...prev,
                    gains: parsedGains
                }));
            } catch (error) {
                console.error('Error parsing gains:', error);
            }
        }
    };

    const handleContentModuleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target) {
            try {
                const parsedContent = JSON.parse(e.target.value);
                setRequest(prev => ({
                    ...prev,
                    content: parsedContent
                }));
            } catch (error) {
                console.error('Error parsing content:', error);
            }
        }
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          // Transform currentProblems from {problem: string}[] to string[]
          const transformedRequest = {
            ...request,
            currentProblems: request.currentProblems.map(item => item.problem)
          };
          
          const response = await createCoaching(transformedRequest);       
          if (response.ok) {
            const responseData = await response.json();
            toast.success('Coaching créé avec succès !');
            router.push('/dashboard/coachings');
          } else {
            const errorData = await response.json();
            toast.error(errorData.message || 'Erreur lors de la création du coaching');
          }
      } catch (error: any) {
          console.error("Erreur lors de l'envoi :", error);
          try {
              const parsedError = JSON.parse(error.message);
              if (Array.isArray(parsedError)) {
                  parsedError.forEach((err) => toast.error(err));
              } else {
                  toast.error(parsedError.toString());
              }
          } catch {
              toast.error("Une erreur est survenue.");
          }
      }
        
    };

    return (
        <>
            <ToastContainer />
            <form className="my-6" onSubmit={handleSubmit}>
                <DashboardSection>
                    <h4 className="font-bold underline text-secondary">Informations générales</h4>
                    <Input id="title" type="text" value={request.title} placeholder="Négocie ton salaire efficacement" label="Titre" indicationLabel="(max 120 caract.)" onChange={(e) => setRequest({ ...request, title: e.target.value })} required />
                    <Input id="slogan" type="textarea" rows={2} value={request.slogan} placeholder="Prends le contrôle de ta rémunération et atteins de nouveaux sommets financiers" label="Slogan" indicationLabel="(max 255 caract.)" onChange={(e) => setRequest({ ...request, slogan: e.target.value })} required />
                    <Input id="shortDescription" type="textarea" rows={3} value={request.shortDescription} placeholder="A ajouter dans la BDD" label="Description courte" indicationLabel="(max 300 caract.)" onChange={(e) => setRequest({ ...request, shortDescription: e.target.value })} required />
                    <Input id="description" type="textarea" rows={5} value={request.description} label="Description longue" onChange={(e) => setRequest({ ...request, description: e.target.value })} required />
                </DashboardSection>

                <ImgModule imgURL={request.picture} handleChange={handleImgModuleChange} />

                <PriceModule price={request.price} promotion={request.promotion} promotionTime={request.promotionTime} handlePriceChange={handlePriceModuleChange} handlePromotionChange={handlePromotionModuleChange} handlePromotionTimeChange={handlePromotionTimeModuleChange} />
                <CurrentProblemsModule currentProblems={request.currentProblems} handleChange={handleCurrentProblemsModuleChange} />
                <GainsModule gains={request.gains} handleChange={handleGainsModuleChange} />
                <ContentModule contents={request.content} handleChange={handleContentModuleChange} /> 

                <Button type="submit" style="secondary" className="w-full">Envoyer</Button>
            </form>
        </>
    );
}

export default CoachingForm;
