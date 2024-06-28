import { collection, getDocs, where, query, updateDoc } from 'firebase/firestore';
import { db, storage } from '@/utils/firebase';
import { Dokumen } from '@/types/dokumen';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const useDokumen = () => {
    const getDokumen = async () => {
        const dokumenCollection = collection(db, "pages");
        const q = query(dokumenCollection, where("id", "==", 'dokumen'));
        const data = await getDocs(q);
        const dokumenData = data.docs[0].data();
        return dokumenData as Dokumen;
    }

    const updateDokumen = async (formData: { nama_dokumen: string, deskripsi: string, file: File | null }) => {
        const { nama_dokumen, deskripsi, file } = formData;
        const dokumenCollection = collection(db, "pages");
        const q = query(dokumenCollection, where("id", "==", "dokumen"));
        const data = await getDocs(q);
        const doc = data.docs[0];
        try {
            if (file) {
                const oldFile = doc.data().file;
                if (oldFile) {
                    const oldFileRef = ref(storage, oldFile);
                    await deleteObject(oldFileRef);
                }
                
                const fileRef = ref(storage, `files/${file.name}`);
                await uploadBytes(fileRef, file);
                const fileUrl = await getDownloadURL(fileRef);
                await updateDoc(doc.ref, {
                    nama_dokumen,
                    deskripsi,
                    file: fileUrl
                });
            }else{
                await updateDoc(doc.ref, {
                    nama_dokumen,
                    deskripsi
                });
            }
            return true;
        } catch (error) {
            return false;
        }   
    }

    return { getDokumen, updateDokumen };
}

export default useDokumen;
    
    

