import { useState, useEffect } from 'react';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { Kegiatan } from '@/types/kegiatan';

export const getAllKegiatan = () => {
    const [kegiatan, setKegiatan] = useState<Array<Kegiatan> | null>(null);

    useEffect(() => {
        const fetchKegiatan = async () => {
            const kegiatanCollection = collection(db, "kegiatan");
            const q = query(kegiatanCollection);
            const data = await getDocs(q);
            const kegiatanData = data.docs.map(doc => doc.data());
            setKegiatan(kegiatanData as Array<Kegiatan>);
        };

        fetchKegiatan();
    }, []);

    return kegiatan;
}

export const getKegiatan = (id: string) => {
    const [kegiatan, setKegiatan] = useState<Kegiatan | null>(null);
    useEffect(() => {
        const fetchKegiatan = async () => {
            const kegiatanCollection = collection(db, "kegiatan");
            const q = query(kegiatanCollection, where("id", "==", id));
            const data = await getDocs(q);
            const kegiatanData = data.docs[0].data();
            setKegiatan(kegiatanData as Kegiatan);
        };

        fetchKegiatan();
    }, [id]);

    return kegiatan;
}

