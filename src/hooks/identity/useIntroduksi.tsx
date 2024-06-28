import { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc } from 'firebase/firestore';
import { db, storage } from '@/utils/firebase';
import { uploadBytes, ref, getDownloadURL, deleteObject } from 'firebase/storage';
import { Introduksi } from '@/types/introduksi';

const useIdentity = () => {
  const getIntroduksi = async () => {
    const identityCollection = collection(db, "introduksi");
    const data = await getDocs(identityCollection);
    const identityData = data.docs[0].data();
    return identityData as Introduksi;
  }

  const updateIntroduksi = async (formData: { tagline: string; judul: string; konten: string; sorotan: Array<{ judul: string; isi: string; }>, gambar1: File | null, gambar2: File | null }) => {
    const identityCollection = collection(db, "introduksi");
    const data = await getDocs(identityCollection);
    const identityData = data.docs[0];
    try {
      let gambar1Url = identityData.data().gambar1;
      let gambar2Url = identityData.data().gambar2;

      if (formData.gambar1 !== null) {
        if (gambar1Url) {
          const imageRef = ref(storage, gambar1Url);
          await deleteObject(imageRef);
        }
        const imageRef = ref(storage, `images/${formData.gambar1.name}`);
        await uploadBytes(imageRef, formData.gambar1);
        gambar1Url = await getDownloadURL(imageRef);
      }

      if (formData.gambar2 !== null) {
        if (gambar2Url) {
          const imageRef = ref(storage, gambar2Url);
          await deleteObject(imageRef);
        }
        const imageRef = ref(storage, `images/${formData.gambar2.name}`);
        await uploadBytes(imageRef, formData.gambar2);
        gambar2Url = await getDownloadURL(imageRef);
      }

      await updateDoc(identityData.ref, {
        tagline: formData.tagline,
        judul: formData.judul,
        konten: formData.konten,
        sorotan: formData.sorotan,
        gambar1: gambar1Url,
        gambar2: gambar2Url
      });
        
      
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  return { getIntroduksi, updateIntroduksi };
}

export default useIdentity;
