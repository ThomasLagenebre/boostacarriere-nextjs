"use client";
import React from "react";
import "./globals.css";
import Header from "./_global_sections/Header";
import Footer from "./_global_sections/Footer";

const NotFound = () => {
  return (
    <div className="dark:bg-gray-900 m-auto h-[60vh] relative">
      <Header />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-1 border-gray-700 dark:border-gray-500 rounded-lg p-8">
      <div className="m-auto flex items-center gap-10">
        <p className="font-semibold text-red-500 text-9xl dark:text-red-600">404</p>
        <div>
        <p>
          <i className="fa-solid fa-triangle-exclamation text-red-500 dark:text-red-600 me-2"></i>
          <span className="text-gray-700 dark:text-white font-bold">Oops ! La page n&apos;a pas été trouvée.</span>
        </p>
        <p className="text-gray-700 dark:text-white mt-2">Tu peux retourner à l&apos;accueil ou utilisé la barre de recherche</p>
        </div>
      </div>
      <form className="mx-auto mt-10">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Rechercher</label>
        <div className="relative m-auto border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-500  dark:placeholder-gray-400 dark:text-white" >
            <button type="button" onClick={() => {console.log('Submit')}} className="absolute inset-y-0 start-0 flex items-center ps-3 z-10">
                <i className="fa-solid fa-magnifying-glass text-gray-500 dark:text-white"></i>
            </button>
            <input type="search" id="default-search" className="block w-full rounded-lg p-4 ps-10 text-sm text-gray-900 dark:text-white dark:bg-gray-700" placeholder="Retrouve ton chemin" required />
        </div>
      </form>
    </div>
    <div className="fixed bottom-0 w-full">
      <Footer />
    </div>
    
    </div>
  )
 
};

export default NotFound;