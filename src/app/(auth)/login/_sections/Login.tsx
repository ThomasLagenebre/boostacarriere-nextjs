import React from 'react'
import Input from '../_components/Input'
import Button from '@/app/_global_components/Button'

export default function Login() {
  return (
    <div className='lg:w-1/2 mt-16 px-4 lg:px-8'>
        <form>
            <Input label="Email" type='email' placeholder='laurine@boostacarriere.fr' id='email'/>
            <Input label="Mot de passe" type='password' placeholder='••••••••' id='password'/>
            <a className='underline cursor-pointer text-secondary block'>Mot de passe oublié ?</a>
            <Button type='button' style='secondary' className='my-4 text-white font-bold py-2 w-full hover:text-secondary lg:bg-white lg:text-secondary lg:hover:text-white lg:hover:border-white'>Se connecter</Button>
        </form>
    </div>
  )
}
