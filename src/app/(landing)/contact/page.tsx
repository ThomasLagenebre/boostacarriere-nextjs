import Button from '@/app/_global_components/Button'
import Input from '@/app/dashboard/_components/Input'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <section>
  <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-secondary">Contacte nous</h2>
      <p className="font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Un problème, une question, envie de nous envoyer un message d’amour ? N’hésitez pas à utiliser ce formulaire pour prendre contact avec moi !</p>
      <p className="mt-3 mb-8 lg:mb-16 font-semibold text-center text-gray-500 dark:text-gray-300 sm:text-xl"> Avant de me contacter, vérifie si tu ne trouves la réponse à ta question sur la  <Link className="underline text-current-color-2 dark:text-current-color" href="/faq">FAQ</Link></p>
        <form  className="space-y-8">
            <Input id='email' label='Ton email' type='text' placeholder='jeveux@unjob.fr'/>
            <Input id='subject' label='Objet du message' type='text' placeholder='Problème de connexion'/>
            <Input id='email' label='Ton message' type='textarea' placeholder='Ecris ton message...' rows={6}/>
            <p className="italic dark:text-white">Les informations saisies dans ce formulaire ne sont pas stockées par Boostacarriere mais peuvent être utilisées pour vous contacter. </p>
            <Button type="button" className="m-auto hover:text-secondary" style='secondary'>Envoyer mon message</Button>
      </form>
      
  </div>
</section>
  )
}

export default page