import { useState, useEffect } from 'react';
import { collection, getDocs} from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { Identity } from '@/types/identity';

export const useIdentity = () => {
  const [identity, setIdentity] = useState<Identity | null>(null);

  useEffect(() => {
    const fetchIdentity = async () => {
      const identityCollection = collection(db, "identity");
        const data = await getDocs(identityCollection);
        const identityData = data.docs[0].data();
        setIdentity(identityData as Identity);
    };

    fetchIdentity();
  }, []);

  return identity;
};
