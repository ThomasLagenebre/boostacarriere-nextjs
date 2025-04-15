"use client";
import React, { useState } from 'react'
import Input from '../_components/Input'
import Button from '@/app/_global_components/Button'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/_context/AuthContext'
import { FaSpinner } from 'react-icons/fa'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='lg:w-1/2 mt-16 px-4 lg:px-8'>
        <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <Input 
              label="Email" 
              type='email' 
              placeholder='laurine@boostacarriere.fr' 
              id='email'
              value={formData.email}
              className='text-light'
              onChange={handleChange}
              required
            />
            <Input 
              label="Mot de passe" 
              type='password' 
              placeholder='••••••••' 
              id='password'
              value={formData.password}
              onChange={handleChange}
              className='text-light'
              required
            />
            <a className='underline cursor-pointer text-secondary block'>Mot de passe oublié ?</a>
            <Button 
              type='button'
              style='secondary' 
              className='my-4 text-white font-bold py-2 w-full hover:text-secondary lg:bg-white lg:text-secondary lg:hover:text-white lg:hover:border-white flex items-center justify-center gap-2'
              onClick={() => handleSubmit(new Event('submit') as any)}
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                'Se connecter'
              )}
            </Button>
        </form>
    </div>
  )
}
