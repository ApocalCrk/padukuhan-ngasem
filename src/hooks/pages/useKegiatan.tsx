import { collection, getDocs, where, query, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '@/utils/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { Kegiatan } from '@/types/kegiatan';
import { slugify } from '@/utils/slugify';
import { sendMailNotificationKe } from '@/utils/sendMail';
import { formatContentAtLastSentence } from '@/utils/sentencePeriod';

const useKegiatan = () => {
    const getAllKegiatan = async () => {
        const kegiatanCollection = collection(db, "kegiatan");
        const q = query(kegiatanCollection);
        const data = await getDocs(q);
        const kegiatanData = data.docs.map(doc => doc.data());
        return kegiatanData as Array<Kegiatan>;
    }

    const getKegiatan = async (id: string) => {
        const kegiatanCollection = collection(db, "kegiatan");
        const q = query(kegiatanCollection, where("id", "==", id));
        const data = await getDocs(q);
        const kegiatanData = data.docs[0].data();
        return kegiatanData as Kegiatan;
    }

    const uniqueTitle = async (title: string) => {
        const kegiatanCollection = collection(db, "kegiatan");
        const q = query(kegiatanCollection, where("judul", "==", title));
        const data = await getDocs(q);
        if (!data.empty) {
            return false;
        }
        return true;
    }

    const updateUniqueTitle = async (title: string, id: string) => {
        const kegiatanCollection = collection(db, "kegiatan");
        const q = query(kegiatanCollection, where("id", "==", slugify(title)));
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

    const addKegiatan = async (formData: { image: File, title: string; content: string; has_tamu: boolean; lokasi: string; tanggal: string; waktu_mulai: string; tamu: Array<{ nama: string; posisi: string; }> }) => {
        const { image, title, content, has_tamu, lokasi, tanggal, waktu_mulai, tamu } = formData;
        const id = slugify(title);
        let imageUrl = '';

        try {
            if (image) {
                const imageRef = ref(storage, `images/${image.name}`);
                await uploadBytes(imageRef, image);
                imageUrl = await getDownloadURL(imageRef);
            }

            const kegiatanCollection = collection(db, "kegiatan");
            const q = query(kegiatanCollection, where("id", "==", id));
            const data = await getDocs(q);
            if (!data.empty) {
                console.error('Title must be unique!');
                return false;
            }

            await addDoc(collection(db, 'kegiatan'), {
                id: id,
                judul: title,
                konten: content,
                has_tamu: has_tamu,
                lokasi: lokasi,
                tanggal: tanggal,
                waktu_mulai: waktu_mulai,
                tamu: tamu,
                gambar: imageUrl,
            });

            await sendMailNotificationKe({ id, title, deskripsi: formatContentAtLastSentence(content) });

        } catch (error) {
            console.error(error);
            return false;
        }

        return true;
    }

    const updateKegiatan = async (id: string, formData: { image: File, title: string; content: string; has_tamu: boolean; lokasi: string; tanggal: string; waktu_mulai: string; tamu: Array<{ nama: string; posisi: string; }> }) => {
        const { image, title, content, has_tamu, lokasi, tanggal, waktu_mulai, tamu } = formData;
        let imageUrl = '';

        try {
            const kegiatanCollection = collection(db, "kegiatan");
            const q = query(kegiatanCollection, where("id", "==", id));
            const data = await getDocs(q);
            const doc = data.docs[0];

            if (image) {
                const oldImage = doc.data().image;
                if (oldImage) {
                    const oldImageRef = ref(storage, oldImage);
                    await deleteObject(oldImageRef);
                }
                const imageRef = ref(storage, `images/${image.name}`);
                await uploadBytes(imageRef, image);
                imageUrl = await getDownloadURL(imageRef);
            }

            await updateDoc(doc.ref, {
                judul: title,
                konten: content,
                has_tamu: has_tamu,
                lokasi: lokasi,
                tanggal: tanggal,
                waktu_mulai: waktu_mulai,
                tamu: tamu,
                gambar: imageUrl,
            });

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }



    const deleteKegiatan = async (id: string) => {
        const kegiatanCollection = collection(db, "kegiatan");
        const q = query(kegiatanCollection, where("id", "==", id));
        const data = await getDocs(q);

        if (!data.empty) {
            const doc = data.docs[0];
            const docData = doc.data();
    
            if (docData.gambar) {
                const imageRef = ref(storage, docData.gambar);
                await deleteObject(imageRef)
                    .then(() => {
                        console.log('Image successfully deleted!');
                    })
                    .catch((error) => {
                        console.error('Error deleting image: ', error);
                    });
            }
    
            await deleteDoc(doc.ref)
                .then(() => {
                    console.log('Document successfully deleted!');
                })
                .catch((error) => {
                    console.error('Error deleting document: ', error);
                });
        } else {
            console.error('No document found with the given ID.');
        }
    }

    return { getAllKegiatan, getKegiatan, deleteKegiatan, addKegiatan, updateKegiatan, uniqueTitle, updateUniqueTitle };
}

export default useKegiatan;

