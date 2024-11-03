import React, { useState } from 'react'
import Input from '../_components/Input'
import Button from '@/app/_global_components/Button'

export default function Signup() {
  const [step, setStep] = useState(1);
  return (
    <div className='lg:w-1/2 mt-16 lg:translate-x-full px-4 lg:px-8'>
        <form>
            {step === 1 && (
              <>
              <Input label="Prénom" type='text' placeholder='John' id='firstname'/>
              <Input label="Nom" type='text' placeholder='Doe' id='lastname'/>
              <Input label="Adresse mail" type='email' placeholder='laurine@boostacarriere.fr' id='email'/>
              <Button type='button' onClick={() => setStep(2)} style='secondary' className='my-4 text-white font-bold py-2 w-full hover:text-secondary lg:bg-white lg:text-secondary lg:hover:text-white lg:hover:border-white'>Continuer l&apos;inscription</Button>
            </>
            )}
            {step === 2 && (
            <>
              <Input label="Mot de passe" type='password' placeholder='••••••••' id='password'/>
              <Input label="Adresse postale" type='text' placeholder='2 rue de la paie' id='adress'/>
              <Input label="Code postal" type='text' placeholder='75001' id='zip_code'/>
              <Input label="Ville" type='text' placeholder='Paris' id='zip_code'/>
              <Button type='button' onClick={() => setStep(2)} style='secondary' className='my-4 text-white font-bold py-2 w-full hover:text-secondary lg:bg-white lg:text-secondary lg:hover:text-white lg:hover:border-white'>Finaliser l&apos;inscription</Button>
            </>
            )}
            
            
        </form>
    </div>
  )
}
