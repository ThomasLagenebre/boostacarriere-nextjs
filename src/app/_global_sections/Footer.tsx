import Image from 'next/image'
import React from 'react'
import textSettings from '../_data/settings'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='bg-secondary py-4 px-4 xl:py-10 mt-6'>
        <div className='md:flex items-center gap-8 justify-center max-w-screen-xl mx-auto'>
            <Image alt='photo de profil Laurine' src={textSettings.footer.img} width={250} height={250} className='rounded-full w-32 h-32 md:w-40 md:h-40 object-cover max-xl:my-6'/>
            <div>
                <p className='font-bold text-white mb-2'>{textSettings.footer.title}</p>
                <p className='text-white'>{textSettings.footer.description}</p>
            </div>
        </div>
        <hr  className='opacity-20 w-3/4 mx-auto my-10'/>
        <div className="sm:flex sm:items-center sm:justify-between max-w-screen-xl mx-auto">
            <span className="text-sm text-light sm:text-center">© 2024 <Link href="/" className="hover:underline">Boostacarriere™</Link>. Tous droits réservés.
            </span>
            <div className="flex items-center mt-4 space-x-6 sm:justify-center">
                <a href="https://www.tiktok.com/@boostacarriere.fr?lang=fr" className="text-light hover:text-gray-900 dark:hover:text-white" target="blank">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 7.50414C18.5333 7.56942 15.52 6.75998 15.2 3H12.4V13.9666C12.4 17.0999 9.93253 18.4412 8.289 17.2507C6.20169 15.7389 7.60003 12.5958 10.2 12.9874V9.6583C8.20003 9.6583 4 10.4416 4 15.3374C4 21.6041 10.8146 21.4083 12.4 20.5824C14.9798 19.2385 15.6 17.7827 15.6 14.5541C15.6 11.6166 15.6 9.85413 15.6 9.0708C16.2667 9.39719 18.08 10.0891 20 10.2458" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                </a>
                <a href="https://www.instagram.com/boostacarriere.fr/" rel="noreferrer" target="blank" className="text-light hover:text-gray-900 dark:hover:text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                </a>
            </div>
        </div>
    </footer>
  )
}
