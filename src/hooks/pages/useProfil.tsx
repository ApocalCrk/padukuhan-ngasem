import { collection, getDocs, where, query, updateDoc } from 'firebase/firestore';
import { db, storage } from '@/utils/firebase';
import { Profil, Pengurus } from '@/types/profil';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const useProfil = () => {
    const getProfil = async () => {
        const profilCollection = collection(db, "pages");
        const q = query(profilCollection, where("id", "==", "profil"));
        const data = await getDocs(q);
        const profilData = data.docs[0].data();
        return profilData as Profil;
    }

    const updateProfil = async (profil: { judul: string; subjudul: string; konten: string; visi_misi: Array<string>; pengurus: Array<Pengurus>; image: File | null}) => {
        const { judul, subjudul, konten, visi_misi, pengurus, image } = profil;
        const profilCollection = collection(db, "pages");
        const q = query(profilCollection, where("id", "==", "profil"));
        const data = await getDocs(q);
        const doc = data.docs[0];
        try {
            if (image) {
                const oldImage = doc.data().image;
                if (oldImage) {
                    const oldImageRef = ref(storage, oldImage);
                    await deleteObject(oldImageRef);
                }
                
                const imageRef = ref(storage, `images/${image.name}`);
                await uploadBytes(imageRef, image);
                const imageUrl = await getDownloadURL(imageRef);
                await updateDoc(doc.ref, {
                    judul,
                    subjudul,
                    konten,
                    visi_misi,
                    pengurus,
                    image: imageUrl
                });
            }else{
                await updateDoc(doc.ref, {
                    judul,
                    subjudul,
                    konten,
                    visi_misi,
                    pengurus
                });
            }
            return true;
        } catch (error) {
            return false;
        }   
    }

    return { getProfil, updateProfil };
}

export default useProfil;
