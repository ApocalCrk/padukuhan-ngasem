import { useState, useEffect } from 'react';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { Profil } from '@/types/profil';

export const useProfil = () => {
    const [profil, setProfil] = useState<Profil | null>(null);

    useEffect(() => {
        const fetchProfil = async () => {
            const profilCollection = collection(db, "pages");
            const q = query(profilCollection, where("id", "==", "profil"));
            const data = await getDocs(q);
            const profilData = data.docs[0].data();
            setProfil(profilData as Profil);
        };

        fetchProfil();
    }, []);

    return profil;
}
