import { collection, getDocs, where, query, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '@/utils/firebase';
import { uploadBytes, ref, getDownloadURL, deleteObject } from 'firebase/storage';
import { Galeri } from '@/types/galeri';
import bycrypt from 'bcryptjs';
import { generateKey, randomBytes } from 'crypto';

const useGaleri = () => {
    const getAllGaleri = async () => {
        const galeriCollection = collection(db, "galeri");
        const q = query(galeriCollection);
        const data = await getDocs(q);
        const adminData = data.docs.map(doc => doc.data());
        return adminData as Array<Galeri>;
    }

    const getGaleri = async (id: string) => {
        const galeriCollection = collection(db, "galeri");
        const q = query(galeriCollection, where("id", "==", id));
        const data = await getDocs(q);
        const galeriData = data.docs[0].data();
        return galeriData as Galeri;
    }

    const addGaleri = async (formData: { nama_tempat: string; tempat: string; gambar: File | null }) => {
        const { nama_tempat, tempat, gambar } = formData;
        const id = randomBytes(16).toString('hex');
        let imageUrl = '';

        try {
            if (gambar) {
                const imageRef = ref(storage, `images/${gambar.name}`);
                await uploadBytes(imageRef, gambar);
                imageUrl = await getDownloadURL(imageRef);
            }

            await addDoc(collection(db, "galeri"), {
                id,
                nama_tempat,
                tempat,
                gambar: imageUrl
            });

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    const updateGaleri = async (id: string, formData: { nama_tempat: string; tempat: string; gambar: File | null }) => {
        const { nama_tempat, tempat, gambar } = formData;
        let imageUrl = '';
        console.log(gambar);
        try {
            const galeriCollection = collection(db, "galeri");
            const q = query(galeriCollection, where("id", "==", id));
            const data = await getDocs(q);
            const doc = data.docs[0];

            if (gambar) {
                const oldImage = doc.data().gambar;
                if (oldImage) {
                    const oldImageRef = ref(storage, oldImage);
                    await deleteObject(oldImageRef);
                }
                const imageRef = ref(storage, `images/${gambar.name}`);
                await uploadBytes(imageRef, gambar);
                imageUrl = await getDownloadURL(imageRef);
            }

            await updateDoc(doc.ref, {
                nama_tempat,
                tempat,
                gambar: imageUrl
            });

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    const deleteGaleri = async (id: string) => {
        try {
            const galeriCollection = collection(db, "galeri");
            const q = query(galeriCollection, where("id", "==", id));
            const data = await getDocs(q);
            const doc = data.docs[0];

            const image = doc.data().gambar;
            if (image) {
                const imageRef = ref(storage, image);
                await deleteObject(imageRef);
            }

            await deleteDoc(doc.ref);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    return { getAllGaleri, getGaleri, addGaleri, updateGaleri, deleteGaleri };
}

export default useGaleri;



    