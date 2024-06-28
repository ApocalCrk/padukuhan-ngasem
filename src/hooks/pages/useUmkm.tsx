import { collection, getDocs, where, query, orderBy, limit, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { UMKM } from '@/types/umkm';
import { slugify } from '@/utils/slugify';

const useUmkm = () => {
    const getAllUmkm = async () => {
        const umkmCollection = collection(db, "umkm");
        const q = query(umkmCollection);
        const data = await getDocs(q);
        const umkmData = data.docs.map(doc => doc.data());
        return umkmData as Array<UMKM>;
    }

    const getUmkm = async (id: string) => {
        const umkmCollection = collection(db, "umkm");
        const q = query(umkmCollection, where("id", "==", id));
        const data = await getDocs(q);
        const doc = data.docs[0];
        return doc.data() as UMKM;
    }

    const uniqueTitle = async (title: string) => {
        const beritaCollection = collection(db, "umkm");
        const q = query(beritaCollection, where("id", "==", slugify(title)));
        const data = await getDocs(q);
        if (!data.empty) {
            return false;
        }
        return true;
    }

    const updateUniqueTitle = async (title: string, id: string) => {
        const beritaCollection = collection(db, "umkm");
        const q = query(beritaCollection, where("id", "==", slugify(title)));
        const data = await getDocs(q);
        if (!data.empty) {
            const doc = data.docs[0];
            const docData = doc.data();
            if (docData.id === id) {
                return true;
            }
            return false;
        }
        return true;
    }

    const addUmkm = async (umkm: UMKM) => {
        const umkmCollection = collection(db, "umkm");
        const docRef = await addDoc(umkmCollection, umkm);
        return docRef.id;
    }

    const updateUmkm = async (umkm: UMKM) => {
        const umkmCollection = collection(db, "umkm");
        const q = query(umkmCollection, where("id", "==", umkm.id));
        const data = await getDocs(q);
        const doc = data.docs[0];
        try {
            await updateDoc(doc.ref, {
                nama_umkm: umkm.nama_umkm,
                pemilik_umkm: umkm.pemilik_umkm,
                no_telepon: umkm.no_telepon,
            });

            return true;
        } catch (error) {
            return false;
        }
    }

    const deleteUmkm = async (id: string) => {
        const umkmCollection = collection(db, "umkm");
        const q = query(umkmCollection, where("id", "==", id));
        const data = await getDocs(q);
        const doc = data.docs[0];
        await deleteDoc(doc.ref);
    }

    return { getAllUmkm, uniqueTitle, updateUniqueTitle, deleteUmkm, addUmkm, getUmkm, updateUmkm };
}

export default useUmkm;