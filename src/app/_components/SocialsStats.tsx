import React from 'react'
import textSettings from '../_data/settings'
import { FaInstagram, FaTiktok } from 'react-icons/fa'  
import { IoMdEye } from 'react-icons/io'

export default function SocialsStats() {
  return (
    <div  className='md:flex items-center justify-around mt-10 w-3/4 mx-auto'>
        <div className='max-md:mt-6'>
            <p className='text-secondary dark:text-primary text-center'><span className='text-2xl font-black'>{textSettings.social.followersInsta}K</span><br/>
            <span className='font-light'>Abonnés sur instagram</span></p>
            <FaInstagram className='text-secondary dark:text-primary  text-2xl mx-auto mt-2'/>
        </div>
        <div className='max-md:mt-6'>
            <p className='text-secondary dark:text-primary text-center'><span className='text-2xl font-black'>{textSettings.social.followersTiktok}K</span><br/>
            <span className='font-light'>Abonnés sur Tiktok</span></p>
            <FaTiktok className='text-secondary dark:text-primary  text-2xl mx-auto mt-2'/> 
        </div>
        <div className='max-md:mt-6'>
            <p className='text-secondary dark:text-primary text-center'><span className='text-2xl font-black'>{textSettings.social.globalViews}M</span><br/>
            <span className='font-light'>de vues sur les plateformes</span></p>
            <IoMdEye className='text-secondary dark:text-primary  text-2xl mx-auto mt-2'/>
        </div>
    </div>
  )
}
