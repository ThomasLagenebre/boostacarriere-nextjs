'use client';
import React, { useEffect } from 'react'
import { listAll, ref } from 'firebase/storage'
import { storage } from '@/utils/firebase'


export default function ImagesList() {
    const imagesListRef = ref(storage, 'files/')

    useEffect(() => {
        listAll(imagesListRef).then((response) => {
            console.log(response);
            
        })
    }, [imagesListRef])
  return (
    <div>ImagesList</div>
  )
}
