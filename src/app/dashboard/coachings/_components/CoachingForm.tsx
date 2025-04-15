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
import { uploadToFirebase } from '@/lib/uploadToFirebase';

function CoachingForm() {
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [request, setRequest] = useState({
        title: '',
        slogan: '',
        picture: '',
        description: '',
        shortDescription: '',
        price: 0,
        promotion: 0,
    });

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log(file);
        
        if (file) {
            setImgFile(file);
        }
    };

    // Fonction wrapper pour adapter le type
    const handleImgModuleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target instanceof HTMLInputElement) {
            handleImageChange(e as React.ChangeEvent<HTMLInputElement>);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      console.log(imgFile);
      
        if (imgFile) {
          try {
              const downloadUrlImg = await uploadToFirebase(imgFile, "Test");
              console.log(downloadUrlImg);
              
              setRequest((prevRequest) => ({ ...prevRequest, picture: downloadUrlImg }));
          } catch (error) {
              console.error("Erreur lors de l'upload de l'image :", error);
          }
      }

      if(request.picture !== ""){
        try {
          const response = await createCoaching(request);
          console.log("Réponse API :", response);
          toast.success("Coaching créé avec succès !");
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

                {/* Modules désactivés pour le moment */}
                {/* <PriceModule />
                <CurrentProblemsModule />
                <GainsModule />
                <ContentModule /> */}

                <button type="submit">Envoyer</button>
            </form>
        </>
    );
}

export default CoachingForm;
