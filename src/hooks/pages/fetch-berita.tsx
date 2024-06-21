import { useState, useEffect } from 'react';
import { collection, getDocs, where, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { Berita } from '@/types/berita';

export const getAllBerita = () => {
    const [berita, setBerita] = useState<Array<Berita> | null>(null);

    useEffect(() => {
        const fetchBerita = async () => {
            const beritaCollection = collection(db, "berita");
            const q = query(beritaCollection);
            const data = await getDocs(q);
            const beritaData = data.docs.map(doc => doc.data());
            setBerita(beritaData as Array<Berita>);
        };

        fetchBerita();
    }, []);

    return berita;
}

export const getRecentBerita = () => {
    const [berita, setBerita] = useState<Array<Berita> | null>(null);

    useEffect(() => {
        const fetchBerita = async () => {
            const beritaCollection = collection(db, "berita");
            const q = query(beritaCollection, orderBy("tanggal_post", "desc"), limit(3));
            const data = await getDocs(q);
            const beritaData = data.docs.map(doc => doc.data());
            setBerita(beritaData as Array<Berita>);
        };

        fetchBerita();
    }, []);

    return berita;
}

export const getBerita = (id: string) => {
    const [berita, setBerita] = useState<Berita | null>(null);
    useEffect(() => {
        const fetchBerita = async () => {
            const beritaCollection = collection(db, "berita");
            const q = query(beritaCollection, where("id", "==", id));
            const data = await getDocs(q);
            const beritaData = data.docs[0].data();
            setBerita(beritaData as Berita);
        };

        fetchBerita();
    }, [id]);

    return berita;
}