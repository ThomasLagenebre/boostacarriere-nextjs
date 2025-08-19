'use client';
import React, { useEffect } from 'react'
import { listAll, ref } from 'firebase/storage'
import { storage } from '@/lib/firebase'


export default function ImagesList() {
    const imagesListRef = ref(storage, 'files/')

    useEffect(() => {
        listAll(imagesListRef).then((response) => {
            // Traitement des images
        })
    }, [imagesListRef])
  return (
    <div>ImagesList</div>
  )
}
