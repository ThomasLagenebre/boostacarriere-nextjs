import Image from 'next/image'
import React from 'react'

export default function Footer() {
  return (
    <footer className='bg-secondary py-4 px-4 xl:py-10 mt-6'>
        <div className='md:flex items-center gap-8 justify-center max-w-screen-xl mx-auto'>
            <Image alt='photo de profil Laurine' src='https://firebasestorage.googleapis.com/v0/b/boostacarriere-2679a.appspot.com/o/files%2FIMG_0622.jpg?alt=media&token=0cd5f6df-f0e1-4fb4-af87-e612dd969c78' width={250} height={250} className='rounded-full w-32 h-32 md:w-40 md:h-40 object-cover max-xl:my-6'/>
            <div>
                <p className='font-bold text-white mb-2'>Hello ! Je suis Laurine, fondatrice de Boostacarrière</p>
                <p className='text-white'>Cela fait 5 ans que je suis plongée et passionnée par le monde des ressources humaines. Au fil de ces années, j&apos;ai accumulé une expérience solide dans ce domaine en constante évolution. <br/><br/>
                J&apos;ai eu l&apos;occasion d&apos;aider de nombreuses entreprises à gérer leurs ressources humaines, en mettant un point d&apos;honneur sur le développement du potentiel humain et de leurs carrières.</p>
            </div>
            
        </div>
    </footer>
  )
}
