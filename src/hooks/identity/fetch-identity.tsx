import { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc} from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { Identity } from '@/types/identity';
import { phoneNumberFormat } from '@/utils/phoneNumberFormat';

const useIdentity = () => {
  const getIdentity = async () => {
    const identityCollection = collection(db, "identity");
    const data = await getDocs(identityCollection);
    const identityData = data.docs[0].data();
    return identityData as Identity;
  }

  const updateIdentity = async (identity: Identity) => {
    const identityCollection = collection(db, "identity");
    const data = await getDocs(identityCollection);
    const identityData = data.docs[0];
    try {
      if (identityData) {
        await updateDoc(identityData.ref, {
          nama: identity.nama,
          nomor_telepon: phoneNumberFormat(identity.nomor_telepon),
          email: identity.email,
          alamat: identity.alamat,
          jam_kerja: identity.jam_kerja,
          gmaps: identity.gmaps,
          facebook: identity.facebook,
          instagram: identity.instagram,
          twitter: identity.twitter,
          detail_dukuh: identity.detail_dukuh,
        });
      }
      
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  return { getIdentity, updateIdentity };
}

export default useIdentity;
